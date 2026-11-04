import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SupportAvatar = {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
};

export interface SupportContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  supportAvatars?: ReadonlyArray<SupportAvatar>;
  title?: string;
  description?: string;
  buttonText?: string;
  onContactClick?: () => void;
  contactHref?: string;
}

export function SupportContactCard({
  supportAvatars,
  title = "Still have questions?",
  description = "Can't find the answer you're looking for? Please chat to our friendly team.",
  buttonText = "Get in touch",
  onContactClick,
  contactHref = "/contact",
  className,
  ...props
}: SupportContactCardProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-muted/50 p-8 text-center",
        className
      )}
      {...props}
    >
      {supportAvatars && supportAvatars.length > 0 && (
        <div className="flex items-center -space-x-3">
          {supportAvatars.map((avatar, i) => (
            <Avatar
              key={i}
              className={cn(
                "h-12 w-12 border-2 border-background shadow-xs",
                avatar.className
              )}
            >
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {onContactClick ? (
        <Button onClick={onContactClick}>{buttonText}</Button>
      ) : (
        <Button asChild>
          <a href={contactHref}>{buttonText}</a>
        </Button>
      )}
    </div>
  );
}

export default SupportContactCard;

