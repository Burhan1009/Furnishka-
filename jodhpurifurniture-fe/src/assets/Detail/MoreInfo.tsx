import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {
  selectProductDetail,
  selectProductFetchSuccess,
  selectProductLoading,
} from "@/service/detail";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import BasicExample from "./Faq";
import Grid from "@mui/material/Grid";
import { phoneNum } from "@/common/validations/constants";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 1, textAlign: "left" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const MoreInfo = () => {
  const [value, setValue] = React.useState(0);
  const productData = useSelector(selectProductDetail);

  const isLoading = useSelector(selectProductLoading);
  const successFetch = useSelector(selectProductFetchSuccess);

  const router = useRouter();
  const { index } = router.query;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const style = {
    borderColor: "#aeaeae",
  };

  return (
    <>
      {isLoading ? (
        <div className="container2">
          <section className="section-4" style={{ marginBottom: 80 }}>
            <Skeleton
              style={{
                height: 40,

                marginBottom: "0.5%",
                width: "20%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "1%",
                width: "23%",
              }}
            />
            <Skeleton
              style={{
                height: 60,

                marginBottom: "0.5%",
                width: "100%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "0.5%",
                width: "45%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "0.5%",
                width: "45%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "0.5%",
                width: "45%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "0.5%",
                width: "45%",
              }}
            />
          </section>
        </div>
      ) : (
        <>
          {successFetch ? (
            <div className="container2">
              <section
                className="section-4"
                style={{
                  marginBottom: 80,
                  marginTop: "30px",
                  border: "15px solid #f4f9fc",
                  borderTop: "none",
                }}
              >
                <div style={{}}>
                  <div>
                    {/* <hr style={style} /> */}
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginTop: "30px" }}
                    >
                      <div>
                        {/* <Typography
                        sx={{
                          textAlign: "left",
                          fontFamily: "Jost",
                          fontSize: { xs: 20, sm: 23, md: 22, lg: 24 },
                          fontWeight: "500",
                          color: "#222",
                        }}
                      >
                        More Information
                      </Typography> */}
                        {/* <Typography
                        sx={{
                          textAlign: "left",
                          textTransform: "capitalize",
                          fontFamily: "Jost",
                          fontSize: { xs: 15, sm: 15, md: 15 },
                          fontWeight: "400",
                          color: "#222",
                          mb: { xs: 2.8, sm: 3.2, md: 3.2, lg: 3.3 },
                        }}
                      >
                        {index?.replace(/-/g, " ") ?? ""}{" "}
                      </Typography> */}
                      </div>
                    </div>

                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          variant="scrollable"
                          scrollButtons={false}
                          sx={{
                            background: "#f4f9fc",
                            "& .MuiTabs-indicator": {
                              backgroundColor: "#f15a21",
                            },
                            "& .css-heg063-MuiTabs-flexContainer": {
                              justifyContent: "center",
                            },
                            "& .MuiTab-root.Mui-selected": {
                              color: "#f15a21",
                            },
                          }}
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md: 15 },
                              color: "#222222",
                            }}
                            label="Overview"
                            {...a11yProps(0)}
                          />
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md: 15 },
                              color: "#222222",
                            }}
                            label="Description"
                            {...a11yProps(1)}
                          />
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md: 15 },
                              color: "#222222",
                            }}
                            label="FAQ’S"
                            {...a11yProps(2)}
                          />
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md: 15 },
                              color: "#222222",
                            }}
                            label="T&C"
                            {...a11yProps(3)}
                          />
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md: 15 },
                              color: "#222222",
                            }}
                            label="Care & Instructions"
                            {...a11yProps(4)}
                          />
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md: 15 },
                              color: "#222222",
                            }}
                            label="QA & Warranty"
                            {...a11yProps(5)}
                          />
                          <Tab
                            sx={{
                              fontWeight: "400",
                              textTransform: "capitalize",
                              fontSize: { xs: 15, sm: 14, md20: 15 },
                              color: "#222222",
                            }}
                            label="Delivery"
                            {...a11yProps(6)}
                          />
                        </Tabs>
                      </Box>
                    </Box>
                  </div>
                  <Box
                    sx={{
                      // mt: { xs: 0, md: -9, xl: -18 },
                      pl: 2.5,
                      pr: 2.5,
                      pb: 2.5,
                    }}
                  >
                    <TabPanel value={value} index={0}>
                      <Typography
                        sx={{
                          color: "#767676",
                          fontFamily: "Jost",
                          mt: { xs: 3, sm: 3.5 },
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        align="left"
                        dangerouslySetInnerHTML={{
                          __html: productData?.description
                            ? productData?.description
                            : productData?.product_name,
                        }}
                      ></Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Grid
                        sx={{
                          mt: { xs: 3, sm: 3.5 },
                          display: "flex",
                          gap: { xs: 2, sm: 5, md: 10 },
                          flexWrap: "wrap",
                        }}
                      >
                        <Grid sx={{ mb: { xs: -2, sm: -5, md: 0 } }}>
                          {productData?.sku && (
                            <Grid sx={{ display: "flex", mb: 1.5 }}>
                              <>
                                {" "}
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, sm: 14, md: 15 },
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#222",
                                  }}
                                >
                                  SKU
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, sm: 14, md: 15 },
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#222",
                                    ml: { xs: 15.4, sm: 15.8, md: 16 },
                                  }}
                                >
                                  {productData?.sku}
                                </Typography>
                              </>
                            </Grid>
                          )}
                          {productData?.est_delivery && (
                            <Grid sx={{ display: "flex", mb: 1.5 }}>
                              <>
                                {" "}
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, sm: 14, md: 15 },
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#222",
                                  }}
                                >
                                  Ships In
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, sm: 14, md: 15 },
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#222",
                                    ml: { xs: 12.6, sm: 12.8, md: 12.8 },
                                  }}
                                >
                                  {productData?.est_delivery} Days
                                </Typography>
                              </>
                            </Grid>
                          )}

                          {productData?.category_name && (
                            <Grid sx={{ display: "flex", mb: 1.5 }}>
                              <>
                                {" "}
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, sm: 14, md: 15 },
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#222",
                                  }}
                                >
                                  Category
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, sm: 14, md: 15 },
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#222",

                                    ml: { xs: 11.8, sm: 11.9 },
                                  }}
                                >
                                  {productData?.category_name}
                                </Typography>
                              </>
                            </Grid>
                          )}

                          {productData?.dimension_value?.length && (
                            <>
                              <Grid sx={{}}>
                                {productData?.dimension_value?.length &&
                                  productData?.dimension_value?.map((item) => {
                                    return (
                                      <Box
                                        sx={{
                                          display: "flex",
                                        }}
                                      >
                                        <Typography
                                          // className="d-space"
                                          sx={{
                                            width: { sm: 138, md: 129 },
                                            fontSize: {
                                              xs: 14,
                                              sm: 14,
                                            },
                                            fontWeight: 500,
                                            fontFamily: "Jost",
                                            color: "#222",
                                            mb: 0.8,
                                          }}
                                        >
                                          {item.labels}
                                        </Typography>

                                        <Grid
                                          className="m-l-d"
                                          sx={{
                                            ml: {
                                              xs: 4,
                                              sm: 1.8,
                                              md: 3.3,
                                            },
                                            mb: 0.8,
                                            flex: "wrap",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: {
                                                xs: 14,
                                                sm: 14,
                                              },
                                              fontWeight: 500,
                                              fontFamily: "Jost",
                                              color: "#222",
                                            }}
                                          >
                                            {item.lengths} L x {item.widths} W x{" "}
                                            {item.heights} H
                                          </Typography>
                                        </Grid>
                                      </Box>
                                    );
                                  })}
                              </Grid>
                            </>
                          )}
                        </Grid>

                        <Grid>
                          {productData?.product_description?.length && (
                            <>
                              <Grid sx={{}}>
                                {productData?.product_description?.length &&
                                  productData?.product_description?.map(
                                    (item) => {
                                      return (
                                        <Box
                                          sx={{
                                            maxWidth: { xs: 295, sm: 322 },
                                          }}
                                        >
                                          <Grid
                                            container
                                            rowSpacing={1}
                                            columnSpacing={{
                                              xs: 1,
                                              sm: 2,
                                              md: 3,
                                            }}
                                          >
                                            <Grid item xs={6}>
                                              <Typography
                                                sx={{
                                                  fontSize: {
                                                    xs: 13,
                                                    sm: 14,
                                                    md: 15,
                                                  },
                                                  fontWeight: 500,
                                                  fontFamily: "Jost",
                                                  color: "#222",
                                                  mb: 0.8,
                                                }}
                                              >
                                                {item.label}
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              sx={{
                                                mt: 0.8,
                                                ml: {
                                                  xs: 0.5,
                                                  sm: 0.2,
                                                  md: 2.4,
                                                },
                                                mb: 0.8,
                                                flex: "wrap",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  fontSize: {
                                                    xs: 13,
                                                    sm: 14,
                                                    md: 15,
                                                  },
                                                  fontWeight: 500,
                                                  fontFamily: "Jost",
                                                  color: "#222",
                                                }}
                                              >
                                                {item.info}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      );
                                    }
                                  )}
                              </Grid>
                            </>
                          )}
                          <Grid sx={{ display: "flex", mb: 1.5 }}>
                            <>
                              {" "}
                              <Typography
                                sx={{
                                  fontSize: { xs: 13, sm: 14, md: 15 },
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#222",
                                }}
                              >
                                Caring Instruction
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: { xs: 13, sm: 14, md: 15 },
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#222",
                                  ml: { xs: 5.6, sm: 5.1, md: 5.9 },
                                }}
                              >
                                Professional cleaning only
                              </Typography>
                            </>
                          </Grid>
                          <Grid sx={{ display: "flex", mb: 1.5 }}>
                            <>
                              {" "}
                              <Typography
                                sx={{
                                  fontSize: { xs: 13, sm: 14, md: 15 },
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#222",
                                }}
                              >
                                Delivery Condition
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: { xs: 13, sm: 14, md: 15 },
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#222",
                                  ml: { xs: 4.8, sm: 4.5, md: 5.3 },
                                }}
                              >
                                Knocked-down
                              </Typography>
                            </>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <BasicExample />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          mt: 3,
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                      >
                        For any questions or clarifications related to the
                        product, feel free to contact our Customer Support on
                        {phoneNum}.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Accessories shown in the photograph are meant for
                        representation purposes only and are not part of the
                        actual product.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Please ensure you have checked the dimensions before
                        placing an order.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                        fontWeight="bold"
                      >
                        Damages: Our delivery arrangements to your home have
                        been planned to ensure a zero-damage and unperturbed
                        experience. Please contact us immediately if:
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        The product has any breakage that might have occurred in
                        shipment, warranting your item to be fixed.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Any missing parts of the product should be immediately
                        notified to the Support team, so that it can be
                        delivered at the earliest.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Your item arrives in a damaged state. All claims of
                        damage must be made within 24 hours from delivery.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Cancellations: Once the order is placed, no form of
                        cancellation will be entertained.
                      </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                          mt: 3,
                        }}
                        mt={0.8}
                      >
                        Any dirt should be wiped away with a dry cloth
                        immediately.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Avoid keeping very hot or very cold materials on the
                        wood directly, always use mats.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Ensure chemicals are kept away as it may harm the
                        natural finish and durability of the product.
                      </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                          mt: 3,
                        }}
                        mt={0.8}
                      >
                        The product includes a 12 month warranty against any
                        manufacturing defects and issues with the materials that
                        have been used.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        Any product which is misused, neglected, improperly set
                        up or otherwise damaged shall not be covered under the
                        warranty.
                      </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                          mt: 3,
                        }}
                        mt={0.8}
                      >
                        Note: Customers residing in Jammu and Kashmir, Assam,
                        Kerala, etc would need to submit a scanned copy of their
                        ID Proof and special forms in order to pass the
                        product/s at the respective state border.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
                        mt={0.8}
                      >
                        All the local delivery taxes like Special State Taxes,
                        Army Cantonment Areas, Octroi, etc needs to be paid by
                        the customer additionally at the time of delivery.
                      </Typography>
                    </TabPanel>
                  </Box>
                </div>
              </section>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default MoreInfo;
