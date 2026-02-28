import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        className={({ isActive }) =>
          cn(className, isActive && activeClassName)
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";