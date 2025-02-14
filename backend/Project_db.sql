-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2024 at 06:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni_details`
--

CREATE TABLE `alumni_details` (
  `uid` int(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `regno` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `domain` varchar(200) NOT NULL,
  `company` varchar(200) DEFAULT NULL,
  `city` varchar(200) NOT NULL,
  `pass_year` varchar(200) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni_details`
--

INSERT INTO `alumni_details` (`uid`, `name`, `regno`, `department`, `phone`, `email`, `domain`, `company`, `city`, `pass_year`, `image`) VALUES
(12, 'Jegan', 'fervbgx', 'efrgbg', '08072772581', '927621bcs046@mkce.ac.in', 'web development', 'M Kumarasamy college of engineering', 'Namakkal', 'safvd', ''),
(16, 'Alice Brown', 'S12345', 'Computer Science', '1234567890', 'alicebrown@example.com', 'Software Development', NULL, 'New York', '2024', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `alumni_interaction_program`
--

CREATE TABLE `alumni_interaction_program` (
  `uid` int(11) NOT NULL,
  `alumni_name` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `venue` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumni_login`
--

CREATE TABLE `alumni_login` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni_login`
--

INSERT INTO `alumni_login` (`id`, `name`, `pass`) VALUES
(1, 'Jegan', '12');

-- --------------------------------------------------------

--
-- Table structure for table `company_offers`
--

CREATE TABLE `company_offers` (
  `cname` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `eligibility` varchar(255) NOT NULL,
  `uid` int(200) NOT NULL,
  `open_date` varchar(255) NOT NULL,
  `close_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_offers`
--

INSERT INTO `company_offers` (`cname`, `role`, `eligibility`, `uid`, `open_date`, `close_date`) VALUES
('12', '32', '12', 1, '0121-02-12', '0001-12-12'),
('QW', '33', '3333', 2, '2024-05-14', '2024-05-26');

-- --------------------------------------------------------

--
-- Table structure for table `po_table`
--

CREATE TABLE `po_table` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `doj` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `college` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `po_table`
--

INSERT INTO `po_table` (`id`, `name`, `dob`, `doj`, `email`, `phone`, `address`, `college`) VALUES
(1, 'Jegan', '22/1/2004', '22/2/2024', 'jegan@gmail.com', '8072772581', 'sdf', 'MKCE');

-- --------------------------------------------------------

--
-- Table structure for table `staff_details`
--

CREATE TABLE `staff_details` (
  `uid` int(255) NOT NULL,
  `staff_name` varchar(255) NOT NULL,
  `staff_id` varchar(255) NOT NULL,
  `staff_phone` varchar(255) NOT NULL,
  `staff_email` varchar(255) NOT NULL,
  `Domain` varchar(255) NOT NULL,
  `DOJ` varchar(255) NOT NULL,
  `college_name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_details`
--

INSERT INTO `staff_details` (`uid`, `staff_name`, `staff_id`, `staff_phone`, `staff_email`, `Domain`, `DOJ`, `college_name`, `department`, `image`) VALUES
(9, '927621bcs046@mkce.ac.in', '12', '22', '927621bcs046@mkce.ac.in', 'web development', '2121-03-12', 'MKCE', 'CSE', '/images/alumni_images/page-bg-dark-1.jpg'),
(10, '927621bcs046@mkce.ac.in', '23', '232', '927621bcs046@mkce.ac.in', 'web development', '2122-03-22', 'MKCE', 'CSE', '/images/alumni_images/page-bg-dark-1.jpg'),
(11, '927621bcs046@mkce.ac.in', '12', '121', '927621bcs046@mkce.ac.in', 'web development', '12121-12-12', 'MKCE', 'AIML', '/images/alumni_images/page-bg-dark-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `staff_login`
--

CREATE TABLE `staff_login` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_login`
--

INSERT INTO `staff_login` (`id`, `name`, `pass`) VALUES
(1, '927621bcs046@mkce.ac.in', '12');

-- --------------------------------------------------------

--
-- Table structure for table `student_alumni_interaction`
--

CREATE TABLE `student_alumni_interaction` (
  `uid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `regno` varchar(200) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `department` varchar(200) NOT NULL,
  `pass_year` varchar(100) NOT NULL,
  `regarding` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `link` varchar(300) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_alumni_interaction`
--

INSERT INTO `student_alumni_interaction` (`uid`, `name`, `regno`, `domain`, `department`, `pass_year`, `regarding`, `date`, `time`, `link`, `status`) VALUES
(1, 'Alice Brown', 'S12345', 'AI', 'Computer Science', '2024', 'Research Opportunities', '2024-05-17', '13:22', 'https://meet.google.com/cko-sziw-xsr', 'accept'),
(2, 'Bob Smith', 'S67890', 'Thermodynamics', 'Mechanical Engineering', '2024', 'Internship Possibilities', '2024-06-15', '2:00 PM', '', 'reject'),
(3, 'Charlie Johnson', 'S11223', 'Microelectronics', 'Electrical Engineering', '2024', 'Project Guidance', '2024-05-15', '14:15', 'https://meet.google.com/cko-sziw-xsr', 'end'),
(4, 'David Lee', 'S44556', 'Structural', 'Civil Engineering', '2024', 'Thesis Review', '2024-05-10', '09:50', '', 'reject'),
(5, 'Eva Green', 'S77889', 'Cybersecurity', 'Information Technology', '2024', 'Coursework Doubts', '2024-05-17', '17:57', 'https://meet.google.com/cko-sziw-xsr', 'end');

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `uid` int(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `regno` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `pass_year` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `college_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `aoi` varchar(255) NOT NULL,
  `alumni_interaction` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`uid`, `name`, `regno`, `department`, `pass_year`, `domain`, `college_name`, `image`, `phone`, `email`, `city`, `aoi`, `alumni_interaction`) VALUES
(3, 'Charlie Johnson', 'S11223', 'Electrical Engineering', '2024', 'Electronics', 'Institute of Technology', 'charliejohnson.jpg', '1112223333', 'charliejohnson@example.com', 'Chicago', 'Microelectronics', 'Robert Brown'),
(4, 'David Lee', 'S44556', 'Civil Engineering', '2024', 'Construction', 'Civil Tech College', 'davidlee.jpg', '4445556666', 'davidlee@example.com', 'Houston', 'Structural', 'Emily White'),
(5, 'Eva Green', 'S77889', 'Information Technology', '2024', 'Networking', 'IT University', 'evagreen.jpg', '7778889999', 'evagreen@example.com', 'San Francisco', 'Cybersecurity', 'Michael Green'),
(7, 'Jegan', '123', 'cse', '2023', 'web development', 'MKCE', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `student_interaction`
--

CREATE TABLE `student_interaction` (
  `id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `alumni_name` varchar(255) NOT NULL,
  `meeting_request` varchar(255) NOT NULL,
  `meeting_time` varchar(255) NOT NULL,
  `meeting_date` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `meeting_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_interaction`
--

INSERT INTO `student_interaction` (`id`, `student_name`, `alumni_name`, `meeting_request`, `meeting_time`, `meeting_date`, `status`, `meeting_link`) VALUES
(1, 'Jegan', 'ds', '12', '19:16', '2024-05-18', 'pending', 'http://localhost:3000/funded-projects'),
(2, 'Jegan', 'ds', '3221', '18:15', '2024-05-15', 'reject', 'http://localhost:3000/funded-projects'),
(3, 'Jegan', 'ds', '', '16:14', '2024-05-18', 'reject', 'http://localhost:3000/funded-projects'),
(4, 'Jegan', 'ds', 'trg', '16:20', '2024-05-16', 'end', 'http://localhost:3000/funded-projects');

-- --------------------------------------------------------

--
-- Table structure for table `student_login`
--

CREATE TABLE `student_login` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_login`
--

INSERT INTO `student_login` (`id`, `name`, `pass`) VALUES
(1, 'jegan', '12');

-- --------------------------------------------------------

--
-- Table structure for table `student_staff_interaction`
--

CREATE TABLE `student_staff_interaction` (
  `uid` int(11) NOT NULL,
  `student_name` varchar(200) NOT NULL,
  `staff_name` varchar(200) NOT NULL,
  `meeting_request` varchar(200) NOT NULL,
  `meeting_date` varchar(200) NOT NULL,
  `meeting_time` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `meeting_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_staff_interaction`
--

INSERT INTO `student_staff_interaction` (`uid`, `student_name`, `staff_name`, `meeting_request`, `meeting_date`, `meeting_time`, `status`, `meeting_link`) VALUES
(1, 'Jegan', '927621bcs046@mkce.ac.in', '12', '2024-05-17', '23:54', 'reject', ''),
(2, 'Jegan', '927621bcs046@mkce.ac.in', 'tyhf', '2024-05-18', '19:09', 'accept', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni_details`
--
ALTER TABLE `alumni_details`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `alumni_interaction_program`
--
ALTER TABLE `alumni_interaction_program`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `alumni_login`
--
ALTER TABLE `alumni_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_offers`
--
ALTER TABLE `company_offers`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `po_table`
--
ALTER TABLE `po_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_details`
--
ALTER TABLE `staff_details`
  ADD PRIMARY KEY (`uid`,`staff_id`);

--
-- Indexes for table `staff_login`
--
ALTER TABLE `staff_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_alumni_interaction`
--
ALTER TABLE `student_alumni_interaction`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`uid`,`regno`);

--
-- Indexes for table `student_interaction`
--
ALTER TABLE `student_interaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_login`
--
ALTER TABLE `student_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_staff_interaction`
--
ALTER TABLE `student_staff_interaction`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni_details`
--
ALTER TABLE `alumni_details`
  MODIFY `uid` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `alumni_interaction_program`
--
ALTER TABLE `alumni_interaction_program`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `alumni_login`
--
ALTER TABLE `alumni_login`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_offers`
--
ALTER TABLE `company_offers`
  MODIFY `uid` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `po_table`
--
ALTER TABLE `po_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `staff_details`
--
ALTER TABLE `staff_details`
  MODIFY `uid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `staff_login`
--
ALTER TABLE `staff_login`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_alumni_interaction`
--
ALTER TABLE `student_alumni_interaction`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student_details`
--
ALTER TABLE `student_details`
  MODIFY `uid` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `student_interaction`
--
ALTER TABLE `student_interaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_login`
--
ALTER TABLE `student_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_staff_interaction`
--
ALTER TABLE `student_staff_interaction`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
