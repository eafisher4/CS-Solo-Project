import React from 'react';

export default function DisplayAverageComponent(props) {
  const { ratings } = props;
  return (
  <div className="displayAvgComponent components">
    <h3> Average Day Rating {ratings.length === 0 ? '-' : (ratings.reduce((a,b) => a + b)/ratings.length).toFixed(2)} </h3>
  </div>);
}
