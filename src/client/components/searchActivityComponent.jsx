import React from 'react';
export default function SearchActivityComponent(props) {
  const { allActivities, updateActivityToSearch, searchRatingForActivity, searchActivity, addSearchActivity } = props;
  const items = []
  for (let i = 0; i < allActivities.length; i += 1) {
    items.push(<li className="searchActivityList " key={i}> <input type="radio" name="activity" onClick={addSearchActivity} value={allActivities[i]}/><label> {allActivities[i]}</label></li>);
  }
  return (
    <div className="components">
      <h4>Search Average Day Rating of an Activity</h4>
      <div id="createRatingComponent">
        <ul className="activityList-Container">
          {items}
        </ul>
        <button onClick={searchRatingForActivity}>Get Average Rating</button>
        <br/>
        <br/>
        <h4>Your average daily rating for that activity is: {searchActivity[1]} </h4>
      </div>
    </div>
  );
}