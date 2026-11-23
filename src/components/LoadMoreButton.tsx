type LoadMoreButtonProps = 
{
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  children?: React.ReactNode;
};

const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer transition-colors duration-200",
  secondary: "border border-blue-600 max-md:w-full text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-200",
  danger: "bg-red-600 text-white hover:bg-red-700 transition-colors duration-200",
};

const LoadMoreButton = ({onClick, variant = "primary", children = "Load More"}: LoadMoreButtonProps) => {
const buttonStyles = buttonVariants[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex max-md:flex-1 justify-center rounded-lg px-6 py-3 text-md transition-colors duration-200 hover:cursor-pointer ${buttonStyles}`}
    >
      {children}
    </button>
  );
};

export default LoadMoreButton;
