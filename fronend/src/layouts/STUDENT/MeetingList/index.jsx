import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect } from "react";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Box } from "@mui/material";
import { useState } from "react";
import { Tabs, Tab, Stack } from "@mui/material";
import StaffTable from "./components/StaffTable";
import AlumniTable from "./components/AlumniTable";

export default function MeetingList() {
  const name = "Jegan";
  const [tabIndex, setTabIndex] = useState(0);
  const [alumniMeetingData, setAlumniMeetingData] = useState([]);
  const [staffMeetingData, setStaffMeetingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AlumniMeetingsFetch();
    StaffMeetingsFetch();
  }, []);
  const StaffMeetingsFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/staffMeetings/${name}`
      );
      const responseData = await response.json();
      setStaffMeetingData(responseData);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const AlumniMeetingsFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/AlumniMeetings/${name}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setAlumniMeetingData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  

  return (
    <div>
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
                  Meeting List
                </MDTypography>
              </MDBox>
            </Box>
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              sx={{ marginTop: "30px" }}
            >
              <Tab label="Alumni Meetings" />
              <Tab label="Staff Meetings" />
            </Tabs>
            <Stack spacing={2} alignItems="center" sx={{ marginTop: "20px" }}>
              {tabIndex === 0 && (
                <>
                
                  <AlumniTable alumniData={alumniMeetingData} />
                </>
              )}
              {tabIndex === 1 && (
                <>
                  <StaffTable staffData={staffMeetingData} />
                </>
              )}
            </Stack>
          </MDBox>
        </Card>
      </DashboardLayout>
    </div>
  );
}
