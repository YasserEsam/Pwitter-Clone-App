import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={handleClick}
    >
      {/* Mobile Icon */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-2 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden transition">
        <Icon size={28} className="text-white dark:text-black" />
        {alert ? (
          <span className="absolute -top-4 left-0 right-0 mx-auto w-5 h-5 bg-sky-500 border-4 border-black rounded-full" />
        ) : null}
      </div>

      {/* Desktop Icon */}
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} className="text-white dark:text-black" />
        <p className="hidden lg:block text-white dark:text-black text-xl">{label}</p>
        {alert ? (
          <span className="absolute left-0 top-0 h-3 w-3 bg-sky-500 rounded-full" />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
