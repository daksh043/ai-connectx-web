import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { ArrowUpRight, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import ZeroSevenLoadingScreen from "../components/zubox/ZeroSevenLoadingScreen";
import ScrollCanvasBackground from "../components/zubox/ScrollCanvasBackground";
import { sanitizeInput, isValidEmail } from "../utils/sanitize";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show07Loader, setShow07Loader] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);

  const loginBgProgress = show07Loader
    ? loginProgress <= 50
      ? loginProgress / 50
      : (100 - loginProgress) / 50
    : null;

  const loginSlideOffset = show07Loader
    ? Math.sin((loginProgress / 100) * Math.PI) * 120
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = sanitizeInput(email).toLowerCase();
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setShow07Loader(true);
    try {
      await login(cleanEmail, password);
      // ZeroSevenLoadingScreen plays out then onComplete will navigate to dashboard
    } catch (err: any) {
      setShow07Loader(false);
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleProgress = useCallback((pct: number) => {
    setLoginProgress(pct);
  }, []);

  const handleComplete = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="startup-shell login-shell relative overflow-hidden">
      {/* 07 Loader: Displays transparent concentric orbit animation while logging in */}
      {show07Loader && (
        <>
          <ScrollCanvasBackground
            overrideProgress={loginBgProgress}
            slideOffset={loginSlideOffset}
          />
          <ZeroSevenLoadingScreen
            duration={2400}
            title="Authenticating Workspace"
            subtitle="Logging into Ai ConnectX Matrix [07]..."
            onProgressUpdate={handleProgress}
            onComplete={handleComplete}
          />
        </>
      )}

      <section className="startup-showcase">
        <div className="startup-grid" />
        <div className="startup-brand">
          <img src="/ai-connectx-logo-transparent.png" alt="Ai ConnectX logo" className="brand-logo-image startup-brand-logo drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
        </div>
        <div className="startup-copy">
          <h1>Make every<br /><span>connection</span> count.</h1>
          <p className="startup-description">A focused workspace for finding the right people, shaping better conversations, and moving ideas forward.</p>
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
              <p className="auth-eyebrow">WELCOME BACK</p>
              <h2>Enter your workspace.</h2>
            </div>
            <div className="auth-status"><span /> Secure</div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="auth-subtitle">Sign in to continue building meaningful industry relationships.</p>
            <Link to="/club" className="text-xs font-semibold text-[#3b82f6] hover:underline shrink-0">
              Visit Club Site →
            </Link>
          </div>

          {error && (
          <div className="auth-error">
            {error}
          </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="startup-submit"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setEmail("admin@example.com");
              setPassword("password123");
            }}
            className="w-full mt-2 py-2 px-3 text-xs font-semibold rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fill Admin Credentials</span>
          </button>
          </form>

          <div className="auth-divider"><span>NEW TO THE WORKSPACE?</span></div>
          <p className="auth-switch">
          <Link to="/register" className="auth-link">
            Create an account <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          </p>
          <div className="auth-trust"><ShieldCheck className="w-4 h-4" /> Your workspace is private by default.</div>
        </div>
      </section>
    </div>
  );
}
