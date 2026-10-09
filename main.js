const SUPABASE_URL = "https://wwiovsfkmymwkvxaehkh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aW92c2ZrbXltd2t2eGFlaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNTE0MjEsImV4cCI6MjEwNjkyNzQyMX0.gEo2azUF1x3gwVG7h8NCDop_ZdjUl41viisIWcK8eI4";

const PAI = "PENDIDIKAN AGAMA ISLAM (PAI)";
const PAK = "PENDIDIKAN AGAMA KRISTEN (PAK)";

function injectPAK(list){
  let baru = [];
  list.forEach(m=>{
    baru.push(m);
    if(m===PAI &&!list.includes(PAK)){
      baru.push(PAK);
    }
  });
  return baru;
}

const SISWA_PER_KELAS = {
"X E": ["AISYAH KIRANI","ALFIN NUR FIRDAUS","BAYU SAMUDRO","DAHMAN RIZAL","DIRGA TRI FAJRIAN","ENJELIARNIS SIREGAR","ERGI TIRTA","FAJRI RAMADANI","HOTTUA SINAGA","LIDIA LESTARI","M.FARDAN HAMDANI","M.PASHA","MELISA NEFRIANA","NAZILA KURNIANTI","NUR FAISAH","NURUL PADILAH","RAFI","RAHMA AIDIL FITRIANI","RENI","REZKA SAPUTRI","SATYA PUTRA","SELVIA","SYAHREZA","VIONA","WAHYU MAULANA","YOHANA PUTRI DAMERO"],
"XI F": ["ADILA SADRI","AINI SHELVIA","ANDRE","ANGGUN","BAGAS","FANDI ALFIAN","IRSYAD QUDMI","JONATAN","KEYLA ANTIKA","KHAIRIL PUTRI ANNISA","M.AGRI","MAYYA FATMAWATI","META SOFIA HALAWA","MEISYA SIRINGGORINGGO","MUHAMMAD SANDI","NUR AINI","OLVI RAMADINA","PETRAVITA BR PANDIANGAN","RAFI MAULANA","RESA","RIVALDO","SAHRIL HIDAYAT","SANTIYA ANGEL DELA","SELVIA CLARISA SIMORANGKIR","SENO AL FIQRI","YUDA RAMADANI"],
"XII MIPA": ["AGUS BERKAT NDRURU","AHMAD FAUZAN","ASNIANTI HAREFA","BONARDO","BUNGA CINDILOSA BR SITEPU","DANIEL RIANTO TAMPUBOLON","DENI KESUMA","DINDI LORENZA","FAIRUZ AFDHAL","GIO ALFANDO MARBUN","JEFRI RAHMADANI","KASIH TRI NADIA","M. NUR FAHREZI","MANDALA KUSUMA","MIKAELCONGLIN MARATAS PANDIANGAN","MUHAMMAD RIDO ARDI","NURCAHYATI","PETRUS SAKUBOU","RAFINDRA","SAMUEL NAINGGOLAN","SANDIKA PRATAMA","TIARA","WIRA PRAYUGA","YAZRIJAL","YOFRI ARDIANSYAH","ZALFA NAKIAH"]
};

