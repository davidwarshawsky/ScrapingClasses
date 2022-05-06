import React,{ useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { TextField, Button } from '@mui/material';
// import { rootShouldForwardProp } from '@mui/material/styles/styled';




function ClassSearchFunction(){
  // Stores subject and number
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState("");

  // Stores JSON response from Server
  const [responseJson, setResponseJson] = useState(Object([]));
  const [jsonRender, setJsonRender] = useState(Object([]));

  // Done
  function handleSubjectChange(event){
    setSubject(event.target.value);
    // console.log(subject);
  }
// Done
  function handleNumberChange(event){
    setNumber(event.target.value);
    // console.log(number);
  }

  // Done
  function handleClick(){
    console.log("BUTTON CLICKED");
    console.log("Search is for: " + subject + " " + number);
    getCoursesFromApi();
    console.log("Subject type: " + typeof(subject));
    console.log("Number type: " + typeof(number));
    console.log(responseJson);
    console.log("Type of responseJson: " + typeof(responseJson));
    console.log("Type of jsonRender: " + typeof(jsonRender));
    console.log(jsonRender);
    console.log("jsonRender length: " + jsonRender.length);
    setSubject(subject);
    }

  // Todo 
  async function getCoursesFromApi() {
  try {
      // Gets the data and sets responseJson
      const url = 'http://127.0.0.1:5000/' + subject + "/" + number + "/";
      // console.log("getCoursesFromApi url: " + url);
      let response = await fetch(url);
      // console.log("response");
      // console.log(response);
      let responseJsonified = await response.json();
      // console.log("responseJsonified: ");
      // console.log(responseJsonified);
      // console.log(typeof(responseJsonified));
      setResponseJson(responseJsonified);
      // console.log("responseJson in getCoursesFromApi");
      // console.log(responseJson);
      // For debugging added logging.
      // console.log("responseJson length: " + String(Object.keys(responseJson).length));
      const ren = returnData(responseJson);
      setJsonRender(ren);
      // setJsonRender(returnData(responseJson));
      // console.log("jsonRender length: " + String(Object.keys(jsonRender).length));
      // setRerender(rerender === 0 ? 1: 0);
      // console.log("Rerender value: " + String(rerender));
    } catch(error) {
      console.error(error);
    }
  }

  // https://stackoverflow.com/questions/22876978/loop-inside-react-jsx?page=1&tab=createdasc#tab-top
  function returnData(jsonData) {
    var rows = [];
    console.log("jsonData length: " + Object.keys(jsonData).length);
    for (var i = 0; i < Object.keys(jsonData).length; i++) {
      console.log(jsonData[i][0]);
      console.log(jsonData[i][1]);
      rows.push(
        <tr key={i}>
          <td>{jsonData[i][0]}</td>
          <td>{jsonData[i][1]}</td>
        </tr>
      );
    }
    return rows;
  }
  console.log("SUBJECT: " + subject + "\n" + "NUMBER: " + number);
  return(
    // https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
    <div>
      <div className='form'>
        <h1>SJSU Transferable Classes Search</h1>
        <TextField 
          value = {subject}
          onChange={handleSubjectChange}
          type = "search"
          id="outlined-basic"
          variant="outlined"
        />
        <TextField 
          value = {number}
          onChange={handleNumberChange} 
          type = "search"
          id="outlined-basic"
          variant="outlined"        
        />
        <Button variant="contained" onClick = {handleClick}>SUBMIT</Button>
      </div>
      {Object.keys(jsonRender).length > 0 &&
      <div>
       <table>
         <thead>
           <tr>
             <th>College</th>
             <th>Equivalent Course</th>
           </tr>
         </thead>
         <tbody>
           {jsonRender}
         </tbody>
        </table>
      </div>
      }
    </div>
  );
}

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
    }
  }


  async getCourseFromApi() {
    try {
        const url = 'http://127.0.0.1:5000/' + this.state.subject + "/" + this.state.number + "/";
        let response = await fetch(url);
        let responseJsonified = await response.json();
        this.setState({responseJson: responseJsonified});
        console.log(this.state.responseJson);
        // console.log(typeof(this.state.responseJson));
        this.returnRows(this.state.responseJson);
    }catch(error) {
      console.error(error);
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
          <TextField 
            value = {this.state.subject}
            onChange={this.handleSubjectChange}
            type = "search"
            id="outlined-basic"
            variant="outlined"
          />
          <TextField 
            value = {this.state.number}
            onChange={this.handleNumberChange} 
            type = "search"
            id="outlined-basic"
            variant="outlined"        
          />
          <Button variant="contained" onClick = {this.handleClick}>SUBMIT</Button>
          {this.state.clicked && <Button>YOU CLICKED THE BUTTON!</Button>}
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
