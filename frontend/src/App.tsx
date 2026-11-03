import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/auth-context";
import ClubPage from "./pages/ClubPage";
import CookieConsentBanner from "./components/common/CookieConsentBanner";
import SmoothScrollProvider from "./components/providers/SmoothScrollProvider";

// Lazy-loaded routes to minimize initial bundle size and parsing overhead
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const CompaniesPage = lazy(() => import("./pages/CompaniesPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const OutreachPage = lazy(() => import("./pages/OutreachPage"));
const PipelinePage = lazy(() => import("./pages/PipelinePage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const AIAssistantPage = lazy(() => import("./pages/AIAssistantPage"));
const AutomationsPage = lazy(() => import("./pages/AutomationsPage"));

const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const Spiral3DPage = lazy(() => import("./pages/Spiral3DPage"));
const ShowcasePage = lazy(() => import("./pages/ShowcasePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const IndustryVoicesPage = lazy(() => import("./pages/IndustryVoicesPage"));
const CylinderPage = lazy(() => import("./pages/CylinderPage"));
const AIConnectX3DGallery = lazy(() => import("./components/zubox/AIConnectX3DGallery"));
const AIConnectXEditorialTeam = lazy(() => import("./components/zubox/AIConnectXEditorialTeam"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/legal/TermsOfServicePage"));
const CookiePolicyPage = lazy(() => import("./pages/legal/CookiePolicyPage"));
const RefundPolicyPage = lazy(() => import("./pages/legal/RefundPolicyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507]">
      <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  );
}

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
          <SmoothScrollProvider>
            {/* Compliant DPDP & Cookie Consent Banner */}
            <CookieConsentBanner />

            <Suspense fallback={<RouteFallback />}>
              <Routes>
              {/* Club Website (Public Landing Page) */}
              <Route path="/" element={<ClubPage />} />
              <Route path="/club" element={<ClubPage />} />
              <Route path="/overview" element={<Navigate to="/" replace />} />
              <Route path="/mission" element={<Navigate to="/" replace />} />
              <Route path="/team" element={<CylinderPage />} />
              <Route path="/our-team" element={<CylinderPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/spiral-3d" element={<Spiral3DPage />} />
              <Route path="/spiral" element={<Spiral3DPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/featured-projects" element={<ProjectsPage />} />
              <Route path="/industry-voices" element={<IndustryVoicesPage />} />
              <Route path="/voices" element={<IndustryVoicesPage />} />
              <Route path="/testimonials" element={<IndustryVoicesPage />} />
              <Route path="/cylinder" element={<CylinderPage />} />
              <Route path="/kinetix" element={<CylinderPage />} />
              <Route path="/reel-wall" element={<CylinderPage />} />

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
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/soffit" element={<ShowcasePage />} />
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
          </Suspense>
          </SmoothScrollProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
