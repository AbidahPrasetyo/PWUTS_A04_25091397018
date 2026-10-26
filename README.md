# PWUTS_A04_25091397018
**Ujian Tengah Semester (UTS) Pemrograman Web Gasal 2026/2027**  
Program Studi D4 Manajemen Informatika — Fakultas Vokasi — Universitas Negeri Surabaya

## 1. Identitas Mahasiswa
* **Nama Lengkap:** Abidah Azka Zaen Prasetyo
* **NIM:** 25091397018
* **Kelas / Kelompok:** 2025A / Kelompok 4 (`A04`)
* **Topik Proposal:** NabungSampah — Rancangan Website Pemetaan dan Penjemputan Bank Sampah Terintegrasi di Komplek Perumahan Puri Indah
* **Fokus Modul (Anggota 2):** Dashboard Pengelola Bank Sampah (Pendataan Setor Langsung)

## 2. Rincian Pengerjaan Tugas UTS
1. **Tugas 2.a (`index.html` - Homepage Layout Dashboard Pengelola):**
   * Menerapkan struktur semantik HTML5 (`header`, `aside`, `nav`, `main`, `section`, `footer`) dan *Responsive Web Design* menggunakan *External CSS* (`css/style.css`) sesuai *Design Guideline* proposal (`#5D4037` Dark Brown & `#FFFFFF` White, font *Segoe UI Black* & *Segoe UI*).
   * Menampilkan 3 kartu ringkasan statistik setoran langsung warga (Total Akun Warga Aktif, Total Berat Setor Langsung, dan Total Tabungan Setor Langsung).
   * Navigasi menu menggunakan teknik **Ajax murni (`XMLHttpRequest`)** untuk memuat halaman `riwayat.html` (2.b) dan `setor.html` (2.c) tanpa memuat ulang (*reload*) seluruh halaman.

2. **Tugas 2.b (`riwayat.html` - Halaman Konten & Simulasi Interaktif):**
   * Menampilkan tabel daftar akun warga Komplek Perumahan Puri Indah beserta akumulasi berat dan nominal tabungan sampah (mengacu pada tabel `users` dan `deposits`).
   * Menyediakan fitur filter dan pencarian interaktif (`onkeyup` & `onchange`) pada tabel Riwayat Setoran berdasarkan nama warga/ID deposit, jenis sampah (`Botol Plastik`, `Galon Plastik`, `Kardus`), dan kondisi sampah (`Bersih` / `Kotor`).
   * Menyediakan fitur **Simulasi Kalkulasi Multi-Item Setor Langsung (*Dynamic Row*)** untuk menambah/menghapus baris sampah secara dinamis dan menghitung `harga_satuan * berat = subtotal` hingga menghasilkan `total_harga` tanpa potongan biaya jemput (`Rp 0`).

3. **Tugas 2.c (`setor.html` - Halaman Form Transaksi & Validasi):**
   * Menyediakan Form Pendataan Setor Sampah Langsung yang mengacu pada atribut tabel `deposits` dan `deposit_items` (`warga_id`, `tgl_setor`, `metode`, `jenis_id`, `kondisi`, `berat`, `harga_satuan`, `subtotal`, `potongan_jemput`, `total_bersih`).
   * Dilengkapi kalkulasi otomatis harga per kategori kondisi sampah serta validasi JavaScript murni sebelum *submit* (memastikan warga penyetor, tanggal, jenis sampah, dan kondisi dipilih, serta berat berupa angka valid `> 0`) dan menampilkan *pop-up modal* rincian total nominal setoran.