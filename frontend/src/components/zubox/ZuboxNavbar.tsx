import AskPhillNavbar from "./AskPhillNavbar";

interface AIConnectXNavbarProps {
  onNavClick?: (sectionId: string) => void;
  onLoginTrigger?: () => void;
}

export default function AIConnectXNavbar({
}: AIConnectXNavbarProps) {
  return (
    <AskPhillNavbar
      brandName="AI ConnectX"
      themeColor="#00b4d8"
      accentColor="#050507"
    />
  );
}

export { AskPhillNavbar };
