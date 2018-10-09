import React from 'react';

export default function CreateRatingComponent(props) {
  return (
    <div id="createRatingComponent">
      <input placeholder="rating" onChange={props.updateRating}></input>
      <input placeholder="activity" onChange={props.updateNewActivity}></input>
      <button onClick={props.submitNewActivity}>Add Activity</button>
      <button onClick={props.createDayRating} >Submit Day Info</button>
    </div>
  )
}