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
  } else if (usernameInput.value.slice(0, 8) === 'customer' && userPasswordInput.value === 'overlook2020') {
    let currentId = Number(usernameInput.value.slice(8));
    let userById = userData.find(user => user.id === currentId);
    currentUser = new User(userById)
  }else {
    alert("Appologies, the username or password you have entered does not match any we have on file. Please try again!")
  }
}
// USER LOGIN:
// takin user input from both imput fields
// evaluate IF the value for username is === 'manager'
// ... and the password entry is === 'overlook2020'
// if yes, instantiate the manager
// ELSEIF slice out the first 8ish characters and check if that === 'customer' and the password === overlook2020
    // slice 8 to get everything after the eith charcater
    // grab user info from sever and compair ids
    // if they are the same number then make object with the id and name properties
    // pass object into user instantiation
// else alert wrong info please try again
