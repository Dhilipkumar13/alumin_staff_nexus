import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import MDButton from "components/MDButton";
import MeetingModal from "./MeetingModal";
import { useState } from "react";
const StaffCard = ({ staffData }) => {
  const [formData, setFormData] = useState({
    student_name: "",
    staff_name: "",
    meeting_request: "",
    meeting_time: "",
    meeting_date: "",
  });

  const [show, setShow] = useState(false);

  const handleClick = (uid) => {
    const filterData = staffData.filter((alumns) => alumns.uid === uid);
    console.log(filterData)

    setFormData({
      student_name: "jegan",
      staff_name: filterData[0].staff_name,
      meeting_request: "",
      meeting_date: "",
    });

    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Grid container spacing={3}>
      <MeetingModal show={show} handleClose={handleClose} formData={formData} />
      {staffData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              alt="alumni image"
              height="140"
              image="/images/alumni_images/page-bg-dark-1.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                NAME: {data.staff_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Domain: {data.Domain || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Department: {data.department || "N/A"}
              </Typography>
            </CardContent>
            <CardActions>
              <MDButton
                variant="contained"
                color="success"
                onClick={() => {
                  handleClick(data.uid);
                }}
              >
                Request For a meeting
              </MDButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StaffCard;
