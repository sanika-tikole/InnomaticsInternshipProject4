import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col, Card, Typography } from "antd";
import DoctorList from "../components/DoctorList";
import "../styles/HomePage.css"; // Import the CSS file

const { Title } = Typography;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctor data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <Title level={2} className="homepage-title">Our Doctors</Title>
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <Card key={doctor._id} hoverable className="doctor-card">
            <DoctorList doctor={doctor} />
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
