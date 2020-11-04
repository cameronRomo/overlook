import Booking from '../src/Booking'
export default class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
  }

  makeBooking(userID, date, roomNumber) {
    const booking = {
      'userID': userID,
      'date': date,
      'roomNumber': roomNumber
    }
    return booking;
  }

  viewBookings(bookingList) {
    let userBookings = bookingList.filter(booking => {
      return booking.userID === this.id;
    })
    return userBookings.sort((a, b) => {
      return a.date < b.date ? -1 : 1;
    })
  }

  calculateTotal(bookingsDetails, roomsDetails) {
    let grandTotal = this.viewBookings(bookingsDetails).reduce((userTotal, booking) => {
        let userRoom = roomsDetails.find(room => {
         return booking.roomNumber === room.number;
        })
        userTotal += userRoom.costPerNight;
        return userTotal
    }, 0).toFixed(2)
    return Number(grandTotal);
  }

  noVacancy(bookingsDetails, roomsDetails, date) {
    let todaysBookings = bookingsDetails.filter(booking => {
      return booking.date === date
    })
    return todaysBookings.map(booking => {
      return roomsDetails.find(room => booking.roomNumber === room.number)
    })
  }

  checkAvailability(bookingsDetails, roomsDetails, date) {
    let unavailableRooms = this.noVacancy(bookingsDetails, roomsDetails, date)
    let availableRooms = roomsDetails.filter(room => {
      return (!unavailableRooms.includes(room));
    })
    return availableRooms;
  }
}
