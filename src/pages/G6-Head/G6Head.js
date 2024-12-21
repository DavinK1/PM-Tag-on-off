import React, { useState, useEffect } from "react";
import styles from "./G6Head.module.css";
import axios from "axios";

const G6Head = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/services/api/dbConnect");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Welcome to G6Head Page</h1>

      {/* Show loading spinner or message while data is being fetched */}
      {loading && <p>Loading...</p>}

      {/* Display error message if there is an error */}
      {error && <p>{error}</p>}

      {/* Render the fetched data if available */}
      <div>
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                {/* Customize this based on the data structure returned from the API */}
                <p>
                  {item.Machine_No} - {item.details}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No data available.</p> // Display this if no data is returned
        )}
      </div>
    </div>
  );
};

export default G6Head;
