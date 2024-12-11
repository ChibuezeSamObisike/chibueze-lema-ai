import React from 'react';
import 'App.css';

interface CircularLoaderProps {
  size?: number;
  thickness?: number;
  color?: string;
  className?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 50,
  thickness = 4,
  color = '#3498db',
  className,
}) => {
  return (
    <div
      className={'circular-loader' + className}
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
