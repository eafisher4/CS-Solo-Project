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
      averageRating: 'N/A',
    };
    this.createDayRating = this.createDayRating.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.submitNewActivity = this.submitNewActivity.bind(this);
    this.updateNewActivity = this.updateNewActivity.bind(this);
  }

  componentDidMount() {
    const updatedRatings = [];
    fetch('/ratings', {
    }).then((data) => {
      return data.json(); 
    }).then((newData) => {
      newData.forEach((day) => {
        updatedRatings.push(day.rating)
      });
      console.log(updatedRatings);
      this.setState({ ...this.state, ratings: updatedRatings })
    });
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
    }).then(response => console.log(response.json()));
  }

  submitNewActivity() {
    const { newActivities, newActivity } = this.state;
    const newActivitiesCopy = newActivities.slice();
    newActivitiesCopy.push(newActivity);
    this.setState({ ...this.state, newActivities: newActivitiesCopy });
  }

  updateRating(event) {
    const userInputRating = event.target.value;
    this.setState({ ...this.state, newRating: userInputRating });
    console.log(this.state);
  }
  
  updateNewActivity(event) {
    const userInputActivity = event.target.value;
    this.setState({ ...this.state, newActivity: userInputActivity });
  }


  // searchRatingForActivity(activity) {

  // }

  render() {

    const { ratings, averageRating, newRating, newActivities } = this.state;
    return (   
      <div>
        <DisplayAverageComponent ratings={ratings} averageRating={averageRating} />
        <CreateRatingComponent value={newRating} newActivities={newActivities} submitNewActivity={this.submitNewActivity} updateNewActivity={this.updateNewActivity} updateRating={this.updateRating} createDayRating={this.createDayRating} />
      </div>
    )
  }
}

export default App;