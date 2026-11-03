"use client";

import { useNavigate } from "react-router-dom";
import KilnWordmarkFooter from "@/components/ui/kiln-wordmark-footer";

export default function AIConnectXKilnFooter() {
  const navigate = useNavigate();

  const handleLinkClick = (_label: string, href?: string) => {
    if (!href) return;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href);
    }
  };

  return (
    <div className="relative z-20 w-full overflow-hidden border-t border-white/10 max-h-[50vh] sm:max-h-[48vh] flex flex-col justify-end">
      <KilnWordmarkFooter
        brand="AI ConnectX"
        wordmark="Ai connectX"
        motto={["Connecting Students", "with Industry"]}
        address={[
          "Universal AI University",
          "↳ Kushivili, Karjat",
          "Maharashtra 410201",
        ]}
        navigationTitle="Navigation"
        navigation={[
          [
            { label: "Home", href: "/" },
            { label: "Our Team", href: "/team" },
          ],
          [
            { label: "Projects", href: "/projects" },
            { label: "Voices", href: "/industry-voices" },
          ],
          [
            { label: "Gallery", href: "/gallery-preview" },
            { label: "Contact", href: "/contact" },
          ],
        ]}
        followTitle="Connect"
        socials={[
          [
            { label: "LinkedIn", href: "https://www.linkedin.com/company/ai-connectx-ai/" },
            { label: "Email", href: "mailto:connect@aiconnectx.club" },
          ],
        ]}
        legal={[
          { label: "Privacy (DPDP)", href: "/privacy-policy" },
          { label: "Terms", href: "/terms-of-service" },
          { label: "Cookies", href: "/cookie-policy" },
          { label: "Refund", href: "/refund-policy" },
        ]}
        year={new Date().getFullYear()}
        registry="DPDP ACT 2023 COMPLIANT • UAI STUDENT INITIATIVE"
        surface="#0088ff"
        deep="#07080d"
        ink="#f8fafc"
        paper="#0088ff"
        weight={0.8}
        defaultTile={0}
        onLinkClick={handleLinkClick}
        className="w-full"
      />
    </div>
  );
}
