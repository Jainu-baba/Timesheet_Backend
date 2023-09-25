const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.post('/updateTimeSheet', async (req, res) => {
  console.log("update", req?.body.timesheetsRows);
  try {
    const updateStatus = async (id, obj) => {
      return await prisma.timesheet.update(
        {
          where: { id: id },
          data: {
            projectCode: obj.projectCode,
            jobCode: obj.jobCode,
            day1: obj.day1,
            day2: obj.day2,
            day3: obj.day3,
            day4: obj.day4,
            day5: obj.day5,
            day6: obj.day6,
            day7: obj.day7,
            total: obj.total,
            status: obj.status,

          }
        })
    }
    Promise.all(
      req?.body.timesheetsRows.map(obj => updateStatus(parseInt(obj.id), obj))

    )
    res.json({ status: 200, message: 'Updated Timesheet successfully' })
  }
  catch {
    res
      .status(500)
      .json({ success: false, message: "Error listing employeedata" });
    console.error("Error creating user:", error);
  }
});

app.post('/submitTimeSheet', async (req, res) => {
  try {
    await prisma.employee.create({
      data: {
        name: req.body.name,
        daterange: req.body.daterange,
        totalhours: req.body.totalhours,
        timesheetsRows: {
          createMany: {
            data: req.body.timesheetsRows
          }

        }
      }
    });

    res.json({ status: 200, message: 'created successfully' })
  }
  catch {
    res
      .status(500)
      .json({ success: false, message: "Error listing employeedata" });
    console.error("Error creating user:", error);
  }


})

app.get("/getdata", async (req, res) => {
  try {
    // await prisma.employee.deleteMany({})
    // await prisma.timesheet.deleteMany({})
    const getdetails = await prisma.employee.findMany({
      include: {
        timesheetsRows: true
      }
    });
    let mainArr = [];
    for (let index = 0; index < getdetails.length; index++) {
      const element = getdetails[index];
      element.timesheetsRows.map(ele => {
        ele.daterange = element.daterange
          ele.name = element.name
          mainArr.push(ele);
      })


    }

    res.status(200).json(mainArr);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error listing employeedata" });
    console.error("Error creating user:", error);
  }
});

app.put("/statusChange", async (req, res) => {
  console.log('timedata', req?.body);
  try {
    const updateStatus = async (id, check) => {
      return await prisma.timesheet.update(
        {
          where: { id: id },
          data: { "status": check }
        })
    }

    const results = await Promise.all(
      req?.body.map(obj => updateStatus(parseInt(obj.id), obj.status))
    )
    const getAllUpdated = await prisma.timesheet.findMany({});

    //console.log('resp:',getAllUpdated);
    console.log("results", getAllUpdated);
    res.status(200).json(getAllUpdated);

  }
  catch (error) {
    console.log('error', error);
    res
      .status(500)
      .json({ success: false, message: "Error listing employeedata" });
    console.error("Error creating user:", error);
  }

});



app.listen(port, () => {
  console.log("Server is running on port", port);
});