const Button = ({ text, onClick, className = "" }) => {
  return (
    <button
      className={`w-full cursor-pointer px-4 py-3.5 bg-primary-dark text-white rounded hover:bg-primary-light ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
