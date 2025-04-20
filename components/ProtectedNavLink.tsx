import React from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

// ← Extend all the usual <a> props
export interface ProtectedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function ProtectedLink({
  href,
  children,
  onClick,
  ...anchorProps        // this now includes className, style, etc.
}: ProtectedLinkProps) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      openSignIn();
    } else {
      router.push(href);
    }
    onClick?.(e);       // pass along the event
  };

  return (
    <a
      {...anchorProps}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
