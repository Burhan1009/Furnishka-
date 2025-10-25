import { Suspense, lazy, useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

import StickyBox from "react-sticky-box";

const AddTocartCards = lazy(() => import("../global/AddTocartCard"));
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  isProcutHasErr,
  selectAccessToken,
  selectallcategory,
  selectAllFilters,
  selectAuth,
  selectProductListing,
  selectProductListLoading1,
} from "@/service/auth/globalstate";
import { OtherCatActions } from "@/service/listing/states";
import { selectUserCart } from "@/service/cart";
import Noproduct from "../global/Noproduct";

import { useAddToWishlist } from "@/service/Profile";
import { toast } from "react-toastify";
import { cartActions } from "@/service/cart/states";
import { addToCart } from "@/service/cart/cart";
import { ProductActions } from "@/service/detail/states";
import Links from "@/Link";
import Login from "../global/Login";
import ThemeProviderWrapper from "@/utils/ThemeProvider";
import { useQueryClient } from "react-query";

import WideRange from "../home/WideRange";
import WideRange2 from "../home/WideRange2";
import Custom404 from "../404_page";
import { useGetAllCategory } from "@/service/home";

const sortArray = [
  { value: "popularity", lable: "Sort By Popularity" },
  { value: "latest", lable: "Sort By Latest" },
  { value: "low_to_high", lable: "Sort By Price(Low to High)" },
  { value: "high_to_low", lable: "Sort By Price(High to Low)" },
  { value: "fast_delivery", lable: "Fast Delivery" },
];

