import { useMutation, useQuery, useQueryClient } from "react-query";
import appService, { IAppServiceParams, Params } from "../appService";

export const useGetAddAddress = (payload: any) => {
  const queryKey = [`address-details`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getuseraddress/${payload}`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {});
};

export const useGetSingleBilling = (payload: any) => {
  const queryKey = [`billing-slingle-address`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getaddressbyid/${payload.addressId}/${payload.userId}`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {});
};

export const useGetSingleAddress = (payload: any) => {
  const queryKey = [`get-address`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getaddressbyid/${payload.addressId}/${payload.userId}`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {});
};

export const useUpdateAddress = () => {
  const queryKey = ["update-address"];
  const queryClient = useQueryClient();
  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/updateaddressbyid/${body.addressId}`,
      showErrorMsg: true,

      data: body.updateValues,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {
    onSuccess: (res: any, variables: any, context: unknown) => {
      queryClient.invalidateQueries("address-details");
    },
  });
};

export const useDeleteAddress = () => {
  const queryKey = ["delete-address"];
  const queryClient = useQueryClient();
  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "get",
      url: `/deladdress/${body}`,
      showErrorMsg: true,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {
    
    onSuccess: (res: any, variables: any, context: unknown) => {
      queryClient.invalidateQueries("address-details");
    },
  });
};
