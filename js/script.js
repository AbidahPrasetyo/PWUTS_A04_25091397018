/* ==========================================================================
   FILE: js/script.js
   LANDASAN MATERI:
   - 0501_javascript.pptx (DOM getElementById, getElementsByClassName,
     innerHTML, style, Events, Variabel, Operator, Function, Looping for,
     Conditional if/else, JSON)
   - 0301_html.pptx (Client Storage HTML5: localStorage)
   - 0602_jquery_ajax.pptx (Teknik Ajax menggunakan objek XMLHttpRequest / XHR)
   ========================================================================== */

// 1. DATA MASTER JSON (Mengacu ERD: waste_types, waste_prices, users, deposits, deposit_items)
var katalogSampah = [
    { jenis_id: 1, nama_jenis: "Botol Plastik", harga_kotor: 2000, harga_bersih: 3500 },
    { jenis_id: 2, nama_jenis: "Galon Plastik", harga_kotor: 3000, harga_bersih: 5000 },
    { jenis_id: 3, nama_jenis: "Kardus",        harga_kotor: 1500, harga_bersih: 2500 }
];

var dataWargaDefault = [
    { id_users: 101, nama: "Budi Santoso",     email: "budi.puri@mail.com",  no_hp: "081234567801", alamat: "Blok A1 No. 12, Puri Indah", role: "Warga", status: "Aktif" },
    { id_users: 102, nama: "Siti Aminah",      email: "siti.puri@mail.com",  no_hp: "081234567802", alamat: "Blok A2 No. 05, Puri Indah", role: "Warga", status: "Aktif" },
    { id_users: 103, nama: "Hendra Wijaya",    email: "hendra.w@mail.com",   no_hp: "081234567803", alamat: "Blok B1 No. 08, Puri Indah", role: "Warga", status: "Aktif" },
    { id_users: 104, nama: "Dewi Lestari",     email: "dewi.puri@mail.com",  no_hp: "081234567804", alamat: "Blok B3 No. 19, Puri Indah", role: "Warga", status: "Aktif" },
    { id_users: 105, nama: "Rizky Pratama",    email: "rizky.p@mail.com",    no_hp: "081234567805", alamat: "Blok C2 No. 03, Puri Indah", role: "Warga", status: "Aktif" }
];

var dataSetoranDefault = [
    {
        id_deposit: "DEP-2026-001",
        warga_id: 101,
        petugas_id: 2,
        metode: "Setor Langsung",
        tgl_setor: "2026-10-20",
        jenis_id: 1,
        nama_jenis: "Botol Plastik",
        kondisi: "Bersih",
        berat: 3.5,
        harga_satuan: 3500,
        subtotal: 12250,
        potongan_jemput: 0,
        total_bersih: 12250
    },
    {
        id_deposit: "DEP-2026-002",
        warga_id: 102,
        petugas_id: 2,
        metode: "Setor Langsung",
        tgl_setor: "2026-10-21",
        jenis_id: 3,
        nama_jenis: "Kardus",
        kondisi: "Bersih",
        berat: 6.0,
        harga_satuan: 2500,
        subtotal: 15000,
        potongan_jemput: 0,
        total_bersih: 15000
    },
    {
        id_deposit: "DEP-2026-003",
        warga_id: 103,
        petugas_id: 2,
        metode: "Setor Langsung",
        tgl_setor: "2026-10-22",
        jenis_id: 2,
        nama_jenis: "Galon Plastik",
        kondisi: "Kotor",
        berat: 2.0,
        harga_satuan: 3000,
        subtotal: 6000,
        potongan_jemput: 0,
        total_bersih: 6000
    },
    {
        id_deposit: "DEP-2026-004",
        warga_id: 101,
        petugas_id: 2,
        metode: "Setor Langsung",
        tgl_setor: "2026-10-24",
        jenis_id: 1,
        nama_jenis: "Botol Plastik",
        kondisi: "Kotor",
        berat: 4.0,
        harga_satuan: 2000,
        subtotal: 8000,
        potongan_jemput: 0,
        total_bersih: 8000
    },
    {
        id_deposit: "DEP-2026-005",
        warga_id: 104,
        petugas_id: 2,
        metode: "Setor Langsung",
        tgl_setor: "2026-10-25",
        jenis_id: 2,
        nama_jenis: "Galon Plastik",
        kondisi: "Bersih",
        berat: 3.0,
        harga_satuan: 5000,
        subtotal: 15000,
        potongan_jemput: 0,
        total_bersih: 15000
    }
];

// Variabel Global Data Aplikasi & Counter Baris Simulasi
var daftarWarga = [];
var daftarSetoran = [];
var counterBarisSimulasi = 0;

// ==========================================================================
// 2. INISIALISASI CLIENT STORAGE HTML5 (localStorage - 0301_html.pptx)
// ==========================================================================
function inisialisasiData() {
    var simpananWarga = localStorage.getItem("nabungsampah_warga");
    var simpananSetoran = localStorage.getItem("nabungsampah_setoran");

    if (simpananWarga !== null && simpananSetoran !== null) {
        daftarWarga = JSON.parse(simpananWarga);
        daftarSetoran = JSON.parse(simpananSetoran);
    } else {
        daftarWarga = dataWargaDefault;
        daftarSetoran = dataSetoranDefault;
        simpanKeLocalStorage();
    }
}

