import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [userId, router]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full
        cursor-pointer
        hover:opacity-90
        transition
        relative
      `}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
