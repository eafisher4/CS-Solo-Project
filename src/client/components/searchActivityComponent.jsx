import React from 'react';
export default function SearchActivityComponent(props) {
  const { updateActivityToSearch, searchRatingForActivity, searchActivity } = props;

  return (
    <div>
      <h3>Search Average Daily Rating of Activity</h3>
      <div id="createRatingComponent">
        <input placeholder="activity" onChange={updateActivityToSearch}></input>
        <button onClick={searchRatingForActivity}>Get Average Rating</button>
        <h4>Your average daily rating for that activity is: {searchActivity[1]} </h4>
      </div>
    </div>
  );
}