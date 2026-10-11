// Durasi maintenance (dalam jam). Ubah sesuai kebutuhan.
const DURATION_HOURS = 72;

// Atau isi waktu selesai secara manual, contoh: "2026-10-11T20:00:00+07:00"
const FIXED_END_TIME = null;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const progressBar = document.getElementById("progressBar");
const statusEl = document.getElementById("status");

const pad = (n) => String(n).padStart(2, "0");

function getTimes() {
  if (FIXED_END_TIME) {
    const end = new Date(FIXED_END_TIME).getTime();
    return { start: end - DURATION_HOURS * 3600 * 1000, end };
  }

  // Simpan waktu mulai supaya countdown tidak reset saat halaman di-refresh
  let start = Date.now();
  try {
    const saved = localStorage.getItem("maintenance_start");
    if (saved) {
      start = Number(saved);
    } else {
      localStorage.setItem("maintenance_start", String(start));
    }
  } catch (e) {
    // localStorage tidak tersedia, pakai waktu sekarang
  }
  return { start, end: start + DURATION_HOURS * 3600 * 1000 };
}

const { start, end } = getTimes();

const messages = [
  "Memperbarui sistem...",
  "Mengoptimalkan database...",
  "Memeriksa keamanan...",
  "Hampir selesai...",
];

function tick() {
  const now = Date.now();
  const remaining = Math.max(0, end - now);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  hoursEl.textContent = pad(h);
  minutesEl.textContent = pad(m);
  secondsEl.textContent = pad(s);

  const progress = Math.min(100, ((now - start) / (end - start)) * 100);
  progressBar.style.width = progress.toFixed(1) + "%";
  progressBar.parentElement.setAttribute("aria-valuenow", Math.round(progress));

  const idx = Math.min(messages.length - 1, Math.floor(progress / 25));
  statusEl.textContent = messages[idx];

  if (remaining === 0) {
    statusEl.textContent = "Maintenance selesai. Memuat ulang...";
    clearInterval(timer);
    setTimeout(() => location.reload(), 3000);
  }
}

const timer = setInterval(tick, 1000);
tick();