const KONFIG_KELAS = {
// KELAS X E - SESUAI DATA LU
"X E": {
  mapel: {
    "PENDIDIKAN AGAMA KRISTEN (PAK)": "GURU PAK",
    "KIMIA": "PUJI SUSANTI, S.Pd",
    "BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd",
    "SENI BUDAYA": "ACI WINARTI, S.Pd.I",
    "SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd",
    "BAHASA INDONESIA": "SUNARNI, S.Pd",
    "GEOGRAFI": "DESWA YODI EKA PUTRA, S.Pd",
    "BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos",
    "MATEMATIKA": "MERI ANDAYANI, S.Pd",
    "BIOLOGI": "FAUZUL AZMI, S.Sos",
    "SEJARAH": "ROSELA, S.H",
    "PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd",
    "FISIKA": "PUJI SUSANTI, S.Pd",
    "PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H",
    "TEKNIK INFORMASI dan KOMUNIKASI (TIK)": "FAUZUL AZMI, S.Sos",
    "PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I",
    "EKONOMI": "ANITA SAPUTRI, S.E"
  },
  jadwal: {
    "Senin": ["KIMIA","BAHASA INGGRIS","SENI BUDAYA","SOSIOLOGI"],
    "Selasa": ["BAHASA INDONESIA","GEOGRAFI","BUDAYA MELAYU RIAU (BMR)","MATEMATIKA","BIOLOGI"],
    "Rabu": ["BAHASA INDONESIA","BUDAYA MELAYU RIAU (BMR)","SEJARAH","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
    "Kamis": ["FISIKA","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)","SENI BUDAYA","MATEMATIKA","TEKNIK INFORMASI dan KOMUNIKASI (TIK)"],
    "Jumat": ["PENDIDIKAN AGAMA ISLAM (PAI)","EKONOMI"],
    "Sabtu": [], "Minggu": []
  }
},
// KELAS XI F - SESUAI DATA LU
"XI F": {
  mapel: {
    "PENDIDIKAN AGAMA KRISTEN (PAK)": "GURU PAK",
    "SEJARAH": "ROSELA, S.H",
    "EKONOMI": "ANITA SAPUTRI, S.E",
    "SENI BUDAYA": "SUNARNI, S.Pd",
    "MATEMATIKA TINGKAT LANJUT (MTL)": "MERI ANDAYANI, S.Pd",
    "PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd",
    "PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I",
    "MATEMATIKA WAJIB": "MERI ANDAYANI, S.Pd",
    "PRAKARYA": "SUNARNI, S.Pd",
    "BAHASA INDONESIA": "ANITA SAPUTRI, S.E",
    "PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H",
    "BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd",
    "BIOLOGI": "FAUZUL AZMI, S.Sos",
    "SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd",
    "BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos"
  },
  jadwal: {
    "Senin": ["SEJARAH","EKONOMI","SENI BUDAYA","MATEMATIKA TINGKAT LANJUT (MTL)","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
    "Selasa": ["PENDIDIKAN AGAMA ISLAM (PAI)","MATEMATIKA WAJIB","PRAKARYA","BAHASA INDONESIA","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)"],
    "Rabu": ["MATEMATIKA WAJIB","BAHASA INGGRIS","SENI BUDAYA","BAHASA INDONESIA"],
    "Kamis": ["EKONOMI","BIOLOGI","SOSIOLOGI","BUDAYA MELAYU RIAU (BMR)"],
    "Jumat": ["SOSIOLOGI","MATEMATIKA WAJIB","BIOLOGI"],
    "Sabtu": [], "Minggu": []
  }
},
// KELAS XII MIPA - SESUAI DATA LU
"XII MIPA": {
  mapel: {
    "PENDIDIKAN AGAMA KRISTEN (PAK)": "GURU PAK",
    "SEJARAH INDONESIA": "FAUZUL AZMI, S.Sos",
    "MATEMATIKA PEMINATAN (MTK PM)": "MERI ANDAYANI, S.Pd",
    "PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)": "ROSELA, S.H",
    "BAHASA INDONESIA": "ANITA SAPUTRI, S.E",
    "BIOLOGI": "IRZA LIANA PITRI, S.Sos",
    "FISIKA": "PUJI SUSANTI, S.Pd",
    "SENI BUDAYA": "SUNARNI, S.Pd",
    "KIMIA": "PUJI SUSANTI, S.Pd",
    "SOSIOLOGI": "DESWA YODI EKA PUTRA, S.Pd",
    "PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)": "BONIKA, S.Pd",
    "PENDIDIKAN AGAMA ISLAM (PAI)": "ACI WINARTI, S.Pd.I",
    "BAHASA INGGRIS": "YUNI PUSPITASARI, S.Pd",
    "MATEMATIKA WAJIB": "MERI ANDAYANI, S.Pd",
    "PRAKARYA": "SUNARNI, S.Pd",
    "BUDAYA MELAYU RIAU (BMR)": "IRZA LIANA PITRI, S.Sos"
  },
  jadwal: {
    "Senin": ["SEJARAH INDONESIA","MATEMATIKA PEMINATAN (MTK PM)","PENDIDIKAN PANCASILA dan KEWARGANEGARAAN (PPKn)","BAHASA INDONESIA","BIOLOGI"],
    "Selasa": ["FISIKA","SENI BUDAYA","KIMIA","SOSIOLOGI","PENDIDIKAN JASMANI, OLAHRAGA dan KESEHATAN (PJOK)"],
    "Rabu": ["PENDIDIKAN AGAMA ISLAM (PAI)","MATEMATIKA PEMINATAN (MTK PM)","FISIKA","SOSIOLOGI"],
    "Kamis": ["MATEMATIKA WAJIB","BIOLOGI","BAHASA INGGRIS","KIMIA","BAHASA INDONESIA"],
    "Jumat": ["MATEMATIKA WAJIB","PRAKARYA","BUDAYA MELAYU RIAU (BMR)"],
    "Sabtu": [], "Minggu": []
  }
}
};

const $ = id => document.getElementById(id);
const TZ = "Asia/Jakarta";
function dateLabel(d=new Date()){return new Intl.DateTimeFormat("id-ID",{timeZone:TZ,weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(d);}
function timeLabel(d=new Date()){return d.toLocaleTimeString('en-GB',{timeZone:TZ,hour12:false});}
function hariIni(){return new Intl.DateTimeFormat("id-ID",{timeZone:TZ,weekday:"long"}).format(new Date());}
function tanggalISO(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(d);}
function clock(){ const n=new Date(); $("time").textContent=timeLabel(n); $("date").textContent=dateLabel(n); }
clock();setInterval(clock,1000);
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),3000);}

let cacheLibur=null;
function getLiburFixTahun(thn){return [{d:`${thn}-01-01`,n:"Tahun Baru"},{d:`${thn}-08-17`,n:"Hari Kemerdekaan RI"},{d:`${thn}-12-25`,n:"Hari Natal"}].map(x=>({holiday_date:x.d,holiday_name:x.n}));}
async function getHariLiburNasional(){const thn=new Date().getFullYear();if(cacheLibur)return cacheLibur;cacheLibur=getLiburFixTahun(thn);return cacheLibur;}
async function cekLibur(){const hari=hariIni();const iso=tanggalISO();if(hari==="Sabtu"||hari==="Minggu")return{libur:true,alasan:`Hari ${hari} - Libur Akhir Pekan`,emoji:"😴"};const list=await getHariLiburNasional();const found=list.find(x=>x.holiday_date===iso);if(found)return{libur:true,alasan:found.holiday_name,emoji:"🎉"};return{libur:false};}

let jadwalAktif=[],dataAbsenHariIni=[],kelasAktif="",GURU_KE_MAPEL={};

function buildGuruMap(kelas) {
  GURU_KE_MAPEL = {};
  const mapelData = KONFIG_KELAS[kelas]?.mapel || {};
  Object.entries(mapelData).forEach(([m, g]) => {
    if (m === PAK) return; // skip PAK biar gak masuk guru
    if (!GURU_KE_MAPEL[g]) GURU_KE_MAPEL[g] = [];
    GURU_KE_MAPEL[g].push(m);
  });
}

function renderNama(){
  $("nama").innerHTML='<option value="">-- Pilih Nama Siswa --</option>';
  const list=SISWA_PER_KELAS[kelasAktif]||[];
  list.sort().forEach(n=>{let o=document.createElement("option");o.value=n;o.textContent=n;$("nama").appendChild(o);});
}

async function renderMapelHari(){
  const libur=await cekLibur();
  if(libur.libur){renderLibur(libur);return;}
  $("jadwalInfo").classList.remove("liburBox");
  $("nama").disabled=false;$("mapel").disabled=false;$("guru").disabled=false;$("send").disabled=false;

  const konfig=KONFIG_KELAS[kelasAktif];
  const hari=hariIni();
  let list=konfig.jadwal[hari]||[];
  if(list.length===0) list=Object.keys(konfig.mapel).filter(m=>m!==PAK);
  list=injectPAK(list); // INI KUNCINYA
  jadwalAktif=list;
  buildGuruMap(kelasAktif);

  $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
  list.forEach(m=>{
    let o=document.createElement("option");
    o.value=m; o.textContent=m;
    if(m===PAK) o.disabled=true; // gak bisa diklik tapi tulisan tetap PAK
    $("mapel").appendChild(o);
  });

  const guruHariIni=[...new Set(list.filter(m=>m!==PAK).map(m=>konfig.mapel[m]).filter(Boolean))];
  $("guru").innerHTML='<option value="">-- Pilih Guru --</option>';
  guruHariIni.forEach(g=>{
    let o=document.createElement("option");o.value=g;o.textContent=g;$("guru").appendChild(o);
  });

  // JadwalInfo dengan coret
  let jadwalHTML = list.map(m=>{
    if(m===PAK) return `<s>${PAK}</s>`;
    return m;
  }).join(" • ");
  $("jadwalInfo").innerHTML=`📅 Kelas: <b>${kelasAktif}</b> | Hari ${hari}<br>Mapel: ${jadwalHTML}`;
  filterMapelByNama();
}

function renderLibur(info){
  $("jadwalInfo").classList.add("liburBox");
  $("jadwalInfo").innerHTML=`${info.emoji} <b>HARI LIBUR</b><br>📢 ${info.alasan}<br>Absensi ditutup`;
  $("nama").innerHTML='<option value="">-- Libur --</option>';$("nama").disabled=true;
  $("mapel").innerHTML='<option value="">-- Libur --</option>';$("mapel").disabled=true;
  $("guru").innerHTML='<option value="">-- Libur --</option>';$("guru").disabled=true;
  $("send").disabled=true;$("send").textContent="Libur 🔒";
  document.querySelectorAll('input[name="status"]').forEach(r=>{r.disabled=true;r.checked=false;r.parentElement.style.opacity="0.4";r.parentElement.style.pointerEvents="none";});
}

function filterMapelByNama(){
  const namaDipilih=$("nama").value;
  if(!namaDipilih){$("hintNama").style.display="none";return;}
  const sudahMapel=dataAbsenHariIni.filter(d=>d.nama===namaDipilih && d.kelas===kelasAktif).map(d=>d.mapel);
  const konfig=KONFIG_KELAS[kelasAktif];
  const hari=hariIni();
  let list=konfig.jadwal[hari]||[];
  if(list.length===0) list=Object.keys(konfig.mapel).filter(m=>m!==PAK);
  list=injectPAK(list);
  $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
  list.forEach(m=>{
    let o=document.createElement("option");o.value=m;o.textContent=m;
    if(m===PAK){o.disabled=true;}
    else if(sudahMapel.includes(m)){o.textContent=m+" ✅ Sudah absen";o.disabled=true;}
    $("mapel").appendChild(o);
  });
  if(sudahMapel.length>0){$("hintNama").style.display="block";$("hintNama").textContent=`${namaDipilih} sudah absen: ${sudahMapel.join(", ")}`;}
  else{$("hintNama").style.display="block";$("hintNama").textContent=`${namaDipilih} belum absen hari ini`;}
}

async function loadAbsenHariIni(){
  const tglHariIni=dateLabel(new Date());
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2?tanggal=eq.${encodeURIComponent(tglHariIni)}&select=nama,mapel,kelas`,{headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}});
    dataAbsenHariIni=await res.json()||[];
  }catch(e){dataAbsenHariIni=[];}
}

$("kelas").addEventListener("change",async()=>{
  kelasAktif=$("kelas").value;
  if(!kelasAktif)return;
  $("nama").disabled=false;
  await loadAbsenHariIni();
  renderNama();
  await renderMapelHari();
});

$("nama").addEventListener("change",filterMapelByNama);

let isAuto=false;
$("mapel").addEventListener("change",()=>{
  if(isAuto)return;
  const mapelVal=$("mapel").value,namaVal=$("nama").value;
  if(!mapelVal)return;
  if(mapelVal===PAK){toast(`❌ ${PAK} tidak bisa dipilih`);$("mapel").value="";return;}
  const sudah=dataAbsenHariIni.find(d=>d.nama===namaVal && d.mapel===mapelVal && d.kelas===kelasAktif);
  if(sudah){toast(`❌ ${namaVal} sudah absen ${mapelVal} hari ini!`);$("mapel").value="";$("guru").value="";return;}
  const guruAuto=KONFIG_KELAS[kelasAktif]?.mapel[mapelVal];
  if(guruAuto){isAuto=true;$("guru").value=guruAuto;$("hintGuru").style.display="block";$("hintGuru").textContent=`✨ Auto: ${guruAuto}`;isAuto=false;}
});

$("guru").addEventListener("change",()=>{
  if(isAuto)return;
  const guruVal=$("guru").value,namaVal=$("nama").value;
  if(!guruVal){filterMapelByNama();return;}
  const listMapelGuru=GURU_KE_MAPEL[guruVal]||[];
  const sudahMapel=dataAbsenHariIni.filter(d=>d.nama===namaVal && d.kelas===kelasAktif).map(d=>d.mapel);
  const mapelHariIni=jadwalAktif.filter(m=>m!==PAK && listMapelGuru.includes(m) &&!sudahMapel.includes(m));
  const mapelHariIniAll=jadwalAktif.filter(m=>m!==PAK && listMapelGuru.includes(m));
  if(mapelHariIni.length>0){
    isAuto=true;
    let listTampil=injectPAK(mapelHariIniAll);
    $("mapel").innerHTML='<option value="">-- Pilih Mapel --</option>';
    listTampil.forEach(m=>{
      let o=document.createElement("option");o.value=m;o.textContent=m;
      if(m===PAK){o.disabled=true;}
      else if(sudahMapel.includes(m)){o.textContent=m+" ✅ Sudah absen";o.disabled=true;}
      $("mapel").appendChild(o);
    });
    $("mapel").value=mapelHariIni[0];
    $("hintMapel").style.display="block";$("hintMapel").textContent=`✨ ${guruVal} hari ini mengajar: ${mapelHariIni.join(" & ")}`;
    isAuto=false;
  }
});

$("form").addEventListener("submit",async e=>{
  e.preventDefault();
  const kelas=$("kelas").value,nama=$("nama").value,mapel=$("mapel").value,guru=$("guru").value;
  const status=document.querySelector('input[name="status"]:checked')?.value;
    if(!kelas||!nama||!mapel||!guru||!status){toast("Lengkapi semua pilihan!");return;}
  if(mapel===PAK){toast(`❌ ${PAK} tidak bisa diabsen`);return;}
  const btn=$("send");btn.disabled=true;btn.textContent="Menyimpan...";
  const sentAt=new Date();const tglLabel=dateLabel(sentAt);
  try{
    const check=await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2?tanggal=eq.${encodeURIComponent(tglLabel)}&nama=eq.${encodeURIComponent(nama)}&mapel=eq.${encodeURIComponent(mapel)}&kelas=eq.${encodeURIComponent(kelas)}&select=id`,{headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}});
    const exists=await check.json();
    if(exists&&exists.length>0){toast(`❌ ${nama} sudah absen ${mapel} hari ini!`);btn.disabled=false;btn.textContent="Kirim Absensi 🚀";return;}
    const res=await fetch(`${SUPABASE_URL}/rest/v1/absensi_v2`,{method:"POST",headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json","Prefer":"return=minimal"},body:JSON.stringify({tanggal:tglLabel,jam:timeLabel(sentAt),nama,status,mapel,guru,kelas})});
    if(!res.ok){const txt=await res.text();throw new Error(txt);}
    dataAbsenHariIni.push({nama,mapel,kelas});
    $("form").reset();$("kelas").value=kelas;kelasAktif=kelas;renderNama();filterMapelByNama();
    $("hintMapel").style.display="none";$("hintGuru").style.display="none";
    $("success").style.display="block";$("success").textContent=`✅ ${kelas} - ${nama} - ${mapel} (${guru}) - ${status} berhasil!`;
    toast("Absensi berhasil!");setTimeout(()=>{$("success").style.display="none";},4000);
  }catch(err){toast("Gagal simpan: "+err.message);}finally{btn.disabled=false;btn.textContent="Kirim Absensi 🚀";}
});

$("nama").disabled=true;$("mapel").disabled=true;$("guru").disabled=true;