import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function StaffEntryTable({ staffData }) {
  const [viewData, setViewData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleView = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/viewStaff/${ID}`);
      const jsondata = await response.json();

      console.log("View Data:", jsondata); // Log the received data
      setViewData(jsondata);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDelete = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/staffDelete/${ID}`);
      const result = await response.json();
      staffData();
    } catch (error) {
      console.error("Error fetching awareness program:", error);
    }
  };

  const columns = [
    { Header: "Name", accessor: "staff_name", width: "15%" },
    { Header: "Staff ID", accessor: "staff_id", width: "10%" },
    { Header: "Phone No", accessor: "staff_phone", width: "15%" },
    { Header: "Email", accessor: "staff_email", width: "15%" },
    { Header: "Domain", accessor: "Domain", width: "15%" },
    { Header: "DOJ", accessor: "DOJ", width: "10%" },
    { Header: "Department", accessor: "department", width: "20%" },
    { Header: "Action", accessor: "action", width: "10%" },
  ];

  const rows = staffData.map((data) => ({
    staff_name: data.staff_name,
    staff_id: data.staff_id,
    staff_phone: data.staff_phone,
    staff_email: data.staff_email,
    Domain: data.Domain,
    DOJ: data.DOJ,
    department: data.department,
    action: (
      <MDBox>
        <MDButton onClick={() => handleDelete(data.staff_id)} color="error">
          <DeleteIcon />
        </MDButton>
        <MDButton onClick={() => handleView(data.uid)} color="info">
          <VisibilityIcon />
        </MDButton>
      </MDBox>
    ),
  }));

  return (
    <MDBox>
     <Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    sx: {
      width: "1200px",  // Adjust the width to your desired size
      maxWidth: "none"  // Ensure the max width is not constrained
    }
  }}
>
  <DialogTitle>Staff Details</DialogTitle>
  <DialogContent>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <MDTypography variant="bold">Name:</MDTypography>
        <MDTypography variant="subtitle1">ID:</MDTypography>
        <MDTypography variant="subtitle1">Phone:</MDTypography>
        <MDTypography variant="subtitle1">Email:</MDTypography>
        <MDTypography variant="subtitle1">Domain:</MDTypography>
        <MDTypography variant="subtitle1">DOJ:</MDTypography>
        <MDTypography variant="subtitle1">Department:</MDTypography>
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.staff_name}
        </MDTypography>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.staff_id}
        </MDTypography>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.staff_phone}
        </MDTypography>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.staff_email}
        </MDTypography>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.Domain}
        </MDTypography>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.DOJ}
        </MDTypography>
        <MDTypography variant="subtitle1">
          {viewData?.[0]?.department}
        </MDTypography>
      </Grid>
    </Grid>
  </DialogContent>

  <DialogActions>
    <MDButton onClick={handleClose} color="primary">
      Close
    </MDButton>
  </DialogActions>
</Dialog>

      <DataTable
        table={{ columns, rows }}
        isSorted={true}
        entriesPerPage={true}
        showTotalEntries={true}
        yesEndBorder
      />
    </MDBox>
  );
}
