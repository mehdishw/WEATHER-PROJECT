
        const citySelect =
            document.getElementById('citySelect');

        const searchBtn =
            document.getElementById('searchBtn');

        const weatherDisplay =
            document.getElementById('weatherDisplay');





        const cities = {

            Tehran: {
                name: 'تهران',
                latitude: 35.6892,
                longitude: 51.3890
            },

            Mashhad: {
                name: 'مشهد',
                latitude: 36.2605,
                longitude: 59.6168
            },

            Isfahan: {
                name: 'اصفهان',
                latitude: 32.6546,
                longitude: 51.6680
            },

            Shiraz: {
                name: 'شیراز',
                latitude: 29.5918,
                longitude: 52.5837
            },

            Tabriz: {
                name: 'تبریز',
                latitude: 38.0962,
                longitude: 46.2738
            },

            Kish: {
                name: 'کیش',
                latitude: 26.5320,
                longitude: 53.9750
            },

            Rasht: {
                name: 'رشت',
                latitude: 37.2808,
                longitude: 49.5832
            },

            Yazd: {
                name: 'یزد',
                latitude: 31.8974,
                longitude: 54.3569
            },

            Kerman: {
                name: 'کرمان',
                latitude: 30.2839,
                longitude: 57.0834
            },

            Ahvaz: {
                name: 'اهواز',
                latitude: 31.3183,
                longitude: 48.6706
            }

        };





        function getWeatherInfo(code) {

            const weatherMap = {

                0: {
                    icon: '☀️',
                    text: 'آسمان صاف'
                },

                1: {
                    icon: '🌤️',
                    text: 'عمدتاً صاف'
                },

                2: {
                    icon: '⛅',
                    text: 'نیمه ابری'
                },

                3: {
                    icon: '☁️',
                    text: 'ابری'
                },

                45: {
                    icon: '🌫️',
                    text: 'مه'
                },

                48: {
                    icon: '🌫️',
                    text: 'مه یخ‌زده'
                },

                51: {
                    icon: '🌦️',
                    text: 'نم‌نم باران'
                },

                53: {
                    icon: '🌦️',
                    text: 'نم‌نم باران'
                },

                55: {
                    icon: '🌧️',
                    text: 'نم‌نم باران شدید'
                },

                56: {
                    icon: '🌧️',
                    text: 'باران یخ‌زده'
                },

                57: {
                    icon: '🌧️',
                    text: 'باران یخ‌زده شدید'
                },

                61: {
                    icon: '🌧️',
                    text: 'باران خفیف'
                },

                63: {
                    icon: '🌧️',
                    text: 'باران'
                },

                65: {
                    icon: '🌧️',
                    text: 'باران شدید'
                },

                66: {
                    icon: '🌧️',
                    text: 'باران یخ‌زده'
                },

                67: {
                    icon: '🌧️',
                    text: 'باران یخ‌زده شدید'
                },

                71: {
                    icon: '🌨️',
                    text: 'برف خفیف'
                },

                73: {
                    icon: '🌨️',
                    text: 'برف'
                },

                75: {
                    icon: '❄️',
                    text: 'برف شدید'
                },

                77: {
                    icon: '🌨️',
                    text: 'دانه‌های برف'
                },

                80: {
                    icon: '🌦️',
                    text: 'رگبار خفیف'
                },

                81: {
                    icon: '🌧️',
                    text: 'رگبار باران'
                },

                82: {
                    icon: '⛈️',
                    text: 'رگبار شدید'
                },

                85: {
                    icon: '🌨️',
                    text: 'رگبار برف'
                },

                86: {
                    icon: '❄️',
                    text: 'رگبار شدید برف'
                },

                95: {
                    icon: '⛈️',
                    text: 'رعد و برق'
                },

                96: {
                    icon: '⛈️',
                    text: 'رعد و برق همراه با تگرگ'
                },

                99: {
                    icon: '⛈️',
                    text: 'رعد و برق شدید و تگرگ'
                }

            };


            return weatherMap[code] || {

                icon: '🌡️',

                text: 'وضعیت نامشخص'

            };

        }





        async function fetchWeather(cityId) {


            const city =
                cities[cityId];


            if (!city) {

                showError(
                    'شهر مورد نظر پیدا نشد.'
                );

                return;
            }



            weatherDisplay.innerHTML = `

                <div class="weather-info">

                    <div class="loading">

                        ⏳
                        در حال دریافت اطلاعات آب‌وهوا...

                    </div>

                </div>

            `;


            try {



                const url =
                    'https://api.open-meteo.com/v1/forecast' +

                    `?latitude=${city.latitude}` +

                    `&longitude=${city.longitude}` +

                    '&current=' +

                    'temperature_2m,' +

                    'relative_humidity_2m,' +

                    'apparent_temperature,' +

                    'weather_code,' +

                    'surface_pressure,' +

                    'wind_speed_10m' +

                    '&wind_speed_unit=ms' +

                    '&timezone=auto';



                const response =
                    await fetch(url);



                if (!response.ok) {

                    throw new Error(
                        `خطای سرور: ${response.status}`
                    );

                }



                const data =
                    await response.json();


                if (!data.current) {

                    throw new Error(
                        'اطلاعات آب‌وهوا دریافت نشد.'
                    );

                }


                const current =
                    data.current;



                const weatherInfo =
                    getWeatherInfo(
                        current.weather_code
                    );



                const weatherData = {

                    cityId: cityId,

                    city: city.name,

                    temperature:
                        Math.round(
                            current.temperature_2m
                        ),

                    feelsLike:
                        Math.round(
                            current.apparent_temperature
                        ),

                    humidity:
                        current.relative_humidity_2m,

                    wind:
                        Number(
                            current.wind_speed_10m
                        ).toFixed(1),

                    pressure:
                        Math.round(
                            current.surface_pressure
                        ),

                    weatherCode:
                        current.weather_code,

                    icon:
                        weatherInfo.icon,

                    description:
                        weatherInfo.text,

                    timestamp:
                        Date.now()

                };



                try {

                    localStorage.setItem(
                        'lastWeather',
                        JSON.stringify(weatherData)
                    );

                } catch (error) {

                    console.warn(
                        'ذخیره در localStorage انجام نشد:',
                        error
                    );

                }




                displayWeather(
                    weatherData
                );


            } catch (error) {


                console.error(
                    'Weather API Error:',
                    error
                );



                try {

                    const savedData =
                        localStorage.getItem(
                            'lastWeather'
                        );


                    if (savedData) {

                        const parsed =
                            JSON.parse(
                                savedData
                            );


                        const isRecent =
                            (
                                Date.now() -
                                parsed.timestamp
                            ) < 3600000;


                        if (isRecent) {

                            displayWeather(
                                parsed,
                                true
                            );

                            return;
                        }

                    }

                } catch (cacheError) {

                    console.warn(
                        'خطا در بازیابی اطلاعات ذخیره‌شده.'
                    );

                }




                showError(
                    'اتصال به سرویس هواشناسی برقرار نشد.'
                );

            }

        }




        function displayWeather(
            data,
            fromCache = false
        ) {


            const statusText =
                fromCache
                    ? 'آخرین اطلاعات ذخیره‌شده'
                    : 'امروز';


            weatherDisplay.innerHTML = `

                <div class="weather-info">


                    <div class="city-name">

                        ${data.city}

                        <span>
                            ${statusText}
                        </span>

                    </div>


                    <div class="weather-icon">

                        ${data.icon}

                    </div>


                    <div class="temperature">

                        ${data.temperature}

                        <small>
                            °C
                        </small>

                    </div>


                    <div class="weather-desc">

                        ${data.description}

                    </div>


                    <div class="extra-details">


                        <div class="detail-item">

                            💧

                            رطوبت:

                            <strong>
                                ${data.humidity}%
                            </strong>

                        </div>


                        <div class="detail-item">

                            🌬️

                            باد:

                            <strong>
                                ${data.wind} m/s
                            </strong>

                        </div>


                        <div class="detail-item">

                            📊

                            فشار:

                            <strong>
                                ${data.pressure} hPa
                            </strong>

                        </div>


                        <div class="detail-item">

                            🌡️

                            احساس دما:

                            <strong>
                                ${data.feelsLike}°C
                            </strong>

                        </div>


                    </div>


                </div>

            `;

        }





        function showError(message) {


            weatherDisplay.innerHTML = `

                <div class="weather-info">


                    <div class="error-message">

                        ❌
                        ${message}

                    </div>


                    <div class="empty-state">

                        لطفاً اتصال اینترنت را بررسی کنید
                        و دوباره تلاش کنید.

                    </div>


                </div>

            `;

        }




        function handleSearch() {


            const selectedCity =
                citySelect.value;


            if (!selectedCity) {

                alert(
                    'لطفاً یک شهر انتخاب کنید.'
                );

                return;
            }


            fetchWeather(
                selectedCity
            );

        }




        function loadInitialWeather() {


            try {

                const savedData =
                    localStorage.getItem(
                        'lastWeather'
                    );


                if (savedData) {

                    const parsed =
                        JSON.parse(
                            savedData
                        );


                    const isRecent =
                        (
                            Date.now() -
                            parsed.timestamp
                        ) < 3600000;


                    if (
                        isRecent &&
                        cities[parsed.cityId]
                    ) {

                        citySelect.value =
                            parsed.cityId;


                        displayWeather(
                            parsed,
                            true
                        );


                        return;
                    }

                }

            } catch (error) {

                console.warn(
                    'اطلاعات ذخیره‌شده معتبر نیست.'
                );

            }



            citySelect.value =
                'Tehran';


            fetchWeather(
                'Tehran'
            );

        }







        searchBtn.addEventListener(
            'click',
            handleSearch
        );


        

        citySelect.addEventListener(
            'change',
            handleSearch
        );


        

        citySelect.addEventListener(
            'keydown',
            function(event) {

                if (event.key === 'Enter') {

                    handleSearch();

                }

            }
        );



        

        loadInitialWeather();


        console.log(
            '✅ سیستم هواشناسی با Open-Meteo فعال شد.'
        );

        console.log(
            '🌤️ API Key لازم نیست.'
        );
