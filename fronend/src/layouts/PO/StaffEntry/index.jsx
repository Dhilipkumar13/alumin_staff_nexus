import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

// Data
import MDButton from "components/MDButton";
//modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// components
import StaffEntryTable from "./data/StaffEntryTable";
function StaffEntry() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    DOJ: "",
    email: "",
    domain: "",
    department: "",
    number: "",
  });
  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:5001/staffAdd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert("success");
      staffFetch();
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const [staffData, setStaffData] = useState([]);
  useEffect(() => {
    
    staffFetch();
  }, [staffData]);
  const staffFetch = async () => {
    try {
      const response = await fetch(`http://localhost:5001/staffData`);
      const result = await response.json();
      setStaffData(result);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, department: e.target.value });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between" // To space elements evenly
                alignItems="center" // Align items vertically
              >
                <MDTypography variant="h6" color="white">
                  Staff Info
                </MDTypography>
                <MDButton color="success" onClick={handleOpen}>
                  ADD Staff
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <StaffEntryTable staffData={staffData} />
              </MDBox>
              <Dialog maxWidth="lg" open={open} onClose={handleClose}>
                <DialogTitle>Staff Entry</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 2, width: "100ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        {/* Name */}
                        <TextField
                          required
                          id="outlined-required"
                          label="Name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <br />
                        {/* Staff ID */}
                        <TextField
                          required
                          id="outlined-required"
                          label="Staff ID"
                          value={formData.id}
                          onChange={(e) =>
                            setFormData({ ...formData, id: e.target.value })
                          }
                        />
                        <br />
                        {/* Method for Test Creation */}
                        <FormControl
                          variant="outlined"
                          sx={{ marginLeft: "20px", width: "640px" }}
                        >
                          <InputLabel>Method for test creation</InputLabel>
                          <Select
                            label="Bank Type"
                            value={formData.department}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                              height: "50px",
                              width: "900px",
                              marginBottom: "10px",
                            }}
                            style={{ backgroundColor: "white" }}
                          >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="cse">cse</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="AIML">AIML</MenuItem>
                            <MenuItem value="AIDS">AIDS</MenuItem>
                            <MenuItem value="Civil">Civil</MenuItem>
                            <MenuItem value="ECE">ECE</MenuItem>
                            <MenuItem value="EEE">EEE</MenuItem>
                            <MenuItem value="MECH">MECH</MenuItem>
                            <MenuItem value="CSBS">CSBS</MenuItem>
                            <MenuItem value="MBA">MBA</MenuItem>
                            <MenuItem value="MCA">MCA</MenuItem>
                          </Select>
                        </FormControl>
                        <br />
                        {/* Contact Number */}
                        <TextField
                          required
                          id="outlined-required"
                          label="Contact Number"
                          value={formData.number}
                          onChange={(e) =>
                            setFormData({ ...formData, number: e.target.value })
                          }
                        />
                        <br />
                        {/* Staff Email */}
                        <TextField
                          required
                          id="outlined-required"
                          label="Staff Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        <br />
                        {/* Date of Joining */}
                        <TextField
                          required
                          id="outlined-required"
                          type="date"
                          label="Date of Joining"
                          value={formData.DOJ}
                          onChange={(e) =>
                            setFormData({ ...formData, DOJ: e.target.value })
                          }
                        />
                        <br />
                        {/* Domain Name */}
                        <TextField
                          required
                          id="outlined-required"
                          label="Domain Name"
                          value={formData.domain}
                          onChange={(e) =>
                            setFormData({ ...formData, domain: e.target.value })
                          }
                        />
                      </div>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  {/* Submit Button */}
                  <MDButton color="info" onClick={handleSubmit}>
                    Submit
                  </MDButton>
                </DialogActions>
              </Dialog>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
     
    </DashboardLayout>
  );
}

export default StaffEntry;
