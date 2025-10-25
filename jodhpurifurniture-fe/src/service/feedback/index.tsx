import { useMutation} from "react-query";
import appService, { IAppServiceParams } from "../appService";

export const useFeedBackForm = () => {
    const queryKey = ["feedback-form"];
  
    const handleCreateEvent = async (body) => {
      const data: IAppServiceParams = {
        method: "POST",
        url: `/savefeedbackform`,
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