// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// const renderError = function (err) {
//   countriesContainer.insertAdjacentText('beforeend', err);
// };

// // Old way of API request
// // const getCountryAndNeighbour = function (country) {
// //   //ajax call country 1
// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// //   request.send();
// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);

// //     //render country 1
// //     renderCountry(data);

// //     //get neighbour country(2)
// //     const neighbour = data.borders?.[0];

// //     if (!neighbour) return;

// //     const request2 = new XMLHttpRequest();
// //     request2.open(
// //       'GET',
// //       `https://restcountries.com/v3.1/alpha/${neighbour}
// // `
// //     );
// //     request2.send();
// //     request2.addEventListener('load', function () {
// //       const [data2] = JSON.parse(this.responseText);
// //       renderCountry(data2, 'neighbour');
// //     });
// //   });
// // };

// // getCountryAndNeighbour('india');
// //js moves along the code after request for info.
// // whatever arrives first, sets off the load event.

// //new way of making ajax calls

// const getJSON = function (url, error = 'Something went wrong!') {
//   fetch(url).then(function (response) {
//     if (!response.ok) throw new Error(`${error} (${response.status})`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(function (data) {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong! ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('india');
// });

//CHALLENGE 1 - REVERSE GEOCODING

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://us1.locationiq.com/v1/reverse?key=pk.c8ea39a3f13d62114a3a71a8b1ff13bb&lat=${lat}&lon=${lng}&format=json&`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log(`You are in ${data.address.city} ${data.address.country}`);
//       return fetch(
//         `https://restcountries.com/v3.1/alpha/${data.address.country_code}`
//       );
//     })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.log(`${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI(20, 56);

// //CREATING NEW PROMISE

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You WIN '); //will mark this promise as fulfilled
//   } else {
//     reject('You lost your money ');
//   }
// });

// lotteryPromise
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(err => console.log(err));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(function (pos) {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.c8ea39a3f13d62114a3a71a8b1ff13bb&lat=${lat}&lon=${lng}&format=json&`
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(`You are in ${data.address.city} ${data.address.country}`);
      return fetch(
        `https://restcountries.com/v3.1/alpha/${data.address.country_code}`
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(`${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(function (img) {
    currentImg = img;
    console.log('image 1');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return wait(2);
  })
  .then(() => createImage('img/img-2.jpg'))
  .then(function (img) {
    currentImg = img;
    console.log('image 2');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
