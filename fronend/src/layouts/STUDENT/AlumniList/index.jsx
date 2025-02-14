import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import Alumni_card from "./Components/alumni_card";
import MDBoxRoot from "components/MDBox/MDBoxRoot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Box } from "@mui/material";
export default function AlumniList() {

  const name = "Jegan"

    const [AlumniData,setAlumniData] = useState([]);

    useEffect(() => {
       
        fetchAlumni();
      }, []);

    const fetchAlumni = async () => {
        const response  = await fetch(`http://localhost:5001/alumniData/${name}`)
        const responseData = await response.json();
        setAlumniData(responseData);
      
    }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Box sx={{ marginTop: "20px" }}>
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
              ALUMNI LIST
            </MDTypography>
          </MDBox>
        </Box>

        <Box sx={{ marginTop: "50px" }}>
          <Alumni_card AlumniData={AlumniData}/>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}
