import User from '../src/User'
class Manager extends User {
  constructor(userDetails) {
    super(userDetails);
  }
  
  totalRoomsAvailable(bookingsDetails, roomsDetails, date) {
    return this.checkAvailability(bookingsDetails, roomsDetails, date).length;
  }

  calculatePercentOccupied(bookingsDetails, roomsDetails, date) {
    let unavailableRooms = this.noVacancy(bookingsDetails, roomsDetails, date).length
    let ratio = unavailableRooms / roomsDetails.length
    let percent = ratio * 100;
    return `${percent}% of rooms are occupied.`
  }

  totalRevenue(bookingsDetails, roomsDetails, date) {
    let roomsAccountedFor = this.noVacancy(bookingsDetails, roomsDetails, date)
    return Number(roomsAccountedFor.reduce((totalIncoming, room) => {
      totalIncoming += room.costPerNight;
      return totalIncoming;
    }, 0).toFixed(2))
  }
}

export default Manager;
