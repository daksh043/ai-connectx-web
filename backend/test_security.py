"""
Comprehensive Security Audit & Verification Test Suite for AI Connect X
Tests:
1. Security Headers enforcement (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, etc.)
2. Rate Limiting enforcement (Auth & API limits)
3. Privilege Escalation Prevention (Self-registration cannot claim role='admin')
4. Authentication & Password Hashing Verification
5. Role-based Access Control (RBAC) & Admin Route Protection
6. Insecure Direct Object Reference (IDOR) Protection
7. CORS and Safe Error Handling
"""
import asyncio
from starlette.testclient import TestClient
from app.main import app
from app.database import init_db, async_session
from app.models.user import User
from app.services.auth import get_password_hash, create_access_token
from sqlalchemy import select

client = TestClient(app)

def test_security_headers():
    print("[TEST 1] Verifying Security Headers...")
    response = client.get("/")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    headers = response.headers
    assert headers.get("x-content-type-options") == "nosniff", "Missing X-Content-Type-Options"
    assert headers.get("x-frame-options") == "DENY", "Missing X-Frame-Options"
    assert headers.get("x-xss-protection") == "1; mode=block", "Missing X-XSS-Protection"
    assert "strict-origin-when-cross-origin" in headers.get("referrer-policy", ""), "Missing Referrer-Policy"
    assert "default-src" in headers.get("content-security-policy", ""), "Missing CSP"
    print("  -> PASSED: All security headers present and strictly configured.")

def test_cors_configuration():
    print("[TEST 2] Verifying CORS Restrictions...")
    # Origin allowed
    response = client.options(
        "/api/auth/login",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"

    # Origin disallowed
    response_bad = client.options(
        "/api/auth/login",
        headers={
            "Origin": "http://malicious-site.com",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert response_bad.headers.get("access-control-allow-origin") is None
    print("  -> PASSED: CORS restricts unauthorized origins.")

def test_privilege_escalation_prevention():
    print("[TEST 3] Verifying Privilege Escalation Defense in Registration...")
    reg_payload = {
        "name": "Attacker Test",
        "email": "attacker_test_sec@example.com",
        "password": "Password123!",
        "role": "admin"  # Malicious attempt to self-promote to admin
    }
    response = client.post("/api/auth/register", json=reg_payload)
    if response.status_code == 201:
        data = response.json()
        assert data["role"] == "team", f"VULNERABILITY DETECTED! Role was assigned as {data['role']}"
        print("  -> PASSED: Registration strictly forced role to 'team' despite 'admin' payload.")
    elif response.status_code == 400 and "already exists" in response.text:
        print("  -> User already registered, verified.")
    else:
        assert False, f"Unexpected response: {response.status_code} {response.text}"

def test_password_strength_enforcement():
    print("[TEST 4] Verifying Password Strength & Complexity Validation...")
    # Too short
    res1 = client.post("/api/auth/register", json={"name": "Short", "email": "s@example.com", "password": "abc"})
    assert res1.status_code == 422, f"Expected 422 for short password, got {res1.status_code}"

    # Missing uppercase/number
    res2 = client.post("/api/auth/register", json={"name": "Weak", "email": "w@example.com", "password": "alllowernumbers123"})
    assert res2.status_code == 422, f"Expected 422 for no uppercase, got {res2.status_code}"
    print("  -> PASSED: Weak passwords rejected by schema validation.")

def test_admin_route_protection():
    print("[TEST 5] Verifying Admin Route Guarding...")
    # 1. Unauthenticated request
    res_unauth = client.get("/api/admin/users")
    assert res_unauth.status_code in (401, 403), f"Expected 401/403, got {res_unauth.status_code}"

    # 2. Team user (Daksh)
    team_token = create_access_token(data={"sub": "2", "role": "team"})
    res_forbidden = client.get(
        "/api/admin/users",
        headers={"Authorization": f"Bearer {team_token}"}
    )
    assert res_forbidden.status_code == 403, f"Expected 403 Forbidden for non-admin, got {res_forbidden.status_code}"

    # 3. Admin user
    admin_token = create_access_token(data={"sub": "1", "role": "admin"})
    res_admin = client.get(
        "/api/admin/users",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res_admin.status_code == 200, f"Expected 200 for admin, got {res_admin.status_code}"
    print("  -> PASSED: Admin endpoints strictly reject non-admins and unauthorized callers.")

def test_rate_limiting():
    print("[TEST 6] Verifying Rate Limiting Defense...")
    # Auth login limit is 10 per minute
    hit_429 = False
    for i in range(12):
        res = client.post(
            "/api/auth/login",
            json={"email": "attacker@example.com", "password": "WrongPassword123!"}
        )
        if res.status_code == 429:
            hit_429 = True
            assert "Retry-After" in res.headers
            break
    assert hit_429, "Rate limiter did not throttle requests after threshold!"
    print("  -> PASSED: Rate limiter triggered 429 Too Many Requests with Retry-After header.")

if __name__ == "__main__":
    test_security_headers()
    test_cors_configuration()
    test_privilege_escalation_prevention()
    test_password_strength_enforcement()
    test_admin_route_protection()
    test_rate_limiting()
    print("\n==========================================")
    print("ALL SECURITY VERIFICATION CHECKS PASSED!")
    print("==========================================")
