import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { ArrowUpRight, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { sanitizeInput, isValidEmail, validatePasswordStrength } from "../utils/sanitize";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      setError("Please provide a valid name (at least 2 characters).");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Please provide a valid email address.");
      return;
    }

    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid) {
      setError(passwordCheck.message || "Password does not meet security requirements.");
      return;
    }

    setLoading(true);
    try {
      await register(cleanName, cleanEmail, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="startup-shell">
      <section className="startup-showcase">
        <div className="startup-grid" />
        <div className="startup-brand">
          <img src="/ai-connectx-logo.png" alt="Ai ConnectX logo" className="brand-logo-image startup-brand-logo" />
        </div>
        <div className="startup-copy">
          <h1>Turn intent<br />into <span>impact.</span></h1>
          <p className="startup-description">Your focused workspace for discovering partners and starting conversations that matter.</p>
        </div>
        <div className="startup-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-core"><Sparkles className="w-7 h-7" /></div>
          <span className="orbit-label orbit-label-top">DISCOVER</span>
          <span className="orbit-label orbit-label-right">ENGAGE</span>
          <span className="orbit-label orbit-label-bottom">GROW</span>
        </div>
      </section>

      <section className="startup-auth">
        <div className="auth-panel animate-fade-in">
          <div className="auth-panel-header">
            <div>
              <p className="auth-eyebrow">GET STARTED</p>
              <h2>Build your workspace.</h2>
            </div>
            <div className="auth-status"><span /> Secure</div>
          </div>
          <p className="auth-subtitle">Create an account and turn your next conversation into momentum.</p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="auth-label">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="startup-input"
                placeholder="Your full name"
                required
                minLength={2}
              />
            </div>
            <div>
              <label className="auth-label">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="startup-input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="auth-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="startup-input pr-10"
                  placeholder="Min 8 chars, uppercase & number"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 ml-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                Must have 8+ characters, uppercase letter, and a number.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="startup-submit"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="auth-divider"><span>ALREADY HAVE ACCESS?</span></div>
          <p className="auth-switch">
            <Link to="/login" className="auth-link">
              Sign in instead <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </p>
          <div className="auth-trust"><ShieldCheck className="w-4 h-4" /> Your workspace is private and securely encrypted.</div>
        </div>
      </section>
    </div>
  );
}
