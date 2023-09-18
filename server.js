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
app.post('/addEmpTimeSheet', async (req, res) => {    
 await prisma.employee.create({
    data:{
     name:req.body.name,
     daterange:req.body.daterange,
     totalhours:req.body.totalhours,
     timesheetsRows:{
         createMany:{ 
          data:req.body.timesheetsRows
         }
         
     }
    }
  });
 
 res.json({status:200,message:'created successfully'})

     
 });

 app.get("/getdata", async (req, res) => {
  try {
    // await prisma.employee.deleteMany({})
    // await prisma.timesheet.deleteMany({})
    const getdetails = await prisma.employee.findMany({     
      include : {
        timesheetsRows : true
      }
    });
    let mainArr=[];
      for (let index = 0; index < getdetails.length; index++) {
        const element = getdetails[index];      
            element.timesheetsRows.map(ele=>{
            ele.daterange=element.daterange
            if(ele.status!= 'approve' && ele.status!= 'rejected' ){
            ele.name=element.name
            mainArr.push(ele);
            }
          })
        
       
      }
    
      res.status(201).json(mainArr);    
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error listing employeedata" });
    console.error("Error creating user:", error);
  }
});

// app.get('/getEmpDetails',async(req,res)=>{
//   try {
  
//     console.log('called getEmpDetails:', req.query)
//     const empTimeSheetDetails= await prisma.timesheet.findFirst({
//       where:{id:Number(req.query.id)},
     
//     })
//     console.log('empTimeSheetDetails',empTimeSheetDetails);
//     if(empTimeSheetDetails?.authorId){
//       const empdata=await prisma.employee.findFirst({
//         where:{id:Number(empTimeSheetDetails?.authorId)},
       
//       })
//       empTimeSheetDetails.daterange=empdata?.daterange;
//     }
//     res.status(200).json(empTimeSheetDetails);
//   } catch (error) {
//     console.log(error);
//     res
//         .status(500)
//         .json({ success: false, message: "Error listing employeedata" });
//   }
// });
app.put("/timesheetActivity", async (req, res) => {
  console.log('timedata',req?.body); 
  try{
    const  updateStatus = async (id, check) => {
      return  await prisma.timesheet.update(
        {
          where: { id: id },
          data: { "status": check }
        })
      }
  
    const results = await Promise.all(
      req?.body.map(obj => updateStatus(parseInt(obj.id), obj.status)) 
    )
        const getAllUpdated = await prisma.timesheet.findMany({});
    
    console.log('resp:',getAllUpdated);
    console.log("results",results);
    res.status(200).json(getAllUpdated);
    
  }
  catch (error) {
    console.log('error',error);
    res
      .status(500)
      .json({ success: false, message: "Error listing employeedata" });
    console.error("Error creating user:", error);
  }
  
});



  app.listen(port, () => {
    console.log("Server is running on port", port);
  });