const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const upload = multer({ dest: 'uploads/' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
app.use(cors())
app.use(express.json());
//data base connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Project_db'
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database');
})
// college name in dashboard
app.get('/fetchCollege/:name', (req, res) => {
  const sql = 'SELECT * FROM po_table where name=?'
  const name = req.params.name;
  const values = [name];
  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(results);
  });
})
// student count
app.get('/studentCount', (req, res) => {
  const sqlQuery = 'SELECT count(*) AS count FROM student_details'; // Alias the count(*) result as 'count'

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    return res.json({ count });
  });
});
// staff count
app.get('/staffCount', (req, res) => {
  const sqlQuery = 'SELECT count(*) AS count FROM staff_details'; // Alias the count(*) result as 'count'

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    return res.json({ count });
  });
});
//view staff
app.get('/viewStaff/:id', (req, res) => {
  const sql = 'SELECT * FROM staff_details where uid=?'
  const uid = req.params.id;
  const values = [uid];
  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(results);
  });
})
//student view
app.get('/viewStudent/:regno', (req, res) => {
  const reg = req.params.regno;
  const sqlQuery = 'SELECT *  FROM student_details where regno=? ';
  const values = [reg];
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(results);
  });
});

//student delete
app.get('/studentDelete/:id', (req, res) => {
  const sqlQuery = 'DELETE FROM student_details WHERE regno=?';
  const id = req.params.id;
  const values = [id];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//staff details delete
app.get('/staffDelete/:id', (req, res) => {
  const sqlQuery = 'DELETE FROM staff_details WHERE staff_id=?';
  const id = req.params.id;
  const values = [id];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//profile data
app.get('/profileData', (req, res) => {
  const sqlQuery = 'SELECT *  FROM po_table';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(results);
  });
});
// profile update 
app.put('/profileUpdate', (req, res) => {

  const id = req.body.id;
  const doj = req.body.doj;
  const dob = req.body.dob;
  const email = req.body.email;
  const address = req.body.address;
  const sqlQuery = 'UPDATE po_table SET doj=?, dob=?, email=?, address=? where id=?';
  const values = [doj, dob, email, address, "12"];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

// company data
app.get('/companyData', (req, res) => {
  const sqlQuery = 'SELECT * FROM company_offers';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
// student data fetch
app.get('/studentData', (req, res) => {
  const sqlQuery = 'SELECT * FROM student_details';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//staff details fetch
app.get('/staffData', (req, res) => {
  const sqlQuery = 'SELECT * FROM staff_details';
  // const staff_mail = req.params.staff_mail;
  // const values = [staff_mail];

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
// student add
app.put('/studentAdd', (req, res) => {

  const name = req.body.name;
  const id = req.body.Regno;
  const department = req.body.department;
  const year = req.body.year;
  const domain = req.body.domain;
  const sqlQuery = 'INSERT INTO student_details (name,regno,department,year,Domain,college_name) values(?,?,?,?,?,?)';
  const values = [name, id, department, year, domain, "MKCE"];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
// company add
app.put('/companyAdd', (req, res) => {
  const cname = req.body.cname;
  const role = req.body.role;
  const eligibility = req.body.eligibility;
  const open_date = req.body.open_date;
  const close_date = req.body.close_date;

  const sqlQuery = 'INSERT INTO company_offers (cname,role,eligibility,open_date,close_date) values(?,?,?,?,?)';
  const values = [cname, role, eligibility, open_date, close_date];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//staff details
app.get('/staffData/:name', async (req, res) => {
  const name = req.params.name
  const d1 = await prisma.student_details.findFirst({
    where: {
      name: name
    },
    select: {
      domain: true
    }
  })
  const data = await prisma.staff_details.findMany({
    where: {
      Domain: d1.domain
    }
  })

  res.status(200).json(data)

})
// alumni meetings fetch in student side
app.get('/AlumniMeetings/:name', async (req, res) => {
  const name = req.params.name
  const data = await prisma.student_interaction.findMany({
    where: {
      student_name: name
    }
  })

  res.status(200).json(data)

})
// staff meetings fetch in student side
app.get('/staffMeetings/:name', async (req, res) => {
  const name = req.params.name
  const data = await prisma.student_staff_interaction.findMany({
    where: {
      student_name: name
    }
  })

  res.status(200).json(data)

})
// all alumni details
app.get("/alumniData", (req, res) => {
  const sqlQuery = `SELECT * FROM alumni_details`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// alumni details 
app.get('/alumniData/:name', async (req, res) => {
  const name = req.params.name
  const d1 = await prisma.student_details.findFirst({
    where: {
      name: name
    },
    select: {
      domain: true
    }
  })
  const data = await prisma.alumni_details.findMany({
    where: {
      domain: d1.domain
    }
  })

  res.status(200).json(data)

})
//staff details add
app.put('/staffAdd', (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const DOJ = req.body.DOJ;
  const email = req.body.email;
  const domain = req.body.domain;
  const department = req.body.department;
  const number = req.body.number;

  const sqlQuery = 'INSERT INTO staff_details (staff_name,staff_id,staff_phone,staff_email,Domain,DOJ,college_name,department) values(?,?,?,?,?,?,?,?)';
  const values = [name, id, number, email, domain, DOJ, "MKCE", department];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
// meeting request
app.put('/meetingRequest', async (req, res) => {

  const data = await prisma.student_interaction.create({
    data: {
      student_name: req.body.student_name,
      alumni_name: req.body.alumni_name,
      meeting_request: req.body.meeting_request,
      meeting_date: req.body.meeting_date,
      meeting_time: req.body.meeting_time,
      status: "pending"
    }
  })
  return res.json({ success: true })
})
// staff meeting request
app.put('/staffMeetingRequest', async (req, res) => {

  const data = await prisma.student_staff_interaction.create({
    data: {
      student_name: req.body.student_name,
      staff_name: req.body.staff_name,
      meeting_request: req.body.meeting_request,
      meeting_date: req.body.meeting_date,
      meeting_time: req.body.meeting_time,
      status: "pending"
    }
  })
  return res.json({ success: true })
})
// showing studen request in alumni side
app.get("/student-alumni-interaction-data/:name", async (req, res) => {
  const name = req.params.name

  const data = await prisma.student_interaction.findMany({
    where: {
      student_name: name
    }
  })
  return res.json(data);

});
/// updateing the meeting status
app.post("/student-alumni-interaction-update/:uid", async (req, res) => {
  const id = req.params.uid;
  const status = req.body.status;
  const link = req.body.link;
  const time = req.body.time;
  const date = req.body.date


  if (status === "reject") {
    const data = await prisma.student_interaction.update({
      where: {
        id: parseInt(id)
      },
      data: {
        status: "reject"
      }
    })
  } else {
    const data = await prisma.student_interaction.update({
      where: {
        id: parseInt(id)
      },
      data: {
        meeting_link: link,
        status: status,
        meeting_time: time,
        meeting_date: date
      }
    })
  }

  return res.json({ success: true })


});
// making meeting as completed
app.get("/student-alumni-interaction-updateLink/:id", (req, res) => {
  const id = req.params.id;
  const status = "end";
  let sqlQuery;
  let queryParams;
  sqlQuery = `UPDATE student_interaction SET status=? WHERE id=?`;
  queryParams = [status, id];
  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  const sqlQuery1 = `SELECT * FROM student_interaction`;
  db.query(sqlQuery1, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
//individual program list
app.get("/programData/:name", (req, res) => {

  const name = req.params.name;
  console.log(name);
  const sqlQuery = `SELECT * FROM alumni_interaction_program WHERE alumni_name=?`;
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// particular alumni

app.get("/alumniProfile/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sqlQuery = `SELECT * FROM alumni_details where uid=${id}    `;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// update alumni


app.post("/AlumniUpdate/:id", (req, res) => {
  const { domain, phone, email, image, company, city } = req.body;
  const id = req.params.id;
  const sqlQuery = `UPDATE alumni_details SET domain=?, phone=?,email=?,image=?,company=?,city=? WHERE uid=?`; // Assuming you have an 'id' field in your staff_details table
  db.query(
    sqlQuery,
    [domain, phone, email, image, company, city, id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json(results);
    }
  );
});
// delete alumni

app.get("/alumniDelete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE from alumni_details where uid=${id}`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const sqlQuery2 = `SELECT * FROM alumni_details`;
    db.query(sqlQuery2, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json(results);
    });
  });
});
// student staff interaction datas
app.get("/student-staff-interaction-data", (req, res) => {
  const sqlQuery = `SELECT * FROM student_staff_interaction`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// staff meeting update

//update student staff interaction status
app.post("/student-staff-interaction-update/:id", (req, res) => {
  const id = req.params.id;
  const { status, date, time } = req.body;
  let sqlQuery;
  let queryParams;

  if (status === "reject") {
    sqlQuery = `UPDATE student_staff_interaction SET status=? WHERE uid=?`;
    queryParams = [status, id];
  } else {
    sqlQuery = `UPDATE student_staff_interaction SET meeting_date=?, meeting_time=?, status=? WHERE uid=?`;
    queryParams = [date, time, status, id];
  }

  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
app.get("/studentStaffDelete/:id", (req, res) => {
  console.log("hi")
  const id = req.params.id;
  const sqlQuery = `DELETE from student_details where uid=${id}`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const sqlQuery2 = `SELECT * FROM student_details`;
    db.query(sqlQuery2, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json(results);
    });
  });
});
app.get("/studentPromote/:id", (req, res) => {
  const id = req.params.id;

  // Step 2: Fetch details of the deleted student
  const selectQuery = `SELECT * FROM student_details WHERE uid=${id}`;
  db.query(selectQuery, (err, studentResults) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Step 3: Insert student details into alumni_details
    const student = studentResults[0]; // Assuming you expect only one result
    const insertQuery = `INSERT INTO alumni_details (name, regno, department, phone, email, domain, city, pass_year,company,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?,null,null)`;
    const values = [
      student.name,
      student.regno,
      student.department,
      student.phone,
      student.email,
      student.domain,
      student.city,
      student.pass_year,
    ];
    db.query(insertQuery, values, (err, insertResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Step 1: Delete student from student_details
      const deleteQuery = `DELETE FROM student_details WHERE uid=${id}`;
      db.query(deleteQuery, (err, deleteResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Step 4: Fetch updated list of students and return as JSON
        const selectAllQuery = `SELECT * FROM student_details`;
        db.query(selectAllQuery, (err, updatedStudentList) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
          }
          return res.json(updatedStudentList);
        });
      });
    });
  });
});
// program data fetch
app.get("/programData", (req, res) => {
  const sqlQuery = `SELECT * FROM alumni_interaction_program`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// addd new program
app.post("/addprogram", (req, res) => {
  const { title, alumni_name, venue, date, time, email, department } = req.body;

  const sqlQuery = `INSERT into alumni_interaction_program (title, alumni_name, venue, date, time, email,department) values(?,?,?,?,?,?,?)`; // Assuming you have an 'id' field in your staff_details table
  db.query(
    sqlQuery,
    [title, alumni_name, venue, date, time, email, department],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json(results);
    }
  );
});
// edit program

app.post("/editprogram/:id", (req, res) => {
  const { title, alumni_name, venue, date, time, email } = req.body;
  const id = req.params.id;
  const sqlQuery = `UPDATE alumni_interaction_program SET title=?, alumni_name=?, venue=?, date=?, time=?, email=? WHERE uid=?`; // Assuming you have an 'id' field in your staff_details table
  db.query(
    sqlQuery,
    [title, alumni_name, venue, date, time, email, id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json(results);
    }
  );
});
// delete program

app.get("/deleteprogram/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE from alumni_interaction_program where uid=${id}`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// staff data profile
app.get("/staffProfile/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM staff_details where uid=${id}    `;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});
// staff login

//staff details update
app.post("/staffUpdate/:id", (req, res) => {
  const { name, description, domain, phone, email, image, experience } = req.body;
  const id = req.params.id;
  const sqlQuery = `UPDATE staff_details SET staff_name=?, Domain=?, staff_phone=?, staff_email=?,  WHERE uid=?`; // Assuming you have an 'id' field in your staff_details table
  db.query(
    sqlQuery,
    [name, domain, phone, email, , id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json(results);
    }
  );
});
app.put("/loginStaff", async (req, res) => {
  console.log(req.body)
  try {
    const data = await prisma.staff_login.findFirst({
      where: {
        name: req.body.name,
        pass: req.body.pass
      }
    })
    if (data != null) {
      return res.status(200).json({ success: true });
    }
    else {

      return res.json({ success: false, message: "Invalid username or password" });
    }
  }
  catch (error) {
    console.log(error)
  }
});
app.put("/loginAlumni", async (req, res) => {
  console.log(req.body)
  try {
    const data = await prisma.alumni_login.findFirst({
      where: {
        name: req.body.name,
        pass: req.body.pass
      }
    })
    if (data != null) {
      return res.status(200).json({ success: true });
    }
    else {

      return res.json({ success: false, message: "Invalid username or password" });
    }
  }
  catch (error) {
    console.log(error)
  }
});
app.put("/loginStudent", async (req, res) => {
  console.log(req.body)
  try {
    const data = await prisma.student_login.findFirst({
      where: {
        name: req.body.name,
        pass: req.body.pass
      }
    })
    if (data != null) {
      return res.status(200).json({ success: true });
    }
    else {

      return res.json({ success: false, message: "Invalid username or password" });
    }
  }
  catch (error) {
    console.log(error)
  }
});
app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
