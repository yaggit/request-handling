// Backend API Endpoint (Node.js with Express)
app.get('/responses', async (req, res) => {
  try {
    const responses = await Response.find(); // Assuming you have a Response model
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Frontend Dashboard Page (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get('/responses'); // Assuming backend server is running on the same host
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Form Title</th>
            <th>User</th>
            <th>Response Data</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.formTitle}</td>
              <td>{response.user}</td>
              <td>{JSON.stringify(response.data)}</td> {/* Adjust as per your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
