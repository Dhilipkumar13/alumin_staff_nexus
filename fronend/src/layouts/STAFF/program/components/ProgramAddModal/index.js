import React from "react";
import { useState } from "react";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Slide,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProgramModal = ({ handleModal,handleState }) => {
  const handleModalChange = (val) => {
    handleModal(val);
  };

  const [formData, setFormData] = useState({
    title: "",
    alumni_name: "",
    venue: "",
    date: "",
    time: "",
    email: "",
    department: "CSE"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
 
    e.preventDefault();
   
    try {
      const response = await fetch(`http://localhost:5001/addprogram`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("Program added successfully", { theme: "colored" });
    handleState();
    handleModal(false);
  };
  
  return (
    <div>
      <Dialog
        open={true}
        onClose={() => handleModalChange(false)}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="xs"
        sx={{ "& .MuiDialog-paper": { height: "550px" } }}
      >
        <DialogTitle>
          Add Program
          <IconButton
            aria-label="close"
            onClick={() => {
              handleModalChange(false);
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
                    name="title"
                    onChange={handleChange}
                    id="outlined-required"
                    label="Title"
                    variant="outlined"
                  />
                  <TextField
                    name="alumni_name"
                    onChange={handleChange}
                    label="Alumni Name"
                    multiline
                  />
                </FormControl>
                <FormControl>
                  <InputLabel
                    sx={{ marginLeft: "8px" }}
                    id="demo-simple-select-label"
                  >
                    Venue
                  </InputLabel>
                  <Select
                    sx={{
                      minWidth: 396,
                      height: 44,
                      paddingLeft: "2px",
                      marginLeft: "8px",
                    }}
                    name="venue"
                    autoWidth={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.venue}
                    label="Venue"
                    onChange={handleChange}
                  >
                    <MenuItem sx={{ width: "396px" }} value={"Hall 1"}>
                      Hall 1
                    </MenuItem>
                    <MenuItem value={"Hall 2"}>Hall 2</MenuItem>
                    <MenuItem value={"Hall 3"}>Hall 3</MenuItem>
                    <MenuItem value={"Hall 4"}>Hall 4</MenuItem>
                    <MenuItem value={"Hall 5"}>Hall 5</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    type="date"
                    id="outlined-required"
                    name="date"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    label="Program Time"
                    name="time"
                    InputLabelProps={{
                      shrink: true,
                      focused: true,
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-required"
                    label="Email"
                    onChange={handleChange}
                    name="email"
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
              onClick={() => handleModalChange(false)}
              size="small"
              color="error"
            >
              close
            </MDButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProgramModal;
