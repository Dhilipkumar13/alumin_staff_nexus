import React from "react";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDTypography from "components/MDTypography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function StudentEntryTable({ studentData }) {
  const [viewData, setViewData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const columns = [
    { Header: "Name", accessor: "name", width: "45%", align: "left" },
    { Header: "Staff ID", accessor: "id", align: "left" },
    { Header: "email", accessor: "email", align: "center" },
    { Header: "Domain", accessor: "domain", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows = studentData.map((data) => ({
    name: data.name,
    id: data.regno,
    email: data.department,
    year: data.year, // Add logic to calculate difficulty if neede
    domain: data.Domain,
    action: (
      <MDBox>
        <MDButton onClick={() => handleDelete(data.regno)} color="error">
          <DeleteIcon />
        </MDButton>
        <MDButton onClick={() => handleView(data.regno)} color="info">
          <VisibilityIcon />
        </MDButton>
      </MDBox>
    ),
  }));
  const handleDelete = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/studentDelete/${ID}`);
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching  awareness program:", error);
    }
  };
  const handleView = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/viewStudent/${ID}`);
      const jsondata = await response.json();

      console.log("View Data:", jsondata); // Log the received data
      setViewData(jsondata);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  return (
    <MDBox>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            width: "1200px", // Adjust the width to your desired size
            maxWidth: "none", // Ensure the max width is not constrained
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle>Staff Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MDTypography variant="subtitle1">Name:</MDTypography>
              <MDTypography variant="subtitle1">ID:</MDTypography>
              <MDTypography variant="subtitle1">Phone:</MDTypography>
              <MDTypography variant="subtitle1">Email:</MDTypography>
              <MDTypography variant="subtitle1">Domain:</MDTypography>
              <MDTypography variant="subtitle1">DOJ:</MDTypography>
              <MDTypography variant="subtitle1">Department:</MDTypography>
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="subtitle1">
                {viewData?.[0]?.name}
              </MDTypography>
              <MDTypography variant="subtitle1">
                {viewData?.[0]?.regno}
              </MDTypography>
              <MDTypography variant="subtitle1">
                {viewData?.[0]?.department}
              </MDTypography>
              <MDTypography variant="subtitle1">
                {viewData?.[0]?.staff_email}
              </MDTypography>
              <MDTypography variant="subtitle1">
                {viewData?.[0]?.year}
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
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </MDBox>
  );
}
