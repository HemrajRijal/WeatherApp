window.addEventListener('load', () => {
    let long;
    let lat;
    let icon;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".time-zone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature-span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const access_key = 'dc14d173aa8dbfb9c29c20ac24f8d55c';

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${access_key}`;

            console.log('--->' + api)
            fetch(api)
                .then(response => {
                    mode: 'no-cors'
                    return response.json();
                })
                .then(data => {
                    const { temp } = data.main;
                    const { description } = data.weather[0];
                    const { name } = data;
                    const { main } = data.weather[0];
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimeZone.textContent = name;

                    //Formula for Celsius
                    let celsius = (temp - 273);

                    // Set Icon
                    setIcons(main, document.querySelector('.icon'));


                    //Change celcius to Fraheneit  and vide verca
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent == 'K') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = 'K';
                            temperatureDegree.textContent = temp;
                        }
                    })
                })
        })
    };

    function setIcons(icon, iconId) {
        var skycons = new Skycons({ "color": "white" });
        const currentIcon = icon.toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
})