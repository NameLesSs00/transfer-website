import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
}

export function Button({ children, variant = "primary", className = "", href, ...props }: ButtonProps) {
  const baseStyles = "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ease-out flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0";
  
  const variants = {
    primary: "bg-transfer-dark text-white hover:bg-[#182634] shadow-[0_4px_14px_0_rgba(14,24,33,0.24)] hover:shadow-[0_6px_20px_rgba(14,24,33,0.18)]",
    secondary: "bg-transfer-light-green text-transfer-green border border-transfer-green hover:bg-[#f5ece3]",
    outline: "bg-transparent text-transfer-dark border border-transfer-dark hover:bg-transfer-light-green",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
}
