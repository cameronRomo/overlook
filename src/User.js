class User {
  constructor(userDetails = {}) {
    this.id = userDetails.id || 117;
    this.name = userDetails.name || 'His/Her Highness';
  }

  makeBooking(userID, date, roomNumber) {
    const booking = {
      'userID': parseInt(userID, 10),
      'date': date,
      'roomNumber': parseInt(roomNumber, 10)
    }
    return booking;
  }

  viewBookings(bookingList) {
    debugger
    let userBookings = bookingList.filter(booking => {
      console.log('booking', booking);
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
      // console.log('user total', userTotal);
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

  filterRoomByType(bookingsDetails, roomsDetails, date, type) {
    let availableRooms = this.checkAvailability(bookingsDetails, roomsDetails, date);
    let roomsByType = availableRooms.filter(room => {
      return room.roomType === type;
    })
    if (roomsByType.length === 0) {
      return `We prostrate ourselves before you and beg you for your forgiveness! There are no ${type}'s available at that time.`
    }
    return roomsByType;
  }
}

export default User;
