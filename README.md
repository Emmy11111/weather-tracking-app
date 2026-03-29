# 🌤️ Weather Tracker Web App

A clean, mobile-friendly web application that delivers **real-time weather conditions** and a **24-hour hourly forecast** for any city in the world — powered by the OpenWeatherMap API.

---

## 📸 Preview

> Search any city → See current temperature, conditions, humidity, wind speed, and an hourly forecast — all in one dashboard.

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Live current temperature (°C)
- 🌥️ Weather condition description + icon
- 💧 Humidity, wind speed, feels-like temperature, cloud cover
- 🕐 24-hour hourly forecast (8 time slots, 3-hour intervals)
- 📱 Fully responsive — works on desktop, tablet, and mobile
- ⚡ No frameworks required — plain HTML, CSS, and JavaScript

---

## 🗂️ Project Structure

```
weather-tracker/
│
├── index.html       # Main application file (HTML + CSS + JS in one file)
└── README.md        # Project documentation
```

> All code lives in a single `index.html` file — no build tools or dependencies needed.

---

## 🚀 Getting Started

Follow these steps exactly to get the project running on your machine.

---

### Step 1 — Get a Free OpenWeatherMap API Key

The app fetches live weather data from OpenWeatherMap. You need a free API key to make it work.

1. Go to [https://openweathermap.org](https://openweathermap.org)
2. Click **Sign Up** and create a free account
3. Check your email and verify your account
4. Log in, then go to **API Keys** in your account dashboard:
   `https://home.openweathermap.org/api_keys`
5. Copy the **Default** API key that was automatically generated (or create a new one)

> ⚠️ **Important:** New API keys can take **10–120 minutes** to activate after creation. If you get a `401 Invalid API key` error, wait a bit and try again.

---

### Step 2 — Download the Project

**Option A — Clone with Git** (recommended if you have Git installed):

```bash
git https://github.com/Emmy11111/weather-tracking-app
cd weather-tracking-app
```

**Option B — Download ZIP:**

1. Click the green **Code** button on this GitHub page
2. Select **Download ZIP**
3. Extract the ZIP file to a folder on your computer
4. Open the extracted folder

---

### Step 3 — Add Your API Key

1. Open `index.html` in any text editor (Notepad, VS Code, Sublime Text, etc.)
2. Find this line near the bottom of the file (inside the `<script>` tag):

```javascript
const apiKey = 'b2321c3741051f4f43d33bb1ee633620';
```

3. Replace the value inside the quotes with **your own API key** from Step 1:

```javascript
const apiKey = 'YOUR_API_KEY_HERE';
```

4. Save the file

---

### Step 4 — Open the App

Since this is a plain HTML file, you can open it directly in your browser — **no server needed**.

**Option A — Open directly:**

- Double-click `index.html`
- It will open in your default web browser

**Option B — Open from your browser:**

1. Open your browser (Chrome, Firefox, Edge, Safari)
2. Press `Ctrl + O` (Windows/Linux) or `Cmd + O` (Mac)
3. Navigate to your project folder and select `index.html`
4. Click **Open**

**Option C — Use VS Code Live Server** (best for development):

1. Install [Visual Studio Code](https://code.visualstudio.com)
2. Install the **Live Server** extension (search in the Extensions panel)
3. Right-click `index.html` in the VS Code file explorer
4. Select **Open with Live Server**
5. The app opens at `http://127.0.0.1:5500`

---

### Step 5 — Use the App

1. Click **Track Weather** in the top navigation bar
2. Type any city name into the search box (e.g. `Kigali`, `London`, `New York`)
3. Press **Go** or hit **Enter**
4. View your results:
   - Current temperature and conditions
   - Humidity, wind speed, feels-like temp, cloud cover
   - 24-hour hourly forecast

---

## ⚙️ Configuration

| Setting | Where to change | Default |
|---|---|---|
| API Key | `const apiKey = '...'` in `index.html` | Placeholder key |
| Temperature Unit | Converted from Kelvin to °C in JS | Celsius (°C) |
| Forecast slots | `hourlyData.slice(0, 8)` | 8 slots (24 hours) |

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | App structure |
| CSS3 | Styling and responsive layout |
| Vanilla JavaScript | Logic and API calls |
| [OpenWeatherMap API](https://openweathermap.org/api) | Live weather data |
| [Google Fonts](https://fonts.google.com) | DM Serif Display + DM Sans typography |

**API Endpoints used:**

| Endpoint | Data |
|---|---|
| `/data/2.5/weather` | Current weather conditions |
| `/data/2.5/forecast` | 5-day / 3-hour interval forecast |

---

## 🐛 Troubleshooting

**❌ "City not found" error**
- Check the spelling of the city name
- Try adding the country code: `Paris,FR` or `London,GB`

**❌ Blank weather results or no data showing**
- Open your browser's Developer Tools (`F12`) → Console tab
- Look for error messages
- Most likely cause: your API key hasn't activated yet (wait up to 2 hours after creating it)

**❌ `401 Invalid API key`**
- Your API key is incorrect or not yet active
- Double-check you copied the full key from [openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
- Wait 10–120 minutes if the key was just created

**❌ `CORS` errors in the console**
- Do not try to open `index.html` via a `file://` path in some browsers
- Use VS Code Live Server (Option C in Step 4) or any local HTTP server

---

## 📋 Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An internet connection (to fetch weather data)
- A free OpenWeatherMap API key

No Node.js, no npm, no frameworks, no installs required.

---

## 🙏 Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Weather icons provided by OpenWeatherMap's icon CDN
- Fonts by [Google Fonts](https://fonts.google.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).