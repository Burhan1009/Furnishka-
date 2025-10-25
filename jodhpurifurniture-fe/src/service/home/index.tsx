import { useQuery } from "react-query";
import appService, { IAppServiceParams } from "../appService";

//home slider

export const useGetHomeSlider = (options) => {
  const queryKey = [`home-slider`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/gethomeslider`,
    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

export const useGetDealOfDay = (options) => {
  const queryKey = [`home-dealday`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/deal-of-the-day`,
    showErrorMsg: true,
    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

// export const useGetHomeReviews = (limit, pageParam=1) => {
//   const queryKey = [`home-reviews`];

//   const data: IAppServiceParams = {
//     method: 'GET',
//     url: `/getreviews?page=${pageParam}&limit=${limit}`,
//     showErrorMsg: true,
//     SecondUrl: true
//   };

//   return useInfiniteQuery(
//     queryKey,
//     () => appService(data),
//     {
//       getNextPageParam: (_lastPage, pages) => {
//         if (pages.length < limit) {
//           return pages.length + 1;

//         }
//         return undefined;
//       },
//       onError: (e: any) => {
//         console.log(e);
//       },
//     }
//   );
// };

// export const useGetHomeReviews = (params: any) => {

//   const queryKey = [`home-reviews`, params];

//   const activityFourms = async (key: any) => {
//     const param = key.queryKey[1] ?? {};
//     const page = key.pageParam ?? 1;

//     const data: any = {
//       method: 'get',
//       showSuccessMsg: false,
//       showErrorMsg: false,
//       url: `/getreviews`,
//       params: param as object,
//     };
//     try {
//       data.params.page = page;
//       const res = await appService(data);
//       console.log('res', res);
//       return {
//         res: res?.data?.data,
//         params: data.params,
//         page,
//       };

//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   };

//   return useInfiniteQuery(queryKey, activityFourms, {
//     keepPreviousData: true,
//     onError: (e: any) => {
//       console.log(e)
//     },

//     getNextPageParam: (lastPage: any) => {
//       if (lastPage?.res?.length) {
//         return lastPage.page + 1;
//       }
//       return undefined;
//     },
//   });
// };

//essenstial furniture

export const useGetEssentialFurniture = (options) => {
  const queryKey = [`essential-furniture`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getshopbyroom`,
    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

// best selling

export const useGetBestSelling = (options) => {
  const queryKey = [`best-selling`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/gettrendyfurniture`,

    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

//get bedroom furniture

export const useGetBedroomFurniture = (options) => {
  const queryKey = [`bedroom-furniture`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getproductofhotdeals`,
    showErrorMsg: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

// store address

export const useGetStoreAvailable = (options) => {
  const queryKey = [`stores`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getactivestores`,
    showErrorMsg: true,
  };

  return useQuery(queryKey, () => appService(data), {
    staleTime: 60 * (60 * 1000),
    ...options,
  });
};

//header discount coupon

export const useGetHeaderCoupon = () => {
  const queryKey = [`header-coupon`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getheadercoupon`,
    showErrorMsg: false,
  };

  return useQuery(queryKey, () => appService(data), {
    staleTime: 10 * (60 * 1000),
  });
};

export const useGetlivingStorage = (payload: any, options) => {
  const queryKey = [`living-storage`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getothercategories/${payload}`,
    showErrorMsg: true,
    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

export const useGetDiningSet = (payload: any, options) => {
  const queryKey = [`dining-set`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getothercategories/${payload}`,
    showErrorMsg: true,
    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

export const useGetMetaData = (payload) => {
  const queryKey = [`meta-data`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getmetadata/${payload}`,
    SecondUrl: true,
  };

  return useQuery(queryKey, () => appService(data), {});
};

export const useGetAllCategory = (option) => {
  const queryKey = [`all-category`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `getAllCatywithSubCaty`,
    showErrorMsg: true,
  };

  return useQuery(queryKey, () => appService(data), {});
};

export const useSearchSuggesion = (payload: any, option) => {
  const queryKey = [`search-suggetion`, payload];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/search/${payload}`,
    showErrorMsg: true,
  };

  return useQuery(queryKey, () => appService(data), {
    ...option,
  });
};

export const useRightBanner = () => {
  const queryKey = [`home-right-banner`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/sticky_home_banner`,
  };

  return useQuery(queryKey, () => appService(data), {});
};


//emi banner


export const useGetEmiBanner = (options) => {
  const queryKey = [`home-emi-banner`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getEmiBanner`,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

// get widerange

export const useGetWideRange = (payload, options) => {
  const queryKey = [`home-get-wide-range`, payload];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/WideRange`,
    params: payload
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

//get home big banner

export const useGetBigBanner = (options:any) => {
  const queryKey = [`home-get-big-banner`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getBigBanner`,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

//get home double banner
export const useGetDoubleBanner = (options:any) => {
  const queryKey = [`home-get-double-banner`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/doubleBanners`,
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};

//get page description metacontent

export const useGetPageDescription = (payload, options) => {
  const queryKey = [`home-get-page-content`, payload];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/pageDescription`,
    params: payload
  };

  return useQuery(queryKey, () => appService(data), {
    ...options,
  });
};