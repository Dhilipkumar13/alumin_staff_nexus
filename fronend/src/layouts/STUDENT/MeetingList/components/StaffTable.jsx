import React from 'react'
import DataTable from "examples/Tables/DataTable";
import MDTypography from 'components/MDTypography';
export default function StaffTable({ staffData}) {
  const checkMeetingDate = (date) => {
    if(date === ""){
      return (
        <>N/A</>
      )
    }
    else{
      return (
        <>{date}</>
      )
    }
  }
  const checkMeetingTime = (time) => {
    if(time === ""){
      return (
        <>N/A</>
      )
    }
    else{
      return (
        <>{time}</>
      )
    }
  }
    const checkStatus = (status) => {
      if(status === "pending"){
        return (
          <MDTypography color =  "warning">{status}</MDTypography>
        )
      }
      if(status === "completed"){
        return (
          <MDTypography color =  "success">{status}</MDTypography>
        )
      }
      if(status === "rejected"){
        return (
          <MDTypography color =  "success">{status}</MDTypography>
        )
      }
    }

  const columns = [
    { Header: "SNo.", accessor: "no", align: "left" }, // Updated to "no" instead of "no."
    { Header: "Staff name", accessor: "staffName", align: "left" },
    { Header: "Meeting regarding", accessor: "regarding", align: "center" },
    { Header: "Meeting date", accessor: "meetingDate", align: "center" },
    { Header: "Meeting time", accessor: "meetingTime", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
  ];
  const rows = staffData.map((data, index) => ({
    no: index + 1, // Serial number
    staffName: data.staff_name,
    regarding: data.meeting_request,
    meetingDate: checkMeetingDate(data.meeting_date),
    meetingTime: checkMeetingTime(data.meeting_time),
    status: (
      checkStatus(data.status)
    ),
    
  }));
  return (
      <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
  )
}
