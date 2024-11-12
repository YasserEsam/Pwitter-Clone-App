import React from 'react';
import usePosts from '../../hooks/usePosts';
import PostItem from './PostItem';

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

interface PostFeedProps {
	userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {

	const { data: posts = [] } = usePosts(userId);

	return (
		<div className="border-b-[1px] border-neutral-800 px-5 py-2">
			{posts.map((post: Post) => (
				<PostItem userId={userId} key={post.id} data={post} />
			))}
		</div>
	);
};

export default PostFeed;
