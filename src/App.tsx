import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import './index.css'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FavoritesProvider } from './context/FavouritesContext'



const queryClient = new QueryClient(
  {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minut
      gcTime: 1000 * 60 * 30, // 30 minut
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
}
);

function App() 
{
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <main>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
          </Routes>
          <Footer/>
        </main>
      </FavoritesProvider>
    </QueryClientProvider>
  )
}

export default App
