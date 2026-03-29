   /* ── NAV ── */
        function showSection(id) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.getElementById('btn-' + id).classList.add('active');
        }

        /* ── WEATHER ── */
        const apiKey = 'b2321c3741051f4f43d33bb1ee633620';

        function getWeather() {
            const city = document.getElementById('city').value.trim();
            if (!city) { showError('Please enter a city name.'); return; }

            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
            const forecastUrl       = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}`;

            // Reset UI
            hideResults();
            document.getElementById('error-msg').style.display = 'none';
            document.getElementById('weather-empty').style.display = 'none';
            document.getElementById('spinner').style.display = 'block';

            fetch(currentWeatherUrl)
                .then(r => r.json())
                .then(data => {
                    document.getElementById('spinner').style.display = 'none';
                    if (data.cod === '404' || data.cod === 404) {
                        showError(data.message || 'City not found.');
                        document.getElementById('weather-empty').style.display = 'flex';
                    } else {
                        displayWeather(data);
                    }
                })
                .catch(() => {
                    document.getElementById('spinner').style.display = 'none';
                    showError('Error fetching weather data. Please try again.');
                    document.getElementById('weather-empty').style.display = 'flex';
                });

            fetch(forecastUrl)
                .then(r => r.json())
                .then(data => {
                    if (data.list) displayHourlyForecast(data.list);
                })
                .catch(err => console.error('Forecast error:', err));
        }

        function displayWeather(data) {
            const temp        = Math.round(data.main.temp - 273.15);
            const feelsLike   = Math.round(data.main.feels_like - 273.15);
            const description = data.weather[0].description;
            const iconCode    = data.weather[0].icon;
            const iconUrl     = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Main card
            document.getElementById('city-display').textContent    = data.name;
            document.getElementById('country-display').textContent = data.sys.country;
            document.getElementById('temp-display').innerHTML      = `${temp}<span>°C</span>`;
            document.getElementById('desc-display').textContent    = description;

            const iconEl = document.getElementById('weather-icon-new');
            iconEl.src = iconUrl;
            iconEl.alt = description;
            iconEl.style.display = 'inline';

            // Detail tiles
            document.getElementById('d-humidity').textContent = data.main.humidity + '%';
            document.getElementById('d-wind').textContent     = Math.round(data.wind.speed) + ' m/s';
            document.getElementById('d-feels').textContent    = feelsLike + '°C';
            document.getElementById('d-cloud').textContent    = data.clouds.all + '%';

            document.getElementById('weather-card').classList.add('visible');
            document.getElementById('weather-details').classList.add('visible');
        }

        function displayHourlyForecast(hourlyData) {
            const scroll = document.getElementById('hourly-scroll');
            scroll.innerHTML = '';

            const weatherEmojis = { '01':'☀️','02':'🌤️','03':'⛅','04':'☁️','09':'🌧️','10':'🌦️','11':'⛈️','13':'❄️','50':'🌫️' };

            hourlyData.slice(0, 8).forEach(item => {
                const date  = new Date(item.dt * 1000);
                const hour  = date.getHours().toString().padStart(2, '0');
                const temp  = Math.round(item.main.temp - 273.15);
                const code  = item.weather[0].icon.slice(0, 2);
                const emoji = weatherEmojis[code] || '🌡️';

                const div = document.createElement('div');
                div.className = 'hourly-item';
                div.innerHTML = `<div class="hourly-time">${hour}:00</div><div class="hourly-icon">${emoji}</div><div class="hourly-temp">${temp}°C</div>`;
                scroll.appendChild(div);
            });

            document.getElementById('hourly-section').classList.add('visible');
        }

        function hideResults() {
            ['weather-card','weather-details','hourly-section'].forEach(id => {
                document.getElementById(id).classList.remove('visible');
            });
        }

        function showError(msg) {
            const el = document.getElementById('error-msg');
            el.textContent = msg;
            el.style.display = 'block';
        }