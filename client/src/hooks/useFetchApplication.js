import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchApplication = async (user_id) => {
  const { data } = await api.get(`/find_password?department=Credentials&created_by=${user_id}`);
  return data;
};

const useFetchApplication = async (user_id) => {
  const { data: apps = [] } = await useQuery({
    queryKey: ['fetch_application', user_id],
    queryFn: () => fetchApplication(user_id),
      refetchOnMount: true,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
  }
    // ['fetch_application', user_id],
    // () => fetchApplication(user_id),
    // {
    //   refetchOnMount: true,
    //   refetchInterval: 2000,
    //   refetchIntervalInBackground: true,
    //   refetchOnWindowFocus: true,
    // }
  );
  console.log(apps)
  return apps;
};

export default useFetchApplication;
