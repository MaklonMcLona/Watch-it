import { useQuery } from "@tanstack/react-query";
import { getShow } from "../api/tvmaze";

export function useTopShows() 
{
  return useQuery({
    queryKey: ["show"],
    queryFn: ({ signal }) => {
        // console.log(`[API] Wywołanie: ${new Date().toLocaleTimeString()}`);
        return getShow({ signal });},
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    select: (shows) => [...shows].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)).slice(0,3),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}