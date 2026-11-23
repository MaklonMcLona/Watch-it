import  { events } from "../data/events";

const Topics = () => {

    const discoverEvents = events.slice(2,5)

  return (
    <section className="w-full flex justify-center py-2 mt-8">
        <div className="flex flex-col gap-4 items-start w-full max-w-7xl px-5 py-6 md:px-10">
            <h2 className="text-3xl mb-4">Hot Topics</h2>
            <div className="grid max-md:grid-cols-1 max-lg:grid-cols-2 gap-x-8 gap-y-10 grid-cols-3">
                {discoverEvents.map((event) => (
                    <article key={event.id} className="min-w-0 rounded-lg border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-102 hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="h-75 w-full object-cover rounded-t-md"
                        />
                        <div className="flex flex-col justify-between items-start px-4 pb-4 rounded-b-md">
                            <div className="flex flex-col py-4">
                                <p className="mb-2 text-md font-light text-gray-700">
                                    This is just a showcase of "Blog Card" component - it's not related to any of given events and button doesn't take any action.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="rounded-lg px-6 py-3 text-blue-600 border text-sm border-blue-600 transition hover:bg-blue-600 hover:text-white hover:cursor-pointer"
                                // onClick={onFavouriteClick}
                            >
                                Read more
                            </button>
                        </div>

                    </article>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Topics