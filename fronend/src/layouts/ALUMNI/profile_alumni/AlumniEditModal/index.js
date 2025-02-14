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
import { IconButton, Input } from "@mui/material";

const AlumniEditModal = ({ onChangeOpen }) => {
  const [formData, setFormData] = useState({
    domain: "",
    phone: "",
    email: "",
    image: "",
    company: "",
    city: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/AlumniUpdate/${12}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
    onChangeOpen(false);
  };
  return (
    <div>
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth="xs"
        onClose={() => onChangeOpen(false)}
        sx={{ "& .MuiDialog-paper": { height: "530px" } }}
      >
        <DialogTitle color="info">
          Edit Profile
          <IconButton
            aria-label="close"
            onClick={() => {
              onChangeOpen(false);
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

        <form onSubmit={handleUpdate}>
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
                <TextField
                  onChange={handleChange}
                  id="outlined-required"
                  name="domain"
                  label="Domain name"
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-required"
                  name="phone"
                  label="Contact Number"
                />
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  label="Email"
                  name="email"
                />
                <Input
                  type="file"
                  sx={{
                    outline: "none",
                    border: "1px solid rgb(216,216,216)",
                    borderRadius: "5px",
                    width: "96%",
                    height: "45px",
                    marginLeft: "6px",
                    paddingLeft: "5px",
                    alignItems: "center",
                  }}
                  id="outlined-required"
                  onChange={handleChange}
                  label="image"
                  name="image"
                />
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  label="company"
                  name="company"
                />
                <TextField
                  onChange={handleChange}
                  name="city"
                  id="outlined-required"
                  label="city"
                  variant="outlined"
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton type="submit" size="small" color="success" autoFocus>
              Save
            </MDButton>
            <MDButton
              onClick={() => onChangeOpen(false)}
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

export default AlumniEditModal;
