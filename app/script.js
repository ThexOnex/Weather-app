const container = document.querySelector(".container");
const btn = document.getElementById("btn");
// console.log(container.value);
btn.addEventListener('click', function() {
    const input_city = document.getElementById("city").value;
    container.classList.add("none");


    const request = new XMLHttpRequest();
    request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${input_city}&appid=f0856bb6b955b94778891437ad5c5e71`);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            
            console.log(data);

            console.log("===================");
            // put_img();
            //                 <div class="img-icon">
            // <img src="" alt="" id="weather_img">
            // </div>
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
            // put_img(data.weather[0].icon)
            //     .then((img_url) => {
            //         console.log("=============IMAGE URL==============");
            //         const image = document.getElementById("weather_img");
            //         console.log(typeof(img_url));
            //         console.log(img_url);
            //         if (img_url) {
            //             image.src = img_url;
            //         } else {
            //             // If the icon is not valid, display a default image or an error message
            //             image.src = "failed.png"; // Replace with your default image path
            //             console.error("Invalid icon value:", data.weather[0].icon);
            //         }
            //     })
            //     .catch((error) => {
            //         console.log("there was a problem after calling the put img function: ", error);
            //     });

        } else {
            console.error("Error fetching data from API");
        }
    };


    request.send();
});

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

// function put_img(icon) {
//     return fetch("images.json")
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error
//                     (`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((data) => {
//             const img = data[0][icon];
//             console.log(img);
//             if (img) {
//                 return img;
//             } else {
//                 throw new Error(`Image for icon "${icon}" not found`);
//             }
//         })
//         .catch((error) =>
//             console.error("Unable to fetch data:", error));
// }

// function put_img(icon) {
//     return fetch("images.json")
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((data) => {
//             const img = data[0][icon];
//             if (img) {
//                 return new Promise((resolve, reject) => {
//                     const image = new Image();
//                     image.src = img;
//                     console.log("image in handling put_img : ", img);
//                     image.onload = () => {
//                         resolve(img);y // Image loaded successfull
//                     };
//                     image.onerror = () => {
//                         reject(new Error(`Image for icon "${icon}" not found or failed to load`)); // Image failed to load
//                     };
//                 });
//             } else {
//                 throw new Error(`Image for icon "${icon}" not found in images.json`);
//             }
//         })
//         .catch((error) => {
//             console.error("Unable to fetch or load image:", error);
//         });
// }
