import {
  selectAccessToken,
  selectAuth,
  selectUserDetail,
} from "@/service/auth/globalstate";
import { authAction } from "@/service/auth/states";
import { clearCart } from "@/service/cart/cart";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

export type TMenuItem = {
  title: string;
  pathname?: string;
  subMenus?: TMenuItem[];
};

export const MENU_ITEMS: TMenuItem[] = [
  {
    title: "about",
    pathname: "/about",
    subMenus: [
      {
        title: "a",
        pathname: "/about/a",
      },
      {
        title: "b",
        pathname: "/about/b",
      },
    ],
  },
];

const DropdownMenuItem = ({
  menuItem,
  menuShowingDropdown,
  setMenuShowingDropdown,
}: {
  menuItem: TMenuItem;
  menuShowingDropdown: string;
  setMenuShowingDropdown: (menuTitle: string) => void;
}) => {
  const tokenA = useSelector(selectAccessToken);

  const { title, subMenus } = menuItem;
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const userDetail = useSelector(selectUserDetail);

  const router = useRouter();

  React.useEffect(() => {
    dispatch(authAction.getUserDetail(authData?.user_id));
  }, []);

  const handleLogout = () => {
    dispatch(authAction.logOut());
    dispatch(clearCart());
    queryClient.invalidateQueries("user-cart");
    router.push("/");
  };
  const showSubMenu = useCallback(() => {
    setMenuShowingDropdown(menuItem.title);
  }, [menuItem.title, setMenuShowingDropdown]);

  const closeSubMenu = useCallback(() => {
    setMenuShowingDropdown("");
  }, [setMenuShowingDropdown]);

  const subMenusNodes = subMenus?.map((subMenuItem) => {
    return (
      <MenuItem onClick={() => {}} key={subMenuItem.title}>
        {subMenuItem.title}
      </MenuItem>
    );
  });

  const theme = useTheme();

  return (
    <>
      <IconButton
        id={`menuItem-${title}`}
        sx={{
          zIndex: theme.zIndex.modal + 1,
          display: { xs: "none", sm: "inline" },
          mt: { sm: -0.5, md: 0 },
          "&:hover": {
            background: "transparent",
          },
        }}
        ref={buttonRef}
        onClick={() => {
          if (!menuItem.subMenus) {
          }
        }}
        onMouseLeave={() => {
          setMenuShowingDropdown("");
        }}
        onMouseEnter={() => {
          if (menuItem.subMenus && tokenA) {
            showSubMenu();
            return;
          }
        }}
      >
        <img
          style={{
            marginLeft: 17,

            cursor: "pointer",
          }}
          src={"/static/icon/Profile.svg"}
        />
      </IconButton>
      <Menu
        PaperProps={{
          onMouseEnter: () => {
            showSubMenu();
          },
          onMouseLeave: () => {
            closeSubMenu();
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={buttonRef.current}
        open={menuShowingDropdown === menuItem.title}
        onClose={closeSubMenu}
      >
        {/* {subMenusNodes} */}
        <Box sx={{ p: 2, minWidth: 280 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* <Avatar sx={{ width: 50, height: 50 }} /> */}
            <Grid sx={{ ml: 1.5 }}>
              <Typography
                sx={{ textTransform: "capitalize", fontFamily: "Jost" }}
                fontWeight={550}
              >
                {userDetail?.full_name ?? ""}
              </Typography>
              <Typography
                sx={{ fontFamily: "Jost" }}
                color="#767676"
                component="body"
              >
                {authData?.email ?? ""}
              </Typography>
            </Grid>
          </Box>
          <List sx={{ ml: -1 }}>
            <ListItem>
              <Link href={"/my-account/account/edit/" + authData.user_id}>
                <div style={{ display: "flex", gap: 15, fontFamily: "Jost" }}>
                  <img src={"/static/images/userDialog.svg"} />
                  <a className="link-hover">My Account </a>
                </div>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/my-account/myorders">
                <div style={{ display: "flex", gap: 15, fontFamily: "Jost" }}>
                  <img src={"/static/images/shopping-bag.svg"} />
                  <a className="link-hover">My Orders</a>
                </div>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/my-account/wishlist">
                <div style={{ display: "flex", gap: 15, fontFamily: "Jost" }}>
                  <img src={"/static/images/heart1.svg"} />
                  <a style={{ marginLeft: 0 }} className="link-hover">
                    My Wishlist
                  </a>
                </div>
              </Link>
            </ListItem>

            <ListItem>
              <Typography
                sx={{ cursor: "pointer", ml: 0.2 }}
                onClick={handleLogout}
              >
                <div style={{ display: "flex", gap: 15, fontFamily: "Jost" }}>
                  <img src={"/static/images/log-out.svg"} />
                  <a className="link-hover">Logout</a>
                </div>
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Menu>
    </>
  );
};

export const TopMenu = () => {
  const [menuShowingDropdown, setMenuShowingDropdown] = useState("");

  const handleMenuShowingDropdownChange = useCallback((menuTitle: string) => {
    setMenuShowingDropdown(menuTitle);
  }, []);

  const menuItems = MENU_ITEMS.map((menuItem) => {
    return (
      <DropdownMenuItem
        key={menuItem.title}
        menuItem={menuItem}
        menuShowingDropdown={menuShowingDropdown}
        setMenuShowingDropdown={handleMenuShowingDropdownChange}
      />
    );
  });

  return <>{menuItems}</>;
};
