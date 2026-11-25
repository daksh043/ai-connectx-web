import { BorderBeam as BaseBorderBeam } from "border-beam";
import { useReducedMotion } from "motion/react";
import type {
  BorderBeamProps,
  BorderBeamSize,
  BorderBeamTheme,
  BorderBeamColorVariant,
} from "border-beam";

export type {
  BorderBeamProps,
  BorderBeamSize,
  BorderBeamTheme,
  BorderBeamColorVariant,
};

export function BorderBeam({ active = true, staticColors = false, ...props }: BorderBeamProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <BaseBorderBeam
      {...props}
      active={!prefersReducedMotion && active}
      staticColors={Boolean(prefersReducedMotion || staticColors)}
    />
  );
}

export default BorderBeam;

