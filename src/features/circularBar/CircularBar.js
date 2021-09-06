import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar = ({ value }) => {
  return (
    <CircularProgressbar
      value={value}
      maxValue={10}
      text={`${value} days left`}
      styles={buildStyles({
        textSize: '12px'
      })}
    />
  )
}

export default CircularBar;
