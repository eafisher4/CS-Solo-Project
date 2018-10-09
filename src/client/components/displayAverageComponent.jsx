import React from 'react';

export default function DisplayAverageComponent(props) {
  const { ratings } = props;
  console.log("ratings: ", props.ratings)
  return (
  <div id="displayAvgComponent">
    <span> Average Daily Rating {ratings.length === 0 ? '-' : (ratings.reduce((a,b) => a + b)/ratings.length).toFixed(2)} </span>
  </div>);
}
