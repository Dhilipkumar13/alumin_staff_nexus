/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from 'react';
// Data
import MDButton from "components/MDButton";
//modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";
//component import
import StudentEntryTable from "./data/studentEntryTable";
function StudentEntry() {

  const [open, setOpen] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Department = [
    { label: "Computer science and engineering", value: "cse" },
    { label: "Information Technology", value: "IT" },
    { label: "Artificial Intelligence and Machine Learning", value: "AIML" },
    { label: "Artificial Intelligence and Data Science", value: "AIDS" },
    { label: "Civil engineering", value: "Civil" },
    { label: "Electronics communications and Engineering", value: "ECE" },
    { label: "Electronical and Electronics Engineering", value: "EEE" },
    { label: "Mechanical Engineering", value: "MECH" },
    { label: "Computer Science and Buisness Systems", value: "CSBS" },
    { label: "Master of Buisness Administration", value: "MBA" },
    { label: "Master of Computer Administration", value: "MCA" }
  ];
  const Year = [
    { label: "I", value: "I" },
    { label: "II", value: "II" },
    { label: "III", value: "III" },
    { label: "IV", value: "IV" }
  ]
  const [formData, setFormData] = useState({
    name: "",
    Regno: "",
    department: "",
    year: "",
    domain: "",

  });
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const studentFetch = async () => {
      try {
        const response = await fetch(`http://localhost:5001/studentData`);
        const result = await response.json();
        setStudentData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    }
    studentFetch();
  }, [studentData])
  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:5001/studentAdd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert("success");
    }
    catch (error) {
      console.log(error);
    }
    setOpen(false);

  }
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
                  STUDENTS ENTRY TABLE
                </MDTypography>
                <MDButton color="success" onClick={handleOpen}>
                  ADD STUDENT
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <StudentEntryTable studentData={studentData} />
              </MDBox>
              <Dialog maxWidth="lg" open={open} onClose={handleClose}>
                <DialogTitle>Student entry</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 2, width: '100ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          required
                          id="outlined-required"
                          label="Name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        /><br></br>
                        <TextField
                          required
                          id="outlined-required"
                          label="Register Number"
                          placeholder="12345678"
                          value={formData.Regno}
                          onChange={(e) =>
                            setFormData({ ...formData, Regno: e.target.value })
                          }
                        />
                        <Autocomplete
                          id="combo-box-demo"
                          options={Department}
                          sx={{ width: 300 }}
                          values={formData.department}
                          onChange={(e) =>
                            setFormData({ ...formData, department: e.target.value })
                          }
                          renderInput={(params) => <TextField {...params} label="Department" />}
                        />
                        <Autocomplete
                          id="combo-box-demo"
                          options={Year}
                          sx={{ width: 300 }}
                          values={formData.year}
                          onChange={(e) =>
                            setFormData({ ...formData, year: e.target.value })
                          }
                          renderInput={(params) => <TextField {...params} label="Year" />}
                        />
                      </div>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <MDButton onClick={handleSubmit} color="primary" autoFocus>
                    Save
                  </MDButton>
                </DialogActions>
              </Dialog>
            </Card>

          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default StudentEntry;