function simpanKeLocalStorage() {
    localStorage.setItem("nabungsampah_warga", JSON.stringify(daftarWarga));
    localStorage.setItem("nabungsampah_setoran", JSON.stringify(daftarSetoran));
}

function resetDataDemo() {
    var konfirmasi = window.confirm("Apakah Anda yakin ingin mengembalikan data setoran ke data awal?");
    if (konfirmasi) {
        localStorage.removeItem("nabungsampah_warga");
        localStorage.removeItem("nabungsampah_setoran");
        inisialisasiData();
        perbaruiStatistikDashboard();
        muatHalamanAjax("home", document.getElementById("nav-home"));
        tampilkanPopup("Data Berhasil Direset", "Seluruh data warga dan riwayat setoran telah dikembalikan ke kondisi awal.", true);
    }
}

// ==========================================================================
// 3. FUNGSI FORMAT RUPIAH & PENCARIAN DATA MASTER
// ==========================================================================
function formatRupiah(angka) {
    var nilai = Math.round(Number(angka) || 0);
    var str = nilai.toString();
    var hasil = "";
    var hitung = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        hasil = str.charAt(i) + hasil;
        hitung++;
        if (hitung % 3 === 0 && i !== 0) {
            hasil = "." + hasil;
        }
    }
    return "Rp " + hasil;
}

function cariWargaById(wargaId) {
    for (var i = 0; i < daftarWarga.length; i++) {
        if (Number(daftarWarga[i].id_users) === Number(wargaId)) {
            return daftarWarga[i];
        }
    }
    return null;
}

function cariJenisSampahById(jenisId) {
    for (var i = 0; i < katalogSampah.length; i++) {
        if (Number(katalogSampah[i].jenis_id) === Number(jenisId)) {
            return katalogSampah[i];
        }
    }
    return null;
}

function ambilHargaSatuan(jenisId, kondisi) {
    var item = cariJenisSampahById(jenisId);
    if (item === null || !kondisi) {
        return 0;
    }
    return kondisi === "Bersih" ? item.harga_bersih : item.harga_kotor;
}

// ==========================================================================
// 4. UPDATE STATISTIK RINGKASAN DASHBOARD (Tugas 2.a)
// ==========================================================================
function perbaruiStatistikDashboard() {
    var totalWarga = daftarWarga.length;
    var totalBerat = 0;
    var totalNominal = 0;

    for (var i = 0; i < daftarSetoran.length; i++) {
        totalBerat += Number(daftarSetoran[i].berat);
        totalNominal += Number(daftarSetoran[i].total_bersih);
    }

    document.getElementById("stat-total-warga").innerHTML = totalWarga + " Warga";
    document.getElementById("stat-total-berat").innerHTML = totalBerat.toFixed(1) + " Kg";
    document.getElementById("stat-total-transaksi").innerHTML = daftarSetoran.length + " Transaksi Setor Langsung";
    document.getElementById("stat-total-nominal").innerHTML = formatRupiah(totalNominal);
}

// Event onmouseover & onmouseout sesuai materi 0501_javascript.pptx
function ubahSorotPetugas(elemen, aktif) {
    if (aktif) {
        elemen.style.backgroundColor = "#5D4037";
        elemen.style.color = "#FFFFFF";
    } else {
        elemen.style.backgroundColor = "#EFEBE9";
        elemen.style.color = "#5D4037";
    }
}

// Event ondblclick pada kartu statistik sesuai materi 0501_javascript.pptx
function infoKartuStatistik(tipe) {
    if (tipe === "warga") {
        window.alert("Info: Seluruh warga Komplek Perumahan Puri Indah wajib memiliki akun aktif sebelum menyetor sampah.");
    } else if (tipe === "berat") {
        window.alert("Info: Hanya menerima 3 jenis sampah daur ulang: Botol Plastik, Galon Plastik, dan Kardus.");
    } else {
        window.alert("Info: Setor Langsung ke Bank Sampah tidak dikenakan potongan biaya jemput Rp 2.000.");
    }
}

// ==========================================================================
// 5. NAVIGASI AJAX MENGGUNAKAN XMLHttpRequest (XHR - 0602_jquery_ajax.pptx)
// ==========================================================================
function aturMenuAktif(elemenKlik) {
    var daftarMenu = document.getElementsByClassName("nav-link");
    for (var i = 0; i < daftarMenu.length; i++) {
        daftarMenu[i].className = "nav-link";
    }
    if (elemenKlik) {
        elemenKlik.className = "nav-link active";
    }
}

function muatHalamanAjax(halaman, elemenMenu) {
    aturMenuAktif(elemenMenu);
    var kontainer = document.getElementById("ajax-container");
    var indikatorLoading = document.getElementById("loading-indicator");

    if (halaman === "home") {
        renderBerandaDashboard();
        return;
    }

    indikatorLoading.style.display = "block";

    // Pembuatan objek XMLHttpRequest sesuai materi 0602_jquery_ajax.pptx
    var xhr = new XMLHttpRequest();
    xhr.open("GET", halaman, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            indikatorLoading.style.display = "none";

            if (xhr.status === 200) {
                kontainer.innerHTML = xhr.responseText;
                inisialisasiHalamanPascaAjax(halaman);
            } else {
                // Fallback jika dibuka langsung lewat protokol file:// tanpa server HTTP lokal
                kontainer.innerHTML = ambilFallbackTemplate(halaman);
                inisialisasiHalamanPascaAjax(halaman);
            }
        }
    };

    xhr.onerror = function () {
        indikatorLoading.style.display = "none";
        kontainer.innerHTML = ambilFallbackTemplate(halaman);
        inisialisasiHalamanPascaAjax(halaman);
    };

    xhr.send();
}

