import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import Alumni_card from "./Components/staff_card";
import MDBoxRoot from "components/MDBox/MDBoxRoot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Box, Card } from "@mui/material";
import StaffCard from "./Components/staff_card";
export default function StaffList() {
  // studen name
  const name = "Jegan";

  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const response = await fetch(`http://localhost:5001/staffData/${name}`);
    const responseData = await response.json();
    setStaffData(responseData);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox sx={{ marginBottom: "50px" }}>
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
                STAFF LIST
              </MDTypography>
            </MDBox>
          </Box>

          <Box sx={{ marginTop: "50px" }}>
            <StaffCard staffData={staffData} />
          </Box>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
