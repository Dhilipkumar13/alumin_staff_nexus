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
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
export default function CompanyEntry({ companyData }) {

  const columns = [

    { Header: "Company Name", accessor: "cname", align: "center" },
    { Header: "Role", accessor: "Role", align: "center" },
    { Header: "Eligibilty", accessor: "Eligibility", align: "center" },
    { Header: "Required Skills", accessor: "Skills", align: "center" },
    { Header: "EndDate", accessor: "EndDate", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ]
  const rows = companyData.map(data => ({
    cname: data.cname,
    Role: data.role,
    Eligibility: data.eligibility, // Add logic to calculate difficulty if neede
    Skills: data.open_date,
    EndDate: data.close_date, // Add logic to calculate creation date if needed
    action: (
      <MDBox>
        <MDButton color="error">
          Delete
        </MDButton>
      </MDBox>
    ),
  }));




  return (
    <MDBox pt={3}>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </MDBox>
  )
}
