'use client';
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useSPCTheme } from "@/providers/ThemeProvider"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-black uppercase tracking-widest transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none border",
  {
    variants: {
      variant: {
        primary: "bg-[var(--spc-primary)] text-[var(--spc-button-text)] shadow-lg border-transparent hover:brightness-110 shadow-emerald-500/10",
        secondary: "bg-[var(--spc-card)] text-[var(--spc-text-main)] border-[var(--spc-border)] hover:bg-[var(--spc-background)]",
        ghost: "border-transparent text-[var(--spc-text-muted)] hover:text-[var(--spc-text-main)] hover:bg-[var(--spc-background)]",
        danger: "bg-[var(--spc-danger)] text-white border-transparent hover:brightness-110 shadow-lg shadow-red-500/10",
        outline: "bg-transparent border-2",
      },
      size: {
        default: "h-12 px-6 rounded-[var(--spc-radius-base)] text-[11px]",
        sm: "h-9 px-4 text-[10px] rounded-xl",
        lg: "h-14 px-8 text-sm rounded-[var(--spc-radius-base)]",
        icon: "h-11 w-11 rounded-[var(--spc-radius-base)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    const { colors, radius } = useSPCTheme();

    // 1. Determine the active variant (falling back to 'primary' if undefined)
    const activeVariant = variant || "primary";

    // 2. The Force-Fix: Direct style injection using the theme context values
    const getVariantStyles = () => {
      const baseStyles = { borderRadius: radius.base };

      switch (activeVariant) {
        case 'primary':
          return { 
            ...baseStyles,
            backgroundColor: colors.primary, 
            color: colors.buttonText,
            borderColor: 'transparent'
          };
        case 'outline':
          return { 
            ...baseStyles,
            borderColor: colors.primary, 
            color: colors.primary,
          };
        case 'danger':
          return { 
            ...baseStyles,
            backgroundColor: colors.danger, 
            color: '#ffffff',
            borderColor: 'transparent'
          };
        case 'secondary':
          return {
            ...baseStyles,
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.textMain,
          };
        default:
          return baseStyles;
      }
    };

    return (
      <button
        className={cn(buttonVariants({ variant: activeVariant, size, className }))}
        style={getVariantStyles()}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="mr-2 inline-flex items-center opacity-80">{leftIcon}</span>}
            <span className="truncate">{children}</span>
            {rightIcon && <span className="ml-2 inline-flex items-center opacity-80">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }