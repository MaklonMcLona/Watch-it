import { useQuery } from "@tanstack/react-query";
import { searchShows } from "../api/tvmaze";

export function useSearchShows(query: string) {
  return useQuery({
    queryKey: ["showSearch", query],
    queryFn: ({ signal }) => searchShows(query, signal),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}