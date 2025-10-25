import { useMutation, useQuery, useQueryClient } from "react-query";
import appService, { IAppServiceParams } from "../appService";

export const useGetWishlist = (payload: any, options) => {
  const queryKey = [`user-wishlist`];
  const data: IAppServiceParams = {
    method: "GET",
    url: `/getproducts/${payload}`,
    showErrorMsg: false,
    SecondUrl: true,

    //  params:{user_id:payload},
  };

  return useQuery(queryKey, () => appService(data), {
  
    ...options,
  });
};

export const useDeleteWishlist = () => {
  const queryKey = ["delete-wishlist"];
  const queryClient = useQueryClient();
  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "DELETE",
      url: `/deleteProduct`,
      showErrorMsg: true,
      data: body,
      SecondUrl: true,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {
   

    onSuccess: (res: any, variables: any, context: unknown) => {
      queryClient.invalidateQueries("user-wishlist");
    },
  });
};
