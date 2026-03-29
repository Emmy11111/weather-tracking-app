/* ── NAV ── */
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('btn-' + id).classList.add('active');
}

/* ── OFFLINE ── */
function updateOnline() {
    const b = document.getElementById('offline-badge');
    navigator.onLine ? b.classList.remove('show') : b.classList.add('show');
}
window.addEventListener('online', updateOnline);
window.addEventListener('offline', updateOnline);
updateOnline();

/* ── WEATHER HELPERS ── */
const API_KEY = 'b2321c3741051f4f43d33bb1ee633620';
const EMOJIS  = {'01':'☀️','02':'🌤️','03':'⛅','04':'☁️','09':'🌧️','10':'🌦️','11':'⛈️','13':'❄️','50':'🌫️'};
const DAYS    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function toC(k) { return Math.round(k - 273.15); }
function showErr(id, msg) { const e=document.getElementById(id); e.textContent=msg; e.style.display='block'; }
function hideErr(id) { document.getElementById(id).style.display='none'; }

/* ── DASHBOARD WEATHER ── */
function dashWeather() {
    const city = document.getElementById('dash-city').value.trim();
    if (!city) return;
    const sp = document.getElementById('dash-spinner');
    hideErr('dash-err');
    ['dash-wcard','dash-details','dash-fc'].forEach(id => document.getElementById(id).classList.remove('show'));
    sp.style.display = 'block';

    Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`).then(r=>r.json()),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`).then(r=>r.json())
    ]).then(([cur, fc]) => {
        sp.style.display = 'none';
        if (cur.cod === '404' || cur.cod === 404) { showErr('dash-err', cur.message || 'City not found'); return; }
        localStorage.setItem('sf_weather', JSON.stringify({cur, fc, ts:Date.now()}));
        renderDashWeather(cur, fc);
    }).catch(() => {
        sp.style.display = 'none';
        const cached = localStorage.getItem('sf_weather');
        if (cached) { const d=JSON.parse(cached); renderDashWeather(d.cur, d.fc); showErr('dash-err','Offline — showing cached data'); }
        else showErr('dash-err', 'Error fetching weather. Check connection.');
    });
}

function renderDashWeather(cur, fc) {
    document.getElementById('d-city').textContent    = cur.name;
    document.getElementById('d-country').textContent = cur.sys.country;
    document.getElementById('d-temp').innerHTML      = toC(cur.main.temp) + '<sup>°C</sup>';
    document.getElementById('d-desc').textContent    = cur.weather[0].description;
    document.getElementById('d-icon').src = `https://openweathermap.org/img/wn/${cur.weather[0].icon}@2x.png`;
    document.getElementById('dd-hum').textContent   = cur.main.humidity + '%';
    document.getElementById('dd-wind').textContent  = Math.round(cur.wind.speed) + ' m/s';
    document.getElementById('dd-feels').textContent = toC(cur.main.feels_like) + '°C';
    document.getElementById('dd-cloud').textContent = cur.clouds.all + '%';
    document.getElementById('dash-wcard').classList.add('show');
    document.getElementById('dash-details').classList.add('show');

    // 3-day forecast
    const fcEl = document.getElementById('dash-fc');
    fcEl.innerHTML = '';
    const daily = {};
    fc.list.forEach(s => { const k=new Date(s.dt*1000).toDateString(); if(!daily[k]) daily[k]=s; });
    Object.values(daily).slice(1,4).forEach(s => {
        const d = new Date(s.dt*1000);
        const code = s.weather[0].icon.slice(0,2);
        const el = document.createElement('div'); el.className='fc-item';
        el.innerHTML = `<div class="fc-day">${DAYS[d.getDay()]}</div><div class="fc-emoji">${EMOJIS[code]||'🌡️'}</div><div class="fc-temp">${toC(s.main.temp)}°C</div>`;
        fcEl.appendChild(el);
    });
    fcEl.classList.add('show');
}

