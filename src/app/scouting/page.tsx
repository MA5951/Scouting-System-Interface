"use client"

// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { resetHttpRequest, sendHttpRequest } from './actions';
import {useRouter} from 'next/navigation';

// curl -X POST -H "Content-Type: application/json" -d "{\"action\": \"edit\", \"team_number\": 5951, \"ScoreCoordinates\": [[100, 500], [300, 400], [500, 600]], \"MissCoordinates\": [[500, 200], [800, 400], [1000, 100]], \"PoseCoordinates\": [[1500, 500], [1600, 400], [1700, 600]]}" https://MA5951.pythonanywhere.com/update_image

const Scouting = () => {
  const router = useRouter();
  const [teamNumber, setTeamNumber] = useState('');

  const shootCoordinatesArray: { x: number; y: number; }[] = [];
  const missCoordinatesArray: { x: number; y: number; }[] = [];
  const poseCoordinates = { x: 0, y: 0 };

  enum brushes {
    shoot,
    miss,
    pose
  }

  let selectedBrushValue = brushes.shoot;

  const getShootButtonClassName = () => {
    return selectedBrushValue === brushes.shoot ? 'disabledredButton' : 'redButton';
  };

  const getMissButtonClassName = () => {
    return selectedBrushValue === brushes.miss ? 'disabledredButton' : 'redButton';
  };

  const getPoseButtonClassName = () => {
    return selectedBrushValue === brushes.pose ? 'disabledredButton' : 'redButton';
  };

  const setToMissBrush = () => {
    selectedBrushValue = brushes.miss;
    console.log(selectedBrushValue);
  }

  const setToScoreBrush = () => {
    selectedBrushValue = brushes.shoot;
    console.log(selectedBrushValue);
  }

  const setToPoseBrush = () => {
    if (poseCoordinates.x === 0 && poseCoordinates.y === 0){
      selectedBrushValue = brushes.pose;
      console.log(selectedBrushValue);
    } else {
      toast.error('Start pose already set', {theme: 'colored'});
    }
  }

  const addToShootCordinates = (x: number, y: number) => {
    shootCoordinatesArray.push({ x, y });
  }

  const addToMissCordinates = (x: number, y: number) => {
    missCoordinatesArray.push({ x, y });
  }

  const resetArrays = () => {
    shootCoordinatesArray.length = 0;
    missCoordinatesArray.length = 0;
  }

  const handleClick = async () => {
    if (shootCoordinatesArray.length === 0 && missCoordinatesArray.length === 0 && poseCoordinates.x === 0 && poseCoordinates.y === 0) {
      console.log(shootCoordinatesArray);
      toast.error('Please click on the field to add coordinates', {theme: 'colored'});
      return;
    } else if (teamNumber === '') {
      toast.error('Please enter the team number', {theme: 'colored'});
      return;
    }
    try {
      const result = await sendHttpRequest({
        action: 'edit',
        team_number: Number(teamNumber),
        ScoreCoordinates: shootCoordinatesArray,
        MissCoordinates: missCoordinatesArray,
        PoseCoordinates: poseCoordinates
      });

      if (result.success) {
        toast.success('Request processed successfully', {theme: 'colored'});
        resetArrays();
      } else {
        toast.error(result.error || 'Failed to process the request', {theme: 'colored'});
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request', {theme: 'colored'});
    }
  };

  const resetHandleClick = async () => {
    if (teamNumber === '') {
      toast.error('Please enter the team number', {theme: 'colored'});
      return;
    }
    try {
      // prompt user to make sure he actually wants to reset the data make it so he has to enter the team number again to reset the data
      const num = window.prompt('Please enter the team number to reset the data');

      if (num != teamNumber) {
        toast.error('Incorrect team number');
      } else {
        const result = await resetHttpRequest(Number(teamNumber));

        if (result.success) {
          toast.success('Request processed successfully', {theme: 'colored'});
          resetArrays();
          router.replace("/scouting");
        } else {
          toast.error(result.error || 'Failed to process the request', {theme: 'colored'});
        }
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request', {theme: 'colored'});
    }
  }

  const handleImageClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const boundingRect = canvas.getBoundingClientRect();
  
    const xScale = 3256 / canvas.width;
    const yScale = 1616 / canvas.height;
  
    const x = Math.round((event.clientX - boundingRect.left) * xScale);
    const y = Math.round((event.clientY - boundingRect.top) * yScale);

    if (selectedBrushValue === brushes.shoot) {
      // Draw a green circle on the canvas at the clicked coordinates
      drawCircle(canvas, x / xScale, y / yScale, 'green');

      // Log the scaled coordinates to the console
      console.log(x, y);

      // Update the state with the original unscaled coordinates
      addToShootCordinates(x, y);
    } else if (selectedBrushValue === brushes.miss) {
      // Draw a green circle on the canvas at the clicked coordinates
      drawCircle(canvas, x / xScale, y / yScale, 'yellow');

      // Log the scaled coordinates to the console
      console.log(x, y);

      // Update the state with the original unscaled coordinates
      addToMissCordinates(x, y);
    } else if (selectedBrushValue === brushes.pose) {
      if (poseCoordinates.x === 0 && poseCoordinates.y === 0) {
        // Draw a green circle on the canvas at the clicked coordinates
        drawCircle(canvas, x / xScale, y / yScale, 'purple');

        // Log the scaled coordinates to the console
        console.log(x, y);

        // Update the state with the original unscaled coordinates
        poseCoordinates.x = x;
        poseCoordinates.y = y;
      } else {
        toast.error('Start pose already set', {theme: 'colored'});
      }
    }
  };

  // Function to draw a green circle on the canvas at the specified coordinates
  const drawCircle = (canvas: HTMLCanvasElement, x: number, y: number, color: string = 'green') => {
    const ctx = canvas.getContext('2d');
  
    // Check if ctx is not null before using it
    if (ctx !== null) {
      // Set the circle color to green
      ctx.fillStyle = color;
  
      // Draw a green circle at the specified coordinates
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    } else {
      console.error('CanvasRenderingContext2D is null. Unable to draw the circle.');
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
          <button className={getShootButtonClassName()} style={{marginLeft: '10px'}} onClick={setToScoreBrush}>
            Scored
          </button>
          <button className={getMissButtonClassName()} style={{marginLeft: '10px'}} onClick={setToMissBrush}>
            Missed
          </button>
          <button className={getPoseButtonClassName()} style={{marginLeft: '10px'}} onClick={setToPoseBrush}>
            Start pose
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
