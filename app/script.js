const container = document.querySelector(".container");
const btn = document.getElementById("btn");



btn.addEventListener('click', function() {
    container.classList.add("none");
    
    const input_city = document.getElementById("city").value;
    getWeatherData(input_city);

    // whereAmI();


    // old code
    // const request = new XMLHttpRequest();
    // request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${input_city}&appid=f0856bb6b955b94778891437ad5c5e71`);

        // request.onload = function() {
    //     if (request.status >= 200 && request.status < 400) {
    //         const data = JSON.parse(request.responseText);
            
    //         console.log(data);

    // request.send();


    


});
const getPos = function(){
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}





//new code
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
async function whereAmI (){
    try {
        const geoResponse = await getPos();
        const {latitude:lat , longitude: lng} = geoResponse.coords;
    
        const countryRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        const countryRes_data = await countryRes.json();
    
        const country_weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryRes_data.city}&appid=f0856bb6b955b94778891437ad5c5e71`);
        const country_weatherRes_data = await country_weatherRes.json();
    
        renderCity(country_weatherRes_data);
    } catch(error) {
        handleErrors(` ${err}`);
    }


    // old code lol
    // getPos().then(pos => {
    //     console.log(pos);
    //     console.log(pos.coords.latitude);
    //     const {latitude:lat , longitude: lng} = pos.coords;
    //     return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    // })
    // .then(response => {
    //     // console.log(response);

    //     if (!response.ok) throw new Error(`Problem in fetching the data of the city required has been found. Error (${response.status})`);

    //     return response.json();
    // })
    // .then(data => {

    //     // console.log(data);
    //     console.log(`You are in ${data.city}, ${data.countryName}`);
    //     return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=f0856bb6b955b94778891437ad5c5e71`);
    // })
    // .then(res => {
    //     if(!res.ok) throw new Error(`Problem in fetching the data of the city required has been found. Error (${response.status})`);

    //     return res.json();
    // })
    // .then(data => {
    //     console.log(data);
    //     renderCity(data);
    // })
    // .catch(err => {
    //     handleErrors(` ${err}`);
    // })
    // .finally(() => {
    //     container.classList.remove("none");
    // })
}





const handleErrors = function (mssg) {
    container.innerHTML = "";
    container.insertAdjacentText('beforeend', mssg);
    console.log(mssg);
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
    container.classList.remove("none");

    // container.style.opacity = 1;

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

whereAmI();