function inisialisasiHalamanPascaAjax(halaman) {
    if (halaman === "riwayat.html") {
        renderTabelDaftarWarga();
        filterRiwayatSetoran();
        resetTabelSimulasi();
    } else if (halaman === "setor.html") {
        isiDropdownWargaForm();
        setTanggalHariIni();
    }
}

// ==========================================================================
// 6. RENDER BERANDA DASHBOARD UTAMA (Tugas 2.a)
// ==========================================================================
function renderBerandaDashboard() {
    var kontainer = document.getElementById("ajax-container");
    var totalBotol = 0, totalGalon = 0, totalKardus = 0;

    for (var i = 0; i < daftarSetoran.length; i++) {
        var s = daftarSetoran[i];
        if (Number(s.jenis_id) === 1) totalBotol += Number(s.berat);
        if (Number(s.jenis_id) === 2) totalGalon += Number(s.berat);
        if (Number(s.jenis_id) === 3) totalKardus += Number(s.berat);
    }

    var html = '' +
        '<article class="content-panel">' +
           '<h3>Komposisi Sampah Daur Ulang Terkumpul</h3>' +
            '<table class="custom-table" border="1" cellspacing="0" cellpadding="8">' +
                '<thead>' +
                    '<tr>' +
                        '<th>ID Jenis</th>' +
                        '<th>Nama Jenis Sampah</th>' +
                        '<th>Tarif Kondisi Kotor</th>' +
                        '<th>Tarif Kondisi Bersih</th>' +
                        '<th>Total Berat Terkumpul</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '<tr>' +
                        '<td><code>1</code></td>' +
                        '<td><strong>Botol Plastik</strong></td>' +
                        '<td>Rp 2.000 / kg</td>' +
                        '<td>Rp 3.500 / kg</td>' +
                        '<td><b>' + totalBotol.toFixed(1) + ' Kg</b></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><code>2</code></td>' +
                        '<td><strong>Galon Plastik</strong></td>' +
                        '<td>Rp 3.000 / kg</td>' +
                        '<td>Rp 5.000 / kg</td>' +
                        '<td><b>' + totalGalon.toFixed(1) + ' Kg</b></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><code>3</code></td>' +
                        '<td><strong>Kardus</strong></td>' +
                        '<td>Rp 1.500 / kg</td>' +
                        '<td>Rp 2.500 / kg</td>' +
                        '<td><b>' + totalKardus.toFixed(1) + ' Kg</b></td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>'
        '</article>';

    kontainer.innerHTML = html;
}

// ==========================================================================
// 7. LOGIKA TUGAS 2.b: DAFTAR WARGA, FILTER RIWAYAT & SIMULASI DYNAMIC ROW
// ==========================================================================
function renderTabelDaftarWarga() {
    var tbody = document.getElementById("tbody-daftar-warga");
    if (!tbody) return;

    var barisHTML = "";
    for (var i = 0; i < daftarWarga.length; i++) {
        var w = daftarWarga[i];
        var frekuensi = 0;
        var akumulasiBerat = 0;
        var akumulasiTabungan = 0;

        for (var j = 0; j < daftarSetoran.length; j++) {
            if (Number(daftarSetoran[j].warga_id) === Number(w.id_users)) {
                frekuensi++;
                akumulasiBerat += Number(daftarSetoran[j].berat);
                akumulasiTabungan += Number(daftarSetoran[j].total_bersih);
            }
        }

        barisHTML += '<tr>' +
            '<td><code>USR-' + w.id_users + '</code></td>' +
            '<td><strong>' + w.nama + '</strong></td>' +
            '<td>' + w.alamat + '</td>' +
            '<td>' + w.no_hp + '</td>' +
            '<td><span class="badge-bersih">' + w.status + '</span></td>' +
            '<td>' + frekuensi + ' kali</td>' +
            '<td>' + akumulasiBerat.toFixed(1) + ' Kg</td>' +
            '<td><strong class="highlight-nominal">' + formatRupiah(akumulasiTabungan) + '</strong></td>' +
        '</tr>';
    }
    tbody.innerHTML = barisHTML;
}

