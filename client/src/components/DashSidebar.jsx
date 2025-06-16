import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
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

  return (
    <div className="w-full md:w-56">
      <Sidebar>
        <div className="space-y-2 px-2 py-4">
          {currentUser && currentUser.isAdmin && (
            <li>
              <Link
                to="/dashboard?tab=dash"
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
        ${
          tab === "dash" || !tab
            ? "bg-gray-100 dark:bg-gray-700 text-black font-semibold"
            : ""
        }`}
              >
                <HiChartPie className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
          )}
          <Link to="/dashboard?tab=profile">
            <div
              className={`flex items-center p-2 rounded-lg cursor-pointer dark:hover:text-black hover:bg-gray-100 ${
                tab === "profile" ? "bg-gray-200 text-black font-semibold" : ""
              }`}
            >
              <HiUser className="w-5 h-5 mr-3 dark:hover:text-black" />
              <span className="text-sm dark:hover:text-black">Profile</span>
              <span className="ml-auto text-xs px-2 py-0.5 bg-gray-300 text-gray-800 dark:text-black dark:hover:text-black rounded-full">
                {currentUser.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </Link>

          {/* Admin Tabs (uncomment if needed) */}
          {currentUser?.isAdmin && (
            <>
              <Link to="/dashboard?tab=posts">
                <div
                  className={`flex items-center p-2 rounded-lg cursor-pointer dark:hover:text-black  hover:bg-gray-100 ${
                    tab === "posts"
                      ? "bg-gray-200 text-black font-semibold"
                      : ""
                  }`}
                >
                  <HiDocumentText className="w-5 h-5 mr-3" />
                  <span className="text-sm">Posts</span>
                </div>
              </Link>

              <Link to="/dashboard?tab=users">
                <div
                  className={`flex items-center p-2 rounded-lg cursor-pointer dark:hover:text-black hover:bg-gray-100 ${
                    tab === "users"
                      ? "bg-gray-200 font-semibold text-black "
                      : ""
                  }`}
                >
                  <HiOutlineUserGroup className="w-5 h-5 mr-3" />
                  <span className="text-sm">Users</span>
                </div>
              </Link>

              <Link to="/dashboard?tab=comments">
                <div
                  className={`flex items-center p-2 rounded-lg cursor-pointer dark:hover:text-black hover:bg-gray-100 ${
                    tab === "comments"
                      ? "bg-gray-200 font-semibold text-black"
                      : ""
                  }`}
                >
                  <HiAnnotation className="w-5 h-5 mr-3" />
                  <span className="text-sm">Comments</span>
                </div>
              </Link>
            </>
          )}

          <div
            className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:text-black"
            onClick={handleSignout}
          >
            <HiArrowSmRight className="w-5 h-5 mr-3 dark:hover:text-black" />
            <span className="text-sm dark:hover:text-black">Sign Out</span>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
