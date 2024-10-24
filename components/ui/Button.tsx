import { FC, memo, ReactNode } from "react";
import { Button as MuiButton } from "@mui/base/Button";
import clsx from "clsx";
import Spinner from "@gaia/components/ui/Spinner";

export type ButtonType = {
  children: ReactNode;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "success"
    | "warning";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  href?: string;
  color?: string;
  hoverColor?: string;
  borderRadius?: string | number;
  elevation?: "none" | "small" | "medium" | "large";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  className?: string;
  tabIndex?: number;
};

const Button: FC<ButtonType> = ({
  children,
  borderRadius = "0.375rem",
  className,
  color,
  disabled = false,
  elevation = "none",
  fullWidth = false,
  hoverColor,
  href,
  icon,
  iconPosition = "left",
  loading = false,
  onClick,
  size = "small",
  tabIndex,
  textTransform = "none",
  type = "button",
  variant = "primary",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition duration-200 rounded-md";
  const variantStyles = {
    primary: `bg-blue-500 text-white hover:bg-blue-600`,
    secondary: `bg-gray-500 text-white hover:bg-gray-600`,
    outline: `border border-gray-500 text-gray-500 hover:bg-gray-100`,
    danger: `bg-red-500 text-white hover:bg-red-600`,
    success: `bg-green-500 text-white hover:bg-green-600`,
    warning: `bg-yellow-500 text-white hover:bg-yellow-600`,
  };
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };
  const elevationStyles = {
    none: "",
    small: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-lg",
  };
  const fullWidthStyles = fullWidth ? "w-full" : "";
  const customColorStyles = color ? `bg-${color}` : "";
  const customHoverColorStyles = hoverColor ? `hover:bg-${hoverColor}` : "";
  const customBorderRadiusStyles = `rounded-${borderRadius}`;
  const customTextTransform = `text-${textTransform}`;
  const disabledStyles =
    loading || disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <MuiButton
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      href={href}
      tabIndex={tabIndex}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        elevationStyles[elevation],
        fullWidthStyles,
        customColorStyles,
        customHoverColorStyles,
        customBorderRadiusStyles,
        customTextTransform,
        disabledStyles,
        className
      )}
    >
      {loading && <Spinner />}
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </MuiButton>
  );
};

export default memo(Button);
