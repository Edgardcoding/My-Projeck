<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Keren</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            color: #fff;
            text-align: center;
            overflow-x: hidden;
        }
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        header {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            font-size: 24px;
            position: relative;
            z-index: 2;
        }
        .container {
            width: 90%;
            max-width: 1200px;
            margin: auto;
            padding: 20px;
            position: relative;
            z-index: 2;
        }
        .profile {
            margin-top: 50px;
        }
        .profile img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .profile img:hover {
            transform: scale(1.1);
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
        }
        .profile h1 {
            font-size: 2.5rem;
            margin: 10px 0;
        }
        .profile p {
            font-size: 1.2rem;
            color: #ddd;
        }
        .typing-animation {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #fff;
            animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
        }
        @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: #fff; }
        }
        .social-icons a {
            margin: 10px;
            text-decoration: none;
            font-size: 30px;
            color: #fff;
            transition: color 0.3s, transform 0.3s;
        }
        .social-icons a:hover {
            color: #0077b5;
            transform: translateY(-5px);
        }
        .projects, .contact {
            margin-top: 50px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        }
        .project-card {
    background: rgba(0, 0, 0, 0.0);
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    transition: transform 0.3s, box-shadow 0.3s;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
}
.project-card h3 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #fff;
}
.project-card p {
    font-size: 1rem;
    color: #ddd;
}
.project-card ul {
    list-style-type: none;
    padding: 0;
}
.project-card ul li {
    background: rgba(255, 255, 255, 0.1);
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
}
        .dark-mode-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            border: none;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            z-index: 3;
        }
        .dark-mode-toggle:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }
    </style>
</head>
<body>
    <header>
        Portfolio Saya
    </header>
    
    <button class="dark-mode-toggle" onclick="toggleDarkMode()">
        <i class="fas fa-moon"></i>
    </button>
    
    <div id="particles-js"></div>
    
    <div class="container">
        <section class="profile" data-aos="fade-up">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQE53j4rYPCHLA/profile-displayphoto-shrink_200_200/B56ZWN_VVvHEAo-/0/1741843945758?e=2147483647&v=beta&t=kCPPXLBbx0YZlFAedGvf5Ys5iZGjtAz-8bCPQVk2o34" alt="Profile Picture">
            <h1>Edgard Garry Supit</h1>
            <p class="typing-animation">Web Developer | Desainer | Mobile app developer | Freelancer | Database Administrator (DBA)</p>
            <div class="social-icons">
                <a href="https://github.com/Edgardcoding"><i class="fab fa-github"></i> github</a>
                <!-- <a href="#"><i class="fab fa-linkedin"></i></a> -->
                <a href="https://www.instagram.com/edgard_g_supit/"><i class="fab fa-instagram"></i> instagram</a>
                <a href="https://wa.me/6282343007287" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="mailto:supitedgard777@gmail.com" target="_blank"><i class="fas fa-envelope"></i> Email</a>
                <!-- <a href="#"><i class="fab fa-facebook"></i></a> Facebook -->
                <!-- <a href="https://drive.google.com/drive/folders/15VemJE09CViQTfa1yATYKrvzZ30NASNy"><i class="fab fa-google-drive"></i></a> <!-- Google Drive -->
            </div>
        </section>
        
        <section class="projects" data-aos="fade-up">
            <h2>Proyek Saya</h2>

            <div class="project-card">
                <h3>Skripsi Membuat Aplikasi WasteGPS</h3>
                <p><strong>Deskripsi:</strong> Mengembangkan Aplikasi Berbasis Mobile Untuk Melakukan Monitoring Sampah Plastik Yang Ada Pada Sebuah Lokasi.</p>
                <p><strong>Teknologi:</strong> React Native, Node.js, SQL.</p>
                <ul>
                    <li>Tampilan Aplikasi WasteGPS.
                        <div class="social-icons">
                            <a href="https://drive.google.com/drive/folders/15VemJE09CViQTfa1yATYKrvzZ30NASNy"><i class="fab fa-google-drive"></i>Google Drive</a> <!-- Google Drive -->
                    </li>
                </ul>
            </div>

            <div class="project-card">
                <h3>Membuat Website Rumah Makan Watulesung</h3>
                <p><strong>Deskripsi:</strong> Membuat Website Rumah Makan Watulesung. Untuk menampilkan Harga tiap produk dan lain sebagainya</p>
                <p><strong>Teknologi:</strong> Html, CSS, React.js</p>
                <ul>
                    <li>Tampilan Html Website.
                        <div class="social-icons">
                            <a href="https://edgardcoding.github.io/watulesung.github.io/"><i class="fab fa-github"></i> GitHub Pages</a> <!-- GitHub -->
                        </div>
                    </li>
                </ul>
            </div>

            <div class="project-card">
                <h3>Analisis Data</h3>
                <p><strong>Deskripsi:</strong> Melakukan analisis data dan visualisasi untuk membantu pengambilan keputusan.</p>
                <p><strong>Teknologi:</strong> Python, Pandas, Matplotlib.</p>
                <ul>
                    <li>Analisis tren.
                        <div class="social-icons">
                            <a href="https://drive.google.com/drive/folders/1vbqiyamL9XZxler2E8kmoSboZf8YkLjb"><i class="fas fa-laptop-code"></i> Google Colab</a>
                        </div>
                        
                    </li>
                </ul>
            </div>


        </section>
        
        <section class="contact" data-aos="fade-up">
            <h2>Tentang Saya</h2>
            <p><p>Saya adalah individu yang terbiasa bekerja dengan target dan tekanan, memiliki inisiatif tinggi, serta cepat beradaptasi dengan lingkungan baru. Dengan latar belakang di bidang bidang Ilmu Komputer Kususnya IT, saya tidak hanya membawa keahlian teknis, tapi juga semangat kolaboratif dan orientasi solusi yang kuat. Saya yakin dapat memberikan kontribusi nyata dan berkembang bersama perusahaan Bapak/Ibu.</p></p>
        </section>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
    <script>
        AOS.init();

        // Dark Mode Toggle
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const toggleButton = document.querySelector('.dark-mode-toggle');
            if (document.body.classList.contains('dark-mode')) {
                toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }

        // Particles.js Background
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles.js loaded!');
        });
    </script>
</body>
</html>
