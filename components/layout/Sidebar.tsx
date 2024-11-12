import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="w-full lg:min-h-[700px] sm:w-16 lg:w-64 h-auto sm:h-auto fixed bottom-0 sm:static bg-black dark:bg-white z-10">
      <div className="flex sm:flex-col items-start sm:items-start justify-between sm:justify-between h-full">
        <div className="flex sm:flex-col items-center justify-evenly py-2 sm:items-start gap-4 w-full sm:w-full sm:space-y-2">
          <div className="w-full hidden md:block lg:block">
            <SidebarLogo />
          </div>
          <div className="md:hidden lg:hidden">
            <SidebarTweetButton />
          </div>
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <div className="hidden md:block lg:block">
            <SidebarTweetButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
