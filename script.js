document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelector('.nav-links');
    const burgerMenu = document.querySelector('.burger-menu');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});
document.addEventListener('DOMContentLoaded', () => {

    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
            });
        });
    }

    // --- Kode untuk Carousel Galeri (Dipersingkat) ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = Array.from(carouselSlide.querySelectorAll('img')); // Konversi NodeList ke Array
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    if (carouselImages.length > 0) {
        let counter = 0; // Menggunakan indeks 0 untuk gambar pertama asli
        let slideWidth = carouselImages[0].clientWidth;

        // Fungsi untuk memperbarui lebar slide saat ukuran jendela berubah
        const updateSlideWidth = () => {
            slideWidth = carouselImages[0].clientWidth;
            carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
        };

        // Buat titik navigasi
        const createDots = () => {
            carouselImages.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => moveToSlide(index));
                carouselDotsContainer.appendChild(dot);
            });
        };

        // Perbarui tampilan titik aktif
        const updateDots = () => {
            document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === counter);
            });
        };

        // Pindah ke slide tertentu
        const moveToSlide = (index) => {
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            counter = index;
            carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
            updateDots();
        };

        // Navigasi tombol
        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) {
                moveToSlide(0); // Kembali ke slide pertama
            } else {
                moveToSlide(counter + 1);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) {
                moveToSlide(carouselImages.length - 1); // Kembali ke slide terakhir
            } else {
                moveToSlide(counter - 1);
            }
        });
        // Event listener untuk perubahan ukuran jendela
        window.addEventListener('resize', updateSlideWidth);
        // Inisialisasi carousel
        createDots();
        updateSlideWidth(); // Atur posisi awal yang benar
    }
});