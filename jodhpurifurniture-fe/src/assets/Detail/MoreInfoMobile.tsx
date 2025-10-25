import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
  selectProductDetail,
  selectProductFetchSuccess,
  selectProductLoading,
} from "@/service/detail";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import BasicExample from "./Faq";
import Grid from "@mui/material/Grid";
import { Accordion } from "react-bootstrap";
import { phoneNum } from "@/common/validations/constants";

const MoreInfoMobile = () => {
  const productData = useSelector(selectProductDetail);
  const isLoading = useSelector(selectProductLoading);
  const successFetch = useSelector(selectProductFetchSuccess);
  const router = useRouter();
  const { index } = router.query;

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {successFetch ? (
            <div className="container2">
              <section
                className="section-4"
                style={{ marginBottom: 41, marginTop: -8 }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontFamily: "Jost",
                          fontSize: { xs: 20, sm: 23, md: 22, lg: 24 },
                          fontWeight: "500",
                          color: "#222",
                        }}
                      >
                        More Information
                      </Typography>
                      <Typography
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
                      </Typography>
                    </div>
                  </div>
                </div>
                <Accordion
                  defaultActiveKey="0"
                  flush
                  className="accordian-faq accordian-p-l"
                >
                  <Accordion.Item
                    eventKey="0"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header style={{ fontFamily: "Jost" }}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        Overview
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#767676",
                          fontFamily: "Jost",

                          fontSize: 15,
                        }}
                        align="left"
                        dangerouslySetInnerHTML={{
                          __html: productData?.description
                            ? productData?.description
                            : productData?.product_name,
                        }}
                      ></Typography>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="1"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        Description
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
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
                                      className="d-space2"
                                      sx={{
                                        // width:{xs:132,md:129},
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
                                      // className="m-l-d"
                                      sx={{
                                        ml: {
                                          xs: 2,
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

                      {productData?.product_description?.length && (
                        <>
                          <Grid sx={{}}>
                            {productData?.product_description?.length &&
                              productData?.product_description?.map((item) => {
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
                              })}
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
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="2"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        FAQ’S
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      className="b-y-t"
                      style={{
                        paddingTop: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
                      <BasicExample />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="3"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        T&C
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",

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
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="4"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        Care & Instructions
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
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
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="5"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        QA & Warranty
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
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
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="6"
                    className=" h-y-t "
                    style={{ marginBottom: 10 }}
                  >
                    <Accordion.Header>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: "Jost",
                        }}
                      >
                        Delivery
                      </Typography>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "#f4f9fc",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Jost",
                          color: "#767676",
                          fontSize: { xs: 15, sm: 14, md: 15 },
                        }}
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
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
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

export default MoreInfoMobile;
