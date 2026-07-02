# 🆘 Armor AI — Multi-Agent Emergency Command Console

Armor AI is a tactical emergency dispatch and relief coordination dashboard designed for natural disaster response (floods, cyclones, earthquakes, and landslides). It solves critical bottlenecks in relief coordination, route mapping, and offline communications.

---

## 🧭 GitHub Repository "About" Short Description
*(Copy-paste this into the "About" description box on your GitHub repository page)*:
> A premium, tactical multi-agent disaster response dashboard featuring dynamic Leaflet geofencing, simulated offline SMS keyword portals, automated supply matching boards, and bilingual AI triage logs.

---

## 🚨 Problems Solved

1. **Loss of Internet during Crises:** Simulates an **Offline SMS Gateway Portal** where victims can send lightweight cellular keyword text messages to query nearby shelters or check in safety statuses without internet.
2. **Chaotic Supply Matching:** Implements a real-time **Supply Board** that automatically matches relief needs (food, medicine) with volunteer offers.
3. **Blocked & Blind Routing:** Links map coordinates directly to safe shelters, drawing live animated path vectors (`L.polyline` dash-arrays) to guide rescue operations around active hazards.
4. **Siloed Agency Coordination:** Models a **Multi-Agent Orchestration Log** console that exposes step-by-step decision telemetry from dedicated agents (`[TriageAgent]`, `[GeoAgent]`, `[MatchAgent]`, `[SafetyAgent]`, `[DispatchAgent]`).
5. **Nighttime & Low-Battery Use:** Features a hardware-friendly **Light & Dark Theme Toggle** that instantly adjusts contrast ratios and swaps underlying map tile layers dynamically (CartoDB Dark Matter ⇄ CartoDB Voyager Light).

---

## ⚡ Key Features

* **Bilingual Chat Agent:** Conversational assistant supporting English and Hindi inputs with quick-reply teleports.
* **Live Crisis Simulator:** A visual trigger banner that simulates localized disasters, updates progress charts, drops active hazard zones on the map, and solves supply listings.
* **Responsive Bento Layout:** Built with a custom Obsidian/Amethyst grid that locks controls to viewport heights, preventing UI clipping.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5 (Semantic Structure) & Vanilla CSS3 (Custom variables, Keyframes, and custom scrollbar styles).
* **Scripting:** Modern ES6 JavaScript (State machines, text parser engines, and UI controllers).
* **Mapping:** Leaflet.js API (Marker mapping, custom icons, and dynamic vector lines).
* **Tile Providers:** CartoDB Dark Matter & CartoDB Voyager Light.

---

## 🚀 How to Deploy on GitHub Pages

You can host and run this interactive application live on the web for free using GitHub Pages:

### Step 1: Initialize Git and Push to GitHub
1. Create a new repository on [GitHub](https://github.com/) (e.g., named `armor-ai`).
2. Run the following commands in your local project directory terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Armor AI Command Console"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/armor-ai.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages
1. Go to your repository page on GitHub.
2. Click on the **⚙️ Settings** tab at the top.
3. On the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   * Set **Source** to `Deploy from a branch`.
   * Under **Branch**, select `main` and keep the directory as `/ (root)`.
5. Click **Save**.

### Step 3: View Your Live App!
* GitHub will take about 1–2 minutes to compile and build the page.
* Refresh the Pages settings tab, and you will see your live URL:
  `https://YOUR_USERNAME.github.io/armor-ai/`
