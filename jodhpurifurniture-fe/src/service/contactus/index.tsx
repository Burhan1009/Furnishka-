import { useMutation } from "react-query";
import appService, { IAppServiceParams } from "../appService";

export const useContactUsForm = () => {
  const queryKey = ["support-form"];

  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/sendenquiry`,
      showErrorMsg: true,
      data: body.contactus,
      SecondUrl: true,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {});
};
