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
// let manager;

const usernameInput = document.querySelector('#username');
const userPasswordInput = document.querySelector('#password');
const signInButton = document.querySelector('.modal__login__button');
const managerAvailability = document.querySelector('.body__manager__availability__count');
const revenueForDay = document.querySelector('.body__manager__revenue');
const customerTotal = document.querySelector('.user__total');
const percentTaken = document.querySelector('.body__manager__percent__occupied');
const managerDash = document.querySelector('.body__manager');
const userDash = document.querySelector('.body__user')
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const userDrop = document.querySelector('#user-drop');
const dropdownForManager = document.querySelector('.nav__manager__dropdown');

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
  showUsers();
}

function validateLogin(event) {
  event.preventDefault();
  if (usernameInput.value === 'manager' && userPasswordInput.value === 'overlook2020') {
    currentUser = new Manager();
    openManagerDash();
  } else if (usernameInput.value.slice(0, 8) === 'customer' && userPasswordInput.value === 'overlook2020') {
    let currentId = Number(usernameInput.value.slice(8));
    if (currentId > 50) {
      alert("Appologies, the username or password you have entered does not match any we have on file. Please try again!")
    }
    let userById = userData.find(user => user.id === currentId);
    currentUser = new User(userById)
    openUserDash();
    // helper function to show customer dashboard
  } else {
    alert("Appologies, the username or password you have entered does not match any we have on file. Please try again!")
  }
}

function openManagerDash() {
  managerDash.classList.remove('hidden');
  nav.classList.remove('hidden');
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
  numberOfRoomsAvailable(bookingData, roomData, "2020/04/22");
  todaysRevenue(bookingData, roomData, "2020/04/22");
  percentOccupied(bookingData, roomData, "2020/04/22");
}

function openUserDash() {
  userDash.classList.remove('hidden');
  nav.classList.remove('hidden');
  dropdownForManager.classList.add('hidden');
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
  displayTotalSpent(bookingData, roomData);
}

function displayTotalSpent(bookings, rooms) {
  let totalSpent = currentUser.calculateTotal(bookings, rooms);
  customerTotal.innerText = `Welcome back ${currentUser.name}! You have spent $${totalSpent} at the Overlook.`
  console.log(totalSpent);
}

function numberOfRoomsAvailable(bookings, rooms, date) {
  let totalNotOccupied = 25 - currentUser.totalRoomsAvailable(bookings, rooms, date);
  managerAvailability.innerText = `${totalNotOccupied} are available.`;
}

function todaysRevenue(bookings, rooms, date) {
  let revenue = currentUser.totalRevenue(bookings, rooms, date);
  revenueForDay.innerText = `Total revenue ${revenue}`;
}
function percentOccupied(bookings, rooms, date) {
  let daysPercentage = currentUser.calculatePercentOccupied(bookings, rooms, date);
  percentTaken.innerText = daysPercentage;
}

function chooseUser(option) {
  // not working, seems to be undefined in the html...
  newUser = userData.find(user => option.value === user.name);
  currentUser = new User(newUser);
  console.log(currentUser);
}

function showUsers() {
  let userDropDownList = userData.reduce((usersHTML, user) => {
    usersHTML += `<option class='nav__div__one__dropdown__choice' value='${user.name}'>${user.name}</option>`;
    return usersHTML;
  }, '')
  document.querySelector('#user-drop').insertAdjacentHTML('afterend', userDropDownList)
}
