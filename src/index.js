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
const customerRoomsSection = document.querySelector('.past__upcoming__bookings');
const searchedRooms = document.querySelector('.show__rooms__on__search');
const dateSelect = document.querySelector('.booking__dates');
const dateSubmitButton = document.querySelector('#date__submit');
const typeSearch = document.querySelector('#type__search');
const typeSubmitButton = document.querySelector('#room-search__type');

signInButton.addEventListener('click', validateLogin);
dateSubmitButton.addEventListener('click', getDate);
typeSubmitButton.addEventListener('click', getType);


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

function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return today = yyyy + '-' + mm + '-' + dd;
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
  //dropdownForManager.classList.add('hidden');
  nav.classList.remove('hidden');
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
  displayTotalSpent(bookingData, roomData);
  displayRoomBookings();
}

function displayTotalSpent(bookings, rooms) {
  let totalSpent = currentUser.calculateTotal(bookings, rooms);
  customerTotal.innerText = `Welcome back ${currentUser.name}! You have spent $${totalSpent} at the Overlook.`;
}

function findRooms(bookings, rooms) {
  let userBookings = currentUser.viewBookings(bookings);
  let userRooms = userBookings.reduce((roomsPayedFor, booking) => {
      let userRoom = rooms.find(room => {
       return booking.roomNumber === room.number;
      })
      roomsPayedFor.push(userRoom);
      return roomsPayedFor;
  }, []);
  return userRooms;
}

function getType() {
  let selectedDate = dateSelect.value;
  let search = typeSearch.value;
  let typeResults = currentUser.filterRoomByType(bookingData, roomData, selectedDate, search);
  displayRooms(typeResults);
}

function getDate() {
  let selectedDate = dateSelect.value;
  let availableRooms = currentUser.checkAvailability(bookingData, roomData, selectedDate);
  displayRooms(availableRooms);
  // console.log(availableRooms);
  // let today = getTodaysDate();
  // console.log(today);
}

function bookRoom(event) {
  if(event.target.id === 'book__room') {
    console.log(this);
  }
}

function displayRooms(roomSet) {
let roomsHTML = '';
// let userRooms = findRooms(bookingData, roomData);
  roomSet.forEach(room => {
    let roomDisplay = `<article class='available__rooms'>
                        <p>Room Number: ${room.number}</p>
                        <p>Room Type: ${room.roomType}</p>
                        <p>Bidet? ${room.bidet}</p>
                        <p>Bed Size: ${room.bedSize}</p>
                        <p>Nuber of Beds: ${room.numBeds}</p>
                        <p>Cost Per Night: ${room.costPerNight}</p>
                        <button id='book__room'>Book This Room</button>
                      </article>`;
    roomsHTML += roomDisplay;
  })
  searchedRooms.innerHTML = roomsHTML;
  let bookRoomButton = document.querySelector('#book__room');
  bookRoomButton.addEventListener('click', bookRoom);
}


function displayRoomBookings() {
  let bookingHTML = '';
  let userBookings = currentUser.viewBookings(bookingData);
  userBookings.forEach(booking => {
    let bookingDisplay = `<article class='past__upcoming__bookings__user'>
                            <img class='past__upcoming__bookings__user__image'>
                            <p>Room Number: ${booking.roomNumber}</p>
                            <p>Booking Date: ${booking.date}</p>
                          </article>`;
    bookingHTML += bookingDisplay;
  })
  customerRoomsSection.innerHTML = bookingHTML;
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
