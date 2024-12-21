import React, { useState, useEffect } from "react";
import styles from "./G6Head.module.css";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users"; // ดึงหลายรายการ

const G6Head = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id} className={styles.main}>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Username: {item.username}</p>
          <p>Email: {item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default G6Head;
