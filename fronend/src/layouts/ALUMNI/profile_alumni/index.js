import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/ALUMNI/profile_alumni/components/Header";

function Overview() {
  const [AlumniData, setAlumniData] = useState([]);
  let [state, setState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/alumniProfile/12`);
        const result = await response.json();
        setAlumniData(result);
        console.log(result)
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, [state]);

  function Renderprofile() {
    setState(!state);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={AlumniData[0]?.name} department={AlumniData[0]?.department} image={AlumniData[0]?.image}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {AlumniData.length > 0 && (
                <ProfileInfoCard
                  renderProfile={Renderprofile}
                  title="profile information"
                  info={{
                    fullName: `${AlumniData[0].name}`,
                    mobile: `${AlumniData[0].phone}`,
                    email: `${AlumniData[0].email}`,
                    Domain: `${AlumniData[0].domain}`,
                    company: `${AlumniData[0].company}`,
                    city: `${AlumniData[0].city}`,
                    pass_year: `${AlumniData[0].pass_year}`,
                  }}
                  action={{
                    tooltip: "Edit Profile",
                  }}
                  shadow={false}
                />
              )}
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
