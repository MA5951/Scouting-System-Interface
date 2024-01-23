"use client"

// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { resetHttpRequest, sendHttpRequest } from './actions';
import {useRouter} from 'next/navigation';

const Scouting = () => {
  const router = useRouter();
  const [teamNumber, setTeamNumber] = useState('');
  const [clickedCoordinates, setClickedCoordinates] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  const handleClick = async () => {
    try {
      const result = await sendHttpRequest({
        action: 'edit',
        team_number: Number(teamNumber),
        coordinates: [[clickedCoordinates.x, clickedCoordinates.y]],
      });

      if (result.success) {
        toast.success('Request processed successfully');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to process the request');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request');
    }
  };

  const resetHandleClick = async () => {
    try {
      // prompt user to make sure he actually wants to reset the data make it so he has to enter the team number again to reset the data
      const num = window.prompt('Please enter the team number to reset the data');

      if (num != teamNumber) {
        toast.error('Incorrect team number');
      } else {
        const result = await resetHttpRequest(Number(teamNumber));

        if (result.success) {
          toast.success('Request processed successfully');
          router.refresh();
        } else {
          toast.error(result.error || 'Failed to process the request');
        }
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request');
    }
  }

  const handleImageClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const boundingRect = canvas.getBoundingClientRect();
  
    const xScale = 3256 / canvas.width;
    const yScale = 1616 / canvas.height;
  
    const x = Math.round((event.clientX - boundingRect.left) * xScale);
    const y = Math.round((event.clientY - boundingRect.top) * yScale);

    // Draw a green circle on the canvas at the clicked coordinates
    drawGreenCircle(canvas, x / xScale, y / yScale);

    // Log the scaled coordinates to the console
    console.log(x, y);

    // Update the state with the original unscaled coordinates
    setClickedCoordinates({ x, y });
  };

  // Function to draw a green circle on the canvas at the specified coordinates
  const drawGreenCircle = (canvas: HTMLCanvasElement, x: number, y: number) => {
    const ctx = canvas.getContext('2d');
  
    // Check if ctx is not null before using it
    if (ctx !== null) {
      // Set the circle color to green
      ctx.fillStyle = 'green';
  
      // Draw a green circle at the specified coordinates
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    } else {
      console.error('CanvasRenderingContext2D is null. Unable to draw the green circle.');
    }
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.getElementById('FieldCanvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
  
      // Calculate the scaled width based on 70% of the screen width
      const scaledWidth = window.innerWidth * 0.7;
  
      // Calculate the scaling factor for the width
      const scale = scaledWidth / image.width;
  
      // Set the canvas dimensions to match the scaled image
      canvas.width = scaledWidth;
      canvas.height = image.height * scale;
  
      // Clear any styles that may interfere with the canvas dimensions
      canvas.style.width = '';
      canvas.style.height = '';
  
      // Draw the scaled image on the canvas
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  
    image.src = '/emptyField.png';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '48px' }}>Scouting MA 5951</h1>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="teamNumber" style={{ color: 'white', marginRight: '10px', marginBottom: '10px', fontSize: '18px' }}>
            Team Number:
          </label>
          <input
            type="number"
            id="teamNumber"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
            style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <button className="purpleButton" onClick={handleClick}>
            Send Data
          </button>
          <button className="purpleButton" style={{marginLeft: '10px'}} onClick={resetHandleClick}>
            Reset
          </button>
        </div>
        <div
          id="imageContainer"
          className="card"
          style={{ position: 'relative', width: '70vw', overflow: 'hidden' }}
        >
          <canvas
            id="FieldCanvas"
            style={{ width: '100%', height: '100%' }}
            onClick={handleImageClick}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Scouting;