function filterRiwayatSetoran() {
    var tbody = document.getElementById("tbody-riwayat-setoran");
    if (!tbody) return;

    var keyword = document.getElementById("filter-keyword").value.toLowerCase();
    var filterJenis = document.getElementById("filter-jenis").value;
    var filterKondisi = document.getElementById("filter-kondisi").value;

    var barisHTML = "";
    var jumlahTampil = 0;
    var totalNominalFilter = 0;

    for (var i = daftarSetoran.length - 1; i >= 0; i--) {
        var item = daftarSetoran[i];
        var warga = cariWargaById(item.warga_id);
        var namaWarga = warga ? warga.nama : "Warga Tidak Dikenal";

        var cocokKeyword = (namaWarga.toLowerCase().indexOf(keyword) !== -1) ||
                           (item.id_deposit.toLowerCase().indexOf(keyword) !== -1);
        var cocokJenis = (filterJenis === "SEMUA") || (item.nama_jenis === filterJenis);
        var cocokKondisi = (filterKondisi === "SEMUA") || (item.kondisi === filterKondisi);

        if (cocokKeyword && cocokJenis && cocokKondisi) {
            jumlahTampil++;
            totalNominalFilter += Number(item.total_bersih);
            var badgeClass = item.kondisi === "Bersih" ? "badge-bersih" : "badge-kotor";

            barisHTML += '<tr>' +
                '<td><code>' + item.id_deposit + '</code></td>' +
                '<td>' + item.tgl_setor + '</td>' +
                '<td><strong>' + namaWarga + '</strong></td>' +
                '<td>' + item.metode + '</td>' +
                '<td>' + item.nama_jenis + '</td>' +
                '<td><span class="' + badgeClass + '">' + item.kondisi + '</span></td>' +
                '<td>' + Number(item.berat).toFixed(1) + ' Kg</td>' +
                '<td>' + formatRupiah(item.harga_satuan) + '</td>' +
                '<td><strong>' + formatRupiah(item.total_bersih) + '</strong></td>' +
            '</tr>';
        }
    }

    if (jumlahTampil === 0) {
        barisHTML = '<tr><td colspan="9" align="center"><em>Tidak ada riwayat setoran yang sesuai dengan filter pencarian.</em></td></tr>';
    }

    tbody.innerHTML = barisHTML;
    document.getElementById("info-jumlah-riwayat").innerHTML =
        "Menampilkan " + jumlahTampil + " dari " + daftarSetoran.length +
        " transaksi | Akumulasi Subtotal Terfilter: " + formatRupiah(totalNominalFilter);
}

function resetFilterRiwayat() {
    document.getElementById("filter-keyword").value = "";
    document.getElementById("filter-jenis").value = "SEMUA";
    document.getElementById("filter-kondisi").value = "SEMUA";
    filterRiwayatSetoran();
}

// FITUR SIMULASI TABEL DINAMIS (DYNAMIC ROW MULTI-ITEM)
function tambahBarisSimulasi() {
    var tbody = document.getElementById("tbody-simulasi");
    if (!tbody) return;

    counterBarisSimulasi++;
    var idBaris = counterBarisSimulasi;

    var tr = document.createElement("tr");
    tr.setAttribute("id", "sim-row-" + idBaris);
    tr.setAttribute("class", "baris-simulasi");

    tr.innerHTML = '' +
        '<td class="nomor-baris-sim"></td>' +
        '<td>' +
            '<select id="sim-jenis-' + idBaris + '" onchange="hitungBarisSimulasi(' + idBaris + ')">' +
                '<option value="1">Botol Plastik</option>' +
                '<option value="2">Galon Plastik</option>' +
                '<option value="3">Kardus</option>' +
            '</select>' +
        '</td>' +
        '<td>' +
            '<select id="sim-kondisi-' + idBaris + '" onchange="hitungBarisSimulasi(' + idBaris + ')">' +
                '<option value="Bersih">Bersih (Tarif Tinggi)</option>' +
                '<option value="Kotor">Kotor (Belum Dipilah)</option>' +
            '</select>' +
        '</td>' +
        '<td>' +
            '<input type="number" id="sim-berat-' + idBaris + '" value="1.0" min="0.1" step="0.1" onkeyup="hitungBarisSimulasi(' + idBaris + ')" onchange="hitungBarisSimulasi(' + idBaris + ')" />' +
        '</td>' +
        '<td id="sim-harga-' + idBaris + '">Rp 3.500</td>' +
        '<td><strong id="sim-subtotal-' + idBaris + '" data-subtotal="3500" data-berat="1">Rp 3.500</strong></td>' +
        '<td>' +
            '<button type="button" class="btn-danger" onclick="hapusBarisSimulasi(' + idBaris + ')">Hapus</button>' +
        '</td>';

    tbody.appendChild(tr);
    perbaruiNomorBarisSimulasi();
    hitungBarisSimulasi(idBaris);
}

function hitungBarisSimulasi(idBaris) {
    var elJenis = document.getElementById("sim-jenis-" + idBaris);
    var elKondisi = document.getElementById("sim-kondisi-" + idBaris);
    var elBerat = document.getElementById("sim-berat-" + idBaris);

    if (!elJenis || !elKondisi || !elBerat) return;

    var jenisId = Number(elJenis.value);
    var kondisi = elKondisi.value;
    var berat = parseFloat(elBerat.value);
    if (isNaN(berat) || berat < 0) {
        berat = 0;
    }

    var hargaSatuan = ambilHargaSatuan(jenisId, kondisi);
    var subtotal = Math.round(hargaSatuan * berat);

    document.getElementById("sim-harga-" + idBaris).innerHTML = formatRupiah(hargaSatuan);
    var elSub = document.getElementById("sim-subtotal-" + idBaris);
    elSub.innerHTML = formatRupiah(subtotal);
    elSub.setAttribute("data-subtotal", subtotal);
    elSub.setAttribute("data-berat", berat);

    hitungTotalKeseluruhanSimulasi();
}