/* ── FULL WEATHER ── */
function fullWeather() {
    const city = document.getElementById('full-city').value.trim();
    if (!city) return;
    const sp = document.getElementById('full-spinner');
    const empty = document.getElementById('full-empty');
    hideErr('full-err');
    ['full-wcard','full-details','full-hourly'].forEach(id => document.getElementById(id).classList.remove('show'));
    empty.style.display = 'none'; sp.style.display = 'block';

    Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`).then(r=>r.json()),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`).then(r=>r.json())
    ]).then(([cur, fc]) => {
        sp.style.display = 'none';
        if (cur.cod === '404' || cur.cod === 404) { empty.style.display='flex'; showErr('full-err', cur.message||'City not found'); return; }
        renderFullWeather(cur, fc);
    }).catch(() => {
        sp.style.display = 'none'; empty.style.display = 'flex';
        showErr('full-err', 'Error fetching weather. Check your connection.');
    });
}

function renderFullWeather(cur, fc) {
    document.getElementById('f-city').textContent    = cur.name;
    document.getElementById('f-country').textContent = cur.sys.country;
    document.getElementById('f-temp').innerHTML      = toC(cur.main.temp) + '<sup>°C</sup>';
    document.getElementById('f-desc').textContent    = cur.weather[0].description;
    document.getElementById('f-icon').src = `https://openweathermap.org/img/wn/${cur.weather[0].icon}@2x.png`;
    document.getElementById('fd-hum').textContent   = cur.main.humidity + '%';
    document.getElementById('fd-wind').textContent  = Math.round(cur.wind.speed) + ' m/s';
    document.getElementById('fd-feels').textContent = toC(cur.main.feels_like) + '°C';
    document.getElementById('fd-cloud').textContent = cur.clouds.all + '%';
    document.getElementById('full-wcard').classList.add('show');
    document.getElementById('full-details').classList.add('show');

    const scroll = document.getElementById('full-hourly-scroll');
    scroll.innerHTML = '';
    fc.list.slice(0,8).forEach(s => {
        const d = new Date(s.dt*1000);
        const h = d.getHours().toString().padStart(2,'0');
        const code = s.weather[0].icon.slice(0,2);
        const el = document.createElement('div'); el.className='h-item';
        el.innerHTML = `<div class="h-time">${h}:00</div><div class="h-emoji">${EMOJIS[code]||'🌡️'}</div><div class="h-temp">${toC(s.main.temp)}°C</div>`;
        scroll.appendChild(el);
    });
    document.getElementById('full-hourly').classList.add('show');
}

/* ── MARKET PRICES ── */
const MARKET = [
    {emoji:'🌽',name:'Maize',    price:320, change:+5.2},
    {emoji:'🫘',name:'Beans',    price:780, change:-2.1},
    {emoji:'🥔',name:'Potatoes', price:210, change:+8.7},
    {emoji:'🍠',name:'Cassava',  price:180, change:+1.3},
    {emoji:'🍅',name:'Tomatoes', price:650, change:-4.5},
    {emoji:'🧅',name:'Onions',   price:540, change:+3.8},
    {emoji:'🌾',name:'Sorghum',  price:290, change:-1.0},
    {emoji:'🥬',name:'Cabbages', price:160, change:+6.1},
];

