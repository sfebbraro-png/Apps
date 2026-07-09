const STORAGE_KEY = "bp-recorder-readings-v1";

const AHA_CATEGORIES = [
  {
    id: "normal",
    label: "Normal",
    color: "#00a651",
    description: "Less than 120 and less than 80",
  },
  {
    id: "elevated",
    label: "Elevated",
    color: "#f6c344",
    description: "120–129 and less than 80",
  },
  {
    id: "stage1",
    label: "Stage 1 Hypertension",
    color: "#f7941d",
    description: "130–139 or 80–89",
  },
  {
    id: "stage2",
    label: "Stage 2 Hypertension",
    color: "#ed1c24",
    description: "140 or higher or 90 or higher",
  },
  {
    id: "crisis",
    label: "Hypertensive Crisis",
    color: "#9b0000",
    description: "Higher than 180 and/or higher than 120",
  },
];

const els = {
  form: document.getElementById("bpForm"),
  date: document.getElementById("readingDate"),
  time: document.getElementById("readingTime"),
  systolic: document.getElementById("systolic"),
  diastolic: document.getElementById("diastolic"),
  pulse: document.getElementById("pulse"),
  notes: document.getElementById("notes"),
  liveCategory: document.getElementById("liveCategory"),
  avgBp: document.getElementById("avgBp"),
  avgBpCategory: document.getElementById("avgBpCategory"),
  avgPulse: document.getElementById("avgPulse"),
  totalReadings: document.getElementById("totalReadings"),
  dateRange: document.getElementById("dateRange"),
  historyBody: document.getElementById("historyBody"),
  ahaLegend: document.getElementById("ahaLegend"),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  clearBtn: document.getElementById("clearBtn"),
  chartCanvas: document.getElementById("bpChart"),
};

let readings = loadReadings();
let chart;

function classifyBp(systolic, diastolic) {
  const sys = Number(systolic);
  const dia = Number(diastolic);

  if (sys > 180 || dia > 120) return AHA_CATEGORIES.find((c) => c.id === "crisis");
  if (sys >= 140 || dia >= 90) return AHA_CATEGORIES.find((c) => c.id === "stage2");
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
    return AHA_CATEGORIES.find((c) => c.id === "stage1");
  }
  if (sys >= 120 && sys <= 129 && dia < 80) {
    return AHA_CATEGORIES.find((c) => c.id === "elevated");
  }
  if (sys < 120 && dia < 80) return AHA_CATEGORIES.find((c) => c.id === "normal");

  // If values fall into mixed buckets, use the higher-risk category.
  if (sys >= 140 || dia >= 90) return AHA_CATEGORIES.find((c) => c.id === "stage2");
  if (sys >= 130 || dia >= 80) return AHA_CATEGORIES.find((c) => c.id === "stage1");
  return AHA_CATEGORIES.find((c) => c.id === "elevated");
}

function loadReadings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.sort(sortByDateTimeDesc) : [];
  } catch {
    return [];
  }
}

function saveReadings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
}

function sortByDateTimeDesc(a, b) {
  return `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`);
}

function sortByDateTimeAsc(a, b) {
  return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function setDefaultDateTime() {
  const now = new Date();
  els.date.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  els.time.value = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function updateLiveCategory() {
  const sys = Number(els.systolic.value);
  const dia = Number(els.diastolic.value);

  if (!els.systolic.value || !els.diastolic.value || Number.isNaN(sys) || Number.isNaN(dia)) {
    els.liveCategory.textContent = "Enter systolic & diastolic";
    els.liveCategory.className = "category-badge muted";
    els.liveCategory.style.background = "";
    return;
  }

  const category = classifyBp(sys, dia);
  els.liveCategory.textContent = category.label;
  els.liveCategory.className = "category-badge";
  els.liveCategory.style.background = category.color;
}

function renderAhaLegend() {
  els.ahaLegend.innerHTML = AHA_CATEGORIES.map(
    (cat) => `
      <div class="aha-card" style="background:${cat.color}">
        <h3>${cat.label}</h3>
        <p>${cat.description}</p>
      </div>
    `
  ).join("");
}

function computeAverages() {
  if (!readings.length) {
    return { avgSys: null, avgDia: null, avgPulse: null, category: null };
  }

  const totals = readings.reduce(
    (acc, r) => {
      acc.sys += Number(r.systolic);
      acc.dia += Number(r.diastolic);
      acc.pulse += Number(r.pulse);
      return acc;
    },
    { sys: 0, dia: 0, pulse: 0 }
  );

  const count = readings.length;
  const avgSys = Math.round(totals.sys / count);
  const avgDia = Math.round(totals.dia / count);
  const avgPulse = Math.round(totals.pulse / count);

  return {
    avgSys,
    avgDia,
    avgPulse,
    category: classifyBp(avgSys, avgDia),
  };
}

function groupDailyAverages() {
  const map = new Map();

  readings.forEach((r) => {
    if (!map.has(r.date)) {
      map.set(r.date, { sys: [], dia: [], pulse: [] });
    }
    const bucket = map.get(r.date);
    bucket.sys.push(Number(r.systolic));
    bucket.dia.push(Number(r.diastolic));
    bucket.pulse.push(Number(r.pulse));
  });

  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, values]) => {
      const avg = (arr) => Math.round(arr.reduce((s, n) => s + n, 0) / arr.length);
      return {
        date,
        systolic: avg(values.sys),
        diastolic: avg(values.dia),
        pulse: avg(values.pulse),
      };
    });
}

function formatDisplayDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function updateStats() {
  const { avgSys, avgDia, avgPulse, category } = computeAverages();

  els.totalReadings.textContent = String(readings.length);

  if (!readings.length) {
    els.avgBp.textContent = "—";
    els.avgBp.style.color = "";
    els.avgBpCategory.textContent = "No readings yet";
    els.avgPulse.textContent = "—";
    els.dateRange.textContent = "Add your first reading";
    return;
  }

  els.avgBp.textContent = `${avgSys}/${avgDia}`;
  els.avgBp.style.color = category.color;
  els.avgBpCategory.textContent = category.label;
  els.avgBpCategory.style.color = category.color;
  els.avgPulse.textContent = String(avgPulse);

  const dates = [...new Set(readings.map((r) => r.date))].sort();
  if (dates.length === 1) {
    els.dateRange.textContent = formatDisplayDate(dates[0]);
  } else {
    els.dateRange.textContent = `${formatDisplayDate(dates[0])} – ${formatDisplayDate(dates[dates.length - 1])}`;
  }
}

function renderHistory() {
  if (!readings.length) {
    els.historyBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7">No readings yet. Add a reading or import a CSV file.</td>
      </tr>
    `;
    return;
  }

  els.historyBody.innerHTML = readings
    .slice()
    .sort(sortByDateTimeDesc)
    .map((r) => {
      const category = classifyBp(r.systolic, r.diastolic);
      return `
        <tr>
          <td>${formatDisplayDate(r.date)}</td>
          <td>${r.time}</td>
          <td><strong>${r.systolic}/${r.diastolic}</strong></td>
          <td>${r.pulse}</td>
          <td><span class="category-pill" style="background:${category.color}">${category.label}</span></td>
          <td>${escapeHtml(r.notes || "")}</td>
          <td><button type="button" class="delete-btn" data-id="${r.id}">Delete</button></td>
        </tr>
      `;
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderChart() {
  const daily = groupDailyAverages();
  const labels = daily.map((d) => formatDisplayDate(d.date));
  const systolic = daily.map((d) => d.systolic);
  const diastolic = daily.map((d) => d.diastolic);
  const pulse = daily.map((d) => d.pulse);

  const pointColors = daily.map((d) => classifyBp(d.systolic, d.diastolic).color);

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = systolic;
    chart.data.datasets[0].pointBackgroundColor = pointColors;
    chart.data.datasets[0].pointBorderColor = pointColors;
    chart.data.datasets[1].data = diastolic;
    chart.data.datasets[1].pointBackgroundColor = pointColors;
    chart.data.datasets[1].pointBorderColor = pointColors;
    chart.data.datasets[2].data = pulse;
    chart.update();
    return;
  }

  chart = new Chart(els.chartCanvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolic,
          borderColor: "#ed1c24",
          backgroundColor: "rgba(237, 28, 36, 0.12)",
          tension: 0.25,
          pointRadius: 5,
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
        },
        {
          label: "Diastolic",
          data: diastolic,
          borderColor: "#f7941d",
          backgroundColor: "rgba(247, 148, 29, 0.12)",
          tension: 0.25,
          pointRadius: 5,
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
        },
        {
          label: "Pulse",
          data: pulse,
          borderColor: "#0f766e",
          backgroundColor: "rgba(15, 118, 110, 0.08)",
          tension: 0.25,
          pointRadius: 4,
          borderDash: [5, 4],
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            afterBody(items) {
              const idx = items[0]?.dataIndex;
              if (idx == null || !daily[idx]) return "";
              const day = daily[idx];
              const category = classifyBp(day.systolic, day.diastolic);
              return `AHA: ${category.label}`;
            },
          },
        },
      },
      scales: {
        y: {
          title: { display: true, text: "Blood Pressure (mm Hg)" },
          suggestedMin: 40,
          suggestedMax: 200,
        },
        y1: {
          position: "right",
          title: { display: true, text: "Pulse (bpm)" },
          grid: { drawOnChartArea: false },
          suggestedMin: 40,
          suggestedMax: 140,
        },
      },
    },
  });
}

function refreshUi() {
  updateStats();
  renderHistory();
  renderChart();
}

function validateReading({ systolic, diastolic, pulse, date, time }) {
  if (!date || !time) return "Date and time are required.";
  if (![systolic, diastolic, pulse].every((n) => Number.isFinite(n))) {
    return "Systolic, diastolic, and pulse must be numbers.";
  }
  if (systolic < 50 || systolic > 300) return "Systolic must be between 50 and 300.";
  if (diastolic < 30 || diastolic > 200) return "Diastolic must be between 30 and 200.";
  if (pulse < 20 || pulse > 250) return "Pulse must be between 20 and 250.";
  if (diastolic >= systolic) return "Diastolic should be lower than systolic.";
  return null;
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const reading = {
    id: uid(),
    date: els.date.value,
    time: els.time.value,
    systolic: Number(els.systolic.value),
    diastolic: Number(els.diastolic.value),
    pulse: Number(els.pulse.value),
    notes: els.notes.value.trim(),
  };

  const error = validateReading(reading);
  if (error) {
    showToast(error);
    return;
  }

  readings.push(reading);
  readings.sort(sortByDateTimeDesc);
  saveReadings();
  refreshUi();

  els.systolic.value = "";
  els.diastolic.value = "";
  els.pulse.value = "";
  els.notes.value = "";
  updateLiveCategory();
  setDefaultDateTime();
  showToast("Reading saved");
});

els.historyBody.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-btn");
  if (!button) return;
  const id = button.dataset.id;
  readings = readings.filter((r) => r.id !== id);
  saveReadings();
  refreshUi();
  showToast("Reading deleted");
});

els.clearBtn.addEventListener("click", () => {
  if (!readings.length) return;
  if (!confirm("Clear all blood pressure readings? This cannot be undone.")) return;
  readings = [];
  saveReadings();
  refreshUi();
  showToast("All readings cleared");
});

function toCsv(rows) {
  const header = ["date", "time", "systolic", "diastolic", "pulse", "notes", "category"];
  const lines = [header.join(",")];

  rows
    .slice()
    .sort(sortByDateTimeAsc)
    .forEach((r) => {
      const category = classifyBp(r.systolic, r.diastolic).label;
      const values = [
        r.date,
        r.time,
        r.systolic,
        r.diastolic,
        r.pulse,
        r.notes || "",
        category,
      ].map(csvEscape);
      lines.push(values.join(","));
    });

  return lines.join("\n");
}

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replaceAll('"', '""')}"`;
  }
  return str;
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let inQuotes = false;
  const pushCell = (row) => {
    row.push(current);
    current = "";
  };
  const pushRow = (row) => {
    if (row.length > 1 || row[0] !== "") rows.push(row);
  };

  let row = [];
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      pushCell(row);
    } else if (char === "\n") {
      pushCell(row);
      pushRow(row);
      row = [];
    } else if (char === "\r") {
      // ignore
    } else {
      current += char;
    }
  }

  pushCell(row);
  pushRow(row);
  return rows;
}

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function importCsvText(text) {
  const rows = parseCsv(text.trim());
  if (rows.length < 2) throw new Error("CSV file has no data rows.");

  const headers = rows[0].map(normalizeHeader);
  const required = ["date", "systolic", "diastolic", "pulse"];
  for (const key of required) {
    if (!headers.includes(key)) {
      throw new Error(`Missing required column: ${key}`);
    }
  }

  const imported = [];
  for (let i = 1; i < rows.length; i += 1) {
    const cells = rows[i];
    if (!cells.length || cells.every((c) => !String(c).trim())) continue;

    const record = Object.fromEntries(headers.map((h, idx) => [h, cells[idx] ?? ""]));
    const reading = {
      id: uid(),
      date: String(record.date).trim(),
      time: String(record.time || "08:00").trim(),
      systolic: Number(record.systolic),
      diastolic: Number(record.diastolic),
      pulse: Number(record.pulse),
      notes: String(record.notes || "").trim(),
    };

    if (!/^\d{4}-\d{2}-\d{2}$/.test(reading.date)) {
      throw new Error(`Invalid date on row ${i + 1}. Use YYYY-MM-DD.`);
    }
    if (!/^\d{2}:\d{2}/.test(reading.time)) {
      reading.time = "08:00";
    } else {
      reading.time = reading.time.slice(0, 5);
    }

    const error = validateReading(reading);
    if (error) throw new Error(`Row ${i + 1}: ${error}`);
    imported.push(reading);
  }

  if (!imported.length) throw new Error("No valid readings found in CSV.");

  readings = [...readings, ...imported].sort(sortByDateTimeDesc);
  saveReadings();
  refreshUi();
  showToast(`Imported ${imported.length} reading${imported.length === 1 ? "" : "s"}`);
}

els.exportBtn.addEventListener("click", () => {
  if (!readings.length) {
    showToast("No readings to export");
    return;
  }

  const csv = toCsv(readings);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `bp-recorder-${stamp}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("CSV exported");
});

els.importInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  try {
    const text = await file.text();
    importCsvText(text);
  } catch (error) {
    showToast(error.message || "Could not import CSV");
  }
});

["input", "change"].forEach((evt) => {
  els.systolic.addEventListener(evt, updateLiveCategory);
  els.diastolic.addEventListener(evt, updateLiveCategory);
});

renderAhaLegend();
setDefaultDateTime();
updateLiveCategory();
refreshUi();
