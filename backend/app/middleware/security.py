"""
AI Connect X — Security & Rate Limiting Middleware
"""
import time
import logging
from collections import defaultdict
from typing import Dict, List
from fastapi import Request, Response, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.config import settings

logger = logging.getLogger("security")


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Enforces industry-standard HTTP security headers to protect against
    Clickjacking, MIME-sniffing, XSS, and unauthorized framing.
    """
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)

        # Standard Security Headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=()"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

        # Content Security Policy (allows self, Google fonts, and designated API origins)
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "img-src 'self' data: https: blob:; "
            "font-src 'self' https://fonts.gstatic.com data:; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 http://localhost:5173 https://*.googleapis.com https://api.openai.com; "
            "frame-ancestors 'none';"
        )

        return response


class RateLimiterMiddleware(BaseHTTPMiddleware):
    """
    Sliding window in-memory rate limiter to prevent brute force,
    denial-of-service, and credential stuffing attacks.
    """
    def __init__(self, app):
        super().__init__(app)
        # Store request timestamps per IP: {ip: [timestamp1, timestamp2, ...]}
        self.requests: Dict[str, List[float]] = defaultdict(list)
        self.window_seconds = 60

    def _clean_old_requests(self, client_ip: str, now: float):
        cutoff = now - self.window_seconds
        self.requests[client_ip] = [ts for ts in self.requests[client_ip] if ts > cutoff]

    async def dispatch(self, request: Request, call_next):
        # Exclude static assets or health checks from strict rate limiting
        path = request.url.path
        if path in ("/health", "/", "/favicon.ico"):
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        now = time.time()

        # Clean timestamps older than the sliding window
        self._clean_old_requests(client_ip, now)
        recent_requests = self.requests[client_ip]

        # Determine rate limit based on endpoint sensitivity
        if path.startswith("/api/auth/login"):
            limit = settings.RATE_LIMIT_AUTH_PER_MINUTE
            endpoint_type = "auth login"
        elif path.startswith("/api/auth/register"):
            limit = 5
            endpoint_type = "auth register"
        elif path.startswith("/api/ai/") or path.startswith("/api/workspace/assistant"):
            limit = settings.RATE_LIMIT_AI_PER_MINUTE
            endpoint_type = "AI endpoint"
        else:
            limit = settings.RATE_LIMIT_DEFAULT_PER_MINUTE
            endpoint_type = "API endpoint"

        if len(recent_requests) >= limit:
            retry_after = int(self.window_seconds - (now - recent_requests[0])) + 1
            logger.warning(
                "Rate limit exceeded for IP %s on %s (Limit: %d/min)",
                client_ip, path, limit
            )
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": f"Rate limit exceeded for {endpoint_type}. Max {limit} requests per minute.",
                    "retry_after_seconds": max(1, retry_after),
                },
                headers={
                    "Retry-After": str(max(1, retry_after)),
                    "X-RateLimit-Limit": str(limit),
                    "X-RateLimit-Remaining": "0",
                },
            )

        # Record this request
        self.requests[client_ip].append(now)

        response: Response = await call_next(request)
        remaining = max(0, limit - len(self.requests[client_ip]))
        response.headers["X-RateLimit-Limit"] = str(limit)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        return response
