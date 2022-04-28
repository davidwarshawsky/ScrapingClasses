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

  function handleSubjectChange(event){
    setSubject(event.target.value);
    console.log(subject);
  }
  function handleNumberChange(event){
    setNumber(event.target.value);
    console.log(number);
  }
  function handleClick(){
    console.log(subject + " " + number);
    getCoursesFromApi();
  }
  async function getCoursesFromApi() {
    console.log(subject + " " + number);
  try {
      const url = 'http://127.0.0.1:5000/' + subject + "/" + number + "/";
      let response = await fetch(url);
      let responseJson = await response.json();
      console.log(typeof(responseJson));
      return console.table(responseJson);
    } catch(error) {
      console.error(error);
    }
  }

  return(
    // https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
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
