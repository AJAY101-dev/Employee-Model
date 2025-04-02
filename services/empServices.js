const Employee = require('../models/empModel');





exports.createEmployee = async (employeeData) =>{
    return await Employee.create(employeeData);
}




exports.getEmployeeById=  async(id) =>
{
     return await  Employee.findById(id);
}