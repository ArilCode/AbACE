const SUPABASE_URL = "https://wwiovsfkmymwkvxaehkh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aW92c2ZrbXltd2t2eGFlaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNTE0MjEsImV4cCI6MjEwNjkyNzQyMX0.gEo2azUF1x3gwVG7h8NCDop_ZdjUl41viisIWcK8eI4";
const DAFTAR_SISWA = ["ADILA SADRI","AINI SHELVIA","ANDRE","ANGGUN","BAGAS","FANDI ALFIAN","IRSYAD QUDMI","JONATAN","KEYLA ANTIKA","KHAIRIL PUTRI ANNISA","M.AGRI","MAYYA FATMAWATI","META SOFIA HALAWA","MEISYA SIRINGGORINGGO","MUHAMMAD SANDI","NUR AINI","OLVI RAMADINA","PETRAVITA BR PANDIANGAN","RAFI MAULANA","RESA","RIVALDO","SAHRIL HIDAYAT","SANTIYA ANGEL DELA","SELVIA CLARISA SIMORANGKIR","SENO AL FIQRI","YUDA RAMADANI"];
const MAPEL_KE_GURU = {
  "BIOLOGI": "FAUZUL AZMI, S.Sos","SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H","SEJARAH": "ROSELA, S.H","MATEMATIKA WAJIB": "MERI ANDAYANI, S.Pd","MATEMATIKA TINGKAT LANJUT": "MERI ANDAYANI, S.Pd","BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos","PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I","SENI BUDAYA": "SUNARNI, S.Pd","PRAKARYA": "SUNARNI, S.Pd","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd","BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd","BAHASA INDONESIA": "ANITA SAPUTRI, S.E","EKONOMI": "ANITA SAPUTRI, S.E"
};
const GURU_KE_MAPEL = {};
Object.entries(MAPEL_KE_GURU).forEach(([m,g])=>{if(!GURU_KE_MAPEL[g])GURU_KE_MAPEL[g]=[];GURU_KE_MAPEL[g].push(m);});
const JADWAL_HARI = {
  "Senin": ["SEJARAH","EKONOMI","SENI BUDAYA","MATEMATIKA TINGKAT LANJUT","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
  "Selasa": ["PENDIDIKAN AGAMA ISLAM (PAI)","MATEMATIKA WAJIB","PRAKARYA","BAHASA INDONESIA","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)"],
  "Rabu": ["MATEMATIKA TINGKAT LANJUT","BAHASA INGGRIS","SENI BUDAYA","BAHASA INDONESIA"],
  "Kamis": ["EKONOMI","BIOLOGI","SOSIOLOGI","BUDAYA MELAYU RIAU (BMR)"],
  "Jumat": ["SOSIOLOGI","MATEMATIKA WAJIB","BIOLOGI"],
  "Sabtu": [], "Minggu": []
};

let cacheLibur = null;

// DAFTAR LIBUR FIX - bakal otomatis ganti tahun
function getLiburFixTahun(thn) {
  return [
    { d: `${thn}-01-01`, n: "Tahun Baru Masehi" },
    { d: `${thn}-03-20`, n: "Hari Raya Nyepi / Idul Fitri (perkiraan)" },
    { d: `${thn}-04-03`, n: "Wafat Isa Almasih" },
    { d: `${thn}-05-01`, n: "Hari Buruh" },
    { d: `${thn}-05-14`, n: "Kenaikan Isa Almasih" },
    { d: `${thn}-06-01`, n: "Hari Lahir Pancasila" },
    { d: `${thn}-08-17`, n: "Hari Kemerdekaan RI" },
    { d: `${thn}-12-25`, n: "Hari Natal" },
    // tambahan yang pasti tiap tahun
    { d: `${thn}-08-27`, n: "Maulid Nabi (perkiraan)" },
  ].map(x => ({ holiday_date: x.d, holiday_name: x.n }));
}

async function getHariLiburNasional() {
  const thn = new Date().getFullYear();
  if (cacheLibur) return cacheLibur;
  cacheLibur = getLiburFixTahun(thn);
  return cacheLibur;
}

async function cekLibur() {
  const hari = hariIni();
  const iso = tanggalISO();
  if (hari === "Sabtu" || hari === "Minggu") {
    return { libur: true, alasan: `Hari ${hari} - Libur Akhir Pekan`, emoji: "😴" };
  }
  const list = await getHariLiburNasional();
  const found = list.find(x => x.holiday_date === iso);
  if (found) {
    return { libur: true, alasan: found.holiday_name, emoji: "🎉" };
  }
  return { libur: false };
}
function tanggalISO(d=new Date()){
  return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
}
function renderLibur(info){
  $("jadwalInfo").classList.add("liburBox");
  $("jadwalInfo").innerHTML = `${info.emoji} <b>HARI LIBUR</b><br>📢 ${info.alasan}<br><br>Absensi ditutup hari ini`;
  $("nama").innerHTML='<option value="">-- Libur --</option>'; $("nama").disabled=true;
  $("mapel").innerHTML='<option value="">-- Libur --</option>'; $("mapel").disabled=true;
  $("guru").innerHTML='<option value="">-- Libur --</option>'; $("guru").disabled=true;
  $("send").disabled=true; $("send").textContent="Libur 🔒";

  // === KUNCI STATUS KEHADIRAN ===
  document.querySelectorAll('input[name="status"]').forEach(r=>{
    r.disabled = true;
    r.checked = false;
    r.parentElement.style.opacity = "0.4";
    r.parentElement.style.pointerEvents = "none";
  });
}

const $ = id => document.getElementById(id);
const TZ = "Asia/Jakarta";
function dateLabel(d=new Date()){return new Intl.DateTimeFormat("id-ID",{timeZone:TZ,weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(d);}
function timeLabel(d=new Date()){return d.toLocaleTimeString('en-GB',{timeZone:TZ,hour12:false});}
function hariIni(){return new Intl.DateTimeFormat("id-ID",{timeZone:TZ,weekday:"long"}).format(new Date());}
function clock(){ const n=new Date(); $("time").textContent=timeLabel(n); $("date").textContent=dateLabel(n); }
clock();setInterval(clock,1000);
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2800);}

let jadwalAktif = [];
let dataAbsenHariIni = []; // simpan semua {nama, mapel}

function renderNama(){
  $("nama").innerHTML='<option value="">-- Pilih Nama Siswa --</option>';
  DAFTAR_SISWA.sort().forEach(n=>{
    let o=document.createElement("option");o.value=n;o.textContent=n;
    $("nama").appendChild(o);
  });
}

async function renderMapelHari(){
  const libur = await cekLibur();
  if(libur.libur){ renderLibur(libur); return; }

  $("jadwalInfo").classList.remove("liburBox");
  $("nama").disabled=false; $("mapel").disabled=false; $("guru").disabled=false;
  $("send").disabled=false; $("send").textContent="Kirim Absensi 🚀";
    // di dalam renderMapelHari() setelah baris $("send").disabled=false;
  document.querySelectorAll('input[name="status"]').forEach(r=>{
    r.disabled = false;
    r.parentElement.style.opacity = "1";
    r.parentElement.style.pointerEvents = "auto";
  });

  const hari = hariIni();
  let list = JADWAL_HARI[hari] || [];
  jadwalAktif = list;

  $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
  list.forEach(m=>{
    let o=document.createElement("option");o.value=m;o.textContent=m;$("mapel").appendChild(o);
  });

  const guruHariIni = [...new Set(list.map(m=>MAPEL_KE_GURU[m]).filter(Boolean))];
  $("guru").innerHTML='<option value="">-- Pilih Guru --</option>';
  guruHariIni.forEach(g=>{
    let o=document.createElement("option");o.value=g;o.textContent=g;$("guru").appendChild(o);
  });

  $("jadwalInfo").innerHTML = `📅 Hari ${hari}<br>Mapel: ${list.join(" • ")}<br>Guru: ${guruHariIni.join(", ")}`;
  filterMapelByNama();
}

function filterMapelByNama(){
  const namaDipilih = $("nama").value;
  if(!namaDipilih){
    $("hintNama").style.display="none";
    renderMapelHariTanpaBlock();
    return;
  }
  // cari mapel yang sudah diabsen nama ini hari ini
  const sudahMapel = dataAbsenHariIni.filter(d=>d.nama===namaDipilih).map(d=>d.mapel);

  // render ulang mapel dengan disabled
  const hari = hariIni();
  let list = JADWAL_HARI[hari] || [];
  if(list.length===0) list = Object.keys(MAPEL_KE_GURU);

  $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
  list.forEach(m=>{
    if(m.includes("PAK")) return;
    let o=document.createElement("option");o.value=m;
    if(sudahMapel.includes(m)){
      o.textContent=m+" ✅ Sudah absen";o.disabled=true;
    } else o.textContent=m;
    $("mapel").appendChild(o);
  });

  if(sudahMapel.length>0){
    $("hintNama").style.display="block";
    $("hintNama").textContent=`${namaDipilih} sudah absen: ${sudahMapel.join(", ")} - mapel itu terkunci hari ini`;
  } else {
    $("hintNama").style.display="block";
    $("hintNama").textContent=`${namaDipilih} belum absen hari ini, bisa absen semua mapel`;
  }

  // reset guru
  const guruHariIni = [...new Set(list.map(m=>MAPEL_KE_GURU[m]).filter(Boolean))];
  $("guru").innerHTML='<option value="">-- Pilih Guru --</option>';
  guruHariIni.forEach(g=>{let o=document.createElement("option");o.value=g;o.textContent=g;$("guru").appendChild(o);});
  $("hintMapel").style.display="none";
  $("hintGuru").style.display="none";
}

function renderMapelHariTanpaBlock(){
  const hari = hariIni();
  let list = JADWAL_HARI[hari] || [];
  if(list.length===0) list = Object.keys(MAPEL_KE_GURU);
  $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
  list.forEach(m=>{
    if(m.includes("PAK")) return;
    let o=document.createElement("option");o.value=m;o.textContent=m;$("mapel").appendChild(o);
  });
}

async function loadAbsenHariIni(){
  const tglHariIni = dateLabel(new Date());
  try{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2?tanggal=eq.${encodeURIComponent(tglHariIni)}&select=nama,mapel`,{
      headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}
    });
    dataAbsenHariIni = await res.json() || [];
  }catch(e){dataAbsenHariIni=[];}
    renderNama();
  await renderMapelHari();
}

loadAbsenHariIni();

$("nama").addEventListener("change", filterMapelByNama);

let isAuto = false;
$("mapel").addEventListener("change", ()=>{
  if(isAuto) return;
  const mapelVal = $("mapel").value;
  const namaVal = $("nama").value;
  if(!mapelVal) return;

  // cek block per mapel
  const sudah = dataAbsenHariIni.find(d=>d.nama===namaVal && d.mapel===mapelVal);
  if(sudah){
    toast(`❌ ${namaVal} sudah absen ${mapelVal} hari ini!`);
    $("mapel").value="";
    $("guru").value="";
    return;
  }

  const guruAuto = MAPEL_KE_GURU[mapelVal];
  if(guruAuto){
    isAuto=true;
    $("guru").value = guruAuto;
    $("hintGuru").style.display="block";$("hintGuru").textContent=`✨ Auto: ${guruAuto}`;
    isAuto=false;
  }
});

$("guru").addEventListener("change", ()=>{
  if(isAuto) return;
  const guruVal = $("guru").value;
  const namaVal = $("nama").value;
  if(!guruVal) {filterMapelByNama();return;}
  const listMapelGuru = GURU_KE_MAPEL[guruVal] || [];
  const sudahMapel = dataAbsenHariIni.filter(d=>d.nama===namaVal).map(d=>d.mapel);
  const mapelHariIni = jadwalAktif.filter(m=>listMapelGuru.includes(m) &&!sudahMapel.includes(m));
  const mapelHariIniAll = jadwalAktif.filter(m=>listMapelGuru.includes(m));

  if(mapelHariIni.length>0){
    isAuto=true;
    $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
    mapelHariIniAll.forEach(m=>{
      let o=document.createElement("option");o.value=m;
      if(sudahMapel.includes(m)){o.textContent=m+" ✅ Sudah absen";o.disabled=true;}
      else o.textContent=m;
      $("mapel").appendChild(o);
    });
    $("mapel").value = mapelHariIni[0];
    $("hintMapel").style.display="block";
    $("hintMapel").textContent=`✨ ${guruVal} hari ini mengajar: ${mapelHariIni.join(" & ")}`;
    isAuto=false;
  } else {
    if(mapelHariIniAll.length>0 && mapelHariIniAll.every(m=>sudahMapel.includes(m))){
      toast(`Semua mapel ${guruVal} sudah diabsen ${namaVal} hari ini`);
      $("mapel").innerHTML='<option value="">-- Semua mapel sudah absen --</option>';
    } else {
      $("mapel").innerHTML='<option value="">-- Tidak ada mapel untuk guru ini hari ini --</option>';
    }
  }
});

$("form").addEventListener("submit",async e=>{
 e.preventDefault();
 const nama=$("nama").value, mapel=$("mapel").value, guru=$("guru").value;
 const status=document.querySelector('input[name="status"]:checked')?.value;
 if(!nama||!mapel||!guru||!status){toast("Lengkapi semua pilihan!");return;}
 const btn=$("send");btn.disabled=true;btn.textContent="Menyimpan...";
 const sentAt=new Date();
 const tglLabel = dateLabel(sentAt);
 try{
   // FINAL CHECK per mapel
   const check = await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2?tanggal=eq.${encodeURIComponent(tglLabel)}&nama=eq.${encodeURIComponent(nama)}&mapel=eq.${encodeURIComponent(mapel)}&select=id`,{
     headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}
   });
   const exists = await check.json();
   if(exists && exists.length>0){ toast(`❌ ${nama} sudah absen ${mapel} hari ini! Besok kalau ada mapel itu lagi baru bisa.`); btn.disabled=false;btn.textContent="Kirim Absensi 🚀"; return; }

   const res = await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2`,{
     method:"POST",
     headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json","Prefer":"return=minimal"},
     body: JSON.stringify({ tanggal: tglLabel, jam: timeLabel(sentAt), nama, status, mapel, guru, kelas: "XI F" })
   });
   if(!res.ok){ const txt = await res.text(); throw new Error(txt); }

   // update local cache
   dataAbsenHariIni.push({nama, mapel});

   $("form").reset();
   renderNama();
   filterMapelByNama();
   $("hintMapel").style.display="none"; $("hintGuru").style.display="none";
   $("success").style.display="block";
   $("success").textContent = `✅ ${nama} - ${mapel} (${guru}) - ${status} berhasil! Bisa lanjut mapel lain.`;
   toast("Absensi berhasil! Bisa lanjut mapel lain hari ini");
   setTimeout(()=>{ $("success").style.display="none"; }, 4000);
 }catch(err){ toast("Gagal simpan: " + err.message); }
 finally{ btn.disabled=false;btn.textContent="Kirim Absensi 🚀"; }
  const cek = await cekLibur();
 if(cek.libur){toast(`Libur: ${cek.alasan}`);return;}
});