
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavouritesContext";
import FavoriteButton from "../components/FavouriteButton";

const Favourite = () => {
  const { favorites } = useFavorites();

  return (
    <section className="mx-auto max-w-7xl px-8 py-12">
      <h1 className="mb-8 text-3xl">
        Favourite Shows
      </h1>

      {favorites.length === 0 ? (
        <div className="h-screen w-full">
            <p className="text-lg text-gray-500">
                    No Shows Found. Go Search for some Shows{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                    here
                </Link>.
            </p>
        </div>

      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((show) => (
            <article key={show.id} className="group min-w-0 hover:scale-102 transition-all duration-300">
              <img
                src={show.image?.original ?? "/placeholder.png"}
                alt={show.name}
                className="mb-6 aspect-6/7 w-full rounded-md object-cover shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
              />

              <div className="mb-4">
                <p className="mb-3 font-semibold">
                  {show.genres?.length
                    ? show.genres.join(" · ")
                    : "No genre found"}
                </p>

                <a
                    href={show.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3 className="mb-1 text-2xl font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        {show.name}
                    </h3>
                </a>

                <p className="text-gray-500">
                  {show.premiered?.slice(0, 4) ??
                    "Unknown release year"}
                </p>
              </div>

              <FavoriteButton show={show} variant="secondary" />
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favourite;
