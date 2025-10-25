import {  QueryOptions, useQuery, } from "react-query";
import appService, { IAppServiceParams, Params } from "../appService";

//get banner





//get product by category


//single product details





//get other categories

// export const useGetOtherCateogry= (payload:any) => {
//   const queryKey = [`product-other-category`];

//   const data: IAppServiceParams = {
//     method: 'GET',
//     url: `/getothercategories/${payload}`,
//     showErrorMsg: true,
//   };

//   return useQuery(queryKey, () => appService(data), {
//     onError: (e: any) => {
//       console.log(e);
//     },
//   });
// };

//meta data

export const useGetMetaDetailBySlug = (payload: any, option:QueryOptions,  ) => {
  const queryKey = [`product-meta-slug`];

  const data: IAppServiceParams = {
    method: 'GET',
    url: `/getdetailbyslugkey/${payload}`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {
    ...option,
    
   
  });
};
