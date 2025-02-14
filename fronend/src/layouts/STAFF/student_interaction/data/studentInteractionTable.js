// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Icon } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// Images
import team2 from "assets/images/team-2.jpg";
import DataTable from "examples/Tables/DataTable";
import ScheduleModal from "./ScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogarithmicScale } from "chart.js";
export default function Data() {
  const [studentStaffInteractionData, setStudentStaffInteractionData] =
    useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/student-staff-interaction-data`
        );
        const result = await response.json();
        setStudentStaffInteractionData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, []);
  const handleUpdate = async (uid, status, date, time) => {
    let Index;
    const updatedArray = studentStaffInteractionData.map((item, index) => {
      if (uid === item.uid) {
        Index = index;
        return {
          ...item,
          ["status"]: status,
          ["date"]: date,
          ["time"]: time,
        };
      }
      return item;
    });
    // console.log(uid, Index);
    try {
      const response = await fetch(
        `http://localhost:5001/student-staff-interaction-update/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedArray[Index]),
        }
      );
    } catch (error) {
      console.error("Error while sending data:", error);
    }

    setStudentStaffInteractionData(updatedArray);
  };

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
  const Schedule = ({ Date, time, status }) => {
    switch (status) {
      case "pending":
        return (
          <MDTypography variant="caption" color="warning">
            Please schedule...
          </MDTypography>
        );
      case "accept":
        return (
          <MDBox lineHeight={1} textAlign="left">
            <MDTypography
              display="block"
              variant="caption"
              color="success"
              fontWeight="medium"
            >
              {Date}
            </MDTypography>
            <MDTypography color="success" variant="caption">
              {time}
            </MDTypography>
          </MDBox>
        );
      case "reject":
        return (
          <MDTypography variant="caption" color="error">
            You rejected
          </MDTypography>
        );
    }
  };
  const Action = ({ status, uid, regarding }) => {
    const [ScheduleOpen, setScheduleOpen] = useState(false);
    function handleModal() {
      setScheduleOpen(false);
    }
    function handleState(id, date, time) {
      handleUpdate(id, "accept", date, time);
      setScheduleOpen(false);
    }
    switch (status) {
      case "pending":
        return (
          <>
            <MDTypography
              component="a"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              <MDButton
                color="success"
                onClick={() => {
                  setScheduleOpen(true);
                }}
                size="small"
              >
                <Icon fontSize="large">event_available_icon</Icon>
              </MDButton>
              <MDButton
                onClick={() => {
                  handleUpdate(uid, "reject");
                }}
                color="error"
                size="small"
              >
                <Icon fontSize="large">cancel_icon</Icon>
              </MDButton>
            </MDTypography>
            {ScheduleOpen && (
              <ScheduleModal
                uid={uid}
                handleState={handleState}
                regarding={regarding}
                handleScheduleModal={handleModal}
              />
            )}
          </>
        );
      case "accept":
        return (
          <MDTypography fontWeight="medium" variant="caption" color="success">
            ACCEPTED
          </MDTypography>
        );
      case "reject":
        return (
          <MDTypography fontWeight="medium" variant="caption" color="error">
            REJECTED
          </MDTypography>
        );
    }
  };

  const alumni = {
    columns: [
      { Header: "S.no", accessor: "uid", align: "center" },
      { Header: "Student Name", accessor: "name", width: "20%", align: "left" },
      { Header: "Schedule", accessor: "schedule", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: studentStaffInteractionData.slice().reverse().map((data, index) => ({
      uid: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {index + 1}
        </MDTypography>
      ),
      name: <Name image={team2} name={data.student_name}  />,
    
     
      schedule: (
        <Schedule Date={data.meeting_date} time={data.meeting_time} status={data.status} />
      ),
      action: (
        <Action
          status={data.status}
          uid={data.uid}
          regarding={data.meeting_request}
        />
      ),
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
