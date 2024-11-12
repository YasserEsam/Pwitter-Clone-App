import useCurrentUser from "../../hooks/useCurrentUser";
import useLoginModal from "../../hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import useLike from "../../hooks/useLike";
import React from "react";

interface User {
  id: string;
  name: string;
  username: string;
}

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  user: User;
}

interface Post {
  id: string;
  body: string;
  createdAt: string;
  user: User;
  comments?: Comment[];
  likedIds?: string[];
}

interface PostItemProps {
  data: Post;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: React.MouseEvent<HTMLParagraphElement>) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 dark:hover:bg-slate-100 transition"
    >
      <div className="flex flex-row items-start gap-3 flex-2">
        <Avatar userId={data.user.id} isLarge={false} hasBorder={false} />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white dark:text-black font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white dark:text-black mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
