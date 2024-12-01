import React, { useState } from "react";
import axios from "axios";
import { Student } from "../../types/Student";
import "./AddStudent.css";

const AddStudent: React.FC = () => {
  const [newStudent, setNewStudent] = useState<Student>({
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/students", newStudent)
      .then((response) => {
        console.log("Student added:", response.data);
        alert("Student added successfully!");
        setNewStudent({
          Name: "",
          Specialization: "",
          Email: "",
          Description: "",
          DateOfBirth: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the student:", error);
      });
  };

  return (
    <div className="add-student-container">
      <h1>Add a New Student</h1>

      <form onSubmit={handleSubmit}>
        <label>Name </label>
        <input
          type="text"
          name="Name"
          value={newStudent.Name}
          onChange={handleChange}
          required
        />

        <label>Specialization </label>
        <select
          name="Specialization"
          value={newStudent.Specialization}
          onChange={handleChange}
          required
        >
          {specializations.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>

        <label>Description </label>
        <textarea
          name="Description"
          value={newStudent.Description}
          onChange={handleChange}
        />

        <label>Date of Birth </label>
        <input
          type="date"
          name="DateOfBirth"
          value={newStudent.DateOfBirth}
          onChange={handleChange}
        />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
