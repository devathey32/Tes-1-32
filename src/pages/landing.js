export function createLandingPage() {
  const section = document.createElement('section');
  section.className = 'page landing-page';
  section.innerHTML = `
    <div class="landing-container">
      <div class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="word" style="animation-delay: 0.1s">Selamat</span>
            <span class="word" style="animation-delay: 0.2s">Datang</span>
            <span class="word" style="animation-delay: 0.3s">di</span>
            <span class="word highlight" style="animation-delay: 0.4s">Kelas</span>
            <span class="word highlight" style="animation-delay: 0.5s">Kita</span>
          </h1>
          <p class="hero-subtitle blur-clear" style="animation-delay: 0.6s">
            Portal informasi kelas yang modern, praktis, dan selalu update
          </p>
          <div class="hero-actions" style="animation-delay: 0.8s; opacity: 0;">
            <button class="btn btn-primary" id="enterDashboard">
              Lihat Dashboard
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="margin-left: 8px;">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card card-1">
            <div class="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p>Jadwal Pelajaran</p>
          </div>
          <div class="floating-card card-2">
            <div class="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="4" x2="9" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <p>Jadwal Piket</p>
          </div>
          <div class="floating-card card-3">
            <div class="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M23 21V19C23 18.0 22.5 17 22 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.5C17 4 17.5 5 17.5 6C17.5 7 17 8 16 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p>Info Kelas</p>
          </div>
        </div>
      </div>

      <div class="features">
        <div class="feature-card" style="animation-delay: 1s">
          <div class="feature-icon">📚</div>
          <h3>Jadwal Lengkap</h3>
          <p>Akses jadwal pelajaran mingguan dengan mudah dan cepat</p>
        </div>
        <div class="feature-card" style="animation-delay: 1.1s">
          <div class="feature-icon">🧹</div>
          <h3>Piket Teratur</h3>
          <p>Sistem pembagian piket yang adil dan terorganisir</p>
        </div>
        <div class="feature-card" style="animation-delay: 1.2s">
          <div class="feature-icon">📋</div>
          <h3>Info Terkini</h3>
          <p>Informasi kelas yang selalu update dan akurat</p>
        </div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .landing-page {
      background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
      position: relative;
      overflow: hidden;
    }

    .landing-container {
      min-height: 100vh;
      padding: var(--spacing-2xl) var(--spacing-md);
    }

    .hero {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-3xl);
      align-items: center;
      min-height: 80vh;
      padding: var(--spacing-xl) 0;
    }

    .hero-content {
      z-index: 2;
    }

    .hero-title {
      margin-bottom: var(--spacing-md);
      display: flex;
      flex-wrap: wrap;
      gap: 0.3em;
    }

    .word {
      display: inline-block;
      opacity: 0;
      animation: wordAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .word.highlight {
      background: linear-gradient(135deg, #0071e3 0%, #00a8ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @keyframes wordAppear {
      from {
        opacity: 0;
        transform: translateY(30px) rotateX(-90deg);
        filter: blur(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0) rotateX(0);
        filter: blur(0);
      }
    }

    .hero-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
      max-width: 600px;
      line-height: 1.6;
    }

    .hero-actions {
      animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
      from {
        opacity: 0;
        transform: translateY(20px);
      }
    }

    .hero-visual {
      position: relative;
      height: 600px;
    }

    .floating-card {
      position: absolute;
      background: white;
      padding: var(--spacing-md);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
      animation: float 6s ease-in-out infinite;
      opacity: 0;
      animation: cardAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, float 6s ease-in-out infinite;
    }

    .floating-card p {
      font-weight: 500;
      color: var(--text-primary);
      white-space: nowrap;
    }

    .icon-wrapper {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #0071e3 0%, #00a8ff 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .card-1 {
      top: 10%;
      left: 10%;
      animation-delay: 0.9s, 0s;
    }

    .card-2 {
      top: 40%;
      right: 15%;
      animation-delay: 1.1s, 2s;
    }

    .card-3 {
      bottom: 15%;
      left: 25%;
      animation-delay: 1.3s, 4s;
    }

    @keyframes cardAppear {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(40px);
        filter: blur(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
        filter: blur(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .features {
      max-width: 1200px;
      margin: var(--spacing-3xl) auto 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-lg);
    }

    .feature-card {
      background: white;
      padding: var(--spacing-xl);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      text-align: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: var(--spacing-md);
    }

    .feature-card h3 {
      margin-bottom: var(--spacing-sm);
      color: var(--text-primary);
    }

    .feature-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    @media (max-width: 968px) {
      .hero {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
        text-align: center;
      }

      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }

      .hero-visual {
        height: 400px;
        margin-top: var(--spacing-xl);
      }

      .floating-card {
        transform: scale(0.85);
      }
    }

    @media (max-width: 640px) {
      .landing-container {
        padding: var(--spacing-lg) var(--spacing-sm);
      }

      .hero {
        min-height: auto;
        padding: var(--spacing-lg) 0;
      }

      .hero-visual {
        height: 300px;
      }

      .floating-card {
        transform: scale(0.75);
      }
    }
  `;

  document.head.appendChild(style);

  setTimeout(() => {
    const enterBtn = section.querySelector('#enterDashboard');
    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        const event = new CustomEvent('navigate', { detail: { page: 'dashboard' } });
        document.dispatchEvent(event);
      });
    }
  }, 100);

  return section;
}
