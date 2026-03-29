# ⛅ WeatherApplication

This is a simple weather tracking app that lets you check the current weather for any city in the world. It uses the **OpenWeather API** to display temperature, humidity, wind speed, and weather conditions in real-time.

**Made by Emmanuel Dufitumukiza**

## Features

* Search weather by city name
* See temperature, humidity, wind speed
* Weather icons update based on conditions
* Lightweight, mobile-friendly layout
* Runs in any browser — no install needed

## Demo Video

📹 **Watch the app in action:** [https://drive.google.com/file/d/1K6QKFO4GxHe2b22_ETFE5y5sIVy5TQST/view?usp=sharing]

## Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/EmmanuelDufitumukiza/WeatherApplication
cd web_infra_lab

sudo systemctl restart haproxy
sudo python3 -m http.server 80 &

ssh ubuntu@localhost -p 2211
pass123
ssh ubuntu@localhost -p 2212
ssh ubuntu@localhost -p 2210

```

### Step 2: Get OpenWeather API Key

1. Go to https://openweathermap.org
2. Create a free account
3. Get your API key from the API keys section
4. Open the `script.js` file in this project
5. Paste your API key where it says:

```js
const apiKey = "YOUR_API_KEY_HERE";
```

6. Save the file

### Step 3: Run the Application

```bash
sudo systemctl restart haproxy
sudo python3 -m http.server 80 &
```

### Step 4: SSH Access (if needed)

```bash
# Web server 1
ssh ubuntu@localhost -p 2211
# Password: pass123

# Web server 2
ssh ubuntu@localhost -p 2212

# Load balancer
ssh ubuntu@localhost -p 2210
```

### Step 5: Access the Application

Open your browser and go to:
* `http://localhost:8080` (web-01)
* `http://localhost:8081` (web-02)
* `http://localhost:8082` (load-balanced)

## Alternative Local Setup

If you just want to run it locally without the lab infrastructure:

```bash
git clone https://github.com/EmmanuelDufitumukiza/WeatherApplication
cd WeatherApplication
python3 -m http.server 8000
```

Then go to `http://localhost:8000` in your browser.

## Lab Infrastructure Details

The app is designed to work with:
* **HAProxy** load balancer on port 8082
* **web-01** server accessible on port 8080
* **web-02** server accessible on port 8081
* SSH access with password `pass123` for web-01

## Tech Stack

* HTML
* CSS
* JavaScript
* OpenWeather API
* Python HTTP server
* HAProxy (for load balancing)

## Author

**Emmanuel Dufitumukiza**  
GitHub: https://github.com/EmmanuelDufitumukiza