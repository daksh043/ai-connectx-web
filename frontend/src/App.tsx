import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/auth-context";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CampaignsPage from "./pages/CampaignsPage";
import CompaniesPage from "./pages/CompaniesPage";
import ContactsPage from "./pages/ContactsPage";
import OutreachPage from "./pages/OutreachPage";
import PipelinePage from "./pages/PipelinePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import AutomationsPage from "./pages/AutomationsPage";

import ClubPage from "./pages/ClubPage";
import ContactUsPage from "./pages/ContactUsPage";
import OverviewMissionPage from "./pages/OverviewMissionPage";
import TeamPage from "./pages/TeamPage";
import Spiral3DPage from "./pages/Spiral3DPage";
import AIConnectX3DGallery from "./components/zubox/AIConnectX3DGallery";
import AIConnectXEditorialTeam from "./components/zubox/AIConnectXEditorialTeam";
import CookieConsentBanner from "./components/common/CookieConsentBanner";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/legal/TermsOfServicePage";
import CookiePolicyPage from "./pages/legal/CookiePolicyPage";
import RefundPolicyPage from "./pages/legal/RefundPolicyPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050507]">
        <div className="w-8 h-8 border-2 border-[#3b82f6]/30 border-t-[#3b82f6] rounded-full animate-spin" />
      </div>
    );
  }

  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#3b82f6]/30 border-t-[#3b82f6] rounded-full animate-spin" />
      </div>
    );
  }

  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {/* Compliant DPDP & Cookie Consent Banner */}
          <CookieConsentBanner />

          <Routes>
            {/* Club Website (Public Landing Page) */}
            <Route path="/" element={<ClubPage />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/overview" element={<OverviewMissionPage />} />
            <Route path="/mission" element={<OverviewMissionPage />} />
            <Route path="/showcase" element={<OverviewMissionPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/our-team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/spiral-3d" element={<Spiral3DPage />} />
            <Route path="/spiral" element={<Spiral3DPage />} />

            {/* Legal & Compliance Routes (DPDP Act, GDPR) */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/refund" element={<RefundPolicyPage />} />

            <Route
              path="/gallery-preview"
              element={
                <div className="bg-[#050507] min-h-screen text-white flex flex-col items-center justify-center p-6">
                  <AIConnectX3DGallery />
                </div>
              }
            />
            <Route
              path="/team-preview"
              element={
                <div className="bg-[#050507] min-h-screen text-white flex flex-col items-center justify-center">
                  <AIConnectXEditorialTeam />
                </div>
              }
            />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            {/* Protected CRM routes */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/app" element={<DashboardPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/outreach" element={<OutreachPage />} />
              <Route path="/pipeline" element={<PipelinePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/assistant" element={<AIAssistantPage />} />
              <Route path="/automations" element={<AutomationsPage />} />
            </Route>

            {/* Branded 404 Route */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
