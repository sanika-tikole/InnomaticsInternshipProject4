import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // AntD table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        <span
          className={`badge ${record.isDoctor ? "bg-success" : "bg-secondary"}`}
        >
          {record.isDoctor ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger btn-sm">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center mb-4 text-primary">Users List</h1>
        <div className="table-responsive shadow-lg p-3 bg-white rounded">
          <Table columns={columns} dataSource={users} rowKey="_id" />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
