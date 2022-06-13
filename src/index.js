import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {Button } from '@mui/material';
// import TextField from '@mui/material';
// import { rootShouldForwardProp } from '@mui/material/styles/styled';
// https://stackoverflow.com/questions/31758081/loading-json-data-from-local-file-into-react-js
import valid_courses from './valid_SJSU_courses.json'


// function json_file_to_dict(filename) {
//   var json_data = JSON.parse("json!./" + filename)
// }




class ClassSearch extends React.Component { 
  constructor(props){
    super(props);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubjectClicked = this.handleSubjectClicked.bind(this);
    this.handleNumberClicked = this.handleNumberClicked.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCourseFromApi = this.getCourseFromApi.bind(this);
    this.returnRows = this.returnRows.bind(this);

    this.state = {
      subject: "",
      number: "",
      subjectClicked:"CS",
      numberClicked:"046A",
      newSubjectClicked: false,
      clicked: false,
      responseJson: [],
      rows: [],
      // valid: false,
      
    }
  }

  componentDidMount(){
    document.title = "SJSU Transfer"
  }
  

  async getCourseFromApi() {
    try {
      // const url = 'http://127.0.0.1:8080/' + this.state.subjectClicked + "/" + this.state.numberClicked + "/";
      const url = 'https://flask-scraping-classes-api.b6eftcit5eg44.us-west-2.cs.amazonlightsail.com/' + this.state.subjectClicked + "/" + this.state.numberClicked + "/";
      let response = await fetch(url);
      let responseJsonified = await response.json();
      this.setState({responseJson: responseJsonified});
      console.log(this.state.responseJson);
      // console.log(typeof(this.state.responseJson));
      this.returnRows(this.state.responseJson);
      // this.setState({valid:true});
    }catch(error) {
      console.error(error);
      // this.setState({valid:false});
    }
  }

  returnRows(jsonData) {
    console.log("returnRows was called");
    var rows1 = [];
    // console.log("jsonData length: " + jsonData.length);
    for (var i = 0; i < jsonData.length; i++) {
      // console.log(jsonData[i][0]);
      // console.log(jsonData[i][1]);
      rows1.push(
        <tr key={i}>
          <td>{jsonData[i][0]}</td>
          <td>{jsonData[i][1]}</td>
        </tr>
      );
    }
    // return rows;
    this.setState({rows: rows1});
    }

  handleSubjectChange(event){
    this.setState({subject: event.target.value});
  }

  handleNumberChange(event){
    this.setState({number: event.target.value});
  }

  handleSubjectClicked(event) {
    console.log(event.target.value);
    this.setState({subjectClicked:event.target.value, numberClicked: valid_courses[event.target.value][0]});
  }
  handleNumberClicked(event) {
    console.log(event.target.value);
    this.setState({numberClicked:event.target.value});
  }

  handleClick(){
    // this.setState({clicked: true});
    this.getCourseFromApi();
    this.returnRows(this.state.responseJson);
    this.setState({clicked:true});

  }


  render() {
    // console.log(this.state.responseJson.length);
    // console.log(this.state.rows.length);
    return (
      <html>
        <head>
          <title>SJSU Transfer</title>
        </head>
        <div>
          <div>
            <h1>SJSU Transferable Classes Search</h1>
          </div>
          <div className='navigation'>
          {/* <div className='selector'> */}
            <div className='row'>
              <h2>Subject</h2>
              <select 
                id="subject" onClick={this.handleSubjectClicked} defaultValue={"CS"}>
                {Object.keys(valid_courses).map((key,i) => ( <option key = {i}>{key}</option>
                ))}
              </select>
            </div>
            <div className='row'>
              <h2>Number</h2>
              <select 
                id="number" onClick={this.handleNumberClicked} defaultValue="046A">
                {valid_courses[this.state.subjectClicked].map((number,i) => (<option key = {i}>{number}</option>))}
              </select>
            </div>
          </div>
          <div><Button variant="contained" onClick = {this.handleClick}>SUBMIT</Button></div>
          <div className='casestudy'>
            <table>
              <thead>
                <tr>
                  <th>College</th>
                  <th>Equivalent Course</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rows}
              </tbody>
            </table>
          </div>
      
      <footer>
        <div id="footer">
          <p >©2022 David Warshawsky</p>
          <p><a href="mailto:davidawarshawsky@gmail.com">davidawarshawsky@gmail.com</a></p>
        </div>
      </footer> 
     </div>
     </html>
    );
  }
}

// ToDo list \
// Make a list of checkboxes with universities that a student will consider
// Add a dropdown menu for the course the student wants to find equivalent at another school
// if it exists.
// There will be an add button so that way the student can see a list of the courses
// in a table that will transfer over and what the equivalent course will be. 


// class TransferableDropdown extends React.Component(){
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return (
//       <p>Hi</p>
      
//     )
//   }

// }



ReactDOM.render(
  <React.StrictMode>
    <ClassSearch/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
