import GlassyNavbar from "./GlassyNavbar";

interface AIConnectXNavbarProps {
  onNavClick?: (sectionId: string) => void;
  onLoginTrigger?: () => void;
}

export default function AIConnectXNavbar({
  onNavClick,
  onLoginTrigger,
}: AIConnectXNavbarProps) {
  return (
    <GlassyNavbar
      onNavClick={onNavClick}
      onLoginTrigger={onLoginTrigger}
    />
  );
}

export { GlassyNavbar };
