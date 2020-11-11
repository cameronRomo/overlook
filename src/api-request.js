const apiRequest = {
  getUsersData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
      .then(response => response.json())
      .catch(error => console.log(error));
  },

  getRoomsData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
      .then(response => response.json())
      .catch(error => console.log(error));
  },

  getBookingsData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
      .then(response => response.json())
      .catch(error => console.log(error));
  },

  recordBooking(booking, onSuccess) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking),
    })
      .then(response => response.json())
      .then(response => {
        onSuccess()
      })
      .catch(error => console.log(error));
  },

  deleteBooking(booking, onSuccess) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': parseInt(booking)
      }),
    })
      .then(response => response.json())
      .then(response => {
        onSuccess();
      })
      .catch(error => console.log(error));
  }
};

export default apiRequest;
