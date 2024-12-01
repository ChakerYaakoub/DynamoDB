import React from "react";
import "./About.css";
import { AboutProps, useAbout } from "./useAbout";

const About: React.FC = (props: AboutProps) => {
  const {} = useAbout(props);
  return (
    <div>
      <h1>About</h1>
      <p>
        This is a test application DynamoDB CRUD operations (Create, Read,
        Update, Delete) with DynamoDB for managing student records. <br />
        The application allows you to add, view, edit and delete students along
        with their specializations (Full Stack, Front End, or Back End
        Developer). <br />
        You can also filter the student list by their specialization to find
        specific developers.
      </p>
    </div>
  );
};

export default About;
