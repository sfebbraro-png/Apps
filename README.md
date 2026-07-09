# BP Recorder

A simple web-based blood pressure monitoring app.

## Features

- Record **systolic**, **diastolic**, and **pulse**
- Color-code each reading using **American Heart Association (AHA)** categories
- Chart daily blood pressure and pulse trends
- Show running average BP and pulse
- Export readings to CSV
- Import readings from CSV
- Persist data in the browser with `localStorage`

## AHA Categories Used

| Category | Systolic | Diastolic | Color |
|---|---|---|---|
| Normal | &lt; 120 | and &lt; 80 | Green |
| Elevated | 120–129 | and &lt; 80 | Yellow |
| Stage 1 Hypertension | 130–139 | or 80–89 | Orange |
| Stage 2 Hypertension | ≥ 140 | or ≥ 90 | Red |
| Hypertensive Crisis | &gt; 180 | and/or &gt; 120 | Dark red |

## How to run

Open `index.html` in a modern browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## CSV format

```csv
date,time,systolic,diastolic,pulse,notes,category
2026-07-01,08:15,118,76,72,Morning,
2026-07-02,08:10,132,84,78,After coffee,
```

Required columns: `date`, `systolic`, `diastolic`, `pulse`  
Optional columns: `time`, `notes`, `category`

Date format: `YYYY-MM-DD`  
Time format: `HH:MM`

## Disclaimer

BP Recorder is for personal tracking only and is not medical advice.
