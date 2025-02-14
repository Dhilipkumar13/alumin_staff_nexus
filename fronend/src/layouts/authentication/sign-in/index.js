import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Icon } from '@mui/material';
import CoverLayout from 'layouts/authentication/components/CoverLayout'; // Make sure this import matches your project structure
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import { useSession } from "SessionContext";
import { useNavigate } from 'react-router-dom';

const Login = ({ bgImage }) => {
  const navigate = useNavigate();

  const { name, setName, pass, setPass,role,setRole} = useSession();
  const [ formData, setFormData] = useState({
    name:"",
    pass:""
  })

  const handleStaffLogin = async () => {
    setRole("staff");
    const response = await fetch(`http://localhost:5001/loginStaff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if(responseData.success == true){
        setName(formData.name);
        navigate('/dashboard');
        
      }
  }
  const handleAlumniLogin = async () => {
    setRole("alumni");
    const response = await fetch(`http://localhost:5001/loginAlumni`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if(responseData.success == true){
        setName(formData.name);
        navigate('/student-interaction');
        
      }
  }
  const handleStudentLogin = async () => {
    setRole("student");
    const response = await fetch(`http://localhost:5001/loginStudent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if(responseData.success == true){
        setName(formData.name);
        navigate('/alumniList');
        
      }
  }
 
  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={4} px={4}>
          <MDBox component="form" role="form">
            <AppBar position="static">
              <Tabs
                textColor="info"
                orientation="horizontal"
                value={tabValue}
                onChange={handleSetTabValue}
              >
                <Tab
                  label="STUDENT"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      school_icon
                    </Icon>
                  }
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                />
                <Tab
                  label="ALUMNI"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      engineering_icon
                    </Icon>
                  }
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                />
                <Tab
                  label="STAFF"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      psychology_outlined_icon
                    </Icon>
                  }
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                />
              </Tabs>
            </AppBar>

            {tabValue === 0 && (
              <MDBox mt={2} mb={2}>
                <MDInput type="email" label="Student Email" variant="standard" fullWidth  onChange = {(e) => {setFormData({ ...formData,name:e.target.value})}}/>
                <MDInput type="password" label="Password" variant="standard" fullWidth    onChange = {(e) => {setFormData({ ...formData,pass:e.target.value})}} />
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick = {handleStudentLogin}>
                    Sign In
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
            {tabValue === 1 && (
              <MDBox mt={2} mb={2}>
                <MDInput type="email" label="Alumni Email" variant="standard" fullWidth onChange = {(e) => {setFormData({ ...formData,name:e.target.value})}} />
                <MDInput type="password" label="Password" variant="standard" fullWidth  onChange = {(e) => {setFormData({ ...formData,pass:e.target.value})}} />
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick = {handleAlumniLogin}>
                    Sign In
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
            {tabValue === 2 && (
              <MDBox mt={2} mb={2}>
                <MDInput type="email" label="Staff Email" variant="standard" fullWidth  onChange = {(e) => {setFormData({...formData,name:e.target.value})}}/>
                <MDInput type="password" label="Password" variant="standard" fullWidth  onChange = {(e) => {setFormData({...formData,pass:e.target.value})}}/>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={(handleStaffLogin)}>
                    Sign In
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default Login;
