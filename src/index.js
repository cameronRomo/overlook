// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/user.svg'

import Booking from './Booking';
import User from './User';
import Manager from './Manager';

import apiRequest from './api-request';

let userData;
let roomData;
let bookingData;

let currentUser;
let manager;

const usernameInput = document.querySelector('#username');
const userPasswordInput = document.querySelector('#password');
const signInButton = document.querySelector('.modal__login__button');

signInButton.addEventListener('click', validateLogin);

const recievedUsersData = apiRequest.getUsersData();
const recievedRoomsData = apiRequest.getRoomsData();
const recievedBookingsData = apiRequest.getBookingsData();

Promise.all([recievedUsersData, recievedRoomsData, recievedBookingsData])
  .then(value => {
    userData = value[0]['users'];
    roomData = value[1]['rooms'];
    bookingData = value[2]['bookings'];
    startApp();
  })
  .catch(error => console.log(error));



function startApp() {

}

function validateLogin(event) {
  event.preventDefault();
  if(usernameInput.value === 'manager' && userPasswordInput.value === 'overlook2020') {
    currentUser = new Manager();
    // helper function to show customer dashboard
  } else if (usernameInput.value.slice(0, 8) === 'customer' && userPasswordInput.value === 'overlook2020') {
    let currentId = Number(usernameInput.value.slice(8));
    let userById = userData.find(user => user.id === currentId);
    currentUser = new User(userById)
    // helper funtion to show manager dashboard
  }else {
    alert("Appologies, the username or password you have entered does not match any we have on file. Please try again!")
  }
}
