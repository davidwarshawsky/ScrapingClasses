# SJSU Transfer
## This is a simple web application built with React that allows you to search for SJSU courses and see which universities offer equivalent courses.

### Prerequisites
* A modern web browser
* A connection to the internet

### Using the app
1. Go to the website at https://scraping-classes.herokuapp.com/
2. Select a subject from the dropdown menu.
3. Select a course number from the dropdown menu.
4. Click the "Search" button.
5. The table below the search bar will display the universities that offer an equivalent course, along with the course number at that university.
### How it works
#### The app sends a GET request to a Flask server hosted on an AWS Lightsail instance. The server sends a GET request to the respective university's course catalog website, scrapes the page for the equivalent course, and returns the data to the app. The app then displays the data in a table.

### Built with
* React
* Bootstrap
* Flask
* AWS Lightsail
