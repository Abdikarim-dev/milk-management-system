import { Milk, MoreVertical } from "lucide-react";
import { useContext, createContext, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Boxes, LayoutDashboard, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

const SidebarContext = createContext();

const icons = {
  LayoutDashboard: LayoutDashboard,
  UserCircle: UserCircle,
  BarChart3: BarChart3,
  Boxes: Boxes,
  Milk: Milk,
};

function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user } = useSelector((state) => state.user);

  return (
    <aside className="h-screen ">
      <nav className="h-full w-[300px] fixed flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center relative">
          {/* <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 absolute right-3 top-10"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button> */}
        </div>
        <div
          className={`flex flex-col items-center ${
            !expanded ? "hidden" : ""
          } pb-2`}
        >
          <img
            className="rounded-full w-[60px] h-[60px]"
            src={user?.image}
            alt=""
          />
          <h4 className="text-xl font-semibold">{user?.username}</h4>
          <h4 className="font-extralight">{user?.userType}</h4>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.fullname}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, route }) {
  const { expanded } = useContext(SidebarContext);
  const Icon = icons[icon];
  const itemStyles = useMemo(
    () => ({
      base: "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group",
      active: "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800",
      inactive: "hover:bg-indigo-50 text-gray-600",
    }),
    []
  );

  return (
    <NavLink
      to={`/${route}`}
      className={`${itemStyles.base} ${
        active ? itemStyles.active : itemStyles.inactive
      }`}
    >
      {<Icon size={20} />}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </NavLink>
  );
}

export default Sidebar;
