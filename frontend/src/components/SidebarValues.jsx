import Main from "./dashboard/Main";
import Users from "./Users";
import UsersReport from "./UsersReport";
import UserProfile from "./UserProfile";

export const sidebar = [
  {
    path: "/home",
    name: "Dashboard",
    element: <Main />,
    isAdmin: true,
    isUser: true,
  },
  {
    path: "/users",
    name: "Users",
    element: <Users />,
    isAdmin: true,
    isUser: false,
  },
  {
    path: "/report",
    name: "Users Report",
    element: <UsersReport />,
    isAdmin: true,
    isUser: false,
  },
  {
    path: "/profile",
    name: "Users Profile",
    element: <UserProfile />,
    isAdmin: true,
    isUser: true,
  },
  {
    path: "/profile",
    name: "Users Profile",
    element: <UserProfile />,
    isAdmin: false,
    isUser: true,
  },
];
