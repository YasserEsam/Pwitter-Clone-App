import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback } from "react";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();
  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div className="my-0 ml-2 lg:hidden rounded-xl h-12 w-12 p-2 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>

      <div className="mt-6 hidden lg:block w-full">
        <div className="px-12 py-2  rounded-xl bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
          <p className="text-center font-semibold text-white text-[20px]">
            Tweet
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
