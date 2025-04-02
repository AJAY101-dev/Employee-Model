const empServices = require("../services/empServices");
const Employee = require("../models/empModel");

const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345';







const bcrypt = require("bcryptjs");








const createEmployee = async (req, res) => {
  try {
    const plainPassword = req.body.password;

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    req.body.password = hashedPassword;

    console.log(" come on after hashing done ");

    const employeeData = req.body;

    const newEmployee = await empServices.createEmployee(employeeData);
    console.log(newEmployee);
    console.log(" after hashing here ");

    const empData = {
      statusCode: 201,
      message: "Employee created successfully",
      data: newEmployee, // This will be the actual employee data saved
    };

    res.status(201).json(empData);
  } catch (error) {
    res
      .status(400)
      .json([
        { statusCode: 400 },
        console.log(error)
        // { message: "Error while  creating new  employee", error },
      ]);
  }
};


// Get all employees


const getAllEmployees = async (req, res) => {
  try {
    console.log(" i am consoling here in try");
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: "Error fetching employees", error });
    console.log(" i am consoling here in catch ");
  }
};

//  validation 

const validLogin = async (req,res)=>
{
  try {
    const {_id,email,password}= req.body;
     
    const loginEmail =  await Employee.findOne({email});
    if(!loginEmail)
    {
      return res.status(400).json({
        statusCode:400,
        message:"no such  email found here ... please enter valid email"
      })
      
    }
    if(!await bcrypt.compare(password,loginEmail.password))
    {
      return res.status(400).json({
        statusCode:400,
        message:"password not matched  please enter valid password"
      })
      
    }
// const {_id}= req.body;
//  implementing the token here 
    const token = jwt.sign({
      id: _id,
      username: email,
    }, secretKey, { expiresIn: '5m' });
    
    console.log("token is here ",token);

    return res.status(200).json({
      statusCode:200,
      message: " login  done successfully ...",
      token:token
    })


  } catch (error) {
    return res.status(500).json({
      statusCode:500,
      message:" some internal error "
    })
  }

}






const getAllEmployeesPagination = async (req, res) => {
    try {
    
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 3; 
   
    const skip = (page - 1) * limit;

    const employees = await Employee.find().skip(skip).limit(limit);

    const totalCount = await Employee.countDocuments();

  
    const totalPages = Math.ceil(totalCount / limit);

    return res.json({
      data: employees,
      totalCount,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
 
};






//  implementing the searching using the query  in 


function searchEmployee(query, data) {
  const queryLower = query.toLowerCase();
  return data.filter((emp) =>
      emp.name.toLowerCase().includes(queryLower) || emp.email.toLowerCase().includes(queryLower));
}


const getAllEmployeesSearch = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const allEmployees = await Employee.find({});
    const results = searchEmployee(query, allEmployees);

    return res.json(results);
  } catch (error) {
    console.error("Error during search:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during the search" });
  }
};

// READ: Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const employee = await empServices.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: "Error fetching employee", error });
  }
};

// UPDATE: Update an employee's details
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: "Error updating employee", error });
  }
};

// DELETE: Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting employee", error });
  }
};

const authenticateMiddleware = (req,res,next)=>
{
try {
  const token = req.headers["authorization"];
  if(!token)
  {
    return req.status(401).json({
      statusCode:401,
      message: " token not found .."
    })
  }
  // console.log(token);        // gives output as in bearer jkasbdsiudweuowf98532hg2t23u79hg98h3d2h08odh38d 
  const newToken= token.split(' ')[1];
  
  jwt.verify(newToken,secretKey,(err,decoded)=>
  {
    if(err)
    {
     return res.status(401).json({
      statusCode:401,
      message:"some error occured .."
     })
    }
  })
  
} catch (error) {
  res.status(401).json({
    statusCode:401,
    message: error.message
  })
  
}

console.log(" token vallidation done sucessfully ....")
next();

}




module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAllEmployeesSearch,
  getAllEmployeesPagination,
  validLogin,
  authenticateMiddleware,
};
