// /*
//   * Setting up block level variable to store class state
//   * , set's to null by default.
// */
// import { showPopupAlert, showPopupAlertWithTile } from './showAlert';

// let myInstance = null;

// class OrderPlaceView extends Component  {
//   // static getInstance() {
//   //   if (this.myInstance == null) {
//   //     this.myInstance = new LocationUpdate();
//   //   }

//   //   return myInstance;
//   // }
//   constructor() {
//     super();
//     this.state = {};
//   }

//   startLocationToSendServer() {
//     console.log('********* startLocationToSendServer');
//     this.fetchCurrentLocation();
//   }

//   stopLocationToSendServer() {
//     console.log('*********');
//   }

//   fetchCurrentLocation() {
//     navigator.geolocation.getCurrentPosition((position) => {
//       if (position.coords.latitude && position.coords.longitude) {
//         console.log('********* position.coords.latitude', position.coords.latitude);
//       } else {
//         showPopupAlert('Not Found Location.');
//       }
//     }, (error) => {
//       showPopupAlert(JSON.stringify(error));
//     }, {
//       enableHighAccuracy: false,
//       timeout: 20000,
//       maximumAge: 1000,
//     });
//   }
// }

// module.exports = new LocationUpdate();
