import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import { useRouter } from "next/router";
import Accordion from "react-bootstrap/Accordion";
import { useGetAllCategory } from "@/service/home";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "@/service/auth/states";
import { clearCart } from "@/service/cart/cart";
import { useQueryClient } from "react-query";
import { selectAccessToken } from "@/service/auth/globalstate";

function SidebarContent() {
  const { data: finalgetCetegory } = useGetAllCategory();
  const getCetegory = finalgetCetegory?.data ?? [];

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const tokenA = useSelector(selectAccessToken);
  const handleLogout = () => {
    dispatch(authAction.logOut());
    dispatch(clearCart());

    queryClient.invalidateQueries("user-cart");
    router.push("/");
  };

  return (
    <>
      <Box sx={{ overflowX: "hidden", overflowY: "scroll" }}>
        <Accordion
          flush
          className="accordian-faq "
          style={{ background: "#f4f9fc" }}
        >
          <List
            sx={{
              width: "100%",
              p: 0,
              ml: 0,
              maxWidth: 360,
              bgcolor: "#f4f9fc",
            }}
            component="nav"
          >
            {getCetegory?.length > 0 &&
              getCetegory?.map((item, index) => {
                return (
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header className="sidebarCntent">
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: "18px",
                          fontFamily: "Jost",
                          textTransform: "capitalize",
                        }}
                        primary={item.category_name}
                      />
                    </Accordion.Header>
                    {item?.child_categories?.length > 0 &&
                      item?.child_categories.map((temp) => {
                        return (
                          <Accordion.Body className="sidebarCntent-body">
                            <List component="div" disablePadding>
                              <Link
                                as={`/${item.category_name}/${temp?.slug_key}`}
                                href={`/${item.category_name}/${temp?.slug_key}?cat_id=${temp?.category_id}`}
                              >
                                <Typography
                                  sx={{
                                    color: "black",
                                    fontFamily: "Jost",
                                    pl: 4,
                                    mt: -1,
                                    mb: 1,
                                  }}
                                >
                                  {" "}
                                  {temp.category_name}{" "}
                                </Typography>
                              </Link>

                              {temp?.child_categories?.length > 0 &&
                                temp?.child_categories?.map((val) => {
                                  return (
                                    <>
                                      <ListItem
                                        sx={{
                                          pl: 6,
                                          mt: -1.5,
                                          mb: -1,
                                        }}
                                      >
                                        <ListItemButton
                                          style={{
                                            width: "100%",
                                            paddingBottom: 0,
                                            padding: 1,
                                          }}
                                        >
                                          <Link
                                            as={`/${item.category_name}/${temp?.slug_key}/${val.slug_key}`}
                                            href={`/${item.category_name}/${temp?.slug_key}/${val.slug_key}?cat_id=${val.category_id}`}
                                            key={item.category_id}
                                            style={{ width: "100%" }}
                                          >
                                            <ListItemText
                                              primaryTypographyProps={{
                                                fontSize: "14px",
                                                fontFamily: "Jost",
                                                color: "black",
                                              }}
                                              primary={val.category_name}
                                            />
                                          </Link>
                                        </ListItemButton>
                                      </ListItem>
                                    </>
                                  );
                                })}
                            </List>
                          </Accordion.Body>
                        );
                      })}
                  </Accordion.Item>
                );
              })}
          </List>
        </Accordion>
        <Box sx={{ background: "#F5F5F5", mb: -1 }}>
          <List sx={{ p: 2 }} className="canvas-box">
            <ListItemText>
              <Link href="/about">About Us</Link>
            </ListItemText>
            <ListItemText>
              <Link href="/custom-furniture">Custom Furniture</Link>
            </ListItemText>
            <ListItemText>
              <Link href="/coupon-partner">Coupon Patners</Link>
            </ListItemText>

            <ListItemText>
              <Link href="/terms-of-use">Terms Of Use</Link>
            </ListItemText>
            {tokenA ? (
              <button onClick={handleLogout} className="offcanvar-btn-logout">
                Log Out
              </button>
            ) : (
              <button onClick={handleLogout} style={{ display: "none" }}>
                Log Out
              </button>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
}
export default SidebarContent;
