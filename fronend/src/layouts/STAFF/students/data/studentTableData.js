// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Icon } from "@mui/material";
// Images
import team2 from "assets/images/team-2.jpg";
import { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Data() {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/studentData`);
        const result = await response.json();
        setStudentData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (uid) => {
   
    try {
      const response = await fetch(
        `http://localhost:5001/studentStaffDelete/${uid}`
      );
      const result = await response.json();
      setStudentData(result);
      toast.error("Deleted successfully!", { theme: "colored" });
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };
  const handlePromote = async (uid, name) => {
    try {
      const response = await fetch(
        `http://localhost:5001/studentPromote/${uid}`
      );
      const result = await response.json();
      setStudentData(result);
    toast.success(`${name} became Alumni...`, { theme: "colored" });
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };
  const Name = ({ image, name, regno }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{regno}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Aoi = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
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

  let student = {
    columns: [
      { Header: "S.no", accessor: "uid", align: "center" },
      { Header: "Name", accessor: "name", width: "20%", align: "left" },
      { Header: "Aear of Interest", accessor: "aoi", align: "left" },
      { Header: "Contact", accessor: "contact", align: "left" },
      { Header: "Alumini Interacted", accessor: "ai", align: "center" },
      { Header: "Update", accessor: "update", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: studentData.map((data,index) => ({
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
      name: <Name image={team2} name={data.name} regno={data.regno} />,
      aoi: <Aoi title={data.domain} description={data.aoi} />,
      contact: <Contact phone={data.phone} email={data.email} />,
      ai: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {data.alumni_interaction}
        </MDTypography>
      ),
      update: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <MDButton
            onClick={() => {
              handlePromote(data.uid, data.name);
            }}
            color="success"
            size="small"
          >
            <Icon fontSize="large">{"hail"}</Icon>
          </MDButton>
        </MDTypography>
      ),
      action: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <MDButton
            onClick={() => {
              handleDelete(data.uid);
            }}
            color="error"
            size="small"
          >
            <Icon fontSize="large">{"delete"}</Icon>
          </MDButton>
        </MDTypography>
      ),
    })),
  };
  const { columns, rows } = student;
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
