/**
 * Client-side input sanitization utility to prevent XSS and malformed payloads.
 */
export function sanitizeInput(value: string): string {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script> tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove <iframe> tags
    .replace(/javascript:[^\s]*/gi, '') // Strip javascript: URLs
    .replace(/on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '') // Strip inline event handlers (onerror, onload, onclick)
    .trim();
}

/**
 * Escapes characters for safe HTML display.
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe || typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Password strength policy:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export function validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter (A-Z).' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter (a-z).' };
  }
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number (0-9).' };
  }
  return { isValid: true };
}
