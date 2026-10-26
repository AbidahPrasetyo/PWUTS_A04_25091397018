# DOKUMENTASI TEKNIS WEBSITE: NABUNGSAMPAH
> **Modul:** Dashboard Pengelola Bank Sampah (Pendataan Setor Langsung)  
> **Mata Kuliah:** Pemrograman Web — D4 Manajemen Informatika Universitas Negeri Surabaya

---

## I. Struktur Direktori Proyek
Proyek ini dikembangkan secara mandiri menggunakan bahasa pemrograman **HTML5, CSS, dan JavaScript murni tanpa menggunakan kerangka kerja (*framework*) maupun pustaka (*library*) eksternal**. Pemisahan berkas CSS dan JavaScript diatur secara terstruktur dalam hierarki direktori berikut:

```text
PWUTS_A04_25091397018/
├── index.html          # Tata letak halaman utama & navigasi asinkron (Ajax) (Tugas 2.a)
├── riwayat.html        # Halaman konten, penyaringan riwayat, & simulasi multi-item (Tugas 2.b)
├── setor.html          # Halaman formulir transaksi setor langsung & validasi (Tugas 2.c)
├── README.md           # Dokumentasi penjelasan teknis pengerjaan (Tugas 2.e)
├── css/
│   └── style.css       # Berkas Cascading Style Sheet (CSS) eksternal murni
└── js/
    └── script.js       # Berkas JavaScript eksternal murni (DOM, JSON, Ajax, Storage)
```

II. Penjelasan Pemenuhan Ketentuan Ujian Tengah Semester (UTS)
1. Tugas 2.a — Tata Letak Halaman Utama (index.html)
Desain Web Responsif dan Tata Letak: Mengimplementasikan elemen semantik HTML5 (<header>, <aside>, <nav>, <main>, <section>, <footer>) serta CSS eksternal (style.css). Tata letak dibangun menggunakan konsep Box Model, Float Layout, dan unit ukuran relatif guna memastikan antarmuka dapat menyesuaikan dengan berbagai resolusi layar secara responsif.

Ringkasan Statistik Dasbor: Menampilkan kartu informasi interaktif yang menghitung dan menyajikan total akun warga aktif, akumulasi berat sampah, serta total tabungan nominal dari transaksi setor langsung secara dinamis.

Navigasi Asinkron (Ajax): Menu navigasi pada bilah sisi (sidebar) diintegrasikan dengan fungsi asinkron berbasis objek XMLHttpRequest (XHR). Saat menu diakses, sistem akan memuat konten dari berkas riwayat.html atau setor.html ke dalam kontainer utama secara dinamis tanpa melakukan penyegaran (reload) halaman secara keseluruhan.

2. Tugas 2.b — Halaman Konten dan Simulasi Interaktif (riwayat.html)
Tabel Data Warga dan Tabungan: Menyajikan data akun warga Komplek Perumahan Puri Indah beserta akumulasi berat dan nominal tabungan sampah, yang merujuk pada relasi entitas tabel users dan deposits dalam perancangan basis data.

Penyaringan dan Pencarian Interaktif: Menerapkan event handler JavaScript (onkeyup dan onchange) untuk menyaring data riwayat transaksi secara real-time. Penyaringan didasarkan pada kata kunci nama warga atau ID deposit, kategori jenis sampah (Botol Plastik, Galon Plastik, Kardus), serta kondisi sampah (Bersih atau Kotor).

Simulasi Kalkulasi Multi-Item (Dynamic Row): Menyediakan fitur interaktif berbasis manipulasi Document Object Model (DOM) untuk penambahan dan penghapusan baris tabel secara dinamis. Sistem memproses kalkulasi (harga_satuan dikalikan dengan berat sama dengan subtotal) hingga menghasilkan total_harga secara otomatis, dengan ketentuan tanpa pemotongan biaya penjemputan (Rp0 untuk metode setor langsung).

3. Tugas 2.c — Halaman Formulir Transaksi dan Validasi (setor.html)
Formulir Transaksi Terstruktur: Menyediakan formulir pendataan setor langsung yang dirancang berlandaskan struktur atribut basis data pada tabel deposits dan deposit_items (meliputi atribut warga_id, tgl_setor, metode, jenis_id, kondisi, berat, harga_satuan, subtotal, potongan_jemput, dan total_bersih).

Kalkulasi Harga Otomatis: Sistem secara otomatis mengkalkulasi harga satuan dan subtotal saat pengguna memilih jenis sampah, menentukan kategori kondisi (tarif kondisi "Bersih" lebih tinggi dibandingkan kondisi "Kotor"), serta memasukkan data berat dalam satuan kilogram.

Sistem Validasi JavaScript dan Jendela Dialog (Pop-up Modal):

Sebelum data dikirim (submit), fungsi validasi akan memverifikasi pengisian data guna memastikan entitas warga penyetor telah dipilih, jenis serta kondisi sampah telah terisi, dan nilai berat berupa angka valid yang lebih dari 0.

Apabila data tidak valid, sistem akan menampilkan kotak peringatan.

Apabila data valid, sistem akan menyimpan data tersebut ke dalam penyimpanan klien (Client Storage / localStorage) dan memunculkan jendela dialog konfirmasi yang merinci total nominal setoran yang diperoleh oleh warga.

III. Petunjuk Penggunaan dan Eksekusi Program
Unduh (download) atau salin (clone) seluruh berkas proyek ke dalam satu direktori pada penyimpanan lokal komputer.

Pastikan struktur penamaan direktori utama telah sesuai dengan format penamaan repositori GitHub yang diinstruksikan, yaitu: PWUTS_<kelompok>_<nim>.

Eksekusi program melalui peladen lokal (local web server seperti direktori htdocs pada aplikasi XAMPP) atau jalankan berkas index.html secara langsung menggunakan peramban web (web browser) modern seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge.