import { selectUserAddress } from "@/service/cart";
import { cartActions } from "@/service/cart/states";

import {
  Box,
  Button,
  CardContent,
  Chip,
  Divider,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./Addressform";
import EditAddressform from "./EditAddressForm";

export const BillShipAddress = () => {
  const addresses = useSelector(selectUserAddress);

  const dispatch = useDispatch();
  const [editMode, setEditMode] = React.useState(false);
  const [addMode, setaddMode] = React.useState(false);
  const [editData, setEditData] = React.useState();

  const defaultAddress =
    addresses?.length && addresses?.filter((val) => val.default_status == 1);
  const defaulStatus = defaultAddress?.length && defaultAddress[0];
  const [value, setValue] = React.useState(defaulStatus?.address_id);

  React.useEffect(() => {
    if (value) {
      dispatch(cartActions.getAddressId(value));
    }
  }, [dispatch, value]);

  const handleEdit = (item) => {
    setEditData(item);
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const handleAdd = () => {
    addMode ? setaddMode(false) : setaddMode(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      {addresses?.length > 0 ? (
        addresses?.map((item) => (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <CardContent sx={{ p: 0, pt: { xs: 1, sm: 1 } }}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <Radio
                      value={item.address_id}
                      onChange={handleChange}
                      sx={{
                        color: "default",
                        "&.Mui-checked": {
                          color: "#f15a21",
                        },
                        ml: -1,
                      }}
                      size="small"
                      checked={value == item.address_id}
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
                    <div style={{ display: "flex", gap: 20 }}>
                      <Typography
                        className="jost"
                        sx={{
                          color: "#222222",
                          fontWeight: "500",
                          mt: { xs: 0.2, sm: 0.1, lg: 0 },
                          textTransform: "capitalize",
                          fontSize: { xs: 16, sm: 17, md: 17, lg: 18 },
                          fontFamily: "Jost",
                        }}
                      >
                        {item.full_name}
                      </Typography>
                      <Chip
                        sx={{
                          height: 22,
                          color: "#f15a21",
                          background: "rgba(235, 119, 0, 0.07)",
                          fontFamily: "Jost",
                        }}
                        label={
                          item.default_status == 1
                            ? "Default Address"
                            : "Home Address"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ marginLeft: 32, flexWrap: "wrap", marginRight: 29 }}
                >
                  <Typography
                    className="jost"
                    sx={{
                      color: "#767676",
                      fontWeight: 400,
                      fontSize: { xs: 14, sm: 15, md: 16 },
                      marginBottom: 0.7,
                      fontFamily: "Jost",
                    }}
                  >
                    {item.house_number}, {item.street}, {item.street_address},{" "}
                    {item.city}, {item.post_code}
                  </Typography>

                  <Typography
                    className="jost"
                    sx={{
                      color: "#767676",
                      fontWeight: 400,
                      fontSize: { xs: 14, sm: 15, md: 16 },
                      mb: 2,
                      fontFamily: "Jost",
                    }}
                  >
                    {item.phone}
                  </Typography>
                </div>
              </CardContent>
              <Typography sx={{ display: "flex", ml: 4, mb: 2 }}>
                <Box
                  sx={{
                    width: 90,
                    height: 30,
                    textAlign: "center",
                    alignSelf: "center",
                    border: "1px solid #E5E5E5",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    onClick={() => handleEdit(item)}
                    sx={{
                      color: "#767676",
                      textTransform: "capitalize",
                    }}
                  >
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
              </Typography>
            </div>
            <Divider />
          </>
        ))
      ) : (
        <AddressForm />
      )}
      {addresses?.length ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleAdd}
            size="small"
            style={{
              fontWeight: "500",
              fontFamily: "Jost",
              boxShadow: "none",
            }}
            sx={{
              background: "#f15a21",
              borderRadius: "4px",

              color: "#ffffff",
              marginTop: "17px",
              textTransform: "capitalize",
              fontSize: { xs: 14, sm: 15, md: 16 },

              "&:hover": {
                backgroundColor: "#f15a21",
              },
            }}
            variant="contained"
          >
            Add New Address
          </Button>
        </div>
      ) : (
        <></>
      )}
      <EditAddressform
        closeForm={() => setEditMode(false)}
        addFormClose={() => setaddMode(false)}
        formShow={editMode}
        data={editData}
        addForm={addMode}
      />
    </>
  );
};
