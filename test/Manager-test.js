import chai from 'chai';
const expect = chai.expect;
import { bookings } from '../data/bookings'
import { rooms } from '../data/rooms'
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
    expect(manager.name).to.equal('His/Her Highness');
  })

  it('should return the number of rooms occupied', function() {
    let roomsOccupied = manager.totalRoomsAvailable(bookings, rooms, "2020/04/22")
    expect(roomsOccupied).to.equal(3);
  })

  it('should calculate the percent of rooms occupied', function() {
    let percentOccupied = manager.calculatePercentOccupied(bookings, rooms, "2020/04/22")
    expect(percentOccupied).to.equal('40% of rooms are occupied.')
  })

  it('should calculate the revenue for a day\'s date', function() {
    let revenue = manager.totalRevenue(bookings, rooms, "2020/04/22")
    expect(revenue).to.equal(769.61);
  })
})
