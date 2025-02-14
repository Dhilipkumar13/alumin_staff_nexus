import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";
import OffersTable from "./components/OffersTable";
export default function CompanyOffer() {

    const [data,setData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])
    const fetchData = async () => {
        const response = await fetch(`http://localhost:5001/companyData`)
        const responseData = await response.json();
        setData(responseData);
        
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
              CompanyOffers
            </MDTypography>
          </MDBox>
        </Box>

        <Box sx={{ marginTop: "50px" }}>
          <OffersTable data = {data} />
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}
