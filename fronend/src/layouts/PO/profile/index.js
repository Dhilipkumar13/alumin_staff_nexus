import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/PO/profile/components/Header";
import MDButton from "components/MDButton";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Overview() {
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [FormData, setFormData] = useState({
    id: "",
    doj: "",
    dob: "",
    phone: "",
    email: "",
    address: ""
  });
  const handleEdit = () => {
    setOpen(true)
  }
  const handleSubmit = async () => {
    console.log(FormData);
    try {
      const response = await fetch(`http://localhost:5001/profileUpdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      alert("success");
      setOpen(false);
      setFormData({
        id: "",
        doj: "",
        dob: "",
        phone: "",
        email: "",
        address: ""

      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const profileFetch = async () => {
      try {
        const response = await fetch(`http://localhost:5001/profileData`);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    profileFetch();
  }, [data]); // Empty dependency array to fetch data only once on component mount

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header title="Profile" subtitle="Manage your profile settings" />
      <Dialog
        maxWidth="lg"
        open={open}
        sx={{ width: "auto" }}
        justifyContent="center"
        onClose={handleClose}
      >
        <DialogTitle>Question List</DialogTitle>
        <DialogContent>
          <Box ml={2}>
            <TextField
              fullWidth
              id="phone"
              label="ID"
              variant="outlined"
              value={FormData.id}
              sx={{ marginBottom: "20px" }}
              onChange={(e) =>
                setFormData({ ...FormData, id: e.target.value })
              }
            />
            <TextField
              fullWidth
              id="doj"
              label="Date of joining"
              variant="outlined"
              value={FormData.doj}
              sx={{ marginBottom: "20px" }}
              onChange={(e) =>
                setFormData({ ...FormData, doj: e.target.value })
              }
            />
            <TextField
              fullWidth
              id="phone"
              label="Date of Birth"
              variant="outlined"
              value={FormData.dob}

              sx={{ marginBottom: "20px" }}
              onChange={(e) =>
                setFormData({ ...FormData, dob: e.target.value })
              }
            />
            <TextField
              fullWidth
              id="phone"
              label="Phone No."
              variant="outlined"
              value={FormData.phone}
              sx={{ marginBottom: "20px" }}
              onChange={(e) =>
                setFormData({ ...FormData, phone: e.target.value })
              }
            />
            <TextField
              fullWidth
              id="phone"
              label="Email"
              variant="outlined"
              value={FormData.email}
              sx={{ marginBottom: "20px" }}
              onChange={(e) =>
                setFormData({ ...FormData, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              id="address"
              multiline
              rows={4}
              label="Address"
              variant="outlined"
              value={FormData.address}
              sx={{ marginBottom: "20px" }}
              onChange={(e) =>
                setFormData({ ...FormData, address: e.target.value })
              }
            />
          </Box>


        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleClose} color="primary">
            Cancel
          </MDButton>
          <MDButton onClick={handleSubmit} color="primary" autoFocus>
            Save
          </MDButton>
        </DialogActions>
      </Dialog>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Divider orientation="vertical" flexItem />
              <Box ml={2}>
                <TextField
                  fullWidth
                  id="phone"
                  label="ID"
                  disabled={!isEditMode}
                  variant="outlined"
                  value={data[0]?.ID || ""}
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  fullWidth
                  id="doj"
                  label="Date of joining"
                  disabled={!isEditMode}
                  variant="outlined"
                  value={data[0]?.doj || ""}
                  sx={{ marginBottom: "20px" }}
                  
                />
                <TextField
                  fullWidth
                  id="phone"
                  label="Date of Birth"
                  disabled={!isEditMode}
                  variant="outlined"
                  value={data[0]?.dob || ""}

                  sx={{ marginBottom: "20px" }}
                  
                />
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone No."
                  disabled={!isEditMode}
                  variant="outlined"
                  value={data[0]?.phone || ""}
                  sx={{ marginBottom: "20px" }}
                 
                />
                <TextField
                  fullWidth
                  id="phone"
                  label="Email"
                  disabled={!isEditMode}
                  variant="outlined"
                  value={data[0]?.email || ""}
                  sx={{ marginBottom: "20px" }}
                 
                />
                <TextField
                  fullWidth
                  id="address"
                  disabled={!isEditMode}
                  multiline
                  rows={4}
                  label="Address"
                  variant="outlined"
                  value={data[0]?.address || ""}
                  sx={{ marginBottom: "20px" }}
                />
              </Box>
            </Box>
            <Box sx={{ marginLeft: '600px' }}>

              <MDButton color="info" onClick={handleEdit}>Edit</MDButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
