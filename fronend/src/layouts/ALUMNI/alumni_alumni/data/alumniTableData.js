// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { useEffect, useState } from "react";
// Images
import team2 from "assets/images/team-2.jpg";
import DataTable from "examples/Tables/DataTable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Data() {
  const [alumniData, setAlumniData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/alumniData`);
        const result = await response.json();
        setAlumniData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, []);
  const Name = ({ image, name, regno }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{regno}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Aoi = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
    </MDBox>
  );
  const Contact = ({ phone, email }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {phone}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  );

  const alumni = {
    columns: [
      { Header: "S.no", accessor: "uid", align: "center" },
      { Header: "Name", accessor: "name", width: "20%", align: "left" },
      { Header: "Working Domain", accessor: "wd", align: "left" },
      { Header: "Contact", accessor: "contact", align: "left" },
      { Header: "Department", accessor: "department", align: "center" },
      { Header: "Passed out", accessor: "passout", align: "center" },
    ],

    rows: alumniData.slice().reverse().map((data,index) => ({
      uid: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {index+1}
        </MDTypography>
      ),
      name: <Name image={data.image} name={data.name} regno={data.regno} />,
      wd: <Aoi title={data.domain} />,
      contact: <Contact phone={data.phone} email={data.email} />,
      department: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {data.department}
        </MDTypography>
      ),
      passout: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {data.pass_year}
        </MDTypography>
      )
    })),
  };
  const { columns, rows } = alumni;
  return (
    <>
      <DataTable
        table={{ columns, rows }}
        isSorted={true}
        entriesPerPage={true}
        showTotalEntries={true}
      />
      <ToastContainer style={{ fontSize: "15px", width: "300px" }} />
    </>
  );
}
