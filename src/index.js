import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { TextField, Button } from '@mui/material';
// import { rootShouldForwardProp } from '@mui/material/styles/styled';
// https://stackoverflow.com/questions/31758081/loading-json-data-from-local-file-into-react-js
import valid_courses from './valid_courses.json'


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
      const url = 'http://192.168.1.34:8080/' + this.state.subjectClicked + "/" + this.state.numberClicked + "/";
      // const url = 'https://flask-scraping-classes-api.b6eftcit5eg44.us-west-2.cs.amazonlightsail.com/' + this.state.subject + "/" + this.state.number + "/";
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
    this.setState({subjectClicked:event.target.value, numberClicked: valid_courses[event.target.value][0]});
  }
  handleNumberClicked(event) {
    this.setState({numberClicked:event.target.value})
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
        <h1>SJSU Transferable Classes Search</h1>
        <div className='form'>
          <div className='selector'>
            <div>
              <h2>Subject</h2>
              <select id="subject" onClick={this.handleSubjectClicked} defaultValue={"CS"} value={this.state.subjectClicked}>
                {Object.keys(valid_courses).map((key,i) => ( <option key = {i}>{key}</option>))}
              </select>
            </div>
            <div>
              <h2>Number</h2>
              <select id="number" onClick={this.handleNumberClicked} defaultValue="046A" value={this.state.numberClicked}>
                {valid_courses[this.state.subjectClicked].map((number,i) => (<option key = {i}>{number}</option>))}
              </select>
            </div>
            <Button variant="contained" onClick = {this.handleClick}>SUBMIT</Button>
          </div>
          {/* <TextField 
            value = {this.state.subject}
            onChange={this.handleSubjectChange}
            type = "search"
            id="outlined-basic"
            variant="outlined"
          /> */}
          {/* <TextField 
            value = {this.state.number}
            onChange={this.handleNumberChange} 
            type = "search"
            id="outlined-basic"
            variant="outlined"        
          /> */}
        </div>
          {/* valid input
              invalid input
              SHOWS UP AS INVALID UNTIL I  
              */}
          {/* {!this.state.valid && this.state.clicked && <p>{this.state.subject} {this.state.number} is invalid</p>} */}
          {/* <p>Please enter the subject abbreviation and class number exactly. Example: BIOL 0650 , ENGL 001B</p> */}
        <div>
        <div>
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
      </div>
      <footer>
        <p>Author: David Warshawsky</p>
        <p><a href="mailto:davidawarshawsky@gmail.com">davidawarshawsky@gmail.com</a></p>
      </footer> 
     </div>
     </html>
    );
  }
}

// ToDo list 



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
