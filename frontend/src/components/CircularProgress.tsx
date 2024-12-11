import React from 'react';
import 'App.css';

interface CircularLoaderProps {
  size?: number; // Size of the loader in pixels
  thickness?: number; // Thickness of the loader stroke
  color?: string; // Color of the loader
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 50,
  thickness = 4,
  color = '#3498db',
}) => {
  return (
    <div
      className='circular-loader'
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderColor: `${color} transparent transparent transparent`,
      }}
    ></div>
  );
};

export default CircularLoader;
