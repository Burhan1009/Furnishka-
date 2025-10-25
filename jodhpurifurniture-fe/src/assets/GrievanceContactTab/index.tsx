import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import FeedBackForm from "@/components/FeedBackForm";
import CallIcon from "@mui/icons-material/Call";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Typography from "@mui/material/Typography";

import Tab from "@mui/material/Tab";
import SupportForm from "./SupportForm";
import { Divider, Grid } from "@mui/material";
import Link from "next/link";
import IssueResolved from "./IssueNot";
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, mt: { xs: 10, md: 6 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
    min-width: 400px;
    background-color: ${"#f15a21"};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    
    `
);

const GrievanceContactTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container2">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          overflow: "hidden",
          display: "flex",
          // height: {xs:'auto',lg:900},
          flexWrap: "wrap",
          mb: 15,
          mt: 7,
          border: "1px solid #e1e1e1",
        }}
      >
        <div className="col-12 col-sm-12 col-md-4">
          <Tabs
            className="border-tabs-color"
            orientation="vertical"
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 2,
              background: "#fff",
              fontSize: 25,
              "& .MuiTabs-indicator": {
                backgroundColor: "#f15a21",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#fff",
                background: "#f15a21",
              },
            }}
          >
            <Tab
              sx={{ minHeight: "100px", height: "100px" }}
              label={
                <Grid>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                      fontFamily: "Jost",
                      fontWeight: 500,
                    }}
                  >
                    Support
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 13, sm: 14, md: 15, lg: 16 },
                      textTransform: "capitalize",
                      fontFamily: "Jost",
                      fontWeight: 400,
                    }}
                  >
                    Get in touch for your order-related queries
                  </Typography>
                </Grid>
              }
              {...a11yProps(0)}
            />
            <Divider sx={{ border: "2px solid #e1e1e1" }} />
            <Tab
              sx={{ minHeight: "100px", height: "100px" }}
              label={
                <Grid>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                      fontFamily: "Jost",
                      fontWeight: 500,
                    }}
                  >
                    feedback
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 13, sm: 14, md: 15, lg: 16 },
                      fontFamily: "Jost",
                      textTransform: "capitalize",
                      fontWeight: 400,
                    }}
                  >
                    Let us know what you think of our products{" "}
                  </Typography>
                </Grid>
              }
              {...a11yProps(1)}
            />
            <Divider sx={{ border: "2px solid #e1e1e1" }} />
            <Tab
              sx={{
                minHeight: { xs: "100px", sm: "120px", lg: "100px" },
                height: "100px",
              }}
              label={
                <Grid>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                      fontFamily: "Jost",
                      fontWeight: 500,
                    }}
                  >
                    Issue Not Resolved ?
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 13, sm: 14, md: 15, lg: 16 },
                      fontFamily: "Jost",
                      textTransform: "capitalize",
                      fontWeight: 400,
                    }}
                  >
                    Escalate your unresolved issues for our immediate attention{" "}
                  </Typography>
                </Grid>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </div>

        <div className="col-xs-12 col-md-8 col-sm-12">
          <TabPanel value={value} index={0}>
            <SupportForm />
            <Grid
              sx={{
                border: "1px solid #E5E5E5",
                padding: 2,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
              }}
            ></Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                justifyContent: {
                  sm: "space-evenly",
                  md: "space-evenly",
                  lg: "space-evenly",
                },
                // flexWrap: 'wrap',
              }}
            >
              <Grid sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    ml: 2,
                    mb: 1,
                    fontFamily: "Jost",
                    fontSize: { xs: 16, sm: 15.7, md: 18 },
                    fontWeight: "600",
                  }}
                >
                  Customer Services
                </Typography>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    href="/terms-of-use"
                    className="link-hover23 font-support font-support "
                    style={{ fontFamily: "Jost" }}
                  >
                    Terms Of Use
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/security-privacy"
                    style={{ fontFamily: "Jost" }}
                  >
                    Security & Privacy
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/return-refund"
                    style={{ fontFamily: "Jost" }}
                  >
                    Return & Refund
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/payment-policy"
                    style={{ fontFamily: "Jost" }}
                  >
                    Payment Policy
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/track-order"
                    style={{ fontFamily: "Jost" }}
                  >
                    Track Order
                  </Link>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #E5E5E5",
                  padding: 3,
                  display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                  borderLeftWidth: 1,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  borderTop: 0,
                  mt: -1,
                }}
              ></Grid>
              <Grid sx={{ ml: { xs: 1.5, sm: 0 }, mb: 2 }}>
                <Typography
                  sx={{
                    mb: { xs: 1, lg: 3.5 },
                    fontFamily: "Jost",
                    fontSize: { xs: 16, sm: 15.7, md: 18 },
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Can’t find what you are looking for ?
                </Typography>
                <CallIcon sx={{ color: "#f15a21", ml: 0.5, mr: 1.5 }} />
                <a
                  className="link-hover23 font-support"
                  href={`tel:${phoneNum}`}
                  style={{ fontFamily: "Jost" }}
                >
                  {" "}
                  Call Us : {phoneNum}
                </a>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <FeedBackForm />
            <Grid
              sx={{
                border: "1px solid #E5E5E5",
                padding: 2,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
              }}
            ></Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                justifyContent: {
                  sm: "space-evenly",
                  md: "space-evenly",
                  lg: "space-evenly",
                },
                // flexWrap: 'wrap',
              }}
            >
              <Grid sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    ml: 2,
                    mb: 1,
                    fontFamily: "Jost",
                    fontSize: { xs: 16, sm: 15.7, md: 18 },
                    fontWeight: "600",
                  }}
                >
                  Customer Services
                </Typography>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    href="/terms-of-use"
                    className="link-hover23 font-support font-support "
                    style={{ fontFamily: "Jost" }}
                  >
                    Terms Of Use
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/security-privacy"
                    style={{ fontFamily: "Jost" }}
                  >
                    Security & Privacy
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/return-refund"
                    style={{ fontFamily: "Jost" }}
                  >
                    Return & Refund
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/payment-policy"
                    style={{ fontFamily: "Jost" }}
                  >
                    Payment Policy
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/track-order"
                    style={{ fontFamily: "Jost" }}
                  >
                    Track Order
                  </Link>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #E5E5E5",
                  padding: 3,
                  display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                  borderLeftWidth: 1,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  borderTop: 0,
                  mt: -1,
                }}
              ></Grid>
              <Grid sx={{ ml: { xs: 1.5, sm: 0 }, mb: 2 }}>
                <Typography
                  sx={{
                    mb: { xs: 1, lg: 3.5 },
                    fontFamily: "Jost",
                    fontSize: { xs: 16, sm: 15.7, md: 18 },
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Can’t find what you are looking for ?
                </Typography>
                <CallIcon sx={{ color: "#f15a21", ml: 0.5, mr: 1.5 }} />
                <a
                  className="link-hover23 font-support"
                  href={`tel:${phoneNum}`}
                  style={{ fontFamily: "Jost" }}
                >
                  {" "}
                  Call Us : {phoneNum}
                </a>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <IssueResolved />
            <Grid
              sx={{
                border: "1px solid #E5E5E5",
                padding: 2,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
              }}
            ></Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                justifyContent: {
                  sm: "space-evenly",
                  md: "space-evenly",
                  lg: "space-evenly",
                },
                // flexWrap: 'wrap',
              }}
            >
              <Grid sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    ml: 2,
                    mb: 1,
                    fontFamily: "Jost",
                    fontSize: { xs: 16, sm: 15.7, md: 18 },
                    fontWeight: "600",
                  }}
                >
                  Customer Services
                </Typography>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    href="/terms-of-use"
                    className="link-hover23 font-support font-support "
                    style={{ fontFamily: "Jost" }}
                  >
                    Terms Of Use
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/security-privacy"
                    style={{ fontFamily: "Jost" }}
                  >
                    Security & Privacy
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/return-refund"
                    style={{ fontFamily: "Jost" }}
                  >
                    Return & Refund
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/payment-policy"
                    style={{ fontFamily: "Jost" }}
                  >
                    Payment Policy
                  </Link>
                </Grid>
                <Grid sx={{ mb: 1 }}>
                  <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                  <Link
                    className="link-hover23 font-support"
                    href="/track-order"
                    style={{ fontFamily: "Jost" }}
                  >
                    Track Order
                  </Link>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #E5E5E5",
                  padding: 3,
                  display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                  borderLeftWidth: 1,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  borderTop: 0,
                  mt: -1,
                }}
              ></Grid>
              <Grid sx={{ ml: { xs: 1.5, sm: 0 }, mb: 2 }}>
                <Typography
                  sx={{
                    mb: { xs: 1, lg: 3.5 },
                    fontFamily: "Jost",
                    fontSize: { xs: 16, sm: 15.7, md: 18 },
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Can’t find what you are looking for ?
                </Typography>
                <CallIcon sx={{ color: "#f15a21", ml: 0.5, mr: 1.5 }} />
                <a
                  className="link-hover23 font-support"
                  href={`tel:${phoneNum}`}
                  style={{ fontFamily: "Jost" }}
                >
                  {" "}
                  Call Us : {phoneNum}
                </a>
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
};

export default GrievanceContactTab;
