/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

export default function AlumniData() {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={5} lineHeight={1}>
        <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "Name", align: "center" },
      { Header: "Reg No", accessor: "RegNo", align: "center" },
      { Header: "Department", accessor: "Department", align: "center" },
      { Header: "Batch", accessor: "Batch", align: "center" },
      { Header: "Domain", accessor: "Domain", align: "center" },
      { Header: "Organization", accessor: "Organization", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        RegNo: <Author  name="927621BCS046"/>,
        Name: <Job title="Jegan"/>,
        Department: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={5} lineHeight={1}>
            <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
              CSE
            </MDTypography>
          </MDBox>
        </MDBox>
        ),
        Batch: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2021-2025
          </MDTypography>
        ),
        Domain: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Web Development
          </MDTypography>
        ),
        Organization: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                TCS
          </MDTypography>
        ),
        action: (
           <MDBox>
            <MDButton color="info">
                Info
            </MDButton>
            <MDButton color="success">
                talk
            </MDButton>
           </MDBox>
        ),
      },
    
    ],
  };
}