export const Lists = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, keyword, catName, index, parent } = router.query;
  const otherAllCategory = useSelector(selectallcategory);
  const isProductError = useSelector(isProcutHasErr)
  const actualSlug = id ? id : parent;
  const listData = useSelector(selectProductListing);
  const isLoading = useSelector(selectProductListLoading1);
  const [columnView, setColumnVeiw] = useState({ head: "9", sub: "4" });
  const [columnView2, setColumnVeiw2] = useState({ head2: "9", sub2: "6" });

  const [sortValue, setSortValue] = useState("popularity");
  const [catArray, setCatArray] = useState({ parentCat: [] });
  const [isPriceChecked, setPriceChecked] = useState({ price: [] });
  const [discountPrice, setDiscountPrice] = useState({ percent: [] });
  const [filterFinish, setFilterFinish] = useState({ finish: [] });
  const [parentCheck, setparentCheck] = useState({ parentsSlug: [] });
  const [indexCheck, setIndexCheck] = useState();
  const [catIds, setcatIds] = useState({ ids: [] });
  const [parentcatIdscatIds, setParentcatIdscatIds] = useState({
    parentcatIds: [],
  });
  const [catFilter, setcatFilter] = useState({ cat: [] });

  const [storageFilter, setstorageFilter] = useState({ storage: [] });
  const [show, setShow] = useState(false);
  const [relateId, setRelateId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const auth = useSelector(selectAuth);
  const token = useSelector(selectAccessToken);
  const authData = auth?.length > 0 ? auth[0] : "";
  const filterListData = useSelector(selectAllFilters);
  const filtertCategories = filterListData?.common_categories ?? [];
  const priceArray = filterListData?.price ?? [];
  const parentCategories = filterListData?.data ?? [];

  const discountArray = filterListData?.discount ?? [];
  const getUserCart = useSelector(selectUserCart);

  const { data: finalgetCetegory } = useGetAllCategory({ enabled: !!index });
  const getCetegory = finalgetCetegory?.data ?? [];
  const findSelectedCat = !!getCetegory?.length && getCetegory?.find((cat) => cat?.category_name === index)

  useEffect(() => {
    dispatch(
      OtherCatActions.getProductListing({
        category_slug: actualSlug,
        sub_category_slug: parent,
        parent_slug: findSelectedCat?.slug_key ? findSelectedCat?.slug_key : index,
        search: keyword,
        category_name: catName,
      })
    );
    dispatch(OtherCatActions.getAllFilter());
    dispatch(OtherCatActions.getProductCatDetail(actualSlug));
    dispatch(OtherCatActions.lastUrl(actualSlug));
    return () => {
      dispatch(OtherCatActions.lastUrlClear());
    };
  }, [findSelectedCat]);

  const { mutate: addTowishlist, data: message } = useAddToWishlist();

  const handleAddWishlist = (product_id) => {
    const body = {
      user_id: authData?.user_id,
      product_id: product_id,
    };
    addTowishlist(body);
  };
  useEffect(() => {
    if (message?.response) {
      toast.success(message?.message);
    }
  }, [message]);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };

  const handleCart = (product_id) => {
    const attributeValues =
      getUserCart?.length > 0 &&
      getUserCart?.filter((val) => val.product_id == product_id);

    const qtyAdd =
      getUserCart?.length &&
      getUserCart?.filter((item) => {
        return attributeValues?.find(
          (val) => val.product_id == item.product_id
        );
      });

    const cartLogin = {
      product_id: product_id ?? "",
      qty: 1,
      user_id: authData?.user_id ?? "",
    };

    const addNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qtyAdd[0]?.qty + 1 ?? "",
      user_id: authData?.user_id ?? "",
    };

    if (qtyAdd?.length) {
      dispatch(cartActions.addCart(addNew));
    } else {
      dispatch(cartActions.addCart(cartLogin));
    }
    toast.success("Product added to cart");
  };

  const handleAddToCart = (result, product_id) => {
    const cartValue = {
      product_id: product_id ?? "",
      qty: 1,
      // user_id: authData?.user_id ?? '',
    };

    dispatch(addToCart(cartValue));
    toast.success("Product added to cart");
  };

  const handlePriceFilter = (value: string, action: "add" | "remove") => {
    const priceList = [];

    if (action === "add") {
      priceList.push(value);
      setPriceChecked({ price: priceList });
      const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
      const parentWithCatId2 = [
        ...catIds.ids,
        ...parentcatIdscatIds.parentcatIds,
      ];
      setSliderFilter([]);

      dispatch(
        OtherCatActions.getProductListing({
          category_slug:
            parentSlug3?.length > 0
              ? parentSlug3
              : parentSlug3?.length
                ? parentSlug3
                : id,
          price: priceList,
          discount: discountPrice?.percent,
          common_categories: filterFinish?.finish,
          related_category: storageFilter?.storage,

          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          price: priceList,
          common_categories: filterFinish.finish,
          category_ids: parentWithCatId2,
          discount: discountPrice?.percent,
          related_category: storageFilter?.storage,
        })
      );
      return;
    }
    if (action === "remove") {
      setPriceChecked({ price: [] });
      const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
      const parentWithCatId2 = [
        ...catIds.ids,
        ...parentcatIdscatIds.parentcatIds,
      ];
      dispatch(
        OtherCatActions.getProductListing({
          category_slug:
            parentSlug3?.length > 0
              ? parentSlug3
              : parentSlug3?.length
                ? parentSlug3
                : id,
          discount: discountPrice?.percent,
          common_categories: filterFinish?.finish,
          related_category: storageFilter?.storage,

          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          price: priceList,
          common_categories: filterFinish.finish,
          category_ids: parentWithCatId2,
          discount: discountPrice?.percent,
          related_category: storageFilter?.storage,
        })
      );
    }
  };

  //storage filter
  const handleStorageFilter = (value: string, action: "add" | "remove") => {
    const storageList = [...storageFilter.storage];

    if (action === "add") {
      storageList.push(value);
      setstorageFilter({ storage: storageList });
      const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
      const parentMergeId = [...catIds.ids, ...parentcatIdscatIds.parentcatIds];
      dispatch(
        OtherCatActions.getProductListing({
          category_slug:
            parentSlug3?.length > 0
              ? parentSlug3
              : parentSlug3?.length
                ? parentSlug3
                : id,

          related_category: storageList,
          common_categories: filterFinish?.finish,
          discount: discountPrice?.percent,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          common_categories: filterFinish.finish,
          category_ids: parentMergeId,
          discount: discountPrice?.percent,
          related_category: storageList,
        })
      );
      return;
    }
    const parentMergeId = [...catIds.ids, ...parentcatIdscatIds.parentcatIds];
    const newFilterList = storageList.filter((cat) => cat !== value);

    dispatch(
      OtherCatActions.getAllFilter({
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        common_categories: filterFinish.finish,
        category_ids: parentMergeId,
        discount: discountPrice?.percent,
        related_category: newFilterList,
      })
    );
    setstorageFilter({ storage: newFilterList });
    const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
    dispatch(
      OtherCatActions.getProductListing({
        category_slug:
          parentSlug3?.length > 0
            ? parentSlug3
            : parentSlug3?.length
              ? parentSlug3
              : id,
        discount: discountPrice?.percent,
        common_categories: filterFinish?.finish,
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        related_category: newFilterList,
        sort_by: sortValue,
      })
    );
  };

  const handleDiscountPercent = (value: string, action: "add" | "remove") => {
    const discountList = [];

    if (action === "add") {
      discountList.push(value);
      setDiscountPrice({ percent: discountList });
      const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
      const parentWithCatId2 = [
        ...catIds.ids,
        ...parentcatIdscatIds.parentcatIds,
      ];
      dispatch(
        OtherCatActions.getProductListing({
          category_slug:
            parentSlug3?.length > 0
              ? parentSlug3
              : parentSlug3?.length
                ? parentSlug3
                : id,
          // catFilter?.cat.length > 0
          //   ? catFilter?.cat
          //   : parentCheck?.length
          //   ? parentCheck
          //   : id,
          discount: discountList,
          common_categories: filterFinish?.finish,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          related_category: storageFilter?.storage,
          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          discount: discountList,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          common_categories: filterFinish.finish,
          category_ids: parentWithCatId2 ?? [],
          related_category: storageFilter?.storage,
        })
      );
      return;
    }
    if (action === "remove") {
      setDiscountPrice({ percent: [] });
      const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
      const parentWithCatId2 = [
        ...catIds.ids,
        ...parentcatIdscatIds.parentcatIds,
      ];
      dispatch(
        OtherCatActions.getProductListing({
          category_slug:
            parentSlug3?.length > 0
              ? parentSlug3
              : parentSlug3?.length
                ? parentSlug3
                : id,

          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          common_categories: filterFinish?.finish,
          related_category: storageFilter?.storage,

          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          discount: discountList,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          common_categories: filterFinish.finish,
          category_ids: parentWithCatId2 ?? [],
          related_category: storageFilter?.storage,
        })
      );
    }
  };

  //parent check all
  const queryClient = useQueryClient();
  const handleParentCheck = (
    value: string,
    action: "add" | "remove",
    index,
    relatedId
  ) => {
    const parentList = [];

    if (action === "add") {
      const slugs = value?.map((item) => {
        return item.slug_key;
      });
      const catIdss = value?.map((item) => {
        return item.category_id;
      });
      setparentCheck({ parentsSlug: slugs });
      setParentcatIdscatIds({ parentcatIds: catIdss });

      // setcatIds({ ids: catIdss,  });
      parentList.push(slugs);
      setRelateId(relatedId);
      setIndexCheck(index);

      const parentSlug2 = [...catFilter.cat, ...parentList];

      const parentCatId2 = [...catIds.ids, ...catIdss];
      console.log({ parentSlug2, parentCatId2 });
      dispatch(
        OtherCatActions.getProductListing({
          category_slug: parentSlug2,
          // category_ids: catIds.ids,
          common_categories: filterFinish?.finish,
          discount: discountPrice.percent,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          related_category: storageFilter?.storage,
          sort_by: sortValue,
        })
      );

      dispatch(
        OtherCatActions.getAllFilter({
          category_ids: parentCatId2,
          common_categories: filterFinish.finish,
          discount: discountPrice.percent,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          related_category: storageFilter?.storage,
        })
      );

      return;
    }
    if (action === "remove") {
      setcatFilter({ cat: [] });
      setparentCheck({ parentsSlug: [] });
      setRelateId("");
      // setcatIds({ids: []})

      setstorageFilter({ storage: [] });
      setParentcatIdscatIds({ parentcatIds: [] });
      // setCatArray({ parentCat: [] });
      setIndexCheck(null);

      dispatch(
        OtherCatActions.getProductListing({
          category_slug: catFilter?.cat.length ? catFilter?.cat : id,
          common_categories: filterFinish?.finish,
          // category_ids: catIds.ids,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          related_category: [],
          discount: discountPrice.percent,
          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          // category_ids: parentCatId2,
          category_ids: catIds?.ids?.length ? catIds?.ids : [],
          common_categories: filterFinish.finish,
          discount: discountPrice.percent,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,

          related_category: [],
        })
      );
    }
  };

  const handleFilterFinish = (value: string, action: "add" | "remove") => {
    // var fitlerList = [...filterFinish.finish];
    const filterList = [];
    if (action === "add") {
      filterList.push(value);
      setFilterFinish({ finish: filterList });
      const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
      const parentMergeId = [...catIds.ids, ...parentcatIdscatIds.parentcatIds];

      dispatch(
        OtherCatActions.getProductListing({
          category_slug:
            parentSlug3?.length > 0
              ? parentSlug3
              : parentSlug3?.length
                ? parentSlug3
                : id,

          common_categories: filterList,
          // category_ids: catIds.ids,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,
          discount: discountPrice?.percent,
          related_category: storageFilter?.storage,
          sort_by: sortValue,
        })
      );

      dispatch(
        OtherCatActions.getAllFilter({
          category_ids: parentMergeId ?? [],
          common_categories: filterList,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,
          discount: discountPrice?.percent,
          related_category: storageFilter?.storage,
        })
      );

      return;
    }

    if (action === "remove") {
      setFilterFinish({ finish: [] });
    }
    const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
    const parentMergeId = [...catIds.ids, ...parentcatIdscatIds.parentcatIds];

    dispatch(
      OtherCatActions.getProductListing({
        category_slug:
          parentSlug3?.length > 0
            ? parentSlug3
            : parentSlug3?.length
              ? parentSlug3
              : id,
        common_categories: [],
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        // category_ids: catIds.ids,
        discount: discountPrice?.percent,
        related_category: storageFilter?.storage,
        sort_by: sortValue,
      })
    );
    dispatch(
      OtherCatActions.getAllFilter({
        category_ids: parentMergeId?.length ? parentMergeId : [],
        common_categories: [],
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        discount: discountPrice?.percent,
        related_category: storageFilter?.storage,
      })
    );
  };

  const handleParentCategory = (
    value: string,
    action: "add" | "remove",
    relatedId,
    filtrcatId
  ) => {
    const catList = [...catFilter.cat];

    const catId = [...catIds.ids];

    if (action === "add") {
      catId.push(filtrcatId);
      // setparentCheck([]);
      // setIndexCheck(null);
      catList.push(value);
      // setRelateId(relatedId);

      setcatFilter({ cat: catList });
      setcatIds({ ids: catId });
      const parentSlug = [...catList, ...parentCheck.parentsSlug];
      const parentWithCatId2 = [...catId, ...parentcatIdscatIds.parentcatIds];
      console.log({ parentSlug, parentWithCatId2 });
      dispatch(
        OtherCatActions.getProductListing({
          category_slug: parentSlug,
          discount: discountPrice?.percent,
          common_categories: filterFinish?.finish,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,
          related_category: storageFilter?.storage,
          sort_by: sortValue,
        })
      );
      dispatch(
        OtherCatActions.getAllFilter({
          category_ids: parentWithCatId2,
          common_categories: filterFinish.finish,
          price: sliderFilter.length
            ? `${sliderFilter[0]}-${sliderFilter[1]}`
            : isPriceChecked?.price,
          discount: discountPrice?.percent,
          related_category: storageFilter?.storage,
        })
      );

      return;
    }
    const parentMergeSlug = [...catList, ...parentCheck.parentsSlug];
    const parentMergeId = [...catId, ...parentcatIdscatIds.parentcatIds];
    const newFilterList = parentMergeSlug.filter((cat) => cat !== value);
    const newFilterId = parentMergeId.filter((cat) => cat !== filtrcatId);
    const newFilterCatSlugList = catList.filter((cat) => cat !== value);
    const newFilterCatIdsList = catId.filter((cat) => cat !== filtrcatId);

    setParentcatIdscatIds({ parentcatIds: newFilterId });
    setcatFilter({ cat: newFilterCatSlugList });
    setparentCheck({ parentsSlug: newFilterList });
    setcatIds({ ids: newFilterCatIdsList });

    // setRelateId(relateId);

    if (relateId == relatedId) {
      setRelateId("");
      setIndexCheck(null);
    }
    if (!newFilterList?.length) {
      setRelateId("");
      setParentcatIdscatIds({ parentcatIds: [] });
      setcatIds({ ids: [] });
      // dispatch(OtherCatActions.getAllFilter());
    }

    dispatch(
      OtherCatActions.getAllFilter({
        category_ids: newFilterId,
        common_categories: filterFinish.finish,
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        discount: discountPrice?.percent,
        related_category: storageFilter?.storage,
      })
    );
    dispatch(
      OtherCatActions.getProductListing({
        category_slug: newFilterList?.length > 0 ? newFilterList : id,
        discount: discountPrice?.percent,
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        related_category: storageFilter?.storage,
        common_categories: filterFinish?.finish,
        sort_by: sortValue,
      })
    );
  };

  const handleSortby = (event) => {
    setSortValue(event.target.value as string);
    const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
    dispatch(
      OtherCatActions.getProductListing({
        category_slug:
          parentSlug3?.length > 0
            ? parentSlug3
            : parentSlug3?.length
              ? parentSlug3
              : id,

        sort_by: event.target.value,
        common_categories: filterFinish?.finish,
        discount: discountPrice?.percent,
        price: sliderFilter.length
          ? `${sliderFilter[0]}-${sliderFilter[1]}`
          : isPriceChecked?.price,

        related_category: storageFilter?.storage,
      })
    );
  };

  const [value, setValue] = useState<number[]>([10000, 45000]);
  const [sliderFilter, setSliderFilter] = useState([]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleCustomFilter = () => {
    setPriceChecked({ price: [] });
    setSliderFilter(value);

    const parentSlug3 = [...catFilter.cat, ...parentCheck.parentsSlug];
    const parentWithCatId2 = [
      ...catIds.ids,
      ...parentcatIdscatIds.parentcatIds,
    ];
    dispatch(
      OtherCatActions.getProductListing({
        category_slug:
          parentSlug3?.length > 0
            ? parentSlug3
            : parentSlug3?.length
              ? parentSlug3
              : id,
        price: `${value[0]}-${value[1]}`,
        discount: discountPrice?.percent,
        common_categories: filterFinish?.finish,
        related_category: storageFilter?.storage,
        sort_by: sortValue,
      })
    );
    dispatch(
      OtherCatActions.getAllFilter({
        price: `${value[0]}-${value[1]}`,
        common_categories: filterFinish.finish,
        category_ids: parentWithCatId2,
        discount: discountPrice?.percent,
        related_category: storageFilter?.storage,
      })
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (link) => {
    dispatch(ProductActions.getProductDetail(link));
    dispatch(ProductActions.getProductDetailReset());
  };

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 20,
    height: 20,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",

    backgroundImage: theme.palette.mode === "dark" ? "" : "",
    ".Mui-focusVisible &": {
      outline: "1px solid #DDDDDD",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#f15a21",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    boxShadow: "none",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      outline: "none",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  });
  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  const BpIcon1 = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 20,
    height: 20,

    backgroundImage: theme.palette.mode === "dark" ? "" : "",
    ".Mui-focusVisible &": {
      outline: "none",
    },
  }));

  const BpCheckedIcon1 = styled(BpIcon1)({
    borderRadius: "50%",
    width: 20,
    height: 20,
    marginTop: "2px",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    boxShadow: "none",
    outline: "1px solid #f15a21",
  });
  function BpCheckbox1(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon1 />}
        icon={<BpIcon1 />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  return (
    <>


      <div>
        <ThemeProviderWrapper>
          <section className="container-fluid listing-section2">
            <div className="container">
              <div className="row">
                {/* mobile screen */}
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="filter-options">
                      <div className="product-categories">
                        <Typography
                          style={{ marginBottom: 10 }}
                          className="jost color-22222 fw-600 font-16"
                        >
                          Product Categories
                        </Typography>
                        {parentCategories?.length > 0 ? (
                          parentCategories?.map((item, index) => {
                            const checked = indexCheck == index;
                            return (
                              <>
                                {item?.child_categories?.length ? (
                                  <Accordion
                                    sx={{
                                      mt: -0.5,
                                    }}
                                  >
                                    <AccordionSummary
                                      sx={{}}
                                      expandIcon={
                                        <img src={"/static/images/plus1.svg"} />
                                      }
                                    >
                                      <div
                                        style={{ marginLeft: -18 }}
                                        className="d-flex"
                                      >
                                        <BpCheckbox
                                          sx={{
                                            transform: "scale(1.2)",
                                            color: "grey",
                                            "&.Mui-checked": {
                                              color: "#f15a21",
                                            },
                                            stroke: "#ffffff",
                                            strokeWidth: 0.1,

                                            padding: 0,
                                            margin: 0,
                                          }}
                                          onChange={() =>
                                            handleParentCheck(
                                              item.child_categories,
                                              !checked ? "add" : "remove",
                                              index,
                                              item.category_id
                                            )
                                          }
                                          checked={checked ? true : false}
                                        />
                                        <label
                                          style={{
                                            marginTop: 2,
                                            textTransform: "capitalize",
                                            marginLeft: 20,
                                            fontWeight: "400",
                                          }}
                                          className="font-15  color-22222 jost cat-name"
                                        >
                                          {item.category_name}
                                        </label>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ mt: -2 }}>
                                      {item.child_categories?.length > 0 ? (
                                        item.child_categories?.map((val) => {
                                          const checked = catIds?.ids?.find(
                                            (cat) => cat == val.category_id
                                          );

                                          const pp =
                                            parentCheck?.parentsSlug?.find(
                                              (cat) => cat == val.slug_key
                                            );
                                          const categorySelected = pp
                                            ? true
                                            : checked
                                              ? true
                                              : false;
                                          return (
                                            <div style={{}} className="d-flex">
                                              <BpCheckbox
                                                sx={{
                                                  transform: "scale(1.2)",
                                                  color: "grey",
                                                  "&.Mui-checked": {
                                                    color: "#f15a21",
                                                  },
                                                }}
                                                onChange={() =>
                                                  handleParentCategory(
                                                    val.slug_key,
                                                    !categorySelected
                                                      ? "add"
                                                      : "remove",
                                                    item.category_id,
                                                    val.category_id
                                                  )
                                                }
                                                checked={categorySelected}
                                              />

                                              <label
                                                style={{
                                                  marginTop: 12,
                                                  textTransform: "capitalize",
                                                  fontWeight: "400",
                                                  marginLeft: 5,
                                                }}
                                                className="font-15 color-22222 jost"
                                              >
                                                {val.category_name}
                                              </label>
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <Typography>
                                          no product child categories found
                                        </Typography>
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <>
                            <Skeleton
                              style={{
                                height: 20,
                                marginBottom: "3%",
                                width: "100%",
                              }}
                            />
                            <Skeleton
                              style={{
                                height: 20,
                                marginBottom: "3%",
                                width: "100%",
                              }}
                            />
                            <Skeleton
                              style={{
                                height: 20,
                                marginBottom: "3%",
                                width: "100%",
                              }}
                            />
                          </>
                        )}
                      </div>

                      <div className="range-selector" style={{ marginTop: 18 }}>
                        <Typography className="jost color-22222 fw-600 font-16">
                          Filter by price
                        </Typography>
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Typography sx={{ display: "flex", gap: 2 }}>
                            {" "}
                            <Typography
                              fontSize={15}
                              fontFamily="Jost"
                              fontWeight={400}
                              color="#767676"
                            >
                              {" "}
                              Price:
                            </Typography>{" "}
                            <Typography
                              fontSize={15}
                              fontFamily="Jost"
                              fontWeight={400}
                              color="##222222"
                            >{`₹${value[0]} — ₹${value[1]}`}</Typography>
                          </Typography>
                          <Button
                            onClick={handleCustomFilter}
                            sx={{
                              background: "#EBEBEB",
                              borderRadius: "4px",
                              color: "#484848",
                              fontFamily: "Jost",
                              fontSize: 15,
                              fontWeight: 500,
                              height: 40,
                              mt: -1,
                            }}
                          >
                            Filter
                          </Button>
                        </Grid>
                        {/* Burhan Code Here  */}
                        <Slider
                          sx={{ mt: 1.6, color: "#f15a21" }}
                          value={value}
                          step={50}
                          aria-label="Volume"
                          min={1000}
                          max={200000}
                          onChange={handleChange}
                        />
                        {priceArray?.map((item, index) => {
                          const checked = isPriceChecked.price?.find(
                            (cat) => cat == item.value
                          );

                          return (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 10,
                              }}
                            >
                              <div
                                key={index}
                                style={{ marginLeft: -9 }}
                                className="d-flex"
                              >
                                <BpCheckbox
                                  sx={{
                                    transform: "scale(1.2)",
                                    color: "grey",
                                    "&.Mui-checked": {
                                      color: "#f15a21",
                                    },
                                  }}
                                  onChange={() =>
                                    handlePriceFilter(
                                      item.value,
                                      !checked ? "add" : "remove"
                                    )
                                  }
                                  checked={checked ? true : false}
                                />

                                <label
                                  style={{
                                    marginTop: 12,
                                    fontWeight: "400",
                                    marginLeft: 12,
                                  }}
                                  className="font-15 color-22222 jost"
                                >
                                  { }
                                  {item.label}
                                </label>
                              </div>
                              <Typography
                                className="font-15 color-22222 jost"
                                sx={{ mt: 1, textAlign: "left" }}
                              >
                                ({item.count})
                              </Typography>
                            </div>
                          );
                        })}
                      </div>

                      <div className="range-selector" style={{ marginTop: 18 }}>
                        {filtertCategories?.length > 0 ? (
                          filtertCategories?.map((item, index) => {
                            return (
                              <>
                                <Typography
                                  className="jost color-22222 fw-600 font-16"
                                  style={{ marginTop: 28, marginBottom: 8 }}
                                >
                                  Filter by {item.category_name}
                                </Typography>
                                {item.child_categories?.length > 0 ? (
                                  item.child_categories?.map((val, index) => {
                                    const checked = filterFinish.finish?.find(
                                      (cat) => cat == val.category_id
                                    );

                                    return (
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Grid className="d-flex">
                                          <BpCheckbox1
                                            sx={{
                                              transform: "scale(1.2)",
                                              color: "grey",
                                              ml: -1,

                                              mr: -3.4,
                                              "&.Mui-checked": {
                                                color: "#f15a21",
                                              },
                                            }}
                                            onChange={() =>
                                              handleFilterFinish(
                                                val.category_id,
                                                !checked ? "add" : "remove"
                                              )
                                            }
                                            checked={checked ? true : false}
                                          />

                                          <Grid sx={{ mr: 2.2, mt: 0.8 }}>
                                            <img src={val.image} />
                                          </Grid>

                                          <Typography
                                            className="product-count"
                                            sx={{
                                              mt: 1.3,
                                              fontSize: 15,
                                              textTransform: "capitalize",
                                              color: "#222222",
                                              fontFamily: "Jost",
                                              fontWeight: 400,
                                            }}
                                          >
                                            {" "}
                                            {val.category_name}
                                          </Typography>
                                        </Grid>
                                        <Typography
                                          sx={{ mt: 1.3, textAlign: "left" }}
                                        >
                                          ({val.total_products})
                                        </Typography>
                                      </Grid>
                                    );
                                  })
                                ) : (
                                  <Typography>no finishes found</Typography>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <Typography className="jost color-22222 fw-600 font-16">
                            No Finishes Found
                          </Typography>
                        )}
                      </div>

                      <div style={{ marginTop: 18 }} className="select-storage">
                        <div className="product-categories2">
                          {parentCategories?.length > 0 ? (
                            parentCategories?.map((item) => {
                              return (
                                <>
                                  <div style={{ marginTop: 0 }}>
                                    {item?.related_categories?.length ? (
                                      item?.related_categories?.map((val) => {
                                        return (
                                          <>
                                            {val.child_categories?.length &&
                                              item.category_id == relateId ? (
                                              <Accordion>
                                                <AccordionSummary
                                                  expandIcon={
                                                    <img
                                                      src={
                                                        "/static/images/plus1.svg"
                                                      }
                                                    />
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      marginLeft: -17,
                                                      marginBottom: -15,
                                                    }}
                                                    className="d-flex"
                                                  >
                                                    <Typography className="jost color-22222 fw-600 font-16">
                                                      {val?.category_name}
                                                    </Typography>
                                                  </div>
                                                </AccordionSummary>

                                                <AccordionDetails
                                                  sx={{ mt: -2 }}
                                                >
                                                  {val?.child_categories
                                                    ?.length > 0 ? (
                                                    val?.child_categories?.map(
                                                      (tmp) => {
                                                        const checked =
                                                          storageFilter?.storage?.find(
                                                            (cat) =>
                                                              cat ==
                                                              tmp.slug_key
                                                          );
                                                        return (
                                                          <div
                                                            style={{
                                                              marginLeft: -9,
                                                            }}
                                                            className="d-flex"
                                                          >
                                                            <BpCheckbox
                                                              sx={{
                                                                transform:
                                                                  "scale(1.2)",
                                                                color: "grey",
                                                                "&.Mui-checked":
                                                                {
                                                                  color:
                                                                    "#f15a21",
                                                                },
                                                              }}
                                                              onChange={() =>
                                                                handleStorageFilter(
                                                                  tmp.slug_key,
                                                                  !checked
                                                                    ? "add"
                                                                    : "remove"
                                                                )
                                                              }
                                                              checked={
                                                                checked
                                                                  ? true
                                                                  : false
                                                              }
                                                            />

                                                            <label
                                                              style={{
                                                                marginTop: 12,
                                                                textTransform:
                                                                  "capitalize",
                                                                fontWeight:
                                                                  "400",
                                                                marginLeft: 5,
                                                              }}
                                                              className="font-15 color-22222 jost"
                                                            >
                                                              {
                                                                tmp.category_name
                                                              }
                                                            </label>
                                                          </div>
                                                        );
                                                      }
                                                    )
                                                  ) : (
                                                    <Typography>
                                                      no product child
                                                      categories found
                                                    </Typography>
                                                  )}
                                                </AccordionDetails>
                                              </Accordion>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        );
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="select-storage">
                        <Typography
                          className="jost color-22222 fw-600 font-16"
                          style={{ marginTop: 28, marginBottom: 8 }}
                        >
                          Discount
                        </Typography>
                        {discountArray?.map((item) => {
                          const checked = discountPrice.percent?.find(
                            (cat) => cat == item.value
                          );
                          return (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 10,
                              }}
                            >
                              <div
                                style={{ marginLeft: -9 }}
                                className="d-flex"
                              >
                                <BpCheckbox
                                  sx={{
                                    transform: "scale(1.2)",
                                    color: "grey",
                                    "&.Mui-checked": {
                                      color: "#f15a21",
                                    },
                                  }}
                                  onChange={() =>
                                    handleDiscountPercent(
                                      item.value,
                                      !checked ? "add" : "remove"
                                    )
                                  }
                                  checked={checked ? true : false}
                                />
                                <label
                                  style={{
                                    marginTop: 9,
                                    marginLeft: 13,
                                    fontWeight: "400",
                                  }}
                                  className="font-15 color-22222 jost"
                                >
                                  {item.label}
                                </label>
                              </div>
                              <Typography sx={{ mt: 1, textAlign: "left" }}>
                                ({item.count})
                              </Typography>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
                <div className="col-lg-3 sm-none add-box">
                  <StickyBox offsetTop={20} offsetBottom={20}>
                    <div className="filter-options">
                      <div className="product-categories">
                        <Typography
                          style={{ paddingBottom: 19 }}
                          className="jost color-22222 fw-600 font-16"
                        >
                          Product Categories
                        </Typography>

                        {parentCategories?.length > 0 ? (
                          parentCategories?.map((item, index) => {
                            const checked = indexCheck == index;

                            return (
                              <>
                                {item?.child_categories?.length ? (
                                  <Accordion
                                    sx={{ backgroundColor: "#f4f9fc" }}
                                  >
                                    <AccordionSummary
                                      sx={{ padding: "0px 0px" }}
                                      expandIcon={
                                        <img src={"/static/images/plus1.svg"} />
                                      }
                                    >
                                      <div style={{}} className="d-flex">
                                        <BpCheckbox
                                          sx={{
                                            transform: "scale(1.2)",
                                            color: "grey",
                                            "&.Mui-checked": {
                                              color: "#f15a21",
                                            },
                                            padding: 0,
                                            margin: 0,
                                          }}
                                          onChange={() =>
                                            handleParentCheck(
                                              item.child_categories,
                                              !checked ? "add" : "remove",
                                              index,
                                              item.category_id
                                            )
                                          }
                                          checked={checked ? true : false}
                                        />
                                        <label
                                          style={{
                                            marginTop: 1,
                                            textTransform: "capitalize",
                                          }}
                                          className="font-15 color-22222 jost"
                                        >
                                          {item.category_name}
                                        </label>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ mt: -2 }}>
                                      {item.child_categories?.length > 0 ? (
                                        item.child_categories?.map((val) => {
                                          const checked = catIds?.ids?.find(
                                            (cat) => cat == val.category_id
                                          );

                                          const pp =
                                            parentCheck?.parentsSlug?.find(
                                              (cat) => cat == val.slug_key
                                            );
                                          const categorySelected = pp
                                            ? true
                                            : checked
                                              ? true
                                              : false;

                                          return (
                                            <div style={{}} className="d-flex">
                                              <BpCheckbox
                                                sx={{
                                                  transform: "scale(1.2)",
                                                  color: "grey",
                                                  "&.Mui-checked": {
                                                    color: "#f15a21",
                                                  },
                                                }}
                                                onChange={() =>
                                                  handleParentCategory(
                                                    val.slug_key,
                                                    !categorySelected
                                                      ? "add"
                                                      : "remove",
                                                    item.category_id,
                                                    val.category_id
                                                  )
                                                }
                                                checked={categorySelected}
                                              />

                                              <label
                                                style={{
                                                  marginTop: 9,
                                                  textTransform: "capitalize",
                                                }}
                                                className="font-15 color-22222 jost"
                                              >
                                                {val.category_name}
                                              </label>
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <Typography>
                                          no product child categories found
                                        </Typography>
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <>
                            <Skeleton
                              style={{
                                height: 20,
                                marginBottom: "3%",
                                width: "100%",
                              }}
                            />
                            <Skeleton
                              style={{
                                height: 20,
                                marginBottom: "3%",
                                width: "100%",
                              }}
                            />
                            <Skeleton
                              style={{
                                height: 20,
                                marginBottom: "3%",
                                width: "100%",
                              }}
                            />
                          </>
                        )}
                      </div>

                      <div className="range-selector ">
                        <Typography
                          style={{ paddingBottom: 15 }}
                          className="jost color-22222 fw-600 font-16"
                        >
                          Filter by price
                        </Typography>
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={{ display: "flex", gap: 2 }}>
                            {" "}
                            <Typography
                              className="font-16234"
                              fontSize={15}
                              fontFamily="Jost"
                              fontWeight={400}
                              color="#767676"
                            >
                              {" "}
                              Price:
                            </Typography>{" "}
                            <Typography
                              className="font-16234"
                              fontSize={15}
                              fontFamily="Jost"
                              fontWeight={400}
                              color="##222222"
                            >{`₹${value[0]} — ₹${value[1]}`}</Typography>
                          </Typography>
                          <Button
                            className="btn-filter font-16234"
                            onClick={handleCustomFilter}
                            sx={{
                              background: "#EBEBEB",
                              borderRadius: 0,
                              color: "#484848",
                              fontFamily: "Jost",
                              fontSize: 16,
                              fontWeight: 500,
                              height: { lg: 40 },
                            }}
                          >
                            Filter
                          </Button>
                        </Grid>
                        {/* Burhan Code Here */}
                        <Slider
                          sx={{ mt: 1.6, color: "#f15a21" }}
                          value={value}
                          step={50}
                          aria-label="Volume"
                          min={1000}
                          max={200000}
                          onChange={handleChange}
                        />
                        {priceArray?.map((item, index) => {
                          const checked = isPriceChecked.price?.find(
                            (cat) => cat == item.value
                          );

                          return (
                            <Grid
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                key={index}
                                style={{ marginLeft: -9 }}
                                className="d-flex"
                              >
                                <BpCheckbox
                                  sx={{
                                    transform: "scale(1.2)",
                                    color: "grey",
                                    "&.Mui-checked": {
                                      color: "999999",
                                    },
                                  }}
                                  onChange={() =>
                                    handlePriceFilter(
                                      item.value,
                                      !checked ? "add" : "remove"
                                    )
                                  }
                                  checked={checked ? true : false}
                                />

                                <label
                                  style={{
                                    marginTop: 1,
                                    textTransform: "capitalize",
                                  }}
                                  className="font-16234 color-22222 jost"
                                >
                                  {item.label}
                                </label>
                              </div>
                              <Typography
                                className="font-16234"
                                sx={{
                                  mt: 1.2,
                                  textAlign: "left",
                                }}
                              >
                                ({item.count})
                              </Typography>
                            </Grid>
                          );
                        })}
                      </div>

                      <div className="select-finish">
                        {filtertCategories?.length > 0 ? (
                          filtertCategories?.map((item, index) => {
                            return (
                              <>
                                <Typography
                                  style={{ paddingBottom: 10 }}
                                  className="jost color-22222 fw-600 font-16"
                                >
                                  Filter by {item.category_name}
                                </Typography>
                                {item.child_categories?.length > 0 ? (
                                  item.child_categories?.map((val, index) => {
                                    const checked = filterFinish.finish?.find(
                                      (cat) => cat == val.category_id
                                    );

                                    return (
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Grid className="d-flex">
                                          <BpCheckbox1
                                            sx={{
                                              transform: "scale(1.2)",
                                              color: "grey",
                                              ml: -1,

                                              mr: -3.3,
                                              "&.Mui-checked": {
                                                color: "#f15a21",
                                              },
                                            }}
                                            onChange={() =>
                                              handleFilterFinish(
                                                val.category_id,
                                                !checked ? "add" : "remove"
                                              )
                                            }
                                            checked={checked ? true : false}
                                          />

                                          <Grid sx={{ mr: 2.2, mt: 0.8 }}>
                                            <img src={val.image} />
                                          </Grid>
                                          <Typography
                                            className="font-16234"
                                            sx={{
                                              mt: 1.4,
                                              fontSize: 15,
                                              textTransform: "capitalize",
                                              color: "#222222",
                                              fontFamily: "Jost",
                                              fontWeight: 400,
                                            }}
                                          >
                                            {" "}
                                            {val.category_name}
                                          </Typography>

                                          {/* </Grid> */}
                                        </Grid>
                                        <Typography
                                          className="font-16234"
                                          sx={{ mt: 1.1 }}
                                        >
                                          ({val.total_products})
                                        </Typography>
                                      </Grid>
                                    );
                                  })
                                ) : (
                                  <Typography>no finishes found</Typography>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <Typography className="jost color-22222 fw-600 font-16">
                            No Finishes Found
                          </Typography>
                        )}
                      </div>
                      <div className="product-categories2 ">
                        <div
                          style={{ marginTop: 18 }}
                          className="select-storage"
                        >
                          {parentCategories?.length > 0 ? (
                            parentCategories?.map((item) => {
                              return (
                                <>
                                  <div style={{ marginTop: 0 }}>
                                    {item?.related_categories?.length ? (
                                      item?.related_categories?.map((val) => {
                                        return (
                                          <>
                                            {val.child_categories?.length &&
                                              item.category_id == relateId ? (
                                              <Accordion>
                                                <AccordionSummary
                                                  style={{
                                                    padding: "0px 0px 0px 18px",
                                                  }}
                                                  expandIcon={
                                                    <img
                                                      src={
                                                        "/static/images/plus1.svg"
                                                      }
                                                    />
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      marginLeft: -17,
                                                      marginBottom: -15,
                                                    }}
                                                    className="d-flex"
                                                  >
                                                    <Typography
                                                      style={{
                                                        paddingBottom: 15,
                                                      }}
                                                      className="jost color-22222 fw-600 font-16"
                                                    >
                                                      {val?.category_name}
                                                    </Typography>
                                                  </div>
                                                </AccordionSummary>

                                                <AccordionDetails
                                                  sx={{ mt: -2 }}
                                                >
                                                  {val?.child_categories
                                                    ?.length > 0 ? (
                                                    val?.child_categories?.map(
                                                      (tmp) => {
                                                        const checked =
                                                          storageFilter?.storage?.find(
                                                            (cat) =>
                                                              cat ==
                                                              tmp.slug_key
                                                          );
                                                        return (
                                                          <div
                                                            style={{
                                                              marginLeft: -9,
                                                              display: "flex",
                                                              justifyContent:
                                                                "space-between",
                                                            }}
                                                          >
                                                            <Grid
                                                              sx={{
                                                                display: "flex",
                                                              }}
                                                            >
                                                              <BpCheckbox
                                                                sx={{
                                                                  transform:
                                                                    "scale(1.2)",
                                                                  color: "grey",
                                                                  "&.Mui-checked":
                                                                  {
                                                                    color:
                                                                      "#f15a21",
                                                                  },
                                                                }}
                                                                onChange={() =>
                                                                  handleStorageFilter(
                                                                    tmp.slug_key,
                                                                    !checked
                                                                      ? "add"
                                                                      : "remove"
                                                                  )
                                                                }
                                                                checked={
                                                                  checked
                                                                    ? true
                                                                    : false
                                                                }
                                                              />

                                                              <label
                                                                style={{
                                                                  marginTop: 9.7,
                                                                  textTransform:
                                                                    "capitalize",
                                                                  fontWeight:
                                                                    "400",
                                                                  marginLeft: 5,
                                                                }}
                                                                className="font-15 color-22222 jost"
                                                              >
                                                                {
                                                                  tmp.category_name
                                                                }
                                                              </label>
                                                            </Grid>
                                                            <Typography
                                                              className="font-16234"
                                                              sx={{
                                                                mt: 1,
                                                              }}
                                                            >
                                                              (
                                                              {
                                                                tmp.total_products
                                                              }
                                                              )
                                                            </Typography>
                                                          </div>
                                                        );
                                                      }
                                                    )
                                                  ) : (
                                                    <Typography>
                                                      no product child
                                                      categories found
                                                    </Typography>
                                                  )}
                                                </AccordionDetails>
                                              </Accordion>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        );
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="select-storage" style={{ marginTop: 29 }}>
                        <Typography
                          style={{ paddingBottom: 12 }}
                          className="jost color-22222 fw-600 font-16"
                        >
                          Discount
                        </Typography>
                        {discountArray?.map((item) => {
                          const checked = discountPrice.percent?.find(
                            (cat) => cat == item.value
                          );
                          return (
                            <Grid
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{ marginLeft: -9 }}
                                className="d-flex"
                              >
                                <BpCheckbox
                                  sx={{
                                    transform: "scale(1.2)",
                                    color: "grey",
                                    "&.Mui-checked": {
                                      color: "#f15a21",
                                    },
                                  }}
                                  onChange={() =>
                                    handleDiscountPercent(
                                      item.value,
                                      !checked ? "add" : "remove"
                                    )
                                  }
                                  checked={checked ? true : false}
                                />
                                <label
                                  style={{ marginTop: 9, marginLeft: 12 }}
                                  className="font-16234 color-22222 jost margin-filter-left"
                                >
                                  {item.label}
                                </label>
                              </div>
                              <Typography
                                className="font-16234"
                                sx={{ mt: 1, ml: { md: -5, lg: 0 } }}
                              >
                                ({item.count})
                              </Typography>
                            </Grid>
                          );
                        })}
                      </div>
                    </div>
                  </StickyBox>
                </div>

                {/* )} */}
                <div
                  className={`col-lg-${columnView.head} col-lg-${columnView2.head2} `}
                >
                  <div className="sorting-bar d-flex justify-content-between reverse-direction">
                    <Grid className="d-flexss" sx={{ display: { md: "none" } }}>
                      <span
                        className="font1688"
                        style={{ fontFamily: "Jost", color: "#767676" }}
                      >
                        Sort By :
                      </span>
                      <select
                        className="font1589 add-select-12"
                        style={{
                          fontFamily: "Jost",
                          color: "#484848",
                          borderRadius: 3,
                        }}
                        value={sortValue}
                        onChange={handleSortby}
                      >
                        {sortArray?.map((item) => (
                          <option style={{ height: 40 }} value={item.value}>
                            {" "}
                            {item.lable}
                          </option>
                        ))}
                      </select>
                    </Grid>

                    <Grid
                      className="d-flexss"
                      sx={{ display: "flex", mt: 0.5, alignItems: "center" }}
                    >
                      <div>
                        <button
                          style={{ marginRight: 8 }}
                          onClick={() =>
                            setColumnVeiw2({
                              head2: "6",
                              sub2: columnView2.sub2 == "6" ? "12" : "6",
                            })
                          }
                        >
                          <img
                            style={{ marginTop: -3 }}
                            src={
                              columnView2.sub2 == "12"
                                ? "/static/images/layout-grid.svg"
                                : columnView2.sub2 == "6"
                                  ? "/static/images/list-menu.svg"
                                  : "/static/images/layout-grid.svg"
                            }
                            alt=""
                          />
                        </button>
                      </div>
                      <div
                        style={{
                          color: "#AAA",
                          marginRight: 10,
                          marginTop: -4,
                        }}
                      >
                        |
                      </div>
                      <img
                        src={"/static/images/filter-add-mobile.svg"}
                        onClick={handleShow}
                        style={{ marginRight: 6 }}
                      />

                      <span
                        className="font453 jost"
                        onClick={handleShow}
                        style={{}}
                      >
                        Filter
                      </span>
                    </Grid>

                    <div className="flex-display display-content">
                      <button
                        className="sm-none"
                        onClick={() => setColumnVeiw({ head: "9", sub: "6" })}
                      >
                        <img
                          src={
                            columnView.sub == "6"
                              ? "/static/images/2-orange.svg"
                              : "/static/images/2.svg"
                          }
                          alt=""
                        />
                      </button>
                      <button
                        onClick={() => setColumnVeiw({ head: "9", sub: "4" })}
                      >
                        <img
                          src={
                            columnView.sub == "4"
                              ? "/static/images/3.svg"
                              : "/static/images/3-white.svg"
                          }
                          alt=""
                        />
                      </button>
                      <button
                        className="sm-none1"
                        onClick={() => setColumnVeiw({ head: "9", sub: "3" })}
                      >
                        <img
                          src={
                            columnView.sub == "3"
                              ? "/static/images/4-orange.svg"
                              : "/static/images/4.svg"
                          }
                          alt=""
                        />
                      </button>

                      <label className="font-24 color-767676 jost fw-normal sm-none bar">
                        |
                      </label>
                      <p className="jost color-767676 font1688 fw-normal sm-none count-list">
                        Showing {listData?.length} results
                      </p>
                    </div>
                    <div className="sm-none  display-content ">
                      <span
                        className="font1688"
                        style={{ fontFamily: "Jost", color: "#767676" }}
                      >
                        Sort By :
                      </span>
                      <select
                        className="font1589 add-select"
                        style={{
                          fontFamily: "Jost",
                          color: "#484848",
                          borderRadius: 3,
                        }}
                        value={sortValue}
                        onChange={handleSortby}
                      >
                        {sortArray?.map((item) => (
                          <option style={{ height: 40 }} value={item.value}>
                            {" "}
                            {item.lable}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: -5 }} className="row">
                    {isLoading ? (
                      <>
                        {[1, 2, 3, 4, 5, 5, 3, 4, 2]?.map((_index) => (
                          <div
                            style={{ marginTop: 25 }}
                            className={`col-sm-${columnView.sub} col-${columnView2.sub2}   cols-shi`}
                          >
                            <div className=" d-flex justify-content-center">
                              <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={0}
                                style={{ paddingTop: "80%", borderRadius: 4 }}
                              />
                            </div>
                            <Skeleton />
                            <Skeleton width="60%" />
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {listData?.length > 0 ? (
                          listData?.map((val) => {
                            const discountLable =
                              ((val.regular_price - val.sale_price) /
                                val.regular_price) *
                              100;

                            return (
                              <>
                                <div
                                  className={`col-sm-${columnView.sub} col-${columnView2.sub2}    cols-shi`}
                                >
                                  {" "}
                                  <Suspense
                                    fallback={
                                      <div style={{ marginTop: 25 }}>
                                        <Skeleton
                                          variant="rectangular"
                                          width={"100%"}
                                          height={0}
                                          style={{
                                            paddingTop: "80%",
                                            borderRadius: 4,
                                          }}
                                        />
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                      </div>
                                    }
                                  >
                                    <AddTocartCards
                                      handleRedirect={keyword}
                                      addCart={{
                                        transform: {
                                          lg:
                                            columnView.sub == "3"
                                              ? "scale(0.7)"
                                              : "scale(0.8)",
                                          md:
                                            columnView.sub == "3"
                                              ? "scale(0.6)"
                                              : "scale(0.7)",
                                        },
                                        "&:hover": {
                                          transform: {
                                            lg:
                                              columnView.sub == "3"
                                                ? "scale(0.8)"
                                                : "scale(0.9)",
                                            md:
                                              columnView.sub == "3"
                                                ? "scale(0.7)"
                                                : "scale(0.8)",
                                          },
                                        },
                                      }}
                                      wishlistStyle={{
                                        backgroundSize:
                                          columnView.sub == "3"
                                            ? "10px 10px"
                                            : "20px 20px",
                                        cursor: "pointer",
                                      }}
                                      handleCart={
                                        token
                                          ? () => handleCart(val.product_id)
                                          : () =>
                                            handleAddToCart(
                                              val.attribute_id,
                                              val.product_id
                                            )
                                      }
                                      slug={val.slug_key}
                                      cardStyle={{ width: "auto", mt: 2.5 }}
                                      discountLable={
                                        val.best_sell == 1
                                          ? `${~~discountLable}% off`
                                          : ""
                                      }
                                      key={val.product_id}
                                      alt={val.image_alt_tag}
                                      img={val.base_image}
                                      offer={"fsdfsd"}
                                      imgTitle={val.product_name}
                                      handleWhiteList={
                                        token
                                          ? () =>
                                            handleAddWishlist(val.product_id)
                                          : handleOpen
                                      }
                                    />

                                    <Links
                                      onClick={() => handleClick(val.slug_key)}
                                      style={{ color: "#222222" }}
                                      href={
                                        keyword
                                          ? `/${val.slug_key}?searchFor=${keyword}`
                                          : `/${val.slug_key}`
                                      }
                                    >
                                      <Typography
                                        sx={{
                                          marginTop: { xs: 0.8, sm: 1.1 },
                                          width: "auto",
                                          fontFamily: "JOST",
                                          fontWeight: "normal",
                                          mb: { xs: 0.3, sm: 0.8 },
                                          fontSize: { xs: 15, sm: 15, lg: 16 },
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "-webkit-box",
                                          WebkitLineClamp: "1",
                                          WebkitBoxOrient: "vertical",
                                        }}
                                      >
                                        {val.product_name}
                                      </Typography>

                                      <Grid sx={{ display: { sm: "flex" } }}>
                                        <Typography
                                          sx={{
                                            fontFamily: "Jost",
                                            fontWeight: "600",
                                            fontSize: {
                                              xs: 17,
                                              sm: 15,
                                              lg: 16,
                                            },
                                          }}
                                        >
                                          {
                                            val.sale_price
                                              .toLocaleString("en-In", {
                                                style: "currency",
                                                currency: "INR",
                                              })
                                              .split(".")[0]
                                          }
                                        </Typography>
                                        <Grid sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              mt: { xs: 0.3, md: 0.2 },
                                              marginLeft: { xs: 0, sm: 1.5 },
                                              fontWeight: "500",
                                              marginRight: { xs: 1.2, sm: 1.5 },
                                              fontFamily: "Jost",
                                              color: "#767676",
                                              fontSize: {
                                                xs: 14,
                                                sm: 13,
                                                lg: 14,
                                              },
                                              textDecorationLine:
                                                "line-through",
                                            }}
                                          >
                                            {
                                              val.regular_price
                                                .toLocaleString("en-IN", {
                                                  style: "currency",
                                                  currency: "INR",
                                                })
                                                .split(".")[0]
                                            }
                                          </Typography>
                                          {/* Burhan Code Here */}
                                          <Typography
                                            sx={{
                                              mt: { xs: 0.3, sm: 0.1 },
                                              color: "#4CAF50",
                                              fontWeight: "500",
                                              fontSize: {
                                                xs: 14,
                                                sm: 13,
                                                lg: 14,
                                              },
                                            }}
                                          >
                                            {val.best_sell == 0
                                              ? `${~~discountLable}% off`
                                              : ""}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Links>
                                  </Suspense>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <>
                            {isLoading ? (
                              ""
                            ) : (
                              <Grid mt={0}>
                                <Noproduct />
                              </Grid>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ThemeProviderWrapper>
      </div>
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      <div className="border-mobile-screen"></div>
      <div className="widerange-linting-none1">
        <WideRange />
      </div>
      <div className="widerange-linting-none1">
        <WideRange2 />
      </div>
    </>


  );
};