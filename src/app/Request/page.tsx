"use client"

import React from 'react';
import { toast } from 'react-toastify';

const Scouting = () => {
  const handleClick = async () => {
    // Define the request data
    const requestData = {
      action: 'edit',
      team_number: 5951,
      coordinates: [[10, 10], [2000, 100], [1500, 50]],
    };

    try {
      // Send the HTTP request
      const response = await fetch('https://MA5951.pythonanywhere.com/update_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success('Request sent successfully');
      } else {
        toast.error(`Failed to send request. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Error sending request');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0px', fontSize: '48px' }}>Scouting send request</h1>
        <div style={{ textAlign: 'center' }}>
        </div>
      </div>
      <button className='purpleButton' onClick={() => handleClick()}>Gimmi Random</button>
    </div>
  );
};

export default Scouting;