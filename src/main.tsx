import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Universal interactive cursor pointer capture listener
if (typeof window !== 'undefined') {
  function checkInteractive(el: HTMLElement | null): boolean {
    if (!el || el === document.body || el === document.documentElement) return false;
    if (
      el.tagName === 'A' ||
      el.tagName === 'BUTTON' ||
      el.tagName === 'SELECT' ||
      el.tagName === 'SUMMARY' ||
      el.tagName === 'LABEL' ||
      el.hasAttribute('role') ||
      el.classList.contains('cursor-pointer') ||
      el.dataset.cursor === 'pointer' ||
      el.getAttribute('type') === 'button' ||
      el.getAttribute('type') === 'submit' ||
      el.getAttribute('type') === 'reset' ||
      el.getAttribute('type') === 'checkbox' ||
      el.getAttribute('type') === 'radio'
    ) {
      return true;
    }
    // Check React event props
    for (const key in el) {
      if (key.startsWith('__reactProps$')) {
        const props = (el as any)[key];
        if (props && (typeof props.onClick === 'function' || typeof props.onMouseDown === 'function')) {
          return true;
        }
      }
    }
    return false;
  }

  document.addEventListener(
    'mouseover',
    (e) => {
      let curr = e.target as HTMLElement | null;
      let found = false;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        if (checkInteractive(curr)) {
          found = true;
          break;
        }
        curr = curr.parentElement;
      }
      if (found && e.target) {
        (e.target as HTMLElement).style.setProperty('cursor', 'pointer', 'important');
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(<App />);
