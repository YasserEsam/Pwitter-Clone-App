import { useState } from 'react';
import Sidebar from './layout/Sidebar';
import FollowBar from './layout/FollowBar';
import { FaUserFriends } from 'react-icons/fa';

interface LayoutProp {
  children: React.ReactNode;
}

const ToggleButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-20 right-4 bg-gray-800 text-white rounded-full p-3 shadow-lg z-50 sm:bottom-4 lg:hidden transition duration-200 hover:bg-gray-500"
  >
    <FaUserFriends className="h-6 w-6" />
  </button>
);

const Layout: React.FC<LayoutProp> = ({ children }) => {
  const [showFollowBar, setShowFollowBar] = useState(false);

  return (
    <div className="h-full bg-black dark:bg-white">
      <div className="container h-full mx-auto sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-grow border-x border-neutral-800 dark:border-neutral-300 min-h-0 bg-black dark:bg-white">
            {children}
          </main>

          <div
            className={`w-64 lg:w-80 fixed top-0 right-0 h-full bg-black dark:bg-white transform transition-transform duration-300 ease-in-out ${
              showFollowBar ? 'translate-x-0' : 'translate-x-full'
            } lg:relative lg:translate-x-0`}
          >
            <FollowBar />
          </div>
        </div>
        <ToggleButton onClick={() => setShowFollowBar(!showFollowBar)} />
      </div>
    </div>
  );
};

export default Layout;
