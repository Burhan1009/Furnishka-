import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Box, Radio } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Chip from "@mui/material/Chip";

interface IAddressBookCard {
  name?: string;
  addressTag?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  handleDelete: any;
  handleEdit: any;
  phoneNumber?: number | string;
  forUpdate?: boolean;
  defaultCheck?: boolean;
  isLoading?: boolean;
}
const AddressBookCard: React.FC<IAddressBookCard> = (props) => {
  const {
    name,
    addressTag,
    defaultCheck,
    address1,
    isLoading,
    address2,
    address3,
    address4,
    address5,
    phoneNumber,
    handleDelete,
    handleEdit,
    forUpdate,
  } = props;

  return (
    <Box
      sx={{
        minheight: 126,
        border: defaultCheck ? "1px solid #f15a21" : "1px solid #E5E5E5",
        mb: 4,
        background: defaultCheck ? "rgba(233, 91, 27, 0.03)" : "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          background: "#f4f9fc",
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <Radio
                // color="#f15a21"
                sx={{
                  color: "default",
                  "&.Mui-checked": {
                    color: "#f15a21",
                  },
                  ml: -1,
                }}
                size="small"
                checked={defaultCheck ? true : false}
              />
            </div>

            <div
              style={{
                display: "flex",
                marginLeft: 3,
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              <div style={{ display: "flex", gap: 17 }}>
                <Typography
                  className="jost"
                  sx={{
                    mt: { xs: 0.1, sm: 0 },
                    color: "#222222",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    fontSize: { xs: 17, sm: 16, md: 17, lg: 18 },

                    fontFamily: "Jost",
                  }}
                >
                  {name}
                </Typography>
                <Chip
                  sx={{
                    mt: { xs: 0.1, sm: 0 },
                    height: 22,
                    color: "#f15a21",
                    background: "rgba(235, 119, 0, 0.07)",
                  }}
                  label={defaultCheck ? "Default Address" : "Home Address"}
                />
              </div>
              <div style={{ flexGrow: 1 }}>
                <Typography
                  className="jost"
                  style={{
                    color: "#f15a21",
                    marginLeft: 5,
                    backgroundColor: " rgba(235, 119, 0, 0.07)",
                    borderRadius: 20,
                    paddingBlock: 2,
                    paddingLeft: 8,
                    paddingRight: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "Jost",
                  }}
                >
                  {addressTag}
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: 32, flexWrap: "wrap" }}>
            <Typography
              className="jost"
              sx={{
                color: "#767676",
                fontWeight: 400,
                fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
                marginBottom: 0.7,
                fontFamily: "Jost",
              }}
            >
              {address2}, {address3}, {address4}, {address1}, {address5}
            </Typography>

            <Typography
              className="jost"
              sx={{
                color: "#767676",
                fontWeight: 400,
                fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
                fontFamily: "Jost",
              }}
            >
              {phoneNumber}
            </Typography>
          </div>
        </CardContent>
        <Typography sx={{ display: "flex", marginLeft: 5.5 }}>
          <Box
            sx={{
              width: 90,
              height: 30,
              textAlign: "center",
              alignSelf: "center",
              border: defaultCheck ? "1px solid #f15a21" : "1px solid #E5E5E5",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              onClick={handleEdit}
              sx={{
                color: "#767676",
                textTransform: "capitalize",
              }}
            >
              {forUpdate}
              <div>
                <img src={"/static/images/edit.svg"} />
              </div>
              <div
                className="jost"
                style={{
                  alignSelf: "center",
                  fontFamily: "Jost",
                  marginLeft: 9,
                }}
              >
                Edit
              </div>
            </Button>
          </Box>

          <Box
            sx={{
              width: 90,
              height: 30,
              m: 2,
              textAlign: "center",
              background: "#FFFFFF",
              alignSelf: "center",
              color: "#767676",
              border: defaultCheck ? "1px solid #f15a21" : "1px solid #E5E5E5",
              textTransform: "capitalize",
              display: "flex",
              justifyContent: "space-evenly",
              background: "#f4f9fc",
            }}
          >
            <LoadingButton
              onClick={handleDelete}
              loading={isLoading}
              sx={{
                color: "#767676",
                textTransform: "capitalize",
              }}
            >
              <div>
                <DeleteIcon />
              </div>
              <div
                className="jost"
                style={{
                  alignSelf: "center",
                  fontFamily: "Jost",
                  marginLeft: 9,
                }}
              >
                Delete
              </div>
            </LoadingButton>
          </Box>
        </Typography>
      </div>
    </Box>
  );
};
export default AddressBookCard;
