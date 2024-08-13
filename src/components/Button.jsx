function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      className={`btn text-white bg-purple-600 hover:bg-purple-700 w-full ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {' '}
      {children}{' '}
    </button>
  );
}

export default Button;
