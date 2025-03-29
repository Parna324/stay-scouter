
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, User, Search, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-hotel-600 dark:text-hotel-400">
                StayScouter
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/hotels"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
            >
              Hotels
            </Link>
            <Link
              to="/destinations"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
            >
              Destinations
            </Link>
            <Link
              to="/deals"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
            >
              Deals
            </Link>
            <Link
              to="/add-hotel"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
            >
              Add Hotel
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="outline" size="sm" className="ml-2">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-hotel-600 hover:bg-hotel-700">
              Sign Up
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/hotels"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              to="/destinations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link
              to="/add-hotel"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Hotel
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  className="w-full justify-start bg-hotel-600 hover:bg-hotel-700"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
