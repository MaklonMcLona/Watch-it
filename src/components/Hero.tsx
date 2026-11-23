
import { useState, useEffect } from "react";
import { useTopShows } from "../hooks/useTopShows";
import FavoriteButton from "./FavouriteButton";

const Hero = () => {
  const { data: show = [], isPending, isError } = useTopShows();

  //   console.log({
  //   isPending,
  //   isFetching,
  //   showLength: show.length,
  // });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredEvents = show.slice(0,3);

  // Carousel slides handling

  const nextSlide = () => {
    setActiveIndex((prev) =>
      (prev + 1) % featuredEvents.length
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      (prev - 1 + featuredEvents.length) %
      featuredEvents.length
    );
  };

  // Carousel hover effect handling

  useEffect(() => {
    if (isHovered || featuredEvents.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        (prev + 1) % featuredEvents.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, featuredEvents.length]);

  // API handling

  if (isPending) 
  {
    return <div className="h-125 w-full flex justify-center items-center" >
      <p className="p-6 text-blue-600">Loading...</p>
    </div>;
  }

  if (isError) 
  {
    return <div className="h-125 w-full flex justify-center items-center" >
      <p className="p-6 text-blue-600">Failed to fetch movies. Try again later.</p>
    </div>;
  }

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-125 w-full overflow-hidden"
    >
      {featuredEvents.map((show, index) => (
        <div
          key={show.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
          aria-hidden={index !== activeIndex}
        >
          {/* Background image */}
          {show.image?.original && (
            <img
              src={show.image.original}
              alt={show.name}
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-x-0 bottom-0 h-[75%] backdrop-blur-md mask-[linear-gradient(to_top,black_0%,black_50%,transparent_100%)]" />


          {/* Dark overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/50" />

          {/* Show content */}
          <div className="absolute inset-0 flex px-20 py-15 items-end justify-start text-white">
            <div className="flex flex-col gap-4 items-start">

              <a href={show.url} target="_blank"> 
                <h1 className="text-4xl font-bold max-md:text-2xl hover:opacity-80 transition-opacity duration-200">
                  {show.name}
                </h1>
              </a>

              <p className="text-md max-md:text-sm">
                {show.summary
                  ? show.summary.replace(/<[^>]*>/g, "").split(/\s+/).slice(0, 20).join(" ") + "..."
                  : "No description found."}
              </p>

              <p className="text-sm font-semibold opacity-80">
                {show.premiered ? show.premiered?.slice(0,4) : null} · {show.genres[1]} · {show.rating.average} <span className="text-yellow-500">★</span>
              </p>

              <div className="flex flex-row gap-2">
                  <FavoriteButton show={show} variant="primary"/>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Previous button */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-white hover:bg-black/70 hover:cursor-pointer"
      >
        ❮
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-white hover:bg-black/70 hover:cursor-pointer"
      >
        ❯
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {featuredEvents.map((show, index) => (
          <button
            key={show.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2 w-2 rounded-full transition ${
              index === activeIndex
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
