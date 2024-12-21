import React, { useState, useEffect } from "react";
import styles from "./G6Head.module.css";
import axios from "axios";
const G6Head = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/transactions")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id} className={styles.main}>
          <p>ID: {item.id}</p>
          <p>Name: {item.machine_no}</p>
          <p>Username: {item.line}</p>
          <p>Email: {item.activity}</p>
        </div>
      ))}
    </div>
  );
};

export default G6Head;
