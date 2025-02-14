
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Billing page components
import ProgramList from "layouts/STAFF/program/components/ProgramList";
import ProgramAddModal from "layouts/STAFF/program/components/ProgramAddModal";
function ProgramInformation() {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState(false);
  const [programData, setProgramData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/programData`);
        const result = await response.json();
        setProgramData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, [state]);
  const handleDeleteProgram = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:5001/deleteprogram/${uid}`
      );
      const result = await response.json();
      setState(!state);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
    toast.success("Program deleted successfully", { theme: "colored" });
  };
  const onChangeModal = (val) => {
    setModal(val);
  };

  const onChangeState = () => {
    setState(!state);
  };
  return (
    <>
      <ToastContainer style={{ fontSize: "15px", width: "300px" }} />
      <Card id="delete-account">
        <MDBox pt={3} px={2} display="flex" justifyContent="space-between">
          <MDTypography variant="h6" fontWeight="medium">
            Alumini Interaction Program
          </MDTypography>
          <MDButton
            color="info"
            onClick={() => {
              setModal(true);
            }}
          >
            {" "}
            + ADD PROGRAM
          </MDButton>
        </MDBox>
        <MDBox pt={1} pb={2} px={2}>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            {programData
              .slice()
              .reverse()
              .map((data, index) => (
                <ProgramList
                  key={index}
                  title={data.title}
                  alumni_name={data.alumni_name}
                  venue={data.venue}
                  date={data.date}
                  time={data.time}
                  uid={data.uid}
                  email={data.email}
                  handleDeleteProgram={handleDeleteProgram}
                  handleState={onChangeState}
                />
              ))}
          </MDBox>
        </MDBox>
      </Card>
      {modal && (
        <ProgramAddModal
          handleModal={onChangeModal}
          handleState={onChangeState}
        />
      )}
    </>
  );
}

export default ProgramInformation;
