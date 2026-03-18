import { createLandingPage } from './pages/landing.js';
import { createDashboardPage } from './pages/dashboard.js';

if (typeof window === 'undefined') {
  throw new Error('This application requires a browser environment');
}

let currentPage = 'landing';
const app = document.getElementById('app');

if (!app) {
  throw new Error('App container not found');
}

const pageTransitionStyle = document.createElement('style');
pageTransitionStyle.textContent = `
  .page-exit {
    animation: pageExit 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes pageExit {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-20px) scale(0.98);
    }
  }

  .page-enter {
    animation: pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  body {
    overflow-x: hidden;
  }
`;
document.head.appendChild(pageTransitionStyle);

async function navigateToPage(pageName) {
  if (currentPage === pageName) return;

  const currentPageEl = app.firstElementChild;

  if (currentPageEl) {
    currentPageEl.classList.add('page-exit');

    await new Promise(resolve => setTimeout(resolve, 400));

    app.innerHTML = '';
  }

  let newPage;
  if (pageName === 'landing') {
    newPage = createLandingPage();
  } else if (pageName === 'dashboard') {
    newPage = await createDashboardPage();
  }

  if (newPage) {
    newPage.classList.add('page-enter');
    app.appendChild(newPage);
    currentPage = pageName;

    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

document.addEventListener('navigate', (e) => {
  navigateToPage(e.detail.page);
});

navigateToPage('landing');
