
import { useEffect, useState } from "react";
import { useSearchShows } from "../hooks/useSearchShows";
import { useDiscoverShows } from "../hooks/useDiscoverShows";
import FavoriteButton from "./FavouriteButton";
import LoadMoreButton from "./LoadMoreButton";


const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const handleLoadMore = () => {setVisibleCount((prev) => prev + 6)};

  // Debounce searching
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Reset visible shows when search query changes
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery]);

  // Default TV shows
  const {
    data: discoverShows = [],
    isPending: isDiscoverPending,
    isError: isDiscoverError,
  } = useDiscoverShows();

  // Search results
  const {
    data: searchShows = [],
    isPending: isSearchPending,
    isError: isSearchError,
  } = useSearchShows(debouncedQuery);

  // Select the correct data source
  const isSearching = debouncedQuery.trim().length >= 2;

  const shows = isSearching ? searchShows : discoverShows;

  const isPending = isSearching
    ? isSearchPending
    : isDiscoverPending;

  const isError = isSearching
    ? isSearchError
    : isDiscoverError;

  // Check if search is still waiting for debounce
  const isDebouncing =
    searchQuery.trim() !== debouncedQuery.trim();

  // Prepare visible shows
  const visibleShows = shows.slice(0, visibleCount);

  // Check if more shows are available
  const hasMore = visibleShows.length < shows.length;

  return (
    <section className="w-full flex justify-center py-2 mt-8">
      <div className="flex flex-col gap-4 items-start w-full max-w-7xl px-5 py-6 md:px-10">

        <div className="flex w-full justify-between mb-4 max-sm:flex-col max-sm:gap-2">
          <div className="flex">
            <h2 className="text-3xl">Discover more</h2>
          </div>

          {/* Search input */}
          <div className="flex max-sm:my-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a TV show..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Search results */}
        {isDebouncing && searchQuery.trim().length >= 2 ? (
          <p className="text-gray-500">Searching...</p>
        ) : isPending ? (
          <p className="text-gray-500">Loading shows...</p>
        ) : isError ? (
          <p className="text-red-500">
            Something went wrong while fetching shows.
          </p>
        ) : shows.length === 0 ? (
          <p className="text-gray-500">No shows found.</p>
        ) : (
          <>
            {/* Shows grid */}
            <div className="grid max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-8 gap-y-10 grid-cols-3 w-full">
              {visibleShows.map((show) => (
                <article
                  key={show.id}
                  className="group min-w-0 hover:scale-102 transition-all duration-300"
                >
                  <img
                    src={show.image?.original ?? "/placeholder.png"}
                    alt={show.name}
                    className="mb-6 aspect-6/7 w-full rounded-md object-cover shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
                  />

                  <div className="flex flex-col justify-between items-start">
                    <div className="flex flex-col gap-1 pb-4">
                      <p className="text-sm font-bold uppercase text-gray-800">
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

                      <p className="text-sm text-gray-500">
                        {show.premiered?.slice(0, 4) ??
                          "Unknown release year"}
                      </p>
                    </div>
                        <FavoriteButton show={show} variant="secondary"/>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More button */}
            {hasMore && (
              <div className="flex flex-1 justify-center w-full mt-6 mx-md:mt-10">
                <LoadMoreButton onClick={handleLoadMore} variant="primary"/>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Discover;
