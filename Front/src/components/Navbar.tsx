import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BookOpen,
  User,
  LogOut,
  Settings,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, admin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 dark:bg-[#1E1E1E] dark:border-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CourseHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="text-gray-700 dark:text-[#F5F5F5] hover:text-blue-600 font-medium transition-colors"
            >
              Browse Courses
            </Link>

            {isAuthenticated && !isAdmin && (
              <Link
                to="/my-courses"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
              >
                <ShoppingBag className="h-4 w-4 dark:text-[#F5F5F5]" />
                <span className="dark:text-[#F5F5F5]">My Courses</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
              >
                <Settings className="h-4 w-4 dark:text-[#F5F5F5]" />
                <span className="dark:text-[#F5F5F5]">Dashboard</span>
              </Link>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl border dark:border-[#3B3B3B] dark:bg-[#252525] bg-gray-200 text-black dark:text-white transition"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>

          {/* Right side: User Menu (Desktop) + Mobile Menu Button */}
          <div className="flex items-center">
            {/* User Menu (original) - now hidden on small screens */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-50 dark:bg-[#2C2C2C] px-3 py-2 rounded-lg">
                    <User className="h-4 w-4 text-gray-600 dark:text-[#F5F5F5]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-[#F5F5F5]">
                      {isAdmin ? admin?.firstName : user?.firstName}
                    </span>
                    {isAdmin && (
                      <span className="bg-purple-100 dark:bg-[#3B3B3B] dark:text-white text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4 dark:text-[#F5F5F5]" />
                    <span className="text-sm dark:text-[#F5F5F5]">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-[#F5F5F5] hover:text-blue-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r dark:text-white from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:hover:bg-[#2C2C2C]"
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6 dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden dark:bg-[#1E1E1E]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/courses"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-[#2C2C2C] block px-3 py-2 rounded-md text-base font-medium"
            >
              Browse Courses
            </Link>
            {isAuthenticated && !isAdmin && (
              <Link
                to="/my-courses"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-[#2C2C2C] block px-3 py-2 rounded-md text-base font-medium"
              >
                My Courses
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-[#2C2C2C] block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>
          {/* User actions in mobile menu */}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-[#2C2C2C]">
            {isAuthenticated ? (
              <div className="px-5 flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-600 dark:text-[#F5F5F5] mr-2" />
                  <span className="text-base font-medium text-gray-800 dark:text-[#F5F5F5]">
                    {isAdmin ? admin?.firstName : user?.firstName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 dark:text-[#F5F5F5]" />
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full dark:text-[#F5F5F5] text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-[#2C2C2C]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full dark:text-[#F5F5F5] text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-[#2C2C2C]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
