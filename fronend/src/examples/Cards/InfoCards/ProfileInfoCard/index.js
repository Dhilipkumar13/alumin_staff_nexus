import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import StaffEditModal from "layouts/profile/StaffEditModal";
import AlumniEditModal from "layouts/ALUMNI/profile_alumni/AlumniEditModal";
import {IconButton} from "@mui/material";
function ProfileInfoCard({
  renderProfile,
  title,
  description,
  info,
  social,
  action,
  shadow,
}) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(
        uppercaseLetter,
        ` ${uppercaseLetter.toLowerCase()}`
      );

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));
  const [open, setOpen] = useState(false);
  function handleOpen(value) {
    setOpen(value);
  }
  useEffect(() => {
    renderProfile();
  }, [open]);
  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));
  const user="alumni";
  let EditModal;
  switch(user){
    case "alumni":{
      EditModal=<AlumniEditModal onChangeOpen={handleOpen} />;
    }
    break;
    // case "staff":{
    //   EditModal=<StaffEditModal onChangeOpen={handleOpen} />;
    // }
    break;
  }
  return (
    <>
      {open && EditModal}

      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          px={2}
        >
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
          <MDTypography
            component={Link}
            onClick={() => setOpen(true)}
            variant="body2"
            color="secondary"
          >
            <Tooltip title={action.tooltip} placement="top">
              <IconButton>
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <MDBox mb={2} lineHeight={1}>
            <MDTypography variant="button" color="text" fontWeight="light">
              {description}
            </MDTypography>
          </MDBox>
          <MDBox opacity={0.3}>
            <Divider />
          </MDBox>
          <MDBox>{renderItems}</MDBox>
        </MDBox>
      </Card>
    </>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
