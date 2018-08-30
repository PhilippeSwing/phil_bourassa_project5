import React, { Component } from 'react';
import './styles/App.css';
// Imported the configured firebase module
import firebase from './components/firebase';

// COMPONENTS
import Home from './components/Home';
import NewLogForm from './components/NewLogForm';
import PastLogs from './components/PastLogs';

// GLOBAL VARIABLES
const dbRef = firebase.database().ref();

// APP class
class App extends Component {
  componentDidMount() {
    // FIREBASE
    // add event listener to tell us if the database has anything on load and when everything changes
    dbRef.on('value', (snapshot) => {
      this.sortLogs(snapshot.val());
    });
  }

  // Function to be used as a callback in the NewLogForm component
  addLogToDatabase = (oneLog) => {
    dbRef.push(
      oneLog
      // date: date,
      // partners: partners,
      // outline: outline,
      // retrospective: retrospective,
    )
  }

  sortLogs = (logObject) => {
    // Turn the firebase log object into an array
    const logArray = Object.entries(logObject);
    // console.log(logArray);
    // Map through the logArray
    logArray.map((logItem) => {
      return {
        key: logItem[0],
        date: logItem[1].date,
        partners: logItem[1].partners,
        topics: logItem[1].topics,
        video: logItem[1].video,
        timestamp: logItem[1].timestamp,
        prepNotes: logItem[1].prepNotes,
        workInProgress: logItem[1].workInProgress,
        readyForDance: logItem[1].readyForDance,
        newIdeas: logItem[1].newIdeas,
        partnerLearn: logItem[1].partnerLearn,
        gameNext: logItem[1].gameNext,
        retroNotes: logItem[1].retroNotes,
      }
    })
  }

  render() {
    console.log('App render called');
    // Goes to the root of the firebase database

    return (
      <div className="App wrapper-prim">
        {/* HOME PAGE */}
        <Home />
        {/* // NEW LOG PAGE/SECTION */}
        <NewLogForm addLogToDatabase={this.addLogToDatabase} />
        {/* PAST LOGS PAGE/SECTION */}
        <PastLogs />
      </div>
    );
  }
}

export default App;
