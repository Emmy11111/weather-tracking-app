# 🌱 SmartFarm Assist

A web-friendly web platform delivering **real-time weather forecasts**, **live crop market prices**, **expert farm management tips**, and **crop-specific seasonal guides** — built for smallholder farmers in Rwanda and across Africa.

---

## 📸 Preview

> Open the app → instantly see today's weather, market prices, farm tips, and seasonal alerts — no login, no barriers, works offline.

---

## 📋 System Description

### The Problem

Smallholder farmers across Rwanda and Africa lack reliable access to:
- Accurate weather forecasts to plan planting and harvesting
- Fair, up-to-date crop market prices to make informed selling decisions
- Trustworthy crop guidance leading to pest damage, poor yields, and lost income

Without this information, productivity drops, crop losses increase, and the livelihoods of millions of farming families are threatened — directly undermining food security across the continent.

### The Solution — SmartFarm Assist

SmartFarm Assist is an all-in-one farm intelligence platform that gives farmers instant, barrier-free access to the data they need:

| Feature | Description |
|---|---|
| 🌤️ Weather Forecast | Real-time conditions + 3-day forecast for any city |
| 📈 Market Prices | Live indicative crop prices in RWF/kg |
| 💡 Farm Tips | Expert seasonal and management guidance |
| 🌾 Crop Guides | Step-by-step planting-to-harvest guides per crop |
| 🔔 Seasonal Alerts | Timely notifications for planting and harvest windows |
| ⚡ Offline Mode | Data cached locally — works without internet |

**Zero registration. Zero personal data collected. Instant access.**

---

## ✨ Features

- 🔍 Search weather by city name (powered by OpenWeatherMap)
- 🌡️ Live temperature, humidity, wind speed, feels-like, cloud cover
- 🕐 24-hour hourly forecast (8 time slots, 3-hour intervals)
- 📊 Crop market prices table with trend indicators
- 🌾 Crop-specific seasonal guides (maize, beans, tomatoes, and more)
- 📱 Fully responsive — works on desktop, tablet, and mobile
- ⚡ Offline-capable via local data caching
- 🔒 No login, no account, no personal data required

---

## 🗂️ Project Structure

```
smartfarm-assist/
│
├── index.html       # Main HTML structure and layout
├── style.css        # All styling and responsive design
├── script.js        # App logic, API calls, data rendering
└── README.md        # Project documentation
```

---

## 🚀 Getting Started — Full Setup Guide

Follow every step below to get the project running on your machine.

---

### Step 1 — Get a Free OpenWeatherMap API Key

The weather features fetch live data from OpenWeatherMap. You need a free API key.

1. Go to [https://openweathermap.org](https://openweathermap.org)
2. Click **Sign Up** and create a free account
3. Verify your email address
4. Log in and navigate to **API Keys**:
   `https://home.openweathermap.org/api_keys`
5. Copy the **Default** API key shown on that page

> ⚠️ **Important:** New API keys take **10–120 minutes** to activate. If you see a `401 Invalid API key` error, wait and try again.

---

### Step 2 — Download the Project

**Option A — Clone with Git:**

```bash
git clone https://github.com/YOUR_USERNAME/smartfarm-assist
cd smartfarm-assist
```

**Option B — Download ZIP:**

1. Click the green **Code** button on the GitHub page
2. Select **Download ZIP**
3. Extract the ZIP to a folder on your computer
4. Open the extracted folder

---

### Step 3 — Add Your API Key

1. Open `script.js` in any text editor (VS Code, Notepad, Sublime Text, etc.)
2. Find the line that defines the API key:

```javascript
const apiKey = 'YOUR_API_KEY_HERE';
```

3. Replace `YOUR_API_KEY_HERE` with the key you copied in Step 1:

```javascript
const apiKey = 'abc123youractualkey';
```

4. Save the file

---

### Step 4 — Open the App in Your Browser

This is a plain HTML/CSS/JS project — **no server, no build tools, no installs required.**

**Option A — Open directly (simplest):**
- Double-click `index.html`
- It opens in your default browser immediately

**Option B — Open from the browser:**
1. Open Chrome, Firefox, Edge, or Safari
2. Press `Ctrl + O` (Windows/Linux) or `Cmd + O` (Mac)
3. Navigate to your project folder and select `index.html`
4. Click **Open**

**Option C — VS Code Live Server (recommended for development):**
1. Install [Visual Studio Code](https://code.visualstudio.com)
2. Install the **Live Server** extension from the Extensions panel
3. Right-click `index.html` in the VS Code file explorer
4. Select **Open with Live Server**
5. The app opens at `http://127.0.0.1:5500`

---

### Step 5 — Use the App

Once open in the browser:

1. **About** — Read about the platform and its purpose
2. **Dashboard** — Search a city for weather, see market prices, farm tips, and seasonal alerts
3. **Crops** — Browse crop cards and click any crop for its full seasonal guide
4. **Weather** — Full-page weather tracker with hourly 24-hour forecast

---

## 🌐 Live Demo

The app is publicly accessible at:

> **[https://YOUR-DEPLOYED-URL-HERE](https://YOUR-DEPLOYED-URL-HERE)**

*(Replace with your actual deployment URL — e.g. from GitHub Pages, Netlify, or Vercel)*

---

## 📄 Project Links

| Resource | Link |
|---|---|
| 🎥 Demo Video | [Watch on Google Drive / YouTube](#) |
| 💻 GitHub Repository | [github.com/YOUR_USERNAME/smartfarm-assist](#) |
| 📋 SRS Document | [Software Requirements Specification](#) |
| 🌐 Live App | [Deployed URL](#) |

> Replace all `#` placeholders with your actual links before submitting.

---

## ⚙️ Configuration Reference

| Setting | File | Where to change | Default |
|---|---|---|---|
| API Key | `script.js` | `const apiKey = '...'` | Placeholder |
| Temperature Unit | `script.js` | Conversion from Kelvin to °C | Celsius |
| Forecast slots | `script.js` | `hourlyData.slice(0, 8)` | 8 slots (24 hrs) |

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | App structure and layout |
| CSS3 | Styling, responsive design |
| Vanilla JavaScript | Logic, API calls, DOM manipulation |
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
- Check your spelling
- Try adding a country code: `Kigali,RW` or `London,GB`

**❌ Weather data doesn't load**
- Open DevTools (`F12`) → Console tab and check for errors
- Most likely: your API key hasn't activated yet — wait up to 2 hours

**❌ `401 Invalid API key`**
- Your key is wrong or not yet active
- Double-check it at [openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

**❌ CORS errors in the console**
- Don't open via `file://` path in some browsers
- Use VS Code Live Server or any local HTTP server instead

---

## 📋 Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An internet connection (for live weather data)
- A free OpenWeatherMap API key

No Node.js, no npm, no frameworks, no build tools required.

---

## 🙏 Acknowledgements

- Weather data by [OpenWeatherMap](https://openweathermap.org)
- Weather icons from OpenWeatherMap's icon CDN
- Typography by [Google Fonts](https://fonts.google.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).