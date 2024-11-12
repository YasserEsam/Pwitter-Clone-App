import React, { useEffect } from 'react';

import { BsTwitter } from 'react-icons/bs';

import useCurrentUser from '../hooks/useCurrentUser';
import useNotifications from '../hooks/useNotifications';
type Notification = {
	id: string;
	body: string;
	userId: string;
	createdAt: string;
};

const NotificationsFeed = () => {
	
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

	const { data: fetchedNotifications = [] } = useNotifications(
		currentUser?.id,
	);

	useEffect(() => {
		mutateCurrentUser();
	}, [mutateCurrentUser]);

	if (fetchedNotifications.length === 0) {
		return (
			<div className="text-neutral-600 text-center p-6 text-xl">
				No notifications
			</div>
		);
	}
	return (
		<div className="flex flex-col">
			{fetchedNotifications.map((notification: Notification) => (
				<div
					key={notification.id}
					className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
					<BsTwitter className="text-white dark:text-black" size={32} />
					<p className="text-white dark:text-black">{notification.body}</p>
				</div>
			))}
		</div>
	);
};

export default NotificationsFeed;
