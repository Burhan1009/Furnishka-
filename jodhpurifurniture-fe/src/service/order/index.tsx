import { useMutation, useQuery } from "react-query";
import appService, { IAppServiceParams } from "../appService";

export const useGetOrders = (payload: any) => {
  const queryKey = [`my-order-details`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getorders/${payload}`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {});
};

export const useUpdateOrder = () => {
  const queryKey = ["my-order-update-listing"];

  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/getorderhistory/${body.orderId}`,
      showErrorMsg: true,
      data: { user_id: body.userId },
      //data: body.userId
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {});
};

export const useSendOTP = () => {
  const queryKey = ["send-OTP"];

  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/senduserotp`,
      showErrorMsg: true,
      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {});
};
