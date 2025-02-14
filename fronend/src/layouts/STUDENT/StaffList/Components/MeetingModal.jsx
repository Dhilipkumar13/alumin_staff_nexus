import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import MDButton from "components/MDButton";
export default function MeetingModal({ formData, handleClose, show }) {
  console.log(formData);
  const [newForm, setForm] = useState({
    student_name: "Jegan",
    staff_name: formData.staff_name,
    meeting_request: "",
    meeting_date: "",
    meeting_time: "",
  });

  const handleSubmit = async () => {
    newForm.staff_name = formData.staff_name;
    const response = await fetch(`http://localhost:5001/staffMeetingRequest`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    });
    alert("success");
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={show}
        PaperProps={{
          sx: {
            width: "800px", // Adjust the width to your desired size
            maxWidth: "none", // Ensure the max width is not constrained
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle>Meeting Form</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "80ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              label="Student Name"
              disabled
              value={newForm.student_name}
            />
            <br></br>
            <TextField
              required
              id="outlined-required"
              label="Alumni  Name"
              disabled
              value={formData.staff_name}
            />
            <TextField
              id="outlined-multiline-static"
              label="Meeting Regarding"
              multiline
              rows={4}
              onChange={(e) => {
                setForm({ ...newForm, meeting_request: e.target.value });
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <MDButton onClick={handleSubmit} color="success">
            submit
          </MDButton>
          <MDButton onClick={handleClose} color="warning">
            Close
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
