import React, { useState } from "react";

const App = () => {
  const [employee, setEmployee] = useState({});
  const [empList, setEmpList] = useState([]);
  const [empId, setEmpId] = useState(-1);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "skills") {
      let skills = employee.skills || [];
      checked
        ? skills.push(value)
        : (skills = skills.filter((item) => item !== value));
      setEmployee({ ...employee, skills });
    } else {
      const emp = { ...employee, [name]: value };
      setEmployee(emp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updateEmp;

    if (empId === -1) {
      const newEmp = { id: Date.now(), ...employee };
      updateEmp = [...empList, newEmp];
    } else {
      updateEmp = empList.map((val) =>
        val.id === empId ? { ...employee, id: empId } : val
      );
    }

    setEmpList(updateEmp); 
    setEmpId(-1);          
    setEmployee({});       
  };

  const handleDelete = (id) => {
    const newEmpList = empList.filter((val) => val.id !== id);
    setEmpList(newEmpList);
  };

  const handleEdit = (id) => {
    const emp = empList.find((emp) => emp.id === id);
    setEmployee(emp); 
    setEmpId(id);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-5">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">Employee Management System</h2>
              <form method="post" onSubmit={handleSubmit}>
                {/* Employee Name */}
                <div className="mb-3">
                  <label htmlFor="employee" className="form-label fw-bold">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee"
                    name="empName"
                    value={employee.empName || ""}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                  />
                </div>

                {/* Salary */}
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label fw-bold">
                    Salary
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={employee.salary || ""}
                    onChange={handleChange}
                    placeholder="Enter salary"
                  />
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Gender</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        checked={employee.gender === "Male"}
                        onChange={handleChange}
                        value="Male"
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        checked={employee.gender === "Female"}
                        onChange={handleChange}
                        value="Female"
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                {/* Department */}
                <div className="mb-3">
                  <label htmlFor="department" className="form-label fw-bold">
                    Department
                  </label>
                  <select
                    className="form-select"
                    id="department"
                    name="department"
                    value={employee.department || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Skills */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Skills</label>
                  {["JavaScript", "React", "Node.js"].map((skill, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={employee.skills?.includes(skill) || false}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`skill${index}`}
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={employee.address || ""}
                    onChange={handleChange}
                    placeholder="Enter address"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Employee Table */}
            <div className="card shadow p-4 mt-5">
              <h4 className="mb-3">Employee List</h4>
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Skills</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {empList.map((emp, idx) => (
                    <tr key={emp.id}>
                      <td>{idx + 1}</td>
                      <td>{emp.empName}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.department}</td>
                      <td>{emp.skills?.join(", ")}</td>
                      <td>{emp.address}</td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEdit(emp.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
