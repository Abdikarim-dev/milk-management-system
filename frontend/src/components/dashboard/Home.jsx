import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "../Sidebar";

const adminSidebar = [
  {
    icon: "LayoutDashboard",
    text: "Dashboard",
    route: "home",
  },
  {
    icon: "Milk",
    text: "Tank",
    route: "tank",
  },
  {
    icon: "UserCircle",
    text: "Users",
    route: "user",
  },
  // {
  //   icon: "BarChart3",
  //   text: "Users Report",
  //   route: "report",
  // },
  // {
  //   icon: "Boxes",
  //   text: "Transactions",
  //   route: "transaction",
  // },
  {
    icon: "AudioWaveform",
    text: "Reports",
    route: "reports",
  },
  {
    icon: "Cog",
    text: "System Activity",
    route: "log",
  },
  {
    icon: "Boxes",
    text: "User Profile",
    route: "profile",
  },
];
const userSidebar = [
  {
    icon: "LayoutDashboard",
    text: "Dashboard",
    route: "home",
  },
  {
    icon: "Milk",
    text: "Tank",
    route: "tank",
  },
  {
    icon: "Boxes",
    text: "Transactions",
    route: "transaction",
  },

  {
    icon: "Boxes",
    text: "User Profile",
    route: "profile",
  },
];

function Home({ children }) {
  const { user } = useSelector((state) => state?.user);

  const sidebarItems = user?.userType === "admin" ? adminSidebar : userSidebar;

  return (
    <div className="flex ">
      <Sidebar>
        {sidebarItems.map((sidebar) => (
          <SidebarItem
            key={sidebar.route}
            icon={sidebar.icon}
            text={sidebar.text}
            route={sidebar.route}
          ></SidebarItem>
        ))}
      </Sidebar>
      <div className="w-full ml-[300px]">{children}</div>
    </div>
  );
}

export default Home;
