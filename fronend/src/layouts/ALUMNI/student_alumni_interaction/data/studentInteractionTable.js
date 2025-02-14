import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import team2 from "assets/images/team-2.jpg";
import DataTable from "examples/Tables/DataTable";
import ScheduleModal from "./ScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Data() {
  const name = "Jegan"
  const [studentStaffInteractionData, setStudentStaffInteractionData] =
    useState([]);

  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {

    try {
      const response = await fetch(
        `http://localhost:5001/student-alumni-interaction-data/${name}`
      );
      const result = await response.json();
      setStudentStaffInteractionData(result);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };
  const handleUpdate = async (uid, status, date, time, link) => {
    let Index;
    const updatedArray = studentStaffInteractionData.map((item, index) => {
      if (uid === item.id) {
        Index = index;
        return {
          ...item,
          ["status"]: status,
          ["date"]: date,
          ["time"]: time,
          ["link"]: link,
        };
      }
      return item;
    });
    
    try {
      const response = await fetch(
        `http://localhost:5001/student-alumni-interaction-update/${uid}`,
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
    setStudentStaffInteractionData(updatedArray)
   
  };

  const handleLink = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:5001/student-alumni-interaction-updateLink/${uid}`);
      const result = await response.json();
      setStudentStaffInteractionData(result);
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  }
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
      case "end":
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
  const Action = ({ status, uid, meeting_request, meeting_link }) => {
    const [ScheduleOpen, setScheduleOpen] = useState(false);
    function handleModal() {
      setScheduleOpen(false);
    }
    function handleState(id, meeting_date, meeting_time, meeting_link) {
      handleUpdate(id, "accept", meeting_date, meeting_time, meeting_link);
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
                meeting_request={meeting_request}
                handleScheduleModal={handleModal}
              />
            )}
          </>
        );
      case "accept":
        return (
          <MDTypography fontWeight="medium" variant="caption" color="success">

            <a href={meeting_link} target="_blank">
              <MDButton
                color="warning"
                size="small"
                Meeting>Meeting
              </MDButton></a>
            <MDButton onClick={() => { handleLink(uid) }}
              color="success"
              size="small"
              Meeting> <Icon fontSize="large">mobile_friendly_icon</Icon>
            </MDButton>
          </MDTypography>
        );
      case "reject":
        return (
          <MDTypography fontWeight="medium" variant="caption" color="error">
            REJECTED
          </MDTypography>
        );
      case "end":
        return (
          <MDTypography fontWeight="medium" variant="caption" color="success">
            Ended
          </MDTypography>
        );
    }
  };
  const dataArray = Array.isArray(studentStaffInteractionData) ? studentStaffInteractionData : [];

  const alumni = {
    columns: [
      { Header: "S.no", accessor: "uid", align: "center" },
      { Header: "Name", accessor: "name", width: "20%", align: "left" },

      { Header: "Meeting Regarding", accessor: "meeting_request", align: "center" },

      { Header: "Schedule", accessor: "schedule", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: dataArray?.slice().reverse().map((data, index) => ({
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
      name: <Name image={team2} regno={data.student_name} />,

      meeting_request: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {data.meeting_request}
        </MDTypography>
      ),

      schedule: (
        <Schedule Date={data.meeting_date} time={data.meeting_time} status={data.status} />
      ),
      action: (
        <Action
          status={data.status}
          uid={data.id}
          meeting_request={data.meeting_request}
          meeting_link={data.meeting_link}
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
