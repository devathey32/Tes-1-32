import { getClassInfo, getAllSchedules, getAllPiket } from '../utils/supabase.js';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export async function createDashboardPage() {
  const section = document.createElement('section');
  section.className = 'page dashboard-page';

  try {
    const [classInfo, allSchedules, allPiket] = await Promise.all([
      getClassInfo(),
      getAllSchedules(),
      getAllPiket()
    ]);

    const schedulesByDay = DAYS.reduce((acc, day) => {
      acc[day] = allSchedules.filter(s => s.day === day);
      return acc;
    }, {});

    const piketByDay = DAYS.reduce((acc, day) => {
      acc[day] = allPiket.filter(p => p.day === day);
      return acc;
    }, {});

    section.innerHTML = `
      <div class="dashboard-container">
        <header class="dashboard-header">
          <div class="header-content">
            <button class="btn-back" id="backToLanding">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="header-text">
              <h1 class="fade-in">Dashboard Kelas</h1>
              <p class="fade-in" style="animation-delay: 0.1s">Informasi lengkap untuk ${classInfo?.class_name || 'Kelas Kita'}</p>
            </div>
          </div>
        </header>

        <div class="dashboard-grid">
          <div class="class-info-section card fade-in" style="animation-delay: 0.2s">
            <div class="section-header">
              <div class="icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 21H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 7H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 11H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2>Informasi Kelas</h2>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Nama Kelas</span>
                <span class="info-value">${classInfo?.class_name || '-'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Wali Kelas</span>
                <span class="info-value">${classInfo?.homeroom_teacher || '-'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Guru BK</span>
                <span class="info-value">${classInfo?.guidance_counselor || '-'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Ruang Kelas</span>
                <span class="info-value">${classInfo?.classroom || '-'}</span>
              </div>
            </div>
          </div>

          <div class="schedule-section card fade-in" style="animation-delay: 0.3s">
            <div class="section-header">
              <div class="icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h2>Jadwal Pelajaran</h2>
            </div>

            <div class="day-tabs">
              ${DAYS.map((day, index) => `
                <button class="day-tab ${index === 0 ? 'active' : ''}" data-day="${day}">
                  ${day}
                </button>
              `).join('')}
            </div>

            <div class="schedule-content">
              ${DAYS.map((day, index) => `
                <div class="schedule-day ${index === 0 ? 'active' : ''}" data-day="${day}">
                  ${schedulesByDay[day]?.length > 0 ? `
                    <div class="schedule-list">
                      ${schedulesByDay[day].map(schedule => `
                        <div class="schedule-item ${schedule.subject === 'Istirahat' ? 'break-time' : ''}">
                          <div class="schedule-time">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                              <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span>${schedule.time_start.slice(0, 5)} - ${schedule.time_end.slice(0, 5)}</span>
                          </div>
                          <div class="schedule-details">
                            <h4>${schedule.subject}</h4>
                            ${schedule.teacher !== '-' ? `<p>${schedule.teacher}</p>` : ''}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  ` : '<p class="empty-state">Tidak ada jadwal</p>'}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="piket-section card fade-in" style="animation-delay: 0.4s">
            <div class="section-header">
              <div class="icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M23 21V19C23 18.0 22.5 17 22 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 3.5C17 4 17.5 5 17.5 6C17.5 7 17 8 16 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2>Jadwal Piket</h2>
            </div>

            <div class="day-tabs">
              ${DAYS.map((day, index) => `
                <button class="piket-tab ${index === 0 ? 'active' : ''}" data-day="${day}">
                  ${day}
                </button>
              `).join('')}
            </div>

            <div class="piket-content">
              ${DAYS.map((day, index) => `
                <div class="piket-day ${index === 0 ? 'active' : ''}" data-day="${day}">
                  ${piketByDay[day]?.length > 0 ? `
                    <div class="piket-list">
                      ${piketByDay[day].map((piket, idx) => `
                        <div class="piket-item">
                          <div class="piket-number">${idx + 1}</div>
                          <span class="piket-name">${piket.student_name}</span>
                        </div>
                      `).join('')}
                    </div>
                  ` : '<p class="empty-state">Tidak ada piket</p>'}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .dashboard-page {
        background: var(--surface);
        min-height: 100vh;
      }

      .dashboard-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: var(--spacing-lg) var(--spacing-md) var(--spacing-3xl);
      }

      .dashboard-header {
        margin-bottom: var(--spacing-xl);
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }

      .btn-back {
        width: 48px;
        height: 48px;
        border: none;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: var(--shadow-sm);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        color: var(--text-primary);
      }

      .btn-back:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-md);
      }

      .btn-back:active {
        transform: scale(0.95);
      }

      .header-text h1 {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        margin-bottom: 4px;
      }

      .header-text p {
        color: var(--text-secondary);
        font-size: 1.125rem;
      }

      .dashboard-grid {
        display: grid;
        gap: var(--spacing-lg);
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-lg);
      }

      .icon-badge {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #0071e3 0%, #00a8ff 100%);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .section-header h2 {
        font-size: clamp(1.5rem, 3vw, 1.875rem);
        margin: 0;
      }

      .class-info-section {
        grid-column: 1 / -1;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-lg);
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
      }

      .info-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .info-value {
        font-size: 1.125rem;
        color: var(--text-primary);
        font-weight: 600;
      }

      .schedule-section,
      .piket-section {
        grid-column: 1 / -1;
      }

      .day-tabs {
        display: flex;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-lg);
        overflow-x: auto;
        padding-bottom: var(--spacing-xs);
      }

      .day-tabs::-webkit-scrollbar {
        height: 4px;
      }

      .day-tabs::-webkit-scrollbar-track {
        background: var(--surface);
        border-radius: 2px;
      }

      .day-tabs::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 2px;
      }

      .day-tab,
      .piket-tab {
        padding: 12px 24px;
        border: 2px solid var(--border);
        background: white;
        border-radius: 980px;
        font-family: 'Jost', sans-serif;
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        white-space: nowrap;
      }

      .day-tab:hover,
      .piket-tab:hover {
        border-color: var(--accent);
        color: var(--accent);
        transform: translateY(-2px);
      }

      .day-tab.active,
      .piket-tab.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 113, 227, 0.2);
      }

      .schedule-content,
      .piket-content {
        position: relative;
        min-height: 400px;
      }

      .schedule-day,
      .piket-day {
        display: none;
        animation: contentFade 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .schedule-day.active,
      .piket-day.active {
        display: block;
      }

      @keyframes contentFade {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .schedule-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .schedule-item {
        display: flex;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--surface);
        border-radius: var(--radius-md);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .schedule-item:hover {
        background: white;
        transform: translateX(4px);
        box-shadow: var(--shadow-sm);
      }

      .schedule-item.break-time {
        background: linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%);
      }

      .schedule-time {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--text-secondary);
        font-weight: 500;
        font-size: 0.9375rem;
        min-width: 140px;
      }

      .schedule-details h4 {
        font-size: 1.0625rem;
        margin-bottom: 4px;
        color: var(--text-primary);
      }

      .schedule-details p {
        color: var(--text-secondary);
        font-size: 0.9375rem;
      }

      .piket-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--spacing-md);
      }

      .piket-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
        background: var(--surface);
        border-radius: var(--radius-md);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .piket-item:hover {
        background: white;
        transform: translateY(-4px);
        box-shadow: var(--shadow-sm);
      }

      .piket-number {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #0071e3 0%, #00a8ff 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.9375rem;
      }

      .piket-name {
        font-weight: 500;
        color: var(--text-primary);
      }

      .empty-state {
        text-align: center;
        color: var(--text-secondary);
        padding: var(--spacing-xl);
        font-style: italic;
      }

      @media (max-width: 768px) {
        .dashboard-container {
          padding: var(--spacing-md) var(--spacing-sm) var(--spacing-2xl);
        }

        .info-grid {
          grid-template-columns: 1fr;
        }

        .schedule-item {
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .schedule-time {
          min-width: auto;
        }

        .piket-list {
          grid-template-columns: 1fr;
        }

        .day-tabs {
          gap: 6px;
        }

        .day-tab,
        .piket-tab {
          padding: 10px 20px;
          font-size: 0.875rem;
        }
      }
    `;

    document.head.appendChild(style);

    setTimeout(() => {
      const backBtn = section.querySelector('#backToLanding');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          const event = new CustomEvent('navigate', { detail: { page: 'landing' } });
          document.dispatchEvent(event);
        });
      }

      const dayTabs = section.querySelectorAll('.day-tab');
      dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const day = tab.dataset.day;
          dayTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const scheduleDays = section.querySelectorAll('.schedule-day');
          scheduleDays.forEach(d => {
            d.classList.toggle('active', d.dataset.day === day);
          });
        });
      });

      const piketTabs = section.querySelectorAll('.piket-tab');
      piketTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const day = tab.dataset.day;
          piketTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const piketDays = section.querySelectorAll('.piket-day');
          piketDays.forEach(d => {
            d.classList.toggle('active', d.dataset.day === day);
          });
        });
      });
    }, 100);

  } catch (error) {
    console.error('Error loading dashboard:', error);
    section.innerHTML = `
      <div class="dashboard-container">
        <div class="error-state">
          <h2>Terjadi Kesalahan</h2>
          <p>Gagal memuat data. Silakan coba lagi.</p>
        </div>
      </div>
    `;
  }

  return section;
}
