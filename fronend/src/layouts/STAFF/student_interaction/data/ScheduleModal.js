import React from "react";
import { useState, useRef } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MDButton from "components/MDButton";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Slide, FormControl } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ScheduleModal = ({
  uid,
  handleState,
  regarding,
  handleScheduleModal,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    handleState(uid, dateRef.current.value, timeRef.current.value);
  }
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  return (
    <Dialog
      open={true}
      onClose={() => handleScheduleModal(false)}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="xs"
      sx={{ "& .MuiDialog-paper": { height: "350px" } }}
    >
      <DialogTitle>
        Schedule Interaction
        <IconButton
          aria-label="close"
          onClick={() => {
            handleScheduleModal(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "inherit",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "44ch",
                },
              }}
            >
              <FormControl fullWidth>
                <TextField
                  defaultValue={regarding}
                  name="regarding"
                  label="Regarding"
                  disabled
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  type="date"
                  id="outlined-required"
                  name="date"
                  inputRef={dateRef}
                  label="Program Date"
                  InputLabelProps={{
                    shrink: true,
                    focused: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  type="time"
                  inputRef={timeRef}
                  label="Program Time"
                  name="time"
                  InputLabelProps={{
                    shrink: true,
                    focused: true,
                  }}
                />
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton type="submit" size="small" color="success" autoFocus>
            Save
          </MDButton>
          <MDButton
            onClick={() => handleScheduleModal(false)}
            size="small"
            color="error"
          >
            close
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ScheduleModal;
