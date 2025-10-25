import { Typography } from "@mui/material";
import Accordion from "react-bootstrap/Accordion";

function BasicExample() {
  return (

    <Accordion defaultActiveKey="0" flush className="accordian-faq " >
      <Accordion.Item eventKey="0">
        <Accordion.Header style={{ fontFamily: "Jost" }}>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            Does my Jodhpuri furniture require Installation?
          </Typography>
        </Accordion.Header>
        <Accordion.Body style={{ color: "#767676", fontFamily: "Jost" }}>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            The Installation depends upon the structure and built of the product
            however any of the followings could match your purchase.
          </Typography>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item style={{ fontFamily: "Jost" }} eventKey="1">
        <Accordion.Header>
          {" "}
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            Can I customize the furniture?
          </Typography>
        </Accordion.Header>
        <Accordion.Body style={{ color: "#767676" }}>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            We offer end-to-end customization with every piece available on the
            website. Please get in touch with our team to discuss your custom
            request in detail and we will provide you with the best options.
          </Typography>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item style={{ fontFamily: "Jost" }} eventKey="2">
        <Accordion.Header>
          {" "}
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            When does my installation start?
          </Typography>
        </Accordion.Header>
        <Accordion.Body style={{ color: "#767676" }}>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            As soon as the product is delivered, we ensure our installation team
            arrives at the location within 24-48 hours to initiate the process.
            However, some unexpected circumstances might result in a delay for
            which we sincerely apologize.
          </Typography>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item style={{ fontFamily: "Jost" }} eventKey="3">
        <Accordion.Header>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            Does the product look the same as on website?
          </Typography>
        </Accordion.Header>
        <Accordion.Body style={{ color: "#767676" }}>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            We ensure to deliver the perfect furniture as seen on the website.
            However due to screen resolution or lightings, there might be slight
            variations in fabric color and wood finish.
          </Typography>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item style={{ fontFamily: "Jost" }} eventKey="4">
        <Accordion.Header>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            What is the warranty period on my furniture?
          </Typography>
        </Accordion.Header>
        <Accordion.Body style={{ color: "#767676" }}>
          <Typography
            sx={{ fontSize: { xs: 15, sm: 14, md: 15 }, fontFamily: "Jost" }}
          >
            All our furniture products are subjected to a warranty period of one
            year against manufacturing defects. However, any product, which is
            damaged, distorted, neglected or improperly set up, shall not be
            covered under the warranty criteria.
          </Typography>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;
