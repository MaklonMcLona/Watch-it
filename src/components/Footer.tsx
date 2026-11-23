import { navLinks } from "../data/navlinks"
import { legalPages } from "../data/legalPages"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-blue-600 sticky top-0 z-50 w-full flex justify-center py-2'> 
        
        <div className="flex flex-col">
            <div className="flex items-start justify-between w-full max-md:flex-col max-md:gap-10 max-w-7xl px-5 py-6 md:px-10">
                <div className="flex flex-col gap-4 max-md:w-full w-[50%]">
                    <a href="/" className="text-2xl tracking-[.5rem] text-white">Watch!t</a>
                    <p className="text-white/70">
                       This is a non-commercial website that serves as one of portfolio projects. The website has no financial or business ties to tvmaze.com – it merely uses its public API.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-white text-2xl font-semibold">Menu</h2>
                    <ul className='flex flex-col gap-2 text-white/70'>
                        {navLinks.map((link) => (
                            <li key={link.path} className='hover:text-white cursor-pointer transform-color duration-200'>
                                <Link to={link.path}>{link.name}</Link>
                            </li> 
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-white text-2xl font-semibold">Sources</h2>
                    <ul className='flex flex-col gap-2 text-white/70'>
                        {legalPages.map((link) => (
                            <li key={link.path} className='hover:text-white cursor-pointer transform-color duration-200'>
                                <a href={link.path}>{link.name}</a>
                            </li> 
                        ))}
                    </ul>
                </div>

            </div>
            <div className="flex items-start justify-between w-full max-md:flex-col max-md:gap-10 max-w-7xl px-5 py-6 md:px-10 border-2 border-t-white/10 border-b-0 border-x-0">
                <p className="text-white/70">&copy; 2026 Arkadiusz Barnak. All rights reserved.</p>
            </div>

        </div>
        
    </footer>
  )
}

export default Footer