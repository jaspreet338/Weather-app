window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescrp = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let API_KEY = "fda25d119864cbc66c1a03d1cd8926aa";
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}& units=metric`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const temp = data.main.temp;
          const summary = data.weather[0].description;
          const timezone = data.name;

          //Set DOM elem from API
          tempDegree.textContent = temp;
          tempDescrp.textContent = summary;
          locationTimezone.textContent = timezone;
          // const icon = data.weather[0].icon;
          let locationIcon = document.querySelector(".weather-icon");
          const { icon } = data.weather[0];
          locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
          let celsius = (temp - 32) * (5 / 9);
          //change temperature F->C
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
