
import { useFavorites } from "../context/FavouritesContext";
import type { Show } from "../types/show";

type FavoriteButtonProps = 
{
  show: Show;
  variant?: "primary" | "secondary" | "remove";
};

const buttonVariants = 
{
  primary: "bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer transition-colors duration-200",
  secondary: "border border-blue-600 w-full text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-200",
  remove: "bg-red-500 border border-red-500 text-white w-full hover:bg-red-700 hover:cursor-pointer transition-colors duration-200",
};



const FavoriteButton = ({show, variant = "primary"}: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(show.id);

  const handleClick = () => {
    if (favorite) 
    {
        removeFavorite(show.id);
    } 
    else 
    {
        addFavorite(show);
    }
  };

  const buttonStyles = favorite ? buttonVariants.remove : buttonVariants[variant];


  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-lg px-6 py-4 font-semibold transition ${buttonStyles}`}
    >
      {favorite ? "Remove from Favourite" : "Add to Favourite"}
    </button>
  );
};

export default FavoriteButton;
