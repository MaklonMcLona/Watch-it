import { navLinks } from "../data/navlinks"
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="flex flex-col sticky top-0 z-50">
      <div className="bg-[#f1f1f1] w-full flex justify-center py-1">
        <div className="flex items-center justify-center w-full max-w-7xl px-5 md:px-10">
            <p className="text-blue-600">
            TV show data provided by{" "}
            <a
                href="https://www.tvmaze.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold underline underline-offset-2 transition-colors hover:text-blue-800 hover:cursor-pointer"
            >
            TVmaze
            </a>
            </p>
        </div>
      </div>
      <header className='bg-blue-600 w-full flex justify-center py-2'> 
          <nav className="flex items-center justify-between w-full max-w-7xl px-5 py-6 md:px-10">
            <Link to="/" className="text-2xl tracking-[.5rem] text-white">Watch!t</Link>
            <ul className='flex flex-row gap-4 text-white max-md:gap-6'>
            {navLinks.map((link) => (
              <li key={link.path} className='hover:underline cursor-pointer transition-all duration-200'>
                <Link to={link.path}>{link.name}</Link>
              </li> 
            ))}
            </ul>
          </nav>
      </header>
    </div>

  )
}

export default Header