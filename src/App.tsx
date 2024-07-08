import React from 'react';
import { useState } from 'react';
import './App.css';
import ResultBlock from './resultBlock/ResultBlock';
import DetailsPane from './detailsPane/DetailsPane';
import SearchBar from './searchBar/SearchBar';

//Class to hold data from queries
export class ResultType {
  creator: string = "";
  date: string = "";
  description: string[] = [""];
  format: string[] = [""];
  mediatype: string = "";
  subject: string[] = [""];
  title: string = "";
  constructor(json: any) {
    //Assign everything easy to assign
    Object.assign(this, { ...json });

    //The arrays are finicky
    this.description = FixArrayInput(json.description);
    this.format = FixArrayInput(json.format);
    this.subject = FixArrayInput(json.subject);

    //Truncate datetime to be just date for readability
    this.date = this.date.slice(0, 10);
  }
}

//Class that holds Search Terms the user creates.
export class SearchType {
  any: string = "";
  title: string = "";
  subject: string = "";
  creator: string = "";
  date: string = "";
  description: string = "";
}

//Function that just fixes the array input for ResultType
//Checks if the input is null, string, or array, and acts accordingly
const FixArrayInput = (data: any) => {
  if (data != null) {
    if (typeof data == "string") {
      return ([data]);
    } else {
      return data;
    }
  }
  return [""];
}

const App: React.FC = () => {

  //Data set from last api call
  const [currentResults, setCurrentResults] = useState<ResultType[]>([]);

  //page states + error messages
  const [isLoading, setIsLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleOpen, setTitleOpen] = useState(true);

  //Requests are split into 3 functions for readability.
  //Request manages the other two.
  //BuildRequest handles url construction.
  //SendRequest handles async issues, like fetch and ending the loading state. 

  const Request = (input: SearchType) => {
    //Set page states
    setTitleOpen(false);
    setIsLoading(true);
    setErrorMessage("");
    setDetailsOpen(-1);

    var url = BuildRequest(input);

    if (url == "") {
      setErrorMessage("No Query Entered");
      setIsLoading(false);
    } else {
      SendRequest(url);
    }

  }


  const BuildRequest = (input: SearchType) => {

    //Assemble a query from user input
    var query = ``;
    if (input.any != "") {
      query += `(${input.any}) AND `
    }
    if (input.title != "") {
      query += `title:(${input.title}) AND `
    }
    if (input.subject != "") {
      query += `subject:(${input.subject}) AND `
    }
    if (input.creator != "") {
      query += `creator:(${input.creator}) AND `
    }
    if (input.date != "") {
      query += `date:${input.date} AND `
    }
    if (input.description != "") {
      query += `description:(${input.description}) AND `
    }
    //This goes off if all input fields are empty, letting Request know to throw an error instead of making a doomed API call.
    if (query.length <= 0) {
      return ""
    }
    setTitleOpen(false);
    //Truncate the last AND
    query = query.substring(0, query.length - 5);
    //Remove problem characters
    query = encodeURIComponent(query);
    //Add the rest of the URL and return
    return `https://archive.org/advancedsearch.php?q=${query}&output=json&rows=100&page=1`;
  }


  const SendRequest = (url: string) => {
    //Obtain JSON from the Internet Archive
    fetch(url).then((result) => {
      result.json().then((resultJson) => {
        //Check for JSON error
        if (resultJson.error) {
          setErrorMessage(resultJson.error)
          setIsLoading(false);
          return;
        }
        //Collect all docs, store in temp...
        let temp = new Array<ResultType>();
        for (var i = 0; i < resultJson.response.docs.length; i++) {
          //Create new ResultType to handle JSON parsing in constructor
          let doc = new ResultType(resultJson.response.docs[i]);
          temp.push(doc);
        }
        //...Then move to currentResults.
        setCurrentResults(temp);
        //All done! Set page state back to normal.
        setIsLoading(false);
      })
      //Catches any fetch errors that would result in no JSON response.
    }).catch((reason) => {
      setErrorMessage(reason.message);
      setIsLoading(false);
    })
  }

  //Figures out which content to display on the right side of the screen based on page state
  const RightContent = () => {
    if (isLoading) {  //Currently Loading Results
      return (
        <div className='col-9 text-center align-middle'>
          <h1 className='card p-5 m-5'>
            Loading...
          </h1>
        </div>
      );
    }

    else if (titleOpen == true) { //Shows the Title Page
      return (
        <div className='col-9 text-center align-middle'>
          <div className='card border-3 p-5 m-5'>
            <h1>Internet Archive Advanced Search</h1>
            <p>Frontend Designed By Seth Ewer</p>
          </div>
        </div>
      )
    }

    else if (errorMessage != "") { //Displays search errors
      return (
        <div className='col-9 text-center align-middle'>
          <div className='card border-danger text-danger border-3 p-5 m-5'>
            <h1>Error</h1>
            <h3>{errorMessage}</h3>
          </div>
        </div>
      )
    }

    else if (detailsOpen !== -1) {  //Details Pane Open
      return (
        <div className='col-9'>
          <DetailsPane result={currentResults[detailsOpen]} setDetailsOpen={setDetailsOpen} />
        </div>
      )
    }

    else if (currentResults.length == 0) { //Displays a nice 'no results' page
      return (
        <div className='col-9 text-center align-middle'>
          <div className='card border-3 border-secondary text-secondary p-5 m-5'>
            <h1>No Results</h1>
          </div>
        </div>
      )
    }

    else {  //Displays results
      return (
        <div className='col-9'>
          <h4 className='m-3'>Results</h4>
          <div className='row p-2'>
            {currentResults.map((result, index) => (
              <ResultBlock key={index} id={index} result={result} setDetailsOpen={setDetailsOpen} />
            ))}
          </div>
        </div>)
    }
  }

  return (
    <main className="container-fluid row">
      <div className='col-3' id="SearchSidebar">
        <SearchBar attemptSearch={Request} />
      </div>
      {RightContent()}
    </main>
  )
}

export default App;