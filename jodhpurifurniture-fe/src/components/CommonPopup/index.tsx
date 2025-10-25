import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({ offerDescription }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{
          color: "#f15a21",
          p: 0,
          fontWeight: "500",
          minWidth: 0,
          "&:hover": {
            background: "none",
          },
        }}
      >
        T&C
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ fontSize: 18 }}>
          {"Offer Terms and Conditions"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            dangerouslySetInnerHTML={{ __html: offerDescription }}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
