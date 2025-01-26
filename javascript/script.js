// Seleksi elemen-elemen penting
const beratInput = document.getElementById("input-berat-badan");
const tinggiInput = document.getElementById("input-tinggi-badan");
const usiaInput = document.getElementById("input-usia");
const hitungBtn = document.getElementById("hitung");
const clearBtn = document.getElementById("clear");
const resultBmi = document.getElementById("result-bmi");
const resultWeightDesc = document.getElementById("result-weight-desc");
const resultWeight = document.getElementById("result-weight");
const downloadBtn = document.getElementById("download-btn");
const consulBtn = document.getElementById("btn-konsultasi");
const regisBtn = document.getElementById("btn-registrasi");
const jenisKelaminInputs = document.getElementsByName("jenis-kelamin");
const resultDesc = document.getElementById("desc-result");

// Fungsi untuk menghitung BMI
function hitungBMI() {
    const berat = parseFloat(beratInput.value);
    const tinggi = parseFloat(tinggiInput.value) / 100; // cm ke meter
    const usia = parseInt(usiaInput.value);

    // Validasi
    if (!berat || !tinggi || !usia || tinggi <= 0 || berat <= 0 || usia <= 0) {
        alert("Harap isi semua kolom dengan angka yang valid!");
        return;
    }

    // Hitung BMI
    const bmi = (berat / (tinggi * tinggi)).toFixed(1);

    // Tentukan kategori berat badan berdasarkan BMI
    let kategori = "";

    if (bmi < 18.5) {
        kategori = "Berat badan kurang";
        document.getElementById("desc-result-1").style.display = "block";
        document.getElementById("desc-result-2").style.display = "none";
        document.getElementById("desc-result-3").style.display = "none";
        document.getElementById("desc-result-4").style.display = "none";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        kategori = "Berat badan normal";
        document.getElementById("desc-result-1").style.display = "none";
        document.getElementById("desc-result-2").style.display = "block";
        document.getElementById("desc-result-3").style.display = "none";
        document.getElementById("desc-result-4").style.display = "none";
    } else if (bmi >= 25 && bmi < 29.9) {
        kategori = "Berat badan berlebih";
        document.getElementById("desc-result-1").style.display = "none";
        document.getElementById("desc-result-2").style.display = "none";
        document.getElementById("desc-result-3").style.display = "block";
        document.getElementById("desc-result-4").style.display = "none";
    } else {
        kategori = "Obesitas";
        document.getElementById("desc-result-1").style.display = "none";
        document.getElementById("desc-result-2").style.display = "none";
        document.getElementById("desc-result-3").style.display = "none";
        document.getElementById("desc-result-4").style.display = "block";
    }

    // Tampilkan hasil BMI
    resultWeight.textContent = `Berat Badan: ${berat} kg`;
    resultBmi.textContent = `BMI Anda: ${bmi}`;
    resultWeightDesc.textContent = kategori;

    // Tampilkan tombol download setelah hasil dihitung
    downloadBtn.style.display = "block"; // Menampilkan tombol Download
    consulBtn.style.display = "block"; // Menampilkan tombol Konsultasi
    regisBtn.style.display = "block"; // Menampilkan tombol registrasi

}

// Fungsi untuk mereset form
function resetForm() {
    beratInput.value = "";
    tinggiInput.value = "";
    usiaInput.value = "";
    resultBmi.textContent = "0";
    resultWeightDesc.textContent = "";
    resultWeight.textContent = "";
    jenisKelaminInputs.forEach(input => (input.checked = false));

    // Sembunyikan tombol download setelah reset
    downloadBtn.style.display = "none"; // Menyembunyikan tombol Download
    consulBtn.style.display = "none"; // Menyembunyikan  tombol Konsultasi
    regisBtn.style.display = "none"; // Menyembunyikan  tombol registrasi
    document.getElementById("desc-result-1").style.display = "none";
    document.getElementById("desc-result-2").style.display = "none";
    document.getElementById("desc-result-3").style.display = "none";
    document.getElementById("desc-result-4").style.display = "none";

}

// Fungsi untuk mengunduh hasil
function downloadResult() {
    const resultText = `Hasil BMI:\nBMI Anda: ${resultBmi.textContent}\n${resultWeightDesc.textContent}\n${resultWeight.textContent}`;
    const blob = new Blob([resultText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hasil-bmi.txt";
    a.click();
    URL.revokeObjectURL(url); // Bersihkan objek URL
}

// Event listener
hitungBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah form reload halaman
    hitungBMI();
});

clearBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah form reload halaman
    resetForm();
});

downloadBtn.addEventListener("click", downloadResult); // Untuk klik tombol download
