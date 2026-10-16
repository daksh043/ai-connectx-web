import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import {
  LayoutDashboard,
  Megaphone,
  Building2,
  Users,
  Send,
  BarChart3,
  Bot,
  GitBranch,
  LogOut,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/assistant", icon: Bot, label: "AI Assistant" },
  { to: "/automations", icon: GitBranch, label: "Automations" },
  { to: "/campaigns", icon: Megaphone, label: "Campaigns" },
  { to: "/companies", icon: Building2, label: "Companies" },
  { to: "/contacts", icon: Users, label: "Contacts" },
  { to: "/outreach", icon: Send, label: "Outreach" },
  { to: "/pipeline", icon: ChevronRight, label: "Pipeline" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/club", icon: Sparkles, label: "Club Portal" },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="premium-shell motion-shell flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="premium-sidebar flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="premium-brand">
          <img src="/ai-connectx-logo.png" alt="Ai ConnectX logo" className="workspace-logo" />
          <div>
            <h1>AI Connect <span>X</span></h1>
            <p>OUTREACH OS</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="premium-nav">
          <p className="premium-nav-label">Workspace</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `sidebar-link premium-nav-link ${isActive ? "active" : ""}`
              }
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="premium-account">
          <button className="premium-settings" aria-label="Open settings"><Settings className="w-4 h-4" /></button>
          <div className="flex items-center gap-3 mb-3">
            <div className="premium-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="premium-user-name">{user?.name}</p>
              <p className="premium-user-role">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="premium-logout"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="premium-main motion-main flex-1 overflow-y-auto">
        <header className="premium-topbar">
          <div className="premium-breadcrumb"><span>Workspace</span><ChevronRight className="h-3.5 w-3.5" /><strong>Command center</strong></div>
          <div className="premium-top-actions">
            <button className="premium-search"><Search className="h-4 w-4" /><span>Search workspace</span><kbd>⌘ K</kbd></button>
            <button className="premium-icon-button" aria-label="Notifications"><Bell className="h-4 w-4" /><span /></button>
            <div className="premium-top-avatar">{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
          </div>
        </header>
        <div className="motion-content p-8 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
