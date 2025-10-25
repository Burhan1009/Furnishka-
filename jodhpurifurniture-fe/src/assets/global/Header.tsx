import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useGetAllCategory,
  useGetDealOfDay,
  useSearchSuggesion,
} from "@/service/home";
import { Skeleton, Typography } from "@mui/material";
import Offcanvas from "react-bootstrap/Offcanvas";
import SideBar from "./SidebarContent";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectAccessToken, selectAuth } from "@/service/auth/globalstate";
import { RootState, useDispatch } from "@/service/store";
import initFacebookSdk from "@/utils/fb";
import Script from "next/script";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import { selectCartWithoutLogin } from "@/service/cart";
import { cartActions } from "@/service/cart/states";
import { clearCart } from "@/service/cart/cart";
import { useGetWishlist } from "@/service/wishlist";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { OtherCatActions } from "@/service/listing/states";
import { authAction } from "@/service/auth/states";
import { TopMenu } from "./TopMenu";

const icons = {
  img1: "/static/images/logo.svg",
  img2: "static/images/mega-img.png",
  img3: "/static/images/store.svg",
  img4: "/static/icon/ProfileNew.svg",
  img5: "/static/images/heart.svg",
  img6: "/static/images/cart.svg",
  img7: "/static/images/Logo-4-1.png",
};
initFacebookSdk();
function Header() {
  const router = useRouter();
  const { keyword, id, search } = router.query;
  const path = router.pathname;
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";

  const [categoryValue, setCategoryValue] = useState({
    slug_key: id ?? "",
    label: search ?? keyword ?? "",
  });

  const { data: finalgetCetegory, isLoading } = useGetAllCategory();
  const getCetegory = finalgetCetegory?.data ?? [];
  console.log({ getCetegory, isLoading });
  const { data: searchSuggestion } = useSearchSuggesion(categoryValue?.label, {
    enabled: !!categoryValue?.label,
  });

  React.useEffect(() => {
    dispatch(authAction.getUserDetail(authData?.user_id));
  }, []);

  const token = useSelector(selectAccessToken);

  const { data: topdeal } = useGetDealOfDay();
  const { data: wishlist } = useGetWishlist(authData?.user_id, {
    enabled: !!token,
  });

  const dealOfday = topdeal?.Deals ?? [];
  const wishlistCount = wishlist?.data ?? [];
  const { cartItems } = useSelector((state: RootState) => state.carts);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const cartITem = useSelector(selectCartWithoutLogin);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchfieldOpen, setsearchfieldOpen] = React.useState(false);

  React.useEffect(() => {
    if (!token) {
      dispatch(cartActions.postCartWithoutLogin(cartItems));
    }
  }, [token, cartItems]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };
  const handlesearchfieldOpen = () => {
    setsearchfieldOpen(!searchfieldOpen);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const tokenA = useSelector(selectAccessToken);

  const handleSearch = () => {
    if (categoryValue.label) {
      router.push(`/listing?keyword=${categoryValue.label}`);
    }
  };
  const handleCategorySearch = (e, option) => {
    setCategoryValue(option);
    const selectedCategoryValue = option.slug_key || categoryValue;

    if (selectedCategoryValue) {
      router.push(`/listing/${selectedCategoryValue}?search=${option.label}`);
    }
  };
  const [sticky, setSticky] = useState("");

  React.useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 180 ? "is-sticky" : "";
    setSticky(stickyClass);
  };
  const classes = `  ${sticky}`;

  React.useEffect(() => {
    if (token && cartItems.length > 0 && authData.user_id) {
      const cartVal = cartItems.map((item) => {
        const val = {
          product_id: item.product_id ?? "",
          qty: item.qty ?? "",
          user_id: authData?.user_id ?? "",
        };

        dispatch(cartActions.addCart(val));
      });
      dispatch(clearCart());
    }
  }, [token, cartItems]);

  const itemQty =
    cartItems?.length &&
    cartItems?.map((item) => item.qty)?.reduce((a, b) => a + b);

  const userCartCount =
    cartITem?.length &&
    cartITem?.map((item) => item.qty)?.reduce((a, b) => a + b);

  React.useEffect(() => {
    dispatch(OtherCatActions.copounApplied(undefined));
  }, []);
  const handleWishlist = () => {
    router.push("/my-account/wishlist");
  };
  const handleCart = () => {
    router.push("/cart");
  };
  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#DDDDDD",
      },
      background: "white",
    },
  };
  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };
  const skeletonArray = new Array(7).fill(null);

  const SkeletonBlock = () => (
    <>
      <Skeleton width="40%" height={20} />
    </>
  );

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Typography
          p={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {" "}
          <Offcanvas.Title>
            {" "}
            <img onClick={handleClose} src="/static/media/backdrop.svg" />
            <Link href="/">
              <img
                style={{ marginLeft: 12 }}
                src={icons["img1"]}
                width={100}
                alt=""
                className="logo"
              />
            </Link>
          </Offcanvas.Title>
          {tokenA ? (
            <>
              <Typography sx={{ display: { md: "none" } }}>
                <IconButton sx={{ mt: { xs: 0.7, md: 0.4 } }} aria-label="cart">
                  <img
                    className="icon-image-profile"
                    onClick={() => router.push("/my-account")}
                    src={icons["img4"]}
                  />
                </IconButton>
              </Typography>
            </>
          ) : (
            <Typography mt={1}>
              <button onClick={handleOpen} className="login-sm">
                Register / Login
              </button>
            </Typography>
          )}
        </Typography>

        <SideBar />
      </Offcanvas>

      <Grid className="nav-234">
        <Grid
          className=" container2 "
          sx={{
            pt: { xs: 1.3, sm: "18px", md: "20px" },
            mb: { xs: 1.5, md: 0 },
          }}
        >
          <div
            style={{
              overflow: "hidden",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="d-flex "
          >
            <div className="d-flex">
              <Typography
                mt={1.5}
                sx={{ display: { xs: "normal", md: "none" } }}
              >
                <img
                  onClick={handleShow}
                  src="/static/media/menu.svg"
                  className="toggle-icon"
                />
              </Typography>

              <Typography sx={{ mr: { xs: 10, md: 0 } }}>
                {" "}
                <Link href="/">
                  <img src={icons["img7"]} alt="" className="logo" />
                </Link>
              </Typography>
            </div>

            <Grid
              container
              sx={{
                justifyContent: "flex-start",
                display: { xs: "none", sm: "flex" },
                mr: tokenA ? { sm: 1, md: 6 } : { sm: 0, md: 2.5 },
                ml: tokenA ? { sm: 0, md: 6 } : { sm: 0, md: 6 },
              }}
              sm={20.8}
              md={50}
            >
              <Stack spacing={2} sx={{ width: { sm: "95%", md: "65%" } }}>
                <Autocomplete
                  className="search-dropdown-link1"
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={categoryValue}
                  onChange={handleCategorySearch}
                  inputValue={categoryValue?.label}
                  onInputChange={(e, newInputValue, reason) => {
                    if (reason === "input") {
                      setCategoryValue({ label: newInputValue, slug_key: "" });
                    }
                  }}
                  onKeyDown={handleKeypress}
                  options={(searchSuggestion?.data || []).map((option) => ({
                    label: option.category_name,
                    slug_key: option.slug_key,
                  }))}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      style={{
                        fontFamily: "Jost",
                        color: "#222",
                        cursor: "pointer",
                      }}
                    >
                      {option.label}
                    </li>
                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: "200px",
                      overflowY: "auto",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      value={params?.inputProps?.value}
                      fullWidth
                      sx={{
                        borderRadius: "90px",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#DDDDDD",
                          },
                        },
                      }}
                      onKeyPress={handleKeypress}
                      type="text"
                      placeholder="Search your product..."
                      InputProps={{
                        style: { borderRadius: "50px" },
                        ...params.InputProps,

                        startAdornment: (
                          <InputAdornment>
                            <IconButton
                              size="small"
                              sx={{ alignSelf: "center" }}
                            >
                              <button
                                onClick={handleSearch}
                                style={{
                                  border: 0,
                                  background: "transparent",
                                }}
                                disabled={!categoryValue?.label}
                                type="submit"
                              >
                                <img
                                  src={"/static/icon/search.svg"}
                                  style={{ marginTop: -2 }}
                                />
                              </button>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid
              sx={{
                display: "flex",

                pr: { xs: 0.2, md: 0 },
                mt: { sm: 0, md: -0.7 },
              }}
            >
              {/* <IconButton
                sx={{
                  display: { xs: "none", md: "inline" },

                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                <img
                  onClick={() => router.push("/stores")}
                  style={{ marginTop: 0 }}
                  src={"/static/images/storefront-outline.svg"}
                />
              </IconButton> */}
              {/* <Typography
                className="inter"
                sx={{
                  mt: 2.9,
                  fontSize: 11,
                  fontWeight: "500",
                  display: { xs: "none", md: "inline" },
                }}
                component="span"
              >
                <Link
                  style={{
                    color: "#f15a21",
                    cursor: "pointer",
                  }}
                  href="/stores"
                >
                  Stores
                </Link>
              </Typography> */}

              {tokenA ? (
                <TopMenu />
              ) : (
                <IconButton
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    mt: { sm: -0.5, md: 0 },
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                >
                  <img
                    style={{
                      marginLeft: 17,

                      cursor: "pointer",
                    }}
                    src={icons["img4"]}
                    onClick={handleOpen}
                  />
                </IconButton>
              )}
              <Typography
                sx={{
                  mt: 2.3,
                  fontSize: 14,

                  display: { xs: "none", md: "inline" },
                }}
                component="span"
              >
                {tokenA ? (
                  <></>
                ) : (
                  <span
                    className="inter"
                    onClick={handleOpen}
                    style={{
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: "500",
                      color: "#767676",
                    }}
                  >
                    Login
                  </span>
                )}
              </Typography>
              <Typography sx={{ display: { xs: "none", md: "none" } }}>
                <IconButton sx={{ mt: { xs: 0.7, md: 0.4 } }} aria-label="cart">
                  <img
                    onClick={() => router.push("/my-account")}
                    src={icons["img4"]}
                    style={{ marginLeft: 5 }}
                  />
                </IconButton>
              </Typography>
              <Grid
                sx={{
                  display: { sm: "none", md: "none" },
                  mr: { xs: -2 },
                  ml: { xs: -10.2 },
                }}
              >
                <Button
                  style={{
                    background: "transparent",
                    border: 0,
                    marginTop: 5,
                  }}
                  onClick={handlesearchfieldOpen}
                >
                  <img src={"/static/images/searchIcon.svg"} />
                </Button>
              </Grid>

              <IconButton
                onClick={tokenA ? handleWishlist : handleOpen}
                sx={{
                  ml: tokenA ? 0 : { xs: 0, md: 0 },
                  mt: { xs: 0, md: 1 },
                  "&:hover": {
                    background: "transparent",
                  },
                }}
                aria-label="cart"
              >
                <Badge
                  badgeContent={token ? wishlistCount?.length ?? 0 : 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "#fff",
                      backgroundColor: "#f15a21",
                      height: 17,
                      p: 0.1,
                      fontFamily: "Jost",
                      fontSize: 11,
                      borderRadius: 0.5,
                    },
                  }}
                  color="success"
                >
                  <img
                    src={"/static/icon/HeartNew.svg"}
                    style={{ marginLeft: 16, cursor: "pointer" }}
                  />
                </Badge>
              </IconButton>

              <IconButton
                sx={{
                  mt: { xs: 0, md: 0.5 },
                  mr: { md: 2, lg: 0.3 },
                  "&:hover": {
                    background: "transparent",
                  },
                }}
                onClick={handleCart}
                aria-label="cart"
              >
                {/* Burhan code Here */}
                <Badge
                  sx={{
                    "& .MuiBadge-badge": {
                      height: 17,
                      p: 0.1,
                      fontFamily: "Jost",
                      fontSize: 11,
                      color: "#fff",
                      backgroundColor: "#e75f30",
                      borderRadius: 0.5,
                    },
                  }}
                  badgeContent={token ? userCartCount : itemQty}
                  color="success"
                >
                  <img
                    src={"/static/icon/BuyNew.svg"}
                    style={{ marginLeft: 11, cursor: "pointer" }}
                  />
                </Badge>
              </IconButton>
            </Grid>
          </div>

          {searchfieldOpen ? (
            <Stack
              spacing={2}
              sx={{ width: { sm: "95%", md: "62%" }, mt: 1.5, display: "flex" }}
            >
              <Autocomplete
                className="search-dropdown-link1"
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                value={categoryValue}
                onChange={handleCategorySearch}
                inputValue={categoryValue?.label}
                onInputChange={(e, newInputValue, reason) => {
                  if (reason === "input") {
                    setCategoryValue({ label: newInputValue, slug_key: "" });
                  }
                }}
                onKeyDown={handleKeypress}
                options={(searchSuggestion?.data || []).map((option) => ({
                  label: option.category_name,
                  slug_key: option.slug_key,
                }))}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      fontFamily: "Jost",
                      color: "#222",
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </li>
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "200px",
                    overflowY: "auto",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    value={params?.inputProps?.value}
                    fullWidth
                    sx={style}
                    onKeyPress={handleKeypress}
                    type="text"
                    placeholder="Search your product..."
                    InputProps={{
                      style: { borderRadius: "50px" },
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment>
                          <IconButton size="small" sx={{ alignSelf: "center" }}>
                            <button
                              onClick={handleSearch}
                              style={{ border: 0, background: "transparent" }}
                              disabled={!categoryValue?.label}
                              type="submit"
                            >
                              <img src={"/static/icon/search.svg"} />
                            </button>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          ) : (
            ""
          )}

          <div className={classes}>
            <div className="container2">
              {isLoading ? (
                <div style={{}} className="row">
                  {skeletonArray.map((_, index) => (
                    <div
                      className="col hide-phn nav-hide"
                      style={{ marginLeft: -23, padding: 12 }}
                    >
                      <SkeletonBlock key={index} />
                    </div>
                  ))}
                </div>
              ) : (
                <nav
                  className=" nav-hide"
                  style={{ marginLeft: -12, background: "white" }}
                >
                  {/* Burhan code Here */}
                  <ul className="ul-reset ">
                    {getCetegory?.length > 0 &&
                      getCetegory?.map((item) => {
                        return (
                          <li className="droppable">
                            {path == `/${item.category_name}` ? (
                              <Link
                                style={{
                                  color: "#f15a21",
                                  borderBottom: "3px solid #f15a21",
                                  textTransform: "uppercase",
                                }}
                                href="/"
                              >
                                {item.category_name}
                              </Link>
                            ) : (
                              <Link
                                href={`/${item.category_name}`}
                                style={{ textTransform: "uppercase" }}
                              >
                                {item.category_name}{" "}
                              </Link>
                            )}

                            <div className="mega-menu ">
                              <div className="cf row">
                                {item?.child_categories?.length > 0 &&
                                  item?.child_categories.map((temp, index) => {
                                    const isLast =
                                      index ===
                                      item.child_categories.length - 1;
                                    return (
                                      <>
                                        <ul
                                          className={`ul-reset col ${
                                            isLast ? "" : "border-hover-right"
                                          }`}
                                        >
                                          <Link
                                            // as={`/${item.category_name}/${temp?.child_categories[0]?.slug_key}`}
                                            // href={`/${item.category_name}/${temp?.child_categories[0]?.slug_key}?cat_id=${temp?.child_categories[0]?.category_id}`}
                                            as={`/${item.category_name}/${temp?.slug_key}`}
                                            href={`/${item.category_name}/${temp?.slug_key}?cat_id=${temp?.category_id}`}
                                          >
                                            <h3> {temp.category_name}</h3>
                                          </Link>
                                          {temp?.child_categories?.length > 0 &&
                                            temp?.child_categories?.map(
                                              (val) => {
                                                return (
                                                  <>
                                                    <li key={val.category_id}>
                                                      <Link
                                                        as={`/${item.category_name}/${temp?.slug_key}/${val.slug_key}`}
                                                        href={`/${item.category_name}/${temp?.slug_key}/${val.slug_key}?cat_id=${val.category_id}`}
                                                      >
                                                        {val.category_name}
                                                      </Link>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            )}
                                        </ul>
                                      </>
                                    );
                                  })}

                                <ul className="ul-reset img-none-header col">
                                  <img
                                    className="img-none-dropdown"
                                    src={item?.image}
                                    width={266}
                                    title={item.image_title}
                                    alt={item.image_alt_tag}
                                  />
                                </ul>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    <li className="droppable">
                      {path == "/topdeals" ? (
                        <Link
                          style={{
                            color: "#f15a21",
                            borderBottom: "3px solid #f15a21",
                          }}
                          href="/"
                        >
                          TOP DEALS
                        </Link>
                      ) : (
                        <Link href="/topdeals">TOP DEALS</Link>
                      )}

                      <div className="mega-menu2">
                        <div className=" cf row">
                          <ul className="ul-reset col ">
                            <Link
                              as={`/${dealOfday[0]?.slug_key}`}
                              href={`/${dealOfday[0]?.slug_key}?cat_id=${dealOfday[0]?.category_id}`}
                            >
                              <h3>Top Deals</h3>
                            </Link>

                            {dealOfday?.length > 0 &&
                              dealOfday?.map((item: any) => (
                                <li key={item.category_id}>
                                  <Link
                                    as={`/${item.slug_key}`}
                                    href={`/${item.slug_key}?cat_id=${item.category_id}`}
                                  >
                                    {item.product_name}
                                  </Link>
                                </li>
                              ))}
                          </ul>

                          <ul className="ul-reset img-none-header2 col">
                            <li style={{ textAlign: "right" }}>
                              {" "}
                              <img
                                className="img-none-dropdown2 img-width-for"
                                src={dealOfday[0]?.base_image}
                                width={266}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </Grid>
      </Grid>

      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />

      <Script src="https://connect.facebook.net/en_US/sdk.js" />
      <Divider sx={{ borderWidth: 1 }} />
    </>
  );
}
export default Header;
