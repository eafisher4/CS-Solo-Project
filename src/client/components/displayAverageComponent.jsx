import React from 'react';

export default function DisplayAverageComponent(props) {
  const { ratings } = props;
  return (
  <div id="displayAvgComponent">
    <h3> Average Daily Rating {ratings.length === 0 ? '-' : (ratings.reduce((a,b) => a + b)/ratings.length).toFixed(2)} </h3>
  </div>);
}
