import React from 'react';

export default function CreateRatingComponen(props) {
  const { checkActivity, allActivities, updateRating, updateNewActivity, submitNewActivity, createDayRating } = props;
  const listItems = []
  for(let i = 0; i < allActivities.length; i += 1) {
    listItems.push(<li className="activityList" key={i}> <input onChange={checkActivity} type="checkbox"></input><label>{allActivities[i]}</label></li>);
  }
  return (
    <div id="createRatingComponent">
      <input placeholder="rating" onChange={updateRating}></input>
      <input placeholder="activity" onChange={updateNewActivity}></input>
      <button onClick={submitNewActivity}>Add New Activity</button>
      <button onClick={createDayRating} >Submit Day Info</button>
      {listItems}
    </div>
  )
}