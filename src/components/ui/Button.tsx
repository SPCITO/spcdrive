'use client';
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useSPCTheme } from "@/providers/ThemeProvider"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none border",
  {
    variants: {
      variant: {
        // We use classes for the layout logic, but let CSS variables handle the colors
        primary: "text-white shadow-lg border-transparent hover:brightness-110 hover:shadow-emerald-500/20",
        secondary: "bg-[var(--card)] text-[var(--text-main)] border-[var(--border)] hover:bg-[var(--background)]",
        ghost: "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--background)]",
        danger: "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20 hover:bg-[var(--danger)] hover:text-white",
        outline: "bg-transparent border-2",
      },
      size: {
        default: "h-11 px-6 rounded-[var(--radius-base)] text-sm",
        sm: "h-9 px-4 text-xs rounded-xl",
        lg: "h-14 px-8 text-base rounded-[var(--radius-base)]",
        icon: "h-11 w-11 rounded-[var(--radius-base)]",
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
    const { colors } = useSPCTheme();

    // Mapping dynamic styles that CVA can't handle easily
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return { backgroundColor: colors.primary };
        case 'outline':
          return { borderColor: colors.primary, color: colors.primary };
        default:
          return {};
      }
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        style={getVariantStyles()}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }