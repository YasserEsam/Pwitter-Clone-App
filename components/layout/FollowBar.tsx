import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="h-full bg-black dark:bg-white overflow-y-auto custom-scrollbar">
      <div className="bg-gray-900 dark:bg-gray-200 p-4 m-4">
        <h2 className="text-white dark:text-black text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white dark:text-black font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 dark:text-neutral-600 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
