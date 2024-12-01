import React, { useState, useEffect } from "react";
import axios from "axios";
import { Student } from "../../types/Student";
import "./StudentList.css";
import { useNavigate } from "react-router-dom";

const StudentList: React.FC<{
  students: Student[];
  setStudents: (students: Student[]) => void;
}> = ({ students, setStudents }) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching students:", error);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5000/students/${id}`).then(() => {
      setStudents(students.filter((student) => student.StudentID !== id));
    });
  };

  return (
    <div>
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Specialization</th>
            <th>Email</th>
            <th>Description</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.StudentID}>
              <td>{student.Name}</td>

              <td>{student.Specialization}</td>
              <td>{student.Email}</td>
              <td>{student.Description}</td>
              <td>{student.DateOfBirth}</td>
              <td>
                <button
                  onClick={() => navigate(`/Edit/${student.StudentID}`)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.StudentID ?? "")}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td className="no-students" colSpan={6}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
