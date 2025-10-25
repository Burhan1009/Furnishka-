import { Grid, Typography } from "@mui/material";
import React from "react";
import SideNav from "./SideNavigation";
import { AddressBookCard } from "@/components";
import { useDeleteAddress, useGetAddAddress } from "@/service/address";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import { selectAuth } from "@/service/auth/globalstate";
import { useRouter } from "next/router";

const MyAddress = () => {
  const router = useRouter();
  const path = router.asPath;
  const auth = useSelector(selectAuth);
  const [deleteId, setDeleteId] = React.useState();
  const authData = auth?.length > 0 ? auth[0] : "";
  const validPath = path?.split("/")[1] ?? "";
  const { data } = useGetAddAddress(authData.user_id);
  const storeAddress = data?.data ?? [];

  const { mutate: deleteAddress, isLoading: deleteLoading } =
    useDeleteAddress();

  const handleAddressDelete = (address_id) => {
    setDeleteId(address_id);
    deleteAddress(address_id);
  };
  const handleAddressEdit = (address_id) => {
    router.push("/my-account/address/edit/" + address_id);
  };
  return (
    <div className="container2">
      <Grid
        sx={{
          mt: { xs: 3, md: 5 },
          display: "flex",
          gap: 3,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <Grid
          sx={{ width: 290, display: { xs: "none", sm: "none", md: "inline" } }}
        >
          <SideNav />
        </Grid>
        <div>
          <h1 className="font-2543 fw-500 jost">Address Book</h1>
          <ListItemButton
            sx={{
              background:
                validPath == "address-details" ? "#F8F8F8" : " #f4f9fc",

              border: "1px solid #E5E5E5",
              mt: 1,
              mb: 2,
            }}
            onClick={() => router.push("/my-account/address/add")}
          >
            <Typography>
              <img src={"/static/images/plus.svg"} />
            </Typography>

            <text
              style={{
                color: "#f15a21",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
                fontFamily: "Jost",
              }}
            >
              ADD A NEW ADDRESS
            </text>
          </ListItemButton>
          <Grid sx={{}}>
            {storeAddress.length > 0 &&
              storeAddress?.map((item: any) => {
                const IsdefaultAddress =
                  item.default_status == 1 ? true : false;
                return (
                  <AddressBookCard
                    defaultCheck={IsdefaultAddress}
                    isLoading={
                      deleteId == item.address_id ? deleteLoading : false
                    }
                    name={item.full_name}
                    handleDelete={() => handleAddressDelete(item.address_id)}
                    handleEdit={() => handleAddressEdit(item.address_id)}
                    address1={item.city}
                    address2={item.house_number}
                    address3={item.street}
                    address4={item.street_address}
                    address5={item.post_code}
                    phoneNumber={item.phone}
                  />
                );
              })}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default MyAddress;
