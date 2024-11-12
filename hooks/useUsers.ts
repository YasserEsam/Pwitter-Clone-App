import useSWR from "swr";
import fetcher from "@/libs/fetcher";

interface User {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
}

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    "/api/users",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
