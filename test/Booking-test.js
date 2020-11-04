import chai from 'chai';
const expect = chai.expect;
import {bookings} from '../data/bookings'
import Booking from '../src/Booking'

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('Booking', function() {
  let booking1;
  let booking2;

  beforeEach(() => {
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
  })

  it('should be an instance of a Booking', function() {
    expect(booking1).to.be.an.instanceof(Booking);
  })

  it('should take a booking data object', function() {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking1.userID).to.equal(1);
    expect(booking1.date).to.equal("2020/04/22");
    expect(booking1.roomNumber).to.equal(5);
    expect(booking1.roomServiceCharges).to.deep.equal([]);
  })

  it('should take a diferent booking data object', function() {
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.userID).to.equal(1);
    expect(booking2.date).to.equal("2020/04/22");
    expect(booking2.roomNumber).to.equal(4);
    expect(booking2.roomServiceCharges).to.deep.equal([]);
  })
})
