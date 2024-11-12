import React from "react";
import CommentItem from "./CommentItem";

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

interface CommentFeedProps {
  comments?: Comment[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;
