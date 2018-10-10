import React, { Component } from 'react'; //equivalent to react.component
import DisplayAverageComponent from './components/displayAverageComponent';
import CreateRatingComponent from './components/createRatingComponent';
import SearchActivityComponent from './components/searchActivityComponent.jsx';
import { diff } from 'semver';


class App extends Component {
  constructor() {
    super();
    this.state = {
      ratings: [],
      newRating: '',
      newActivity: '',
      newActivities: [],
      allActivities: [],
      searchActivity: ['', ''],
    };
    this.createDayRating = this.createDayRating.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.submitNewActivity = this.submitNewActivity.bind(this);
    this.updateNewActivity = this.updateNewActivity.bind(this);
    this.searchRatingForActivity = this.searchRatingForActivity.bind(this);
    this.updateActivityToSearch = this.updateActivityToSearch.bind(this);
    this.checkActivity = this.checkActivity.bind(this);
  }

  componentDidMount() {
    const updatedRatings = [];
    const updatedActivities = this.state.allActivities.slice();
    fetch('/ratings', {
    }).then((data) => {
      return data.json();
    }).then((newData) => {
      newData.forEach((day) => {
        updatedRatings.push(day.rating);
        day.activities.forEach((activity) => {
          if(!updatedActivities.includes(activity)) {
            updatedActivities.push(activity)
          }
        });
      });
      this.setState({ ...this.state, ratings: updatedRatings, allActivities: updatedActivities });
    })
  }

  createDayRating() {
    const { ratings, newRating, newActivities } = this.state;
    const ratingsCopy = ratings.slice();
    const newDayRating = { rating: newRating, activities: newActivities };
    ratingsCopy.push(Number(newRating));
    this.setState({ ...this.state, ratings: ratingsCopy });
    fetch('/newDay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(newDayRating),
    }).then(response => response.json());
  }

  submitNewActivity() {
    const { newActivities, newActivity } = this.state;
    const newActivitiesCopy = newActivities.slice();
    newActivitiesCopy.push(newActivity);
    this.setState({ ...this.state, newActivities: newActivitiesCopy });
  }

  searchRatingForActivity() {
    const { searchActivity } = this.state;
    const ratingsArr = [];
    const searchTerm = searchActivity[0];
    fetch('/searchActivity', {
    }).then((data) => {
      return data.json(); 
    }).then((newData) => {
      newData.forEach((day) => {
        day.activities.includes(searchActivity[0]) ? ratingsArr.push(day.rating): null;
      });
      const avgOfRatingsArr = ratingsArr.reduce((a, b) => a + b) / ratingsArr.length;
      const newSearchArr = [searchTerm, avgOfRatingsArr.toFixed(2)];
      this.setState({ ...this.state, searchActivity: newSearchArr })
      console.log(this.state);
    });
  }

  updateRating(event) {
    const userInputRating = event.target.value;
    this.setState({ ...this.state, newRating: userInputRating });
  }
  
  updateNewActivity(event) {
    const userInputActivity = event.target.value;
    this.setState({ ...this.state, newActivity: userInputActivity });
  }

  checkActivity(event) {
    console.log("test")
  }

  updateActivityToSearch(event) {
    const newSearch = this.state.searchActivity.slice();
    const userInputSearchActivity = event.target.value;
    newSearch[0] = userInputSearchActivity;
    this.setState({ ...this.state, searchActivity: newSearch });
    console.log(this.state);
  }

  render() {

    const { checkActivity, allActivities, searchActivity, ratings, averageRating, newRating, newActivities } = this.state;
    return (   
      <div>
        <DisplayAverageComponent ratings={ratings} averageRating={averageRating} />
        <CreateRatingComponent checkActivity={checkActivity} allActivities={allActivities} value={newRating} newActivities={newActivities} submitNewActivity={this.submitNewActivity} updateNewActivity={this.updateNewActivity} updateRating={this.updateRating} createDayRating={this.createDayRating} />
        <SearchActivityComponent searchActivity={searchActivity} updateActivityToSearch={this.updateActivityToSearch} searchRatingForActivity={this.searchRatingForActivity}/>
      </div>
    )
  }
}

export default App;