import Dashboard from "layouts/PO/dashboard";
import StudentEntry from "layouts/PO/studentEntry";
import Profile from "layouts/PO/profile";
import ProgramAlumni from "layouts/ALUMNI/program_alumni";
import AlumniAlumni from "layouts/ALUMNI/alumni_alumni";
import StudentAlumniInteraction from "layouts/ALUMNI/student_alumni_interaction";
import ProfileAlumni from "layouts/ALUMNI/profile_alumni";
// @mui/icons-material
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import CompanyData from "layouts/PO/companyEntry";
import AlumniData from "layouts/PO/AlumniEntry";
import StaffEntry from "layouts/PO/StaffEntry";
import AlumniList from 'layouts/STUDENT/AlumniList';
import StaffList from "layouts/STUDENT/StaffList";
import MeetingList from "layouts/STUDENT/MeetingList";
import CompanyOffer from "layouts/STUDENT/CompanyOffer";
import StudentInteraction from "layouts/STAFF/student_interaction";
import Tables from "layouts/STAFF/alumnis";
import Students from "layouts/STAFF/students";
import Icon from "@mui/material/Icon";
import Program from "layouts/STAFF/program";
import Overview from "layouts/STAFF/profile";
import Basic from "layouts/authentication/sign-in";
const routes = [
  {
    type: "PO",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    route: "/dashboard",
    component: <Dashboard />,
    role:"PO"
  },
  {
    type: "PO",
    name: "Staff Info",
    key: "staff Infor",
    icon: <GroupIcon fontSize="small" />,
    route: "/StaffEntry",
    component: <StaffEntry />,
    role:"PO"
  },
  {
    type: "PO",
    name: "Student Entry",
    key: "studentDetails",
    icon: <SchoolIcon fontSize="small" />,
    route: "/studentEntry",
    component: <StudentEntry />,
    role:"PO"
  },
  {
    type: "PO",
    name: "Alumni Entry",
    key: "AlumniInfo",
    icon: <SchoolIcon fontSize="small" />,
    route: "/AlumniEntry",
    component: <AlumniData />,
    role:"PO"
  },
  {
    type: "PO",
    name: "Company Entry",
    key: "companyEntry",
    icon: <BusinessIcon fontSize="small" />,
    route: "/companyEntry",
    component: <CompanyData />,
    role:"PO"
  },
  {
    type: "All",
    name: "Profile",
    key: "profile",
    icon: <PersonIcon fontSize="small" />,
    route: "/profile",
    component: <Profile />,
    role:"PO"
  },
  //////// student routs
  {
    type: "All",
    name: "Alumni List",
    key: "alumniList",
    icon: <ListIcon fontSize="small" />,
    route: "/alumniList",
    component: <AlumniList />,
    role: "student",
  },
  {
    type: "All",
    name: "Staff List",
    key: "staffList",
    icon: <ListIcon fontSize="small" />,
    route: "/staffList",
    component: <StaffList />,
    role: "student",
  },
  {
    type: "All",
    name: "Meeting List",
    key: "meetingList",
    icon: <EventIcon fontSize="small" />,
    route: "/meetingList",
    component: <MeetingList />,
    role: "student",
  },
  {
    type: "All",
    name: "Company List",
    key: "companyList",
    icon: <WorkIcon fontSize="small" />,
    route: "/companyList",
    component: <CompanyOffer />,
    role: "student",
  },

  // alumni    routes

  {
    type: "All",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/AlumniProfile",
    component: <ProfileAlumni />,
    role: "alumni",
  },

  {
    type: "All",
    name: "Student Interaction",
    key: "students-interaction",
    icon: <Icon fontSize="small">add_reaction_icon</Icon>,
    route: "/students-interaction",
    component: <StudentAlumniInteraction />,
    role: "alumni",
  },
  {
    type: "All",
    name: "Alumni",
    key: "alumnis",
    icon: <Icon fontSize="small">hail</Icon>,
    route: "/alumnis",
    component: <AlumniAlumni />,
    role: "alumni",
  },
  {
    type: "All",
    name: "Program",
    key: "program",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/program",
    component: <ProgramAlumni />,
    role: "alumni",
  },


  //////////// staff routes

  {
    type: "All",
    name: "Alumni",
    key: "alumnis",
    icon: <Icon fontSize="small">hail</Icon>,
    route: "/alumnis",
    component: <Tables />,
    role: "staff",
  },
  {
    type: "All",
    name: "Student Interaction",
    key: "students-interaction",
    icon: <Icon fontSize="small">add_reaction_icon</Icon>,
    route: "/students-interaction",
    component: <StudentInteraction />,
    role: "staff",
  },

  {
    type: "All",
    name: "Student",
    key: "students",
    icon: <Icon fontSize="small">group_icon</Icon>,
    route: "/students",
    component: <Students />,
    role: "staff",
  },
  {
    type: "All",
    name: "Program",
    key: "program",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/program",
    component: <Program />,
    role: "staff",
  },
  {
    type: "All",
    name: "staff Profile",
    key: "profile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/staffProfile",
    component: <Overview />,
    role: "staff",
  },


  {
    type: "All",
    name: "Change Password",
    key: "sign-in",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/authentication/sign-in",
    component: <Basic />,
    role: "staff",
  },
];

export default routes;
