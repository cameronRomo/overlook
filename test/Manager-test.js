import chai from 'chai';
const expect = chai.expect;
import { users } from '../data/users'
import { bookings } from '../data/bookings'
import { rooms } from '../data/rooms'
import User from '../src/User'
import Manager from '../src/Manager'

describe('Manager', function() {
  let manager;
  beforeEach(() => {
    manager = new Manager();
  })

  it('should be an instance of Manager', function() {
    expect(manager).to.be.an.instanceof(Manager);
  })

  it('should have an id', function() {
    expect(manager.id).to.equal(117);
  })

  it('should have a name', function() {
    expect(manager.name).to.equal('Guy');
  })

  it('should find a user given a specific name', function() {
    let foundUser = manager.searchUsers(users, 'Leatha Ullrich')
    expect(foundUser).to.deep.equal(users[0]);
  })

  it('should be able to view a user\'s bookings', function() {
    let bookingsByDate = manager.viewUserBookings(bookings, users, 'Leatha Ullrich')
    expect(bookingsByDate).to.deep.equal([bookings[3], bookings[0], bookings[1]]);
  })

  it('should be able to make a booking for a user', function() {
    let userBooking = manager.addBooking(users, 'Leatha Ullrich', '2020/04/22', 5);
    expect(userBooking).to.deep.equal({
      'userID': 1,
      'date': '2020/04/22',
      'roomNumber': 5
    });
  })

  it('should return the number of rooms occupied', function() {
    let roomsOccupied = manager.totalRoomsAvailable(bookings, rooms, "2020/04/22")
    expect(roomsOccupied).to.equal(3);
  })

  it('should calculate the percent of rooms occupied', function() {
    let percentOccupied = manager.calculatePercentOccupied(bookings, rooms, "2020/04/22")
    expect(percentOccupied).to.equal('40% of rooms are occupied')
  })

  it('should calculate the revenue for a day\'s date', function() {
    let revenue = manager.totalRevenue(bookings, rooms, "2020/04/22")
    expect(revenue).to.equal(769.61);
  })
})
