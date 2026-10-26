# ♻️ Dokumentasi Teknis Website: NabungSampah
> **Modul:** Dashboard Pengelola Bank Sampah (Pendataan Setor Langsung)  
> **Mata Kuliah:** Pemrograman Web — D4 Manajemen Informatika UNESA

---

## 📂 Struktur Direktori Proyek
Proyek ini dibangun murni menggunakan **HTML5, CSS, dan JavaScript tanpa framework atau library eksternal**, dengan pemisahan file CSS dan JS yang terstruktur dalam satu folder:

```text
PWUTS_A04_25091397018/
├── index.html          # Homepage layout utama & navigasi Ajax (Tugas 2.a)
├── riwayat.html        # Halaman konten, filter riwayat, & simulasi multi-item (Tugas 2.b)
├── setor.html          # Halaman form transaksi setor langsung & validasi (Tugas 2.c)
├── README.md           # Dokumentasi penjelasan teknis pengerjaan (Tugas 2.e)
├── css/
│   └── style.css       # File Cascading Style Sheet eksternal murni
└── js/
    └── script.js       # File JavaScript eksternal murni (DOM, JSON, Ajax, Storage)
```

## 🛠️ Penjelasan Pemenuhan Ketentuan UTS
1. Tugas 2.a — Homepage Layout Utama (index.html)
* Responsive Web Design & Layout: Menggunakan elemen semantik HTML5 (<header>, <aside>, <nav>, <main>, <section>, <footer>) dan External CSS (style.css) yang menerapkan konsep Box Model, Float Layout, serta unit relatif agar tata letak menyesuaikan berbagai ukuran layar.   
* Ringkasan Statistik Dashboard: Menyajikan kartu informasi interaktif yang menghitung secara dinamis total akun warga aktif, total berat sampah, dan total tabungan nominal dari setoran langsung.
* Navigasi Ajax (XMLHttpRequest): Menu navigasi pada sidebar dilengkapi dengan fungsi asinkron berbasis objek XMLHttpRequest (XHR). Ketika menu diklik, skrip memuat konten halaman riwayat.html atau setor.html ke dalam kontainer utama secara dinamis tanpa melakukan reload halaman.

2. Tugas 2.b — Halaman Konten & Simulasi Interaktif (riwayat.html)
* Tabel Konten Warga & Tabungan: Menampilkan data akun warga Komplek Perumahan Puri Indah beserta akumulasi berat dan nominal tabungan sampah (mengacu pada relasi tabel users dan deposits).   
* Filter & Pencarian Interaktif: Memanfaatkan event JavaScript (onkeyup dan onchange) untuk menyaring data riwayat setoran secara real-time berdasarkan kata kunci nama warga/ID deposit, jenis sampah (Botol Plastik, Galon Plastik, Kardus), dan kondisi sampah (Bersih / Kotor).   
* Simulasi Kalkulasi Multi-Item (Dynamic Row): Fitur interaktif berbasis manipulasi DOM untuk menambah atau menghapus baris tabel secara dinamis. Skrip menghitung perkalian harga_satuan * berat = subtotal hingga menjumlahkan total_harga secara otomatis tanpa potongan biaya jemput (Rp 0 untuk setor langsung).   

3. Tugas 2.c — Halaman Form Transaksi & Validasi (setor.html)
* Formulir Transaksi Terstruktur: Formulir pendataan setor langsung yang dirancang berdasarkan struktur atribut basis data proposal untuk tabel deposits dan deposit_items (warga_id, tgl_setor, metode, jenis_id, kondisi, berat, harga_satuan, subtotal, potongan_jemput, total_bersih).   
* Kalkulasi Harga Otomatis: Saat pengguna memilih jenis sampah dan kategori kondisi (Bersih memiliki tarif lebih tinggi daripada Kotor) serta menginput berat dalam kilogram, sistem langsung mengkalkulasi harga satuan dan subtotal secara otomatis.   
* Sistem Validasi JavaScript & Pop-up Modal:Sebelum data dikirim (submit), fungsi validasi memeriksa apakah warga penyetor sudah dipilih, jenis dan kondisi sampah terisi, serta nilai berat merupakan angka valid lebih dari 0.Jika tidak valid, kotak peringatan kesalahan akan muncul. Jika valid, data disimpan ke Client Storage (localStorage) dan pop-up modal sukses akan merinci total nominal setoran yang diperoleh warga.   

## 🚀 Petunjuk Menjalankan ProgramUnduh atau clone seluruh berkas ke dalam satu direktori lokal komputer.   Pastikan struktur nama folder utama sesuai dengan format penamaan repo GitHub yang ditentukan (PWUTS_<kelompok>_<nim>).Jalankan melalui peladen lokal (seperti XAMPP htdocs) atau buka langsung berkas index.html menggunakan web browser modern (Google Chrome, Mozilla Firefox, Microsoft Edge). 