function hapusBarisSimulasi(idBaris) {
    var baris = document.getElementById("sim-row-" + idBaris);
    if (baris && baris.parentNode) {
        baris.parentNode.removeChild(baris);
        perbaruiNomorBarisSimulasi();
        hitungTotalKeseluruhanSimulasi();
    }
}

function perbaruiNomorBarisSimulasi() {
    var selNomor = document.getElementsByClassName("nomor-baris-sim");
    for (var i = 0; i < selNomor.length; i++) {
        selNomor[i].innerHTML = (i + 1);
    }
}

function hitungTotalKeseluruhanSimulasi() {
    var barisList = document.getElementsByClassName("baris-simulasi");
    var totalBerat = 0;
    var totalHarga = 0;

    for (var i = 0; i < barisList.length; i++) {
        var strongSub = barisList[i].getElementsByTagName("strong")[0];
        if (strongSub) {
            totalHarga += Number(strongSub.getAttribute("data-subtotal") || 0);
            totalBerat += Number(strongSub.getAttribute("data-berat") || 0);
        }
    }

    var elTotalBerat = document.getElementById("sim-total-berat");
    var elTotalHarga = document.getElementById("sim-total-harga");
    if (elTotalBerat && elTotalHarga) {
        elTotalBerat.innerHTML = totalBerat.toFixed(2) + " Kg";
        elTotalHarga.innerHTML = formatRupiah(totalHarga);
    }
}

function resetTabelSimulasi() {
    var tbody = document.getElementById("tbody-simulasi");
    if (!tbody) return;
    tbody.innerHTML = "";
    counterBarisSimulasi = 0;
    tambahBarisSimulasi();
    tambahBarisSimulasi();
}

// ==========================================================================
// 8. LOGIKA TUGAS 2.c: FORM TRANSAKSI SETOR LANGSUNG & VALIDASI JS
// ==========================================================================
function isiDropdownWargaForm() {
    var selectWarga = document.getElementById("input-warga");
    if (!selectWarga) return;

    var opsi = '<option value="">-- Pilih Akun Warga Komplek Puri Indah --</option>';
    for (var i = 0; i < daftarWarga.length; i++) {
        var w = daftarWarga[i];
        opsi += '<option value="' + w.id_users + '">USR-' + w.id_users + ' - ' + w.nama + ' (' + w.alamat + ')</option>';
    }
    selectWarga.innerHTML = opsi;
}

function setTanggalHariIni() {
    var inputTanggal = document.getElementById("input-tanggal");
    if (inputTanggal) {
        inputTanggal.value = "2026-10-26";
    }
}

function tampilkanInfoWargaTerpilih() {
    var selectWarga = document.getElementById("input-warga");
    var infoEl = document.getElementById("detail-warga-terpilih");
    if (!selectWarga || !infoEl) return;

    var warga = cariWargaById(selectWarga.value);
    if (warga) {
        infoEl.innerHTML = "Terpilih: <b>" + warga.nama + "</b> | Alamat: " + warga.alamat + " | HP: " + warga.no_hp;
    } else {
        infoEl.innerHTML = "Wajib memilih akun warga yang terdaftar.";
    }
}

function ambilKondisiTerpilihForm() {
    var rbBersih = document.getElementById("kondisi-bersih");
    var rbKotor = document.getElementById("kondisi-kotor");
    if (rbBersih && rbBersih.checked) return "Bersih";
    if (rbKotor && rbKotor.checked) return "Kotor";
    return "";
}

function hitungOtomatisFormSetor() {
    var elJenis = document.getElementById("input-jenis");
    var elBerat = document.getElementById("input-berat");
    if (!elJenis || !elBerat) return;

    var jenisId = elJenis.value;
    var kondisi = ambilKondisiTerpilihForm();
    var berat = parseFloat(elBerat.value);

    var hargaSatuan = ambilHargaSatuan(jenisId, kondisi);
    var subtotal = 0;
    if (!isNaN(berat) && berat > 0 && hargaSatuan > 0) {
        subtotal = Math.round(hargaSatuan * berat);
    }

    // Potongan jemput Rp 0 karena metode Setor Langsung
    var totalBersih = subtotal;

    document.getElementById("display-harga-satuan").innerHTML = formatRupiah(hargaSatuan) + " / kg";
    document.getElementById("display-subtotal").innerHTML = formatRupiah(subtotal);
    document.getElementById("display-total-bersih").innerHTML = formatRupiah(totalBersih);

    document.getElementById("input-harga-satuan").value = hargaSatuan;
    document.getElementById("input-subtotal").value = subtotal;
    document.getElementById("input-total-bersih").value = totalBersih;
}

function resetKalkulasiForm() {
    setTimeout(function () {
        setTanggalHariIni();
        tampilkanInfoWargaTerpilih();
        hitungOtomatisFormSetor();
        var errorBox = document.getElementById("form-error-box");
        if (errorBox) errorBox.style.display = "none";
    }, 20);
}

