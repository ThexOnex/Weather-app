const container = document.querySelector(".container");
const btn = document.getElementById("btn");

// console.log(container.value);
btn.addEventListener('click', function() {
    const input_city = document.getElementById("city").value;
    getWeatherData(input_city);


    // old code
    // const request = new XMLHttpRequest();
    // request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${input_city}&appid=f0856bb6b955b94778891437ad5c5e71`);

        // request.onload = function() {
    //     if (request.status >= 200 && request.status < 400) {
    //         const data = JSON.parse(request.responseText);
            
    //         console.log(data);

    // request.send();


    //new code


});

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0856bb6b955b94778891437ad5c5e71`)
    .then((response) => {
        console.log(response);

        if(!response.ok)
        {
            throw new Error(`Country not found (${response.status})`);
        }

        return response.json()
    })//an other promise
    .then(function (data) {
        console.log(data);
        renderCity(data);
    })
    .catch(err => {
        console.error(`${err} 🚧🚧🚧`);
        handleErrors(`Something went wrong 🚩🚩🚩🚩 \n ${err}. TRY AGAIN`);
    })
    .finally(() => {
        container.classList.remove("none");

    })
}

const handleErrors = function (mssg) {
    container.innerHTML = "";
    container.insertAdjacentText('beforeend', mssg);
}


function renderCity (data) {
    container.classList.add("none");
    const html = `
        <div class="location">
            <span class="city">${data.name}</span>, 
            <span class="Country">${data.sys.country}</span>
        </div>
        <div class="infos">
            <div class="weather">${data.weather[0].description}</div>

            <div class="temp-info">
                <span class="temp">${convert_to_celsius(data.main.temp)}°</span>
                <span class="left">
                    <span class="temp_max">${convert_to_celsius(data.main.temp_max)}°</span>
                    <span class="temp_min">${convert_to_celsius(data.main.temp_min)}°</span>
                </span>
            </div>
            <div class="day">
                <div class="sunrise">${convert_to_day(data.sys.sunrise)}</div>
                <div class="sunset">${convert_to_hour(data.sys.sunrise)} AM</div>

                <div class="sunset">${convert_to_hour(data.sys.sunset)} PM</div>
            </div>
        </div>
    `;
    console.log("=============beforeend==============");
    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", html);
    container.style.opacity = 1;

}


function convert_to_celsius(kelvin) {
    return Math.floor(kelvin - 273.15);
}
function convert_to_day(timestamp) {
    const date = new Date(timestamp * 1000); 

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];

    return dayName
}
function convert_to_hour(timestamp) {
    const date = new Date(timestamp * 1000); 

    const hour = date.getHours()
    const minute = date.getMinutes()

    return `${hour.toString().padStart(2,'0')}: ${minute.toString().padStart(2,'0')}`
}

