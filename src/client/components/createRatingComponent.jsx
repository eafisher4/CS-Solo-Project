import React from 'react';

export default function CreateRatingComponen(props) {
  const { checkActivity, allActivities, updateRating, updateNewActivity, submitNewActivity, createDayRating } = props;
  const listItems = []
  for (let i = 0; i < allActivities.length; i += 1) {
    listItems.push(<li className="activityList" key={i}> <input type="checkbox" onChange={checkActivity} value={allActivities[i]}/><label> {allActivities[i]}</label></li>);
  }
  return (
    <div className="createRatingComponent components">
      <h4>Create a New Rating</h4>
      <span>Rate your day on a scale of 1-10 </span><input placeholder="Your Rating" onChange={updateRating}></input><br/>
      <br/>
      <span>What did you do today? Type any new activities into the box and select activities from the list below it</span>
      <br/>
      <input placeholder="New Activity" onChange={updateNewActivity}></input>
      <button onClick={submitNewActivity}>Add New Activity</button>
      <br/>
      <br/>
      <div className="listItem-Container">
       {listItems}
      </div>
      <br/>
      <button onClick={createDayRating} >Submit Info for Today</button>
    </div>
  )
}