export function createLandingPage() {
  const section = document.createElement('section');
  section.className = 'page landing-page';
  section.innerHTML = `
    <div class="landing-wrapper">
      <div class="landing-bg-gradient"></div>
      <div class="landing-bg-ellipse"></div>

      <div class="landing-content">
        <div class="landing-logo-box fade-in-blur">
          <svg class="landing-logo" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="16" fill="#3B82F6"/>
            <path d="M32 18L24 30H40L32 18Z" fill="white"/>
            <path d="M20 35H44L44 42C44 44.2091 42.2091 46 40 46H24C21.7909 46 20 44.2091 20 42V35Z" fill="white"/>
          </svg>
        </div>

        <h1 class="landing-title fade-in-up">Selamat datang di Kavitwo Connect</h1>
        <p class="landing-subtitle fade-in-up">Pusat informasi kelas DKV 2</p>

        <button class="btn-dashboard" id="enterDashboard">
          <span>Dashboard</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .landing-page {
      width: 100%;
      min-height: 100vh;
      overflow: hidden;
    }

    .landing-wrapper {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
    }

    .landing-bg-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #a8d5ff 0%, #d0b8ff 50%, #f0f0f0 100%);
      clip-path: ellipse(100% 100% at 50% 35%);
    }

    .landing-bg-ellipse {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1000px;
      height: 500px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    }

    .landing-content {
      position: relative;
      z-index: 10;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
    }

    .landing-logo-box {
      margin-bottom: 0.5rem;
    }

    .landing-logo {
      width: 120px;
      height: 120px;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15));
    }

    .landing-title {
      font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: clamp(2rem, 8vw, 3.5rem);
      font-weight: 600;
      color: #000;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .landing-subtitle {
      font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: clamp(1rem, 3vw, 1.375rem);
      font-weight: 400;
      color: #787878;
      margin: 0;
      letter-spacing: -0.01em;
    }

    .btn-dashboard {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.75rem;
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
      color: white;
      border: none;
      border-radius: 55px;
      font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
      margin-top: 0.5rem;
    }

    .btn-dashboard:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(59, 130, 246, 0.4);
    }

    .btn-dashboard:active {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
    }

    .btn-arrow {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-dashboard:hover .btn-arrow {
      transform: translateX(4px);
    }

    .fade-in-blur {
      animation: fadeInBlur 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }

    .landing-subtitle {
      animation-delay: 0.2s;
    }

    .btn-dashboard {
      animation-delay: 0.4s;
      opacity: 0;
    }

    @keyframes fadeInBlur {
      from {
        opacity: 0;
        filter: blur(12px);
      }
      to {
        opacity: 1;
        filter: blur(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(25px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .landing-wrapper {
        height: auto;
        min-height: 100vh;
        padding: 2rem 0;
      }

      .landing-bg-ellipse {
        width: 600px;
        height: 300px;
      }

      .landing-content {
        gap: 1.25rem;
      }

      .landing-logo {
        width: 100px;
        height: 100px;
      }

      .btn-dashboard {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .landing-bg-gradient {
        clip-path: ellipse(150% 100% at 50% 30%);
      }

      .landing-bg-ellipse {
        width: 400px;
        height: 200px;
      }

      .landing-logo {
        width: 80px;
        height: 80px;
      }

      .landing-title {
        font-size: 1.75rem;
      }

      .landing-subtitle {
        font-size: 0.95rem;
      }

      .btn-dashboard {
        font-size: 1rem;
        padding: 0.625rem 1.5rem;
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
