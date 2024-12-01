import React, { useState, useEffect } from "react";
import "./Edit.css";
import { EditProps, useEdit } from "./useEdit";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Student } from "../../types/Student";

const Edit: React.FC = (props: EditProps) => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student>({
    Name: "",
    Specialization: "",
    Email: "",
    Description: "",
    DateOfBirth: "",
  });
  const specializations = [
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Front End Developer", label: "Front End Developer" },
    { value: "Back End Developer", label: "Back End Developer" },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/students/${id}`, student)
      .then((response) => {
        console.log("Student updated:", response.data);
        alert("Student updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className="add-student-container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <label>Name </label>
        <input
          type="text"
          name="Name"
          value={student.Name}
          onChange={handleChange}
          required
        />

        <label>Specialization </label>
        <select
          name="Specialization"
          value={student.Specialization}
          onChange={handleChange}
          required
        >
          {specializations.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>

        <label>Email </label>
        <input
          type="email"
          name="Email"
          value={student.Email}
          onChange={handleChange}
          required
        />

        <label>Description </label>
        <textarea
          name="Description"
          value={student.Description}
          onChange={handleChange}
        />

        <label>Date of Birth </label>
        <input
          type="date"
          name="DateOfBirth"
          value={student.DateOfBirth}
          onChange={handleChange}
        />

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default Edit;
