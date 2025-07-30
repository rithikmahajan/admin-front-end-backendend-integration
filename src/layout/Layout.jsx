// Layout component provides the main dashboard structure with navbar, sidebar, and fixed-width content area
// Usage: Wrap your routes/pages with <Layout> for consistent UI
// - Navbar/Header at the top
// - Sidebar below navbar
// - Main content area uses React Router Outlet for dynamic page rendering
import { Outlet } from "react-router-dom";
import sidebarItems from "../data/sidebarItems";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar/Header at the top */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              YORAA
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <img src="/assets/navbarLinks/message.svg" alt="" />
            <img src="/assets/navbarLinks/search.svg" alt="" />
            <img src="/assets/navbarLinks/account.svg" alt="" />
          </div>
        </div>
      </header>
      {/* Sidebar below navbar and main content to the right */}
      <div className="flex flex-1 min-h-0">
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-4 overflow-y-auto">
            {sidebarItems.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button className="text-sm text-gray-600 hover:text-gray-900 block py-1 w-full text-left">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 flex justify-center">
          <div
            style={{ width: "1200px", maxWidth: "1200px", minWidth: "1200px" }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