// VALIDASI FORM SETORAN SEBELUM SUBMIT (Tugas 2.c Poin 3 & Activity Diagram Setor Langsung)
function prosesSubmitSetoran(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    var wargaId = document.getElementById("input-warga").value;
    var tglSetor = document.getElementById("input-tanggal").value;
    var jenisId = document.getElementById("input-jenis").value;
    var kondisi = ambilKondisiTerpilihForm();
    var beratStr = document.getElementById("input-berat").value;
    var berat = parseFloat(beratStr);

    var pesanError = [];

    // 1. Validasi warga penyetor wajib dipilih
    if (wargaId === "") {
        pesanError.push("Data warga penyetor (warga_id) wajib dipilih dari daftar akun warga.");
    }

    // 2. Validasi tanggal setor wajib diisi
    if (tglSetor === "") {
        pesanError.push("Tanggal setor (tgl_setor) wajib diisi.");
    }

    // 3. Validasi jenis sampah wajib dipilih
    if (jenisId === "") {
        pesanError.push("Jenis sampah (jenis_id: Botol Plastik / Galon Plastik / Kardus) wajib dipilih.");
    }

    // 4. Validasi kondisi sampah wajib dipilih
    if (kondisi === "") {
        pesanError.push("Kondisi sampah (Kotor / Bersih) wajib dipilih.");
    }

    // 5. Validasi nilai berat harus berupa angka valid lebih dari 0
    if (beratStr === "" || isNaN(berat) || berat <= 0) {
        pesanError.push("Nilai berat sampah (kg) harus berupa angka valid lebih dari 0.");
    }

    var errorBox = document.getElementById("form-error-box");
    var errorList = document.getElementById("form-error-list");

    // Jika tidak valid, tampilkan daftar pesan kesalahan & pop-up peringatan
    if (pesanError.length > 0) {
        var htmlErr = "";
        for (var i = 0; i < pesanError.length; i++) {
            htmlErr += "<li>" + pesanError[i] + "</li>";
        }
        errorList.innerHTML = htmlErr;
        errorBox.style.display = "block";
        tampilkanPopup("Data Tidak Valid / Lengkap", "Mohon lengkapi seluruh kolom wajib pada formulir pendataan setoran langsung.", false);
        return false;
    }

    errorBox.style.display = "none";

    // Hitung ulang nominal resmi & simpan transaksi baru
    var objJenis = cariJenisSampahById(jenisId);
    var objWarga = cariWargaById(wargaId);
    var hargaSatuan = ambilHargaSatuan(jenisId, kondisi);
    var subtotal = Math.round(hargaSatuan * berat);
    var nomorUrut = daftarSetoran.length + 1;
    var kodeDeposit = "DEP-2026-00" + nomorUrut;

    var transaksiBaru = {
        id_deposit: kodeDeposit,
        warga_id: Number(wargaId),
        petugas_id: 2,
        metode: "Setor Langsung",
        tgl_setor: tglSetor,
        jenis_id: Number(jenisId),
        nama_jenis: objJenis.nama_jenis,
        kondisi: kondisi,
        berat: berat,
        harga_satuan: hargaSatuan,
        subtotal: subtotal,
        potongan_jemput: 0,
        total_bersih: subtotal
    };

    daftarSetoran.push(transaksiBaru);
    simpanKeLocalStorage();
    perbaruiStatistikDashboard();

    // Tampilkan Pop-up Setoran Berhasil beserta Total Nominal Setoran (Sesuai Wireframe & Tugas 2.c)
    var rincianSukses =
        "ID Transaksi: <b>" + kodeDeposit + "</b><br/>" +
        "Warga Penyetor: <b>" + objWarga.nama + "</b><br/>" +
        "Item Sampah: <b>" + objJenis.nama_jenis + " (" + kondisi + ") &times; " + berat.toFixed(1) + " Kg</b><br/>" +
        "Total Nominal Setoran Bersih: <b style='font-size:1.15rem;color:#1B5E20;'>" + formatRupiah(subtotal) + "</b>";

    tampilkanPopup("Setoran Langsung Berhasil Disimpan!", rincianSukses, true);

    // Reset form setelah berhasil
    document.getElementById("form-setor-langsung").reset();
    resetKalkulasiForm();
    return false;
}

// ==========================================================================
// 9. KONTROL POP-UP MODAL (Sesuai Wireframe 4.4.1 Poin 4)
// ==========================================================================
function tampilkanPopup(judul, pesanHTML, statusSukses) {
    var overlay = document.getElementById("popup-overlay");
    var icon = document.getElementById("popup-icon");
    var title = document.getElementById("popup-title");
    var msg = document.getElementById("popup-message");

    title.innerHTML = judul;
    msg.innerHTML = pesanHTML;

    if (statusSukses) {
        icon.innerHTML = "&#10003;";
        icon.style.backgroundColor = "#E8F5E9";
        icon.style.color = "#1B5E20";
        icon.style.borderColor = "#1B5E20";
    } else {
        icon.innerHTML = "&#10007;";
        icon.style.backgroundColor = "#FFEBEE";
        icon.style.color = "#B71C1C";
        icon.style.borderColor = "#B71C1C";
    }

    overlay.style.display = "block";
}

function tutupPopup() {
    document.getElementById("popup-overlay").style.display = "none";
}

