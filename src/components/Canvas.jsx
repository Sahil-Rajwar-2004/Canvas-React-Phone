import React, { useState, useRef } from 'react';
import "./canvas.css"

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    const { x, y } = getCoordinates(event.touches[0]);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    if (isDrawing) {
      const { x, y } = getCoordinates(event.touches[0]);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const handleEraseClick = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Draw somethin' within the box 👇</h1>
      </div>
      <canvas
        id="draw"
        ref={canvasRef}
        width={width}
        height={height}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      ></canvas>
      <div className="btn">
        <button id="eraseBtn" onClick={handleEraseClick}>
          Erase
        </button>
        <button id="saveBtn" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Canvas;
