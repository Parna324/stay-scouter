
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Moon, Sun, User, Search, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

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
            {user && (
              <Link
                to="/add-hotel"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
              >
                Add Hotel
              </Link>
            )}
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
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => navigate("/auth")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="bg-hotel-600 hover:bg-hotel-700"
                  onClick={() => navigate("/auth")}
                >
                  Sign Up
                </Button>
              </div>
            )}
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
            {user && (
              <Link
                to="/add-hotel"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 dark:text-gray-200 dark:hover:text-hotel-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Hotel
              </Link>
            )}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center px-3">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    className="w-full justify-start bg-hotel-600 hover:bg-hotel-700"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
