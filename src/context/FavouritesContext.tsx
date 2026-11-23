
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Show } from "../types/show";

type FavoritesContextType = 
{
  favorites: Show[];
  addFavorite: (show: Show) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({children} : {children: ReactNode}) => {
    const [favorites, setFavorites] = useState<Show[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Save favorites to localStorage whenever the collection changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a show to favorites
  const addFavorite = (show: Show) => {setFavorites((prev) => {
      if(prev.some((item) => item.id === show.id)) 
        {
            return prev;
        }

      return [...prev, show];
    });
  };

  // Remove a show from favorites
  const removeFavorite = (id: number) => {setFavorites((prev) => prev.filter((show) => show.id !== id))};

  // Check if a show is already in favorites
  const isFavorite = (id: number) => { 
    return favorites.some((show) => show.id === id);
    };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for accessing favorites
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) 
    {
        throw new Error("useFavorites must be used within FavoritesProvider");
        }

  return context;
};
