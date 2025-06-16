import {
  Navbar,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Button,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  // State to toggle profile menu visibility
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // To close menu when clicked outside
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    setShowProfileMenu(false);
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2">
      {/* Brand */}
      <Link to="/" className="text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Sahand's
        </span>{" "}
        Blog
      </Link>

      {/* Search input (large screens only) */}
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Search button (mobile) */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {/* Dark mode toggle placeholder */}
      <div className="flex items-center gap-2 md:order-2 relative">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <>
            {/* Profile picture button */}
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
              aria-label="User menu"
              ref={menuRef}
            >
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Custom dropdown menu */}
            {showProfileMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 dark:bg-gray-800"
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-900 dark:text-white">
                    @{currentUser.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                    {currentUser.email}
                  </p>
                </div>
                <Link
                  to="/dashboard?tab=profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={handleSignout}
                >
                  Sign out
                </button>
              </div>
            )}
          </>
        ) : (
          // Sign In button
          <Link to="/sign-in">
            <Button
              pill
              className="
                relative 
                z-10 
                text-black 
                bg-transparent 
                border-none 
                before:content-[''] 
                before:absolute 
                before:inset-0 
                before:rounded-full 
                before:p-[2px] 
                before:bg-gradient-to-r 
                before:from-purple-500 
                before:to-blue-500 
                before:z-[-1] 
                before:block 
                before:bg-clip-padding 
                before:box-border 
                hover:text-white 
                hover:bg-gradient-to-r 
                hover:from-purple-500 
                hover:to-blue-500 
                transition-all 
                duration-300
              "
            >
              Sign In
            </Button>
          </Link>
        )}

        {/* Navbar toggle for mobile */}
        <NavbarToggle />
      </div>

      {/* Navigation links */}
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as="div">
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/about"} as="div">
          <Link to="/about">About</Link>
        </NavbarLink>
        <NavbarLink active={path === "/projects"} as="div">
          <Link to="/projects">Projects</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