function renderMarket() {
    const tbody = document.getElementById('mkt-tbody');
    tbody.innerHTML = '';
    MARKET.forEach(c => {
        const dir = c.change >= 0 ? 'up' : 'down';
        const arrow = c.change >= 0 ? '▲' : '▼';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><div class="crop-name"><span class="crop-emoji">${c.emoji}</span>${c.name}</div></td><td><span class="price-val">${c.price.toLocaleString()}</span></td><td><span class="price-change ${dir}">${arrow} ${Math.abs(c.change)}%</span></td>`;
        tbody.appendChild(tr);
    });
    document.getElementById('mkt-updated').textContent = 'Updated: ' + new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
}

/* ── FARM TIPS ── */
const TIPS = [
    {icon:'🌱',tag:'planting',title:'Optimal Planting Time',    body:'Plant at the start of the rainy season when soil moisture is consistent. Avoid planting during heavy rain which causes seed displacement.'},
    {icon:'🪱',tag:'soil',    title:'Soil Preparation',          body:'Turn soil 20–30 cm deep before planting. Add compost or manure to improve fertility. Test soil pH — most crops prefer 6.0–7.0.'},
    {icon:'🐛',tag:'pest',    title:'Pest Management',           body:'Inspect crops weekly for early signs of pests. Use neem oil for early infestations. Rotate crops each season to break pest cycles.'},
    {icon:'💧',tag:'planting',title:'Irrigation Timing',         body:'Water early morning to reduce evaporation. Deep, infrequent watering encourages deeper root growth and drought resistance.'},
    {icon:'🌿',tag:'harvest', title:'Harvest Indicators',        body:'Harvest maize when husks turn brown and kernels are firm. Beans when pods dry and rattle. Potatoes when foliage yellows.'},
    {icon:'🧪',tag:'soil',    title:'Fertilizer Application',    body:'Apply DAP or NPK at planting. Top-dress with CAN or urea 4–6 weeks after germination. Never apply fertilizer to dry soil.'},
];

function renderTips() {
    const grid = document.getElementById('tips-grid');
    grid.innerHTML = '';
    TIPS.forEach(t => {
        const div = document.createElement('div'); div.className='tip-card';
        div.innerHTML = `<div class="tip-icon">${t.icon}</div><div><div class="tip-title">${t.title}</div><p class="tip-body">${t.body}</p><span class="tip-tag ${t.tag}">${t.tag}</span></div>`;
        grid.appendChild(div);
    });
}

/* ── ALERTS ── */
const ALERTS = [
    {icon:'🌧️',type:'danger', title:'Heavy Rain Expected',    body:'Forecast shows 40–60mm rainfall this week. Delay fertilizer application to avoid runoff losses.'},
    {icon:'🌾',type:'info',   title:'Maize Planting Season',  body:'October–November is optimal maize planting time in Rwanda. Prepare land now for best results.'},
    {icon:'☀️',type:'danger', title:'Dry Spell Advisory',     body:'Northern and Eastern provinces may experience reduced rainfall. Consider irrigation or drought-tolerant varieties.'},
    {icon:'📈',type:'info',   title:'Bean Prices Rising',     body:'Bean prices up 8% this month in Kigali markets. Consider holding stock if storage allows.'},
];

function renderAlerts() {
    const list = document.getElementById('alerts-list');
    list.innerHTML = '';
    ALERTS.forEach(a => {
        const div = document.createElement('div'); div.className=`alert-item ${a.type}`;
        div.innerHTML = `<div class="alert-icon">${a.icon}</div><div><div class="alert-title">${a.title}</div><div class="alert-body">${a.body}</div></div>`;
        list.appendChild(div);
    });
}

/* ── CROPS ── */
const CROPS = [
    {emoji:'🌽',name:'Maize',    price:'320 RWF/kg', steps:[
        {title:'Land Preparation', body:'Clear and plough land 2–3 weeks before planting. Make ridges 75cm apart. Incorporate organic matter into the soil.'},
        {title:'Planting',         body:'Plant 2 seeds per hole, 25cm apart. Cover with 3–5cm of soil. Plant at onset of rains (March–April or October–November).'},
        {title:'Fertilization',    body:'Apply DAP (100 kg/ha) at planting. Top-dress with CAN (150 kg/ha) when plants are knee-high — 4–6 weeks after germination.'},
        {title:'Pest Management',  body:'Watch for Fall Armyworm — spray early with Abamectin or Lambda-cyhalothrin. Scout weekly. Remove diseased plants.'},
        {title:'Harvesting',       body:'Harvest when husks turn brown and kernels are hard (120–135 days). Dry cobs to 13.5% moisture before storage or selling.'},
        {title:'Market Timing',    body:'Prices peak 2–3 months post-harvest when supply drops. Store in dry, ventilated conditions to capture better prices.'},
    ]},
    {emoji:'🫘',name:'Beans',    price:'780 RWF/kg', steps:[
        {title:'Land Preparation', body:'Beans prefer well-drained, fertile loam soils with pH 6.0–7.0. Deep plough and remove all crop residue from previous season.'},
        {title:'Planting',         body:'Plant seeds 5cm deep, 10cm apart in rows 40cm apart. Use certified disease-free seeds. Inoculate with Rhizobium for nitrogen fixation.'},
        {title:'Fertilization',    body:'Beans fix their own nitrogen. Apply phosphorus (TSP 100 kg/ha) at planting. Avoid excessive nitrogen which reduces pod setting.'},
        {title:'Pest Management',  body:'Monitor for bean stem maggot and aphids. Apply insecticides at early infestation. Practice crop rotation to manage soil-borne diseases.'},
        {title:'Harvesting',       body:'Harvest dry beans when 90% of pods are yellow and rattle. Pull entire plants or pick pods by hand. Thresh and winnow after drying.'},
        {title:'Market Timing',    body:'Beans command premium prices May–July and November–December. Grade and sort for higher market returns.'},
    ]},
    {emoji:'🥔',name:'Potatoes', price:'210 RWF/kg', steps:[
        {title:'Land Preparation', body:'Potatoes need deep, loose, well-drained soils. Plough 30–40cm deep. Form ridges 75cm apart. Soil temperature should be 10–18°C.'},
        {title:'Planting',         body:'Use certified seed potatoes. Plant whole small tubers or cut pieces with 2+ eyes, 30cm apart on ridges at 10cm depth.'},
        {title:'Fertilization',    body:'Apply NPK 17:17:17 (300 kg/ha) at planting. Earth up when plants are 15cm tall. Apply CAN top-dressing before tuber formation.'},
        {title:'Pest Management',  body:'Late blight is the main threat — apply Mancozeb preventively every 7–10 days in wet weather. Rogue out virus-infected plants immediately.'},
        {title:'Harvesting',       body:'Harvest 90–120 days after planting when foliage yellows. Allow skin to harden 2 weeks after vine death. Handle gently to prevent bruising.'},
        {title:'Market Timing',    body:'Potatoes are best sold fresh. Store in cool, dark, ventilated conditions. Avoid light exposure which causes greening and toxicity.'},
    ]},
    {emoji:'🍠',name:'Cassava',  price:'180 RWF/kg', steps:[
        {title:'Land Preparation', body:'Cassava tolerates poor soils but thrives in deep, well-drained sandy-loam. Mound soil into hills 1m apart for best tuber expansion.'},
        {title:'Planting',         body:'Use healthy stem cuttings 25–30cm long with 5–8 nodes. Plant at 45° angle, burying 2/3 of the cutting. Plant at start of rainy season.'},
        {title:'Fertilization',    body:'Apply NPK 15:15:15 (100 kg/ha) one month after planting. Cassava is drought tolerant but responds well to potassium fertilization.'},
        {title:'Pest Management',  body:'Cassava Mosaic Disease is a major threat. Use resistant varieties and control whiteflies which spread the virus. Remove and burn infected plants.'},
        {title:'Harvesting',       body:'Harvest 9–24 months after planting depending on variety. Tubers deteriorate quickly — process or sell within 48 hours of harvest.'},
        {title:'Market Timing',    body:'Cassava can be left in ground as a living store. Process into flour for longer shelf life and better market access year-round.'},
    ]},
    {emoji:'🍅',name:'Tomatoes', price:'650 RWF/kg', steps:[
        {title:'Nursery & Transplanting', body:'Raise seedlings for 4–6 weeks. Transplant when 15–20cm tall. Space 60×50cm in well-prepared beds with compost.'},
        {title:'Fertilization',    body:'Apply DAP at transplanting. Switch to potassium-rich fertilizer during fruiting. Calcium foliar spray prevents blossom end rot.'},
        {title:'Staking & Pruning',body:'Stake plants at 30cm height. Prune suckers weekly. Pruning improves air circulation and fruit size significantly.'},
        {title:'Pest Management',  body:'Major threats: Late blight, Bacterial wilt, Tuta absoluta. Spray Copper-based fungicides preventively. Use pheromone traps for Tuta.'},
        {title:'Irrigation',       body:'Keep soil consistently moist — irregular watering causes blossom drop and fruit cracking. Drip irrigation greatly improves yields.'},
        {title:'Harvesting',       body:'Harvest when fruits turn 3/4 red color for transport. Pick every 2–3 days. Handle gently. Sells best at local markets same-day.'},
    ]},
    {emoji:'🧅',name:'Onions',   price:'540 RWF/kg', steps:[
        {title:'Land Preparation', body:'Onions need fine, firm, well-drained raised beds. Avoid fresh manure. Form beds 1m wide. Optimal pH 6.0–7.0.'},
        {title:'Planting',         body:'Transplant seedlings 6–8 weeks old. Space 10×15cm. Firm soil around roots. Water immediately after transplanting.'},
        {title:'Fertilization',    body:'Apply NPK at transplanting. Side-dress with CAN after 4 weeks. Stop nitrogen 60 days before harvest to improve storage quality.'},
        {title:'Pest Management',  body:'Thrips are the major pest — use spinosad or imidacloprid. Purple blotch and Downy mildew need preventive copper or mancozeb sprays.'},
        {title:'Harvesting',       body:'Harvest when 70–80% of tops have fallen over. Lift bulbs carefully. Cure in field for 2 weeks to harden skin before storage.'},
        {title:'Market Timing',    body:'Onions store 3–6 months under proper conditions. Hold stock from peak glut and sell during off-season price peaks.'},
    ]},
];

function renderCrops() {
    const grid = document.getElementById('crops-grid');
    grid.innerHTML = '';
    CROPS.forEach((crop, i) => {
        const div = document.createElement('div'); div.className='crop-btn';
        div.innerHTML = `<div class="crop-btn-emoji">${crop.emoji}</div><div class="crop-btn-name">${crop.name}</div><div class="crop-btn-price">${crop.price}</div>`;
        div.onclick = () => showCropGuide(i);
        grid.appendChild(div);
    });
}

function showCropGuide(i) {
    const crop = CROPS[i];
    document.querySelectorAll('.crop-btn').forEach((b,j) => b.classList.toggle('selected', j===i));
    document.getElementById('guide-emoji').textContent = crop.emoji;
    document.getElementById('guide-name').textContent  = crop.name;
    document.getElementById('guide-price').textContent = 'Current market price: ' + crop.price;
    const steps = document.getElementById('guide-steps');
    steps.innerHTML = '';
    crop.steps.forEach((s, n) => {
        const div = document.createElement('div'); div.className='guide-step';
        div.innerHTML = `<div class="step-num">0${n+1}</div><div class="step-title">${s.title}</div><p class="step-body">${s.body}</p>`;
        steps.appendChild(div);
    });
    const guide = document.getElementById('crop-guide');
    guide.classList.add('show');
    guide.scrollIntoView({behavior:'smooth', block:'start'});
}

function hideCropGuide() {
    document.getElementById('crop-guide').classList.remove('show');
    document.querySelectorAll('.crop-btn').forEach(b => b.classList.remove('selected'));
}

/* ── INIT ── */
renderMarket();
renderTips();
renderAlerts();
renderCrops();

// Restore cached weather on dashboard
try {
    const cached = localStorage.getItem('sf_weather');
    if (cached) {
        const d = JSON.parse(cached);
        if (Date.now() - d.ts < 3600000) {
            renderDashWeather(d.cur, d.fc);
            document.getElementById('dash-city').value = d.cur.name;
        }
    }
} catch(e) {}