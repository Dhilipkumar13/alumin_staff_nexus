

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import { useSession } from "SessionContext";

function Dashboard() {
  const {name,role} = useSession();
  console.log(role)
  const [college, setCollege] = useState("");
  const [count, setCount] = useState("");
  const [studentCount, setStudentCount] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/fetchCollege/${name}`);
        const jsondata = await response.json();
        setCollege(jsondata[0].college);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {

    fetchStudentCount();
  }, []);
  const fetchStudentCount = async () => {
    try {
      const response = await fetch(`http://localhost:5001/studentCount`);
      const { count } = await response.json(); // Extract the count value
      setStudentCount(count); // Set only the count value to the state
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };
  useEffect(() => {

    fetchCount();
  }, []);
  const fetchCount = async () => {
    try {
      const response = await fetch(`http://localhost:5001/staffCount`);
      const { count } = await response.json(); // Extract the count value
      setCount(count); // Set only the count value to the state
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person"
                title="WELCOME"
                count={name}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<SchoolIcon />}
                title="College name"
                count={college}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<GroupIcon />}
                title="staff Count"
                count={count}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<PeopleIcon />}
                title="Student Count"
                count={studentCount}

              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default Dashboard;
