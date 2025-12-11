document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Opsional: Tambahkan shadow atau transparansi lewat CSS .scrolled
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Disesuaikan dengan HTML baru: .mobile-links)
    const menuToggle = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelector('.mobile-links'); // Perbaikan selektor

    if (menuToggle && mobileLinks) {
        menuToggle.addEventListener('click', () => {
            mobileLinks.classList.toggle('active');
            
            // Ubah icon hamburger jadi X
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Tutup menu saat link diklik
        document.querySelectorAll('.mobile-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // 3. Smooth Scroll dengan Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 90; // Disesuaikan tinggi navbar baru
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Animation on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.pillar-card, .content-box, .stat-item, .facility-item, .section-title');
    animatedElements.forEach(el => {
        el.classList.add('hidden-element'); 
        observer.observe(el);
    });

    /* --- 5. EFEK SALJU (MIRIP GAMBAR SCU) --- */
    function createSnowflake() {
        const snow = document.createElement('div');
        snow.classList.add('snowflake');
        
        // PERUBAHAN UTAMA: Menggunakan karakter salju (❄)
        snow.innerHTML = '❄'; 
        
        // Styling inline agar posisi & tampilan benar
        snow.style.position = 'fixed';
        snow.style.top = '-30px';
        snow.style.zIndex = '9999';
        snow.style.color = 'white';
        snow.style.pointerEvents = 'none'; // Agar tidak menghalangi klik
        
        // 1. Posisi Horizontal Acak
        snow.style.left = Math.random() * window.innerWidth + 'px';

        // 2. Ukuran Acak (Lebih besar agar bentuk salju terlihat jelas)
        // Variasi antara 10px hingga 25px
        const size = Math.random() * 15 + 10; 
        snow.style.fontSize = size + 'px';
        
        // Hapus width/height manual karena sekarang pakai font-size
        snow.style.width = 'auto'; 
        snow.style.height = 'auto';

        // 3. Durasi Jatuh Acak (Lebih lambat agar elegan)
        const duration = Math.random() * 5 + 5; // 5 sampai 10 detik
        snow.style.animationDuration = duration + 's';

        // 4. Opacity Acak (Supaya ada kedalaman)
        snow.style.opacity = Math.random() * 0.6 + 0.4;

        document.body.appendChild(snow);

        // Hapus elemen setelah animasi selesai
        setTimeout(() => {
            snow.remove();
        }, duration * 1000);
    }

    // Jalankan interval (sedikit diperlambat agar tidak terlalu penuh sesak)
    setInterval(createSnowflake, 200);
});