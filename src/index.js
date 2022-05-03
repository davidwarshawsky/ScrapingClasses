import React,{ useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { TextField, Button } from '@mui/material';
// import { rootShouldForwardProp } from '@mui/material/styles/styled';


function ClassSearch(){
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState("");

  const [responseJson, setResponseJson] = useState(Object());
  const [jsonRender, setJsonRender] = useState(Object());
// Done
  function handleSubjectChange(event){
    setSubject(event.target.value);
    console.log(subject);
  }
// Done
  function handleNumberChange(event){
    setNumber(event.target.value);
    console.log(number);
  }

  // Done
  function handleClick(){
    console.log(subject + " " + number);
    getCoursesFromApi();
  }

  // Todo 
  async function getCoursesFromApi() {
    console.log(subject + " " + number);
  try {
      // Gets the data and sets responseJson
      const url = 'http://127.0.0.1:5000/' + subject + "/" + number + "/";
      let response = await fetch(url);
      let responseJsonified = await response.json();
      setResponseJson(responseJsonified);
      setJsonRender(returnData(responseJson));
    } catch(error) {
      console.error(error);
    }
  }

  // https://stackoverflow.com/questions/22876978/loop-inside-react-jsx?page=1&tab=createdasc#tab-top
  function returnData(jsonData) {
    var rows = [];
    for (var i = 0; i < Object.keys(jsonData).length; i++) {
      rows.push(
        <tr>
          <td>{jsonData[i][0]}</td>
          <td>{jsonData[i][1]}</td>
        </tr>
      );
    }
    return rows;
  }

  return(
    // https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
    <div>
      <div>
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


ReactDOM.render(
  <React.StrictMode>
    <ClassSearch />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
