import chai from 'chai';
const expect = chai.expect;
import { users } from '../data/users'
import { bookings } from '../data/bookings'
import { rooms } from '../data/rooms'
import User from '../src/User'

describe('User', function() {
  let user;
  beforeEach(() => {
    user = new User(users[0]);
  })

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  })

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  })

  it('should have a name', function() {
    expect(user.name).to.equal('Leatha Ullrich');
  })

  it('should be able to make a booking', function() {
    let makeABooking = user.makeBooking(bookings[0].userID, bookings[0].date, bookings[0].roomNumber);

    expect(makeABooking).to.deep.equal({
      'userID': 1,
      'date': '2020/04/22',
      'roomNumber': 5
    });
  })

  it('should be able to sort bookings by date', function() {
    let sortedBookings = user.viewBookings(bookings);
    expect(sortedBookings[0]).to.deep.equal(bookings[3]);
  })

  it('should be able to calculate total cost per night', function() {
    let calculatedCost = user.calculateTotal(bookings, rooms)
    expect(calculatedCost).to.equal(1260.75)
  })

  it('should find all rooms with no vacancy', function() {
    let unavailableRooms = user.noVacancy(bookings, rooms, "2020/04/22");
    expect(unavailableRooms).to.deep.equal([rooms[4], rooms[3]])
  })

  it('should show all availableRooms for a specific date', function() {
    let availableRooms = user.checkAvailability(bookings, rooms, "2020/04/22")
    expect(availableRooms).to.deep.equal([rooms[0], rooms[1], rooms[2]])
  })

  it('should filter room by type and date', function() {
    let filteredRooms = user.filterRoomByType(bookings, rooms, "2020/04/22", "single room");
    expect(filteredRooms[0]).to.deep.equal(rooms[2]);
  })

  it('should appologise if that type is not found for a specific date', function() {
    let filteredRooms = user.filterRoomByType(bookings, rooms, "2020/04/22", "totally a type");
    expect(filteredRooms).to.equal('We prostrate ourselves before you and beg you for your forgiveness! There are no totally a type\'s available at that time.')
  })
})
