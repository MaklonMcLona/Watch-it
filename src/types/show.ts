export type Show = 
{
  id: number;
  name: string;
  genres: string[];
  status: string;
  premiered: string | null;
  summary: string | null;
  weight?: number;
  image: 
    {
        medium: string;
        original: string;
    } | null;
  rating: 
    {
        average: number | null;
    };
  network: 
    {
        name: string;
    } | null;
  webChannel: 
    {
        name: string;
    } | null;
  url: string;
};