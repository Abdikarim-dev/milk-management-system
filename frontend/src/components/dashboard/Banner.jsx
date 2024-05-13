import Sidebar, { SidebarItem } from "../Sidebar";


const adminSidebar = [
  {
    icon: "LayoutDashboard",
    text: "Dashboard",
    route: "home",
    active: "inactive",
  },
  {
    icon: "UserCircle",
    text: "Users",
    route: "user",
    active: "active",
  },
  {
    icon: "BarChart3",
    text: "Users Report",
    route: "report",
    active: "inactive",
  },
  {
    icon: "Boxes",
    text: "User Profile",
    route: "profile",
    active: "inactive",
  },
];
function Banner({ children }) {
  
  return (
    <div className="flex">
      <Sidebar>
        {adminSidebar.map((sidebar) => (
          <SidebarItem
            key={sidebar.route}
            icon={sidebar.icon}
            text={sidebar.text}
            route={sidebar.route}
          ></SidebarItem>
        ))}
      </Sidebar>
      {children}
    </div>
  );
}

export default Banner;
