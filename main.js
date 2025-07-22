const apiKey = "42be70f3ff5bbc434c7e85804c547275";
const city = "Surat";

async function loadSuratWeatherCard() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) throw new Error(data.message);

        const temp = data.main.temp;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const condition = data.weather[0].main;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const rain = data.rain && data.rain["1h"] ? data.rain["1h"] : 0;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        const dayNameShort = new Date().toLocaleDateString("en-US", {
            weekday: "short",
        });

        // Summary card
        const temperatureEl = document.getElementById("temperature");
        const tempRangeEl = document.getElementById("temp-range");
        if (temperatureEl && tempRangeEl) {
            temperatureEl.textContent = `${Math.round(temp)}°C`;
            tempRangeEl.textContent = `${Math.round(tempMin)}°C - ${Math.round(tempMax)}°C`;
        }

        // Other UI values
        setText(".card-one .city-name", city);
        setText(".card-two .city-name", city);
        setText(".temp-one", `${temp.toFixed(1)}°C`);
        setText(".temp-two", `${temp.toFixed(1)}°C`);
        setText(".temp-summary-card h1", `${temp.toFixed(1)}°C`);
        setText(".desc-one", condition);
        setText(".desc-two", condition);
        setText(".day-one", dayNameShort);
        setText(".day-two", dayNameShort);
        setText(".details-one .humidity", `🌡 ${humidity}%`);
        setText(".details-two .humidity", `🌡 ${humidity}%`);
        setText(".details-one .wind", `🌨 ${wind} m/s`);
        setText(".details-two .wind", `🌨 ${wind} m/s`);
        setText(".wind-one p", ` ${wind} m/s`);
        setText(".wind-two p", ` ${wind} m/s`);
        setText(".w1 p", ` ${wind} m/s`);
        setText(".w2 p", ` ${wind} m/s`);
        setText(".rain-one p", ` ${rain} %`);
        setText(".rain-two p", ` ${rain} %`);
        setText(".r1 p", ` ${rain} %`);
        setText(".r2 p", ` ${rain} %`);
        setText(".custom-weather-card p", `🌨 ${wind} m/s`);
        setText(".details-one .sunrisee", `☀ ${sunrise}`);
        setText(".details-two .sunrisee", `☀ ${sunrise}`);

        // .text-2 data
        const text2Paras = document.querySelectorAll(".text-2 p");
        if (text2Paras.length >= 3) {
            text2Paras[0].textContent = `Precipitation : ${rain}%`;
            text2Paras[1].textContent = `Humidity : ${humidity}%`;
            text2Paras[2].textContent = `Wind : ${Math.round(wind * 3.6)} km/h`;
        }

    } catch (error) {
        console.error("Error fetching Surat weather:", error);
        setText("#temperature", "Error loading");
    }
}

async function loadForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== "200") throw new Error(data.message);

        const forecastCards = document.querySelectorAll(".forecast-card");
        let usedDays = new Set();
        let cardIndex = 0;

        for (let i = 0; i < data.list.length && cardIndex < forecastCards.length; i++) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

            if (usedDays.has(dayName)) continue;
            usedDays.add(dayName);

            const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const temp = Math.round(forecast.main.temp);
            const tempMax = Math.round(forecast.main.temp_max);
            const wind = `${forecast.wind.speed} km/h`;
            const humidity = `${forecast.main.humidity}%`;
            const condition = forecast.weather[0].main;

            const card = forecastCards[cardIndex++];
            if (!card) continue;

            setTextInside(card, ".day", dayName);
            setTextInside(card, ".time", time);
            setTextInside(card, ".temp", `${temp}°C`);
            setTextInside(card, ".temp-secondary", `${tempMax}°C`);
            setTextInside(card, ".stats span:nth-child(1)", `🌧 ${wind}`);
            setTextInside(card, ".stats span:nth-child(2)", `💧 ${humidity}`);
            setTextInside(card, ".condition", condition);
        }

        const forecastTemps = document.querySelector(".forecast-temps");
        if (forecastTemps) {
            forecastTemps.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                const forecast = data.list[i];
                const date = new Date(forecast.dt * 1000);
                const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
                const temp = `${Math.round(forecast.main.temp)}°C`;
                const condition = forecast.weather[0].main;
                const icon = forecast.weather[0].icon;
                const imgSrc = `https://openweathermap.org/img/wn/${icon}.png`;

                const div = document.createElement("div");
                div.innerHTML = `
                    <img src="${imgSrc}" alt="">
                    <p>${temp}</p>
                    <small>${time}</small>
                    <p>${condition}</p>
                `;
                forecastTemps.appendChild(div);
            }
        }

        // ✅ Update .day-box-detile elements
        const dayBoxDetiles = document.querySelectorAll(".day-box-detile");
        let boxUsedDays = new Set();
        let boxIndex = 0;

        for (let i = 0; i < data.list.length && boxIndex < dayBoxDetiles.length; i++) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const dayShort = date.toLocaleDateString("en-US", { weekday: "short" });
            if (boxUsedDays.has(dayShort)) continue;
            boxUsedDays.add(dayShort);

            const minTemp = Math.round(forecast.main.temp_min);
            const maxTemp = Math.round(forecast.main.temp_max);
            const icon = forecast.weather[0].icon;
            const imgUrl = `https://openweathermap.org/img/wn/${icon}.png`;

            const detile = dayBoxDetiles[boxIndex++];
            const dayP = detile.querySelector("p:nth-of-type(1)");
            const iconImg = detile.querySelector("img");
            const tempP = detile.querySelector("p:nth-of-type(2)");

            if (dayP) dayP.textContent = dayShort;
            if (iconImg) iconImg.src = imgUrl;
            if (tempP) tempP.textContent = `${maxTemp}° ${minTemp}°`;
        }

    } catch (error) {
        console.error("Forecast load error:", error);
    }
}

function updateDateTime() {
    const now = new Date();
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const date = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateTimeEl = document.querySelector(".date-time");
    if (dateTimeEl) {
        dateTimeEl.innerHTML = `${dayName}, ${date} &nbsp;&nbsp;&nbsp; ${time}`;
    }
}

function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}

function setTextInside(parent, selector, text) {
    const el = parent.querySelector(selector);
    if (el) el.textContent = text;
}

window.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    loadSuratWeatherCard();
    loadForecast();
});
