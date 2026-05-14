import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

/**
 * BUTTON COMPONENT SYSTEM
 * -----------------------
 * primary:   Main actions (Upload, Get Started).
 * secondary: Neutral actions (View Features, Cancel).
 * ghost:     Subtle actions (Sidebar links, icon-only buttons).
 * danger:    Destructive actions (Delete, Remove User).
 * outline:   Secondary brand actions (Bordered emerald style).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:brightness-110",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
        ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
        outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs rounded-xl",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
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
  isLoading?: boolean; // Shows a spinner and disables the button
  leftIcon?: React.ReactNode; // Icon before the text
  rightIcon?: React.ReactNode; // Icon after the text
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
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