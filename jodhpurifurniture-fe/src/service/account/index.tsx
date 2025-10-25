import { useMutation } from "react-query";
import appService, { IAppServiceParams } from "../appService";

export const useUpdateProfile = () => {
  const queryKey = ["user-update-profile"];

  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/updateprofile/${body.userId}`,
      showErrorMsg: true,

      data: body.profile,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {
    onError: (e: any) => {},

    onSuccess: (res: any, variables: any, context: unknown) => {},
  });
};

export const useUpdatePassword = () => {
  const queryKey = ["user-update-password"];

  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/updatepassword/${body.userId}`,
      showErrorMsg: true,

      data: { password: body.password },
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {});
};
