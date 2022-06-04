import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { TextField, Button } from '@mui/material';
// import { rootShouldForwardProp } from '@mui/material/styles/styled';






class ClassSearch extends React.Component { 
  constructor(props){
    super(props);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCourseFromApi = this.getCourseFromApi.bind(this);
    this.returnRows = this.returnRows.bind(this);

    this.state = {
      subject: "",
      number: "",
      clicked: false,
      responseJson: [],
      rows: [],
      // valid: false,
      
    }
  }


  async getCourseFromApi() {
    try {
        const url = 'https://flask-scraping-classes-api.b6eftcit5eg44.us-west-2.cs.amazonlightsail.com/' + this.state.subject + "/" + this.state.number + "/";
        let response = await fetch(url);
        let responseJsonified = await response.json();
        this.setState({responseJson: responseJsonified});
        console.log(this.state.responseJson);
        // console.log(typeof(this.state.responseJson));
        this.returnRows(this.state.responseJson);
        this.setState({valid:true});
    }catch(error) {
      console.error(error);
      this.setState({valid:false});
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
      <div>
        <div className='form'>
          <h1>SJSU Transferable Classes Search</h1>
          <div>
          <h2>Subject</h2>
          <TextField 
            value = {this.state.subject}
            onChange={this.handleSubjectChange}
            type = "search"
            id="outlined-basic"
            variant="outlined"
          />
          </div>
          <div>
          <h2>Number</h2>
          <TextField 
            value = {this.state.number}
            onChange={this.handleNumberChange} 
            type = "search"
            id="outlined-basic"
            variant="outlined"        
          />
          </div>
          <Button variant="contained" onClick = {this.handleClick}>SUBMIT</Button>
          {/* valid input
              invalid input
              SHOWS UP AS INVALID UNTIL I  
              */}
          {/* {!this.state.valid && this.state.clicked && <p>{this.state.subject} {this.state.number} is invalid</p>} */}
          <p>Please enter the subject abbreviation and class number exactly. Example: BIOL 0650 , ENGL 001B</p>
        </div>
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
    

    );
  }
}





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
