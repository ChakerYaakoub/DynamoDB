import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import { HomeProps, useHome } from "./useHome";
import StudentList from "../../components/StudentList/StudentList";
import { useNavigate } from "react-router-dom";
import { Student } from "../../types/Student";
import axios from "axios";

const Home: React.FC = (props: HomeProps) => {
  const {} = useHome(props);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const navigate = useNavigate();

  const fetchStudents = useCallback(async (specialization?: string) => {
    try {
      let url = "http://localhost:5000/students";

      if (specialization) {
        const encodedSpecialization = encodeURIComponent(specialization);
        url = `http://localhost:5000/students/specialization/${encodedSpecialization}`;
      }
      console.log(url);

      const response = await axios.get(url);
      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  }, []);

  useEffect(() => {
    fetchStudents(selectedSpecialization);
  }, [selectedSpecialization, fetchStudents]);

  const handleSpecializationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSpecialization(e.target.value);
    },
    []
  );

  const specializations = [
    { value: "", label: "All Specializations" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Front End Developer", label: "Front End Developer" },
    { value: "Back End Developer", label: "Back End Developer" },
  ];

  const handleNavigate = useCallback(() => {
    navigate("/Add");
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="filter-section">
        <div className="filter-section-inner">
          <select
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
            className="specialization-select"
          >
            {specializations.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.label}
              </option>
            ))}
          </select>
          <button onClick={handleNavigate} className="add-button">
            Add New Student
          </button>
        </div>
      </div>
      <StudentList students={students} setStudents={setStudents} />
    </div>
  );
};

export default Home;
