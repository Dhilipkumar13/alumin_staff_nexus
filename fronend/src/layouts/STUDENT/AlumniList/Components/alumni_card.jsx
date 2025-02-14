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
const AlumniGrid = ({ AlumniData }) => {

  const [formData, setFormData] = useState({
    student_name:"",
    alumni_name:"",
    meeting_request:"",
    meeting_time:"",
    meeting_date:""
  })

  const [show, setShow] = useState(false);

  const handleClick = (uid) =>{
    const filterData = AlumniData.filter(alumns => alumns.uid === uid);
    
    setFormData({
      student_name:"jegan",
      alumni_name:filterData[0].name,
      meeting_request:"",
      meeting_date:""

    })
   
    setShow(true);
  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <Grid container spacing={3}>
      <MeetingModal show={show} handleClose={handleClose} formData={formData}/>
      {AlumniData.map((data, index) => (
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
                NAME: {data.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Domain: {data.domain || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Company: {data.company || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Passout Year: {data.pass_year || "N/A"}
              </Typography>
            </CardContent>
            <CardActions>
              <MDButton variant="contained" color="success" onClick={ () => {handleClick(data.uid)}}>
                Request For a meeting
              </MDButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlumniGrid;
