import "./Button.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary', 'secondary', 'outline'
  size = "md",         // 'sm', 'md', 'lg'
  disabled = false,
  className = "",
}) { // Combine all classNames = .btn based on props
  const classNames = `btn ${variant} ${size} $${disabled ? "disabled" : ""} ${className}`;
  //use case: <Button variant="secondary" size="lg">

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
    >
      {children}
    </button>
  );
}

export default Button;