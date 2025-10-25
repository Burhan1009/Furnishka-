import axios, { AxiosRequestHeaders, Method } from 'axios';
import setHeaders from './setHeaders';
import { toast } from 'react-toastify';

export interface Params {
  [x: string]: any;
}

export interface IAppServiceParams {
  method: Method;
  url: string;
  params?: Params;
  logOutOn401?: boolean;
  SecondUrl?:boolean;
  headerCred?: {
    verifytoken?: string;
    contentType?: string;
  };
  data?: object;
  showSuccessMsg?: boolean;
  showErrorMsg?: boolean;
  header?: boolean;
  [x: string]: any;
}



const appService = async (axiosParams: IAppServiceParams) => {


  const {
    method,
    url,
    headerCred,
    data,
    params,
    SecondUrl=false,
    showSuccessMsg,
    showErrorMsg = false,
    header = false,
    ...axiosOptions
  } = axiosParams;

  const appAxios = axios.create({
   baseURL:process.env.NEXT_PUBLIC_SERVER_URL
   // baseURL:'https://www.jodhpurifurniture.com/api'
  });
  try {
    
    const headers: AxiosRequestHeaders = setHeaders(headerCred);
    const response = await appAxios({
      method,
      url,
      params,
      headers,
      data,
      ...axiosOptions,
    });
    
    if (showErrorMsg) {
      if (response?.data?.response == 0) {
        toast.error(response?.data?.message)
      }
    }

    return response.data;
  } catch (e: any) {
   

    // if (showErrorMsg) {
    //   appStore.dispatch(messageAction.setAppError(e?.response?.data || e));
    // }
    throw e;
  }
};

export default appService;
