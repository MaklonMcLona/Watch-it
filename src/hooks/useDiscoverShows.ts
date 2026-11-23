import { useQuery } from "@tanstack/react-query";
import { getShow } from "../api/tvmaze";

export function useDiscoverShows() {
  return useQuery({
    queryKey: ["show"],
    queryFn: ({ signal }) => getShow({ signal }),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    select: (shows) => [...shows].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)).slice(3),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}