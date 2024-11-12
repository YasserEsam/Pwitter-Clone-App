import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";

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

interface CommentItemProps {
  data: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: React.MouseEvent<HTMLParagraphElement>) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition dark:border-neutral-700 dark:hover:bg-neutral-100">
      <div className="flex flex-row items-start gap-3 flex-2">
        <Avatar userId={data.user.id} />
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white dark:text-black font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 dark:text-neutral-400 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">{createdAt}</span>
          </div>
          <div className="text-white dark:text-black mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
