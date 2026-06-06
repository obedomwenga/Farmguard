import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "rounded-[32px] border border-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "transition-all duration-320 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        className
      )} 
      {...props} 
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-8 pb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-display font-semibold leading-none tracking-tight text-text-primary text-xl", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white hover:bg-primary-hover hover:scale-[1.02]",
      secondary: "bg-transparent border border-primary text-primary hover:bg-[#355E3B]/5",
      outline: "bg-transparent border border-border text-text-primary hover:bg-black/5",
      ghost: "bg-transparent text-text-primary hover:underline underline-offset-4"
    };
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full text-[16px] font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "h-[56px] px-[24px]",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[56px] w-full rounded-2xl border border-border bg-white px-4 py-2 text-[16px] text-text-primary shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Badge = ({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }) => {
  const variants = {
    default: "border-transparent bg-primary text-white shadow",
    secondary: "border-transparent bg-[#F8F5F0] text-text-primary",
    destructive: "border-transparent bg-[#C48B5A]/20 text-[#C48B5A]",
    outline: "text-text-primary border-border",
    success: "border-transparent bg-[#719B77]/20 text-[#355E3B]",
    warning: "border-transparent bg-[#F0C85E]/20 text-[#6A6A6A]",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors", variants[variant], className)} {...props} />
  );
};

