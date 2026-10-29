import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { prepareInitialView } from './loading';

function InitialView() {
  useEffect(() => {
    const controller = new AbortController();
    void prepareInitialView(controller.signal);
    const sections = document.querySelectorAll('main > section');
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.toggleAttribute('data-motion-paused', !entry.isIntersecting));
    }) : null;
    sections.forEach((section) => observer?.observe(section));
    const visibility = () => { if (document.hidden) sections.forEach((section) => section.setAttribute('data-motion-paused', '')); };
    document.addEventListener('visibilitychange', visibility);
    return () => { controller.abort(); observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InitialView />
  </StrictMode>,
);
