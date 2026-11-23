import type { Show } from "../types/show";

const API_URL = "https://api.tvmaze.com";

export async function getShow({ signal,}: 
    {
    signal?: AbortSignal;
    } = {}): Promise<Show[]> {
    const response = await fetch(`${API_URL}/shows?page=0`, {
    signal,
  });

  if (!response.ok) 
  {
    throw new Error(`TVmaze API error: ${response.status}`);
  }

  return response.json() as Promise<Show[]>;
}



export async function searchShows(
  query: string,
  signal?: AbortSignal
  ): Promise<Show[]> {
  const response = await fetch(
    `${API_URL}/search/shows?q=${encodeURIComponent(query)}`,
    { signal }
  );

  if (!response.ok) 
  {
    throw new Error(`TVmaze API error: ${response.status}`);
  }

  const results: { show: Show }[] = await response.json();

  return results.map((result) => result.show);
}