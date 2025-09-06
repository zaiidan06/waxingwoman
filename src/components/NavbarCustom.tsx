import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/logo_waxingwoman.png";
import '../App.css'

export default function NavbarCustom() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md shadow-pink-300/50" : "bg-transparent"}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Moved to the left */}
          <div className="flex items-center">
            <a href="/">
              <img
                src={Logo}
                alt="Waxing Woman Logo"
                className="w-14 h-14 border border-pink-300 rounded-full object-cover"
                />
              </a>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${isScrolled ? "text-gray-800" : "text-white"} bg-transparent font-semibold hover:text-pink-500 focus:text-pink-500 transition-colors`}>
                  Category
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 bg-white shadow-lg rounded-md grid grid-cols-3 gap-4 min-w-[300px] p-4">
                  <NavigationMenuLink
                    onClick={() => handleNavClick('services')}
                    className={`text-gray-800 bg-transparent block p-2 hover:text-pink-500 cursor-pointer transition-colors rounded hover:bg-pink-50`}
                    href="/hand"
                  >
                    Hand
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    onClick={() => handleNavClick('services')}
                    className={`text-gray-800 bg-transparent block p-2 hover:text-pink-500 cursor-pointer transition-colors rounded hover:bg-pink-50`}
                    href="/legs"
                  >
                    Legs
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    onClick={() => handleNavClick('services')}
                    className={`text-gray-800 bg-transparent block p-2 hover:text-pink-500 cursor-pointer transition-colors rounded hover:bg-pink-50`}
                    href="/body"
                  >
                    Body
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/treatment"
                  className={`${isScrolled ? "text-gray-800" : "text-white"} bg-transparent font-medium hover:text-pink-500 focus:text-pink-500 cursor-pointer transition-colors`}
                  onClick={() => handleNavClick('services')}
                >
                  Treatment
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/products"
                  className={`${isScrolled ? "text-gray-800" : "text-white"} bg-transparent font-medium hover:text-pink-500 focus:text-pink-500 cursor-pointer transition-colors`}
                  onClick={() => handleNavClick('services')}
                >
                  Product
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className={`${isScrolled ? "text-gray-800" : "text-white"} bg-transparent font-medium hover:text-pink-500 focus:text-pink-500 cursor-pointer transition-colors`}
                  onClick={() => handleNavClick('services')}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={`${isScrolled ? "text-gray-800" : "text-white"} bg-transparent font-medium hover:text-pink-500 focus:text-pink-500 cursor-pointer transition-colors`}
                  onClick={() => handleNavClick('services')}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 border-t">
          {/* Category Dropdown */}
          <div>
            <button
              className="w-full flex justify-between items-center font-semibold text-gray-800 hover:text-pink-500 focus:text-pink-500 py-2 px-2 rounded transition-colors"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              aria-expanded={isCategoryOpen}
            >
              Category
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isCategoryOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="ml-4 mt-1 flex flex-col gap-1">
                <li>
                  <a
                    href="/hand"
                    className="block py-2 px-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hand
                  </a>
                </li>
                <li>
                  <a
                    href="/legs"
                    className="block py-2 px-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Legs
                  </a>
                </li>
                <li>
                  <a
                    href="/body"
                    className="block py-2 px-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Body
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Other Links */}
          <a
            href="/products"
            className="font-medium text-gray-800 hover:text-pink-500 py-2 px-2 rounded hover:bg-pink-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Product
          </a>
          <a
            href="/about"
            className="font-medium text-gray-800 hover:text-pink-500 py-2 px-2 rounded hover:bg-pink-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="font-medium text-gray-800 hover:text-pink-500 py-2 px-2 rounded hover:bg-pink-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}