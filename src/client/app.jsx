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
    this.addSearchActivity = this.addSearchActivity.bind(this);
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
    console.log("newActs ", newActivities)
    const alertRating = newRating;
    const alertActivities = newActivities;
    let alertActivitiesString = '';
    if (alertActivities.length === 0) {
      console.log("ran")
      alertActivitiesString += "did nothing";
    } else {
      alertActivities.forEach((activity, index) => {
        if(index !== alertActivities.length-1 || alertActivities.length === 1) {
          alertActivitiesString += activity + " ";
        } else {
          alertActivitiesString += "and " + activity;
        }
      })
    }
    if(newRating >= 0 && newRating <= 10 && typeof(newRating) === 'number') {
      const ratingsCopy = ratings.slice();
      const newDayRating = { rating: newRating, activities: newActivities };
      ratingsCopy.push(Number(newRating));
      console.log('newDay: ', newDayRating)
      //this.setState({ ...this.state, ratings: ratingsCopy });
      fetch('/newDay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(newDayRating),
      }).then(response => response.json()
      ).then(this.setState({ ...this.state, ratings: ratingsCopy, newActivities: [] })
      ).then(alert("Thanks! Your info was saved. You gave your day a rating of " + alertRating + " and you " + alertActivitiesString));
    } else {
      alert('please enter a rating number between 1 and 10')
    }
  }

  submitNewActivity() {
    const { newActivities, newActivity, allActivities } = this.state;
    //const newActivitiesCopy = newActivities.slice();
    //newActivitiesCopy.push(newActivity);
    const allActivitiesCopy = allActivities.slice();
    if (!allActivitiesCopy.includes(newActivity)) {
      allActivitiesCopy.push(newActivity);
    }
    this.setState({ ...this.state, allActivities: allActivitiesCopy});
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
    });
  }

  updateRating(event) {
    const userInputRating = event.target.value;
    this.setState({ ...this.state, newRating: Number(userInputRating) });
  }
  
  updateNewActivity(event) {
    const userInputActivity = event.target.value;
    this.setState({ ...this.state, newActivity: userInputActivity });
  }

  checkActivity(event) {
    const checkedActivity = event.target.value
    const { newActivities } = this.state;
    const newActivitiesCopy = newActivities.slice();
    console.log('Acts arr: ', newActivitiesCopy)
    console.log('checkedActivity: ', checkedActivity);
    if (newActivitiesCopy.includes(checkedActivity)) {
      console.log('inside')
      newActivitiesCopy.splice(newActivitiesCopy.indexOf(checkedActivity), 1);
    } else {
      newActivitiesCopy.push(checkedActivity);
    }
    this.setState({ ...this.state, newActivities: newActivitiesCopy});
  }

  addSearchActivity(event) {
    const newSearch = this.state.searchActivity.slice();
    const userInputSearchActivity = event.target.value;
    newSearch[0] = userInputSearchActivity;
    this.setState({ ...this.state, searchActivity: newSearch });
  }

  render() {

    const { allActivities, searchActivity, ratings, averageRating, newRating, newActivities } = this.state;
    console.log("render acts: ", newActivities)
    return (   
      <div>
        <DisplayAverageComponent ratings={ratings} averageRating={averageRating} />
        <CreateRatingComponent checkActivity={this.checkActivity} allActivities={allActivities} value={newRating} newActivities={newActivities} submitNewActivity={this.submitNewActivity} updateNewActivity={this.updateNewActivity} updateRating={this.updateRating} createDayRating={this.createDayRating} />
        <SearchActivityComponent allActivities={allActivities} addSearchActivity={this.addSearchActivity} searchActivity={searchActivity} addSearchActivity={this.addSearchActivity} searchRatingForActivity={this.searchRatingForActivity}/>
      </div>
    )
  }
}

export default App;