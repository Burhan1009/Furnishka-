import { useMutation } from "react-query";
import appService, { IAppServiceParams} from "../appService";

export const useCustomFurniture = () => {
    const queryKey = ["support-form"];
  
    const handleCreateEvent = async (body) => {
      const data: IAppServiceParams = {
        method: "POST",
        url: `/customrequirement`,
        showErrorMsg: true,
        headerCred: {
          contentType: 'multipart/form-data'
        },
        data: body,
      };
     
  
      try {
        return await appService(data);
      } catch (e) {
        throw e;
      }
    };
  
    return useMutation(queryKey, (body) => handleCreateEvent(body), {
     
    });
  };