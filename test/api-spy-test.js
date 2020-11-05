const apiRequest = require('../src/api-request')

const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect

describe('apiRequest', function() {

  before(function() {
      global.apiRequest = {};
      chai.spy.on(apiRequest, ['getUsersData', 'getRoomsData', 'getBookingsData']);
  });

  it('should be able to fetch all the user data', function() {
    apiRequest.getUsersData();

    expect(apiRequest.getUsersData).to.have.been.called(1);
    expect(apiRequest.getUsersData).to.have.been.called.with();
  })

  it('should be able to fetch all the room data', function() {
    apiRequest.getRoomsData();

    expect(apiRequest.getRoomsData).to.have.been.called(1);
    expect(apiRequest.getRoomsData).to.have.been.called.with();
  })

  it('should be able to fetch all the booking data', function() {
    apiRequest.getBookingsData();

    expect(apiRequest.getBookingsData).to.have.been.called(1);
    expect(apiRequest.getBookingsData).to.have.been.called.with();
  })
})
