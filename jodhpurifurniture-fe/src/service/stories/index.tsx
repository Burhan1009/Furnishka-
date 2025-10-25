import { useQuery } from "react-query";
import appService, { IAppServiceParams } from "../appService";

export const useGetCustomerStories = () => {
  const queryKey = [`customer-story-details`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/gettestimonials`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {});
};
