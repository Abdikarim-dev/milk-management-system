import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "../Sidebar";
import { useMediaQuery } from "usehooks-ts";

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
  const isDesktop = useMediaQuery("(min-width:1080px)");

  const sidebarItems = user?.userType === "admin" ? adminSidebar : userSidebar;

  return (
    <div className="flex ">
      {isDesktop ? (
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
      ) : (
        <>Mobile</>
      )}
      <div className={`w-full ${isDesktop ? "ml-[300px]" : "ml-0"}`}>
        {children}
      </div>
    </div>
  );
}

export default Home;