// ==========================================================================
// 10. FALLBACK TEMPLATE JIKA DIBUKA LANGSUNG TANPA WEB SERVER (file://)
// ==========================================================================
function ambilFallbackTemplate(halaman) {
    if (halaman === "riwayat.html") {
        return '' +
        '<article class="content-panel">' +
            '<div class="panel-header">' +
                '<h2>Daftar Akun Warga &amp; Laporan Tabungan Sampah</h2>' +
            '</div>' +
            '<div class="table-responsive">' +
                '<table class="custom-table" border="1" cellspacing="0" cellpadding="8">' +
                    '<thead><tr><th>ID Warga</th><th>Nama Lengkap Warga</th><th>Blok / Alamat Rumah</th><th>No. HP</th><th>Status Akun</th><th>Frekuensi Setor</th><th>Total Berat (Kg)</th><th>Total Tabungan (Rp)</th></tr></thead>' +
                    '<tbody id="tbody-daftar-warga"></tbody>' +
                '</table>' +
            '</div>' +
        '</article>' +
        '<article class="content-panel">' +
            '<div class="panel-header">' +
                '<h2>Riwayat Rincian Setoran Langsung Warga</h2>' +
            '</div>' +
            '<div class="filter-bar">' +
                '<div class="filter-group"><label for="filter-keyword">Cari Warga / ID Deposit:</label><input type="search" id="filter-keyword" placeholder="Ketik nama warga..." onkeyup="filterRiwayatSetoran()" /></div>' +
                '<div class="filter-group"><label for="filter-jenis">Filter Jenis Sampah:</label><select id="filter-jenis" onchange="filterRiwayatSetoran()"><option value="SEMUA">-- Semua Jenis Sampah --</option><option value="Botol Plastik">Botol Plastik</option><option value="Galon Plastik">Galon Plastik</option><option value="Kardus">Kardus</option></select></div>' +
                '<div class="filter-group"><label for="filter-kondisi">Filter Kondisi Sampah:</label><select id="filter-kondisi" onchange="filterRiwayatSetoran()"><option value="SEMUA">-- Semua Kondisi --</option><option value="Bersih">Bersih (Siap Setor Pusat)</option><option value="Kotor">Kotor (Belum Dipilah)</option></select></div>' +
                '<div class="filter-group filter-action"><button type="button" class="btn-secondary btn-sm" onclick="resetFilterRiwayat()">Reset Filter</button></div>' +
                '<div class="clear"></div>' +
            '</div>' +
            '<div class="table-responsive">' +
                '<table class="custom-table" border="1" cellspacing="0" cellpadding="8">' +
                    '<thead><tr><th>ID Deposit</th><th>Tanggal Setor</th><th>Nama Warga</th><th>Metode</th><th>Jenis Sampah</th><th>Kondisi</th><th>Berat (Kg)</th><th>Harga Satuan</th><th>Subtotal Bersih</th></tr></thead>' +
                    '<tbody id="tbody-riwayat-setoran"></tbody>' +
                '</table>' +
            '</div>' +
            '<p id="info-jumlah-riwayat" class="table-footer-note"></p>' +
        '</article>' +
        '<article class="content-panel">' +
            '<div class="panel-header">' +
                '<h2>Simulasi Kalkulasi Multi-Item Setor Langsung (Dynamic Row)</h2>' +
            '</div>' +
            '<div class="simulasi-actions">' +
                '<button type="button" class="btn-primary" onclick="tambahBarisSimulasi()">+ Tambah Baris Item Sampah</button> ' +
                '<button type="button" class="btn-secondary" onclick="resetTabelSimulasi()">Kosongkan Simulasi</button>' +
            '</div>' +
            '<div class="table-responsive">' +
                '<table class="custom-table" border="1" cellspacing="0" cellpadding="8">' +
                    '<thead><tr><th>No</th><th>Pilihan Jenis Sampah (<code>jenis_id</code>)</th><th>Kondisi Sampah (<code>kondisi</code>)</th><th>Berat Sampah (<code>kg</code>)</th><th>Harga Satuan (<code>harga_satuan</code>)</th><th>Subtotal (<code>subtotal</code>)</th><th>Aksi</th></tr></thead>' +
                    '<tbody id="tbody-simulasi"></tbody>' +
                    '<tfoot><tr class="summary-row"><td colspan="3" align="right"><strong>Total Keseluruhan Simulasi:</strong></td><td><strong id="sim-total-berat">0.00 Kg</strong></td><td align="right"><strong>Potongan Jemput: Rp 0</strong></td><td><strong id="sim-total-harga" class="highlight-nominal">Rp 0</strong></td><td></td></tr></tfoot>' +
                '</table>' +
            '</div>' +
        '</article>';
    } else if (halaman === "setor.html") {
        return '' +
        '<article class="content-panel">' +
            '<div class="panel-header">' +
                '<h2>Form Pendataan Setor Sampah Langsung</h2>' +
            '</div>' +
            '<div id="form-error-box" class="alert-error" style="display: none;"><strong>Validasi Gagal! Mohon periksa kembali isian berikut:</strong><ul id="form-error-list"></ul></div>' +
            '<form id="form-setor-langsung" onsubmit="return prosesSubmitSetoran(event)" novalidate="novalidate">' +
                '<fieldset class="form-fieldset">' +
                    '<legend>1. Data Penyetor &amp; Waktu Transaksi (Tabel <code>deposits</code>)</legend>' +
                    '<div class="form-row">' +
                        '<div class="form-col"><label for="input-warga">Warga Penyetor (<code>warga_id</code>) <span class="req">*</span></label><select id="input-warga" name="warga_id" onchange="tampilkanInfoWargaTerpilih()"></select><small id="detail-warga-terpilih" class="field-hint">Wajib memilih akun warga yang terdaftar.</small></div>' +
                        '<div class="form-col"><label for="input-tanggal">Tanggal Setor (<code>tgl_setor</code>) <span class="req">*</span></label><input type="date" id="input-tanggal" name="tgl_setor" /><small class="field-hint">Tanggal kedatangan warga di bank sampah.</small></div>' +
                        '<div class="form-col"><label for="input-metode">Metode Penyetoran (<code>metode</code>)</label><input type="text" id="input-metode" name="metode" value="Setor Langsung" readonly="readonly" class="input-readonly" /><input type="hidden" id="input-petugas" name="petugas_id" value="2" /><small class="field-hint">Bebas biaya penjemputan kurir (Potongan Rp 0).</small></div>' +
                        '<div class="clear"></div>' +
                    '</div>' +
                '</fieldset>' +
                '<fieldset class="form-fieldset">' +
                    '<legend>2. Rincian Sampah &amp; Kalkulasi Otomatis (Tabel <code>deposit_items</code>)</legend>' +
                    '<div class="form-row">' +
                        '<div class="form-col"><label for="input-jenis">Pilihan Jenis Sampah (<code>jenis_id</code>) <span class="req">*</span></label><select id="input-jenis" name="jenis_id" onchange="hitungOtomatisFormSetor()"><option value="">-- Pilih Jenis Sampah Daur Ulang --</option><option value="1">1 - Botol Plastik (PET)</option><option value="2">2 - Galon Plastik (PC/HDPE)</option><option value="3">3 - Kardus / Karton Bekas</option></select><small class="field-hint">Dibatasi hanya untuk 3 jenis sampah daur ulang.</small></div>' +
                        '<div class="form-col"><label>Kondisi Sampah (<code>kondisi</code>) <span class="req">*</span></label><div class="radio-group"><label class="radio-label"><input type="radio" name="kondisi" id="kondisi-bersih" value="Bersih" onclick="hitungOtomatisFormSetor()" /> <strong>Bersih</strong> (Sudah dipilah &amp; diremukkan)</label><label class="radio-label"><input type="radio" name="kondisi" id="kondisi-kotor" value="Kotor" onclick="hitungOtomatisFormSetor()" /> <strong>Kotor</strong> (Masih ada label/tutup/belum dipilah)</label></div></div>' +
                        '<div class="form-col"><label for="input-berat">Berat Sampah (<code>berat</code> dalam Kg) <span class="req">*</span></label><input type="number" id="input-berat" name="berat" step="0.1" min="0" placeholder="Contoh: 2.5" onkeyup="hitungOtomatisFormSetor()" onchange="hitungOtomatisFormSetor()" /><small class="field-hint">Masukkan angka desimal/bulat lebih dari 0 (misal: <code>1.5</code>).</small></div>' +
                        '<div class="clear"></div>' +
                    '</div>' +
                    '<div class="calc-summary-box">' +
                        '<div class="calc-item"><span>Harga Satuan (<code>harga_satuan</code>)</span><strong id="display-harga-satuan">Rp 0 / kg</strong><input type="hidden" id="input-harga-satuan" name="harga_satuan" value="0" /></div>' +
                        '<div class="calc-item"><span>Subtotal Harga (<code>subtotal</code>)</span><strong id="display-subtotal">Rp 0</strong><input type="hidden" id="input-subtotal" name="subtotal" value="0" /></div>' +
                        '<div class="calc-item"><span>Potongan Jemput (<code>potongan_jemput</code>)</span><strong>Rp 0 (Setor Langsung)</strong><input type="hidden" id="input-potongan" name="potongan_jemput" value="0" /></div>' +
                        '<div class="calc-item calc-total"><span>Total Bersih Diterima (<code>total_bersih</code>)</span><strong id="display-total-bersih">Rp 0</strong><input type="hidden" id="input-total-bersih" name="total_bersih" value="0" /></div>' +
                        '<div class="clear"></div>' +
                    '</div>' +
                    '<div class="form-row"><div class="form-col-full"><label for="input-catatan">Catatan Tambahan Pengelola (Opsional):</label><textarea id="input-catatan" rows="2" placeholder="Contoh: Botol plastik sudah dipres rapi oleh warga..."></textarea></div></div>' +
                '</fieldset>' +
                '<div class="form-actions"><input type="submit" class="btn-primary" value="Simpan Setoran" /> <input type="reset" class="btn-secondary" value="Reset Form" onclick="resetKalkulasiForm()" /></div>' +
            '</form>' +
        '</article>';
    }
    return "";
}

// Jalankan inisialisasi saat halaman index.html selesai dimuat
window.onload = function () {
    inisialisasiData();
    perbaruiStatistikDashboard();
    renderBerandaDashboard();
};