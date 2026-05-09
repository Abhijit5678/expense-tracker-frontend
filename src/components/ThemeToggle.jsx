import { Laptop, Moon, SunMedium } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { themePreference, setExplicitTheme, useSystemTheme } = useTheme();

  return (
    <div className="surface-card-strong flex items-center gap-1 p-1">
      <button
        type="button"
        onClick={() => setExplicitTheme('light')}
        className={`btn-icon h-10 w-10 rounded-xl border-0 ${
          themePreference === 'light' ? 'bg-[var(--brand-soft)] text-[var(--brand)]' : ''
        }`}
        aria-label="Toggle light mode"
        title="Light or dark mode"
      >
        <SunMedium size={18} />
      </button>
      <button
        type="button"
        onClick={() => setExplicitTheme('dark')}
        className={`btn-icon h-10 w-10 rounded-xl border-0 ${
          themePreference === 'dark' ? 'bg-[var(--brand-soft)] text-[var(--brand)]' : ''
        }`}
        aria-label="Toggle dark mode"
        title="Light or dark mode"
      >
        <Moon size={18} />
      </button>
      <button
        type="button"
        onClick={useSystemTheme}
        className={`btn-icon h-10 w-10 rounded-xl border-0 ${
          themePreference === 'system' ? 'bg-[var(--brand-soft)] text-[var(--brand)]' : ''
        }`}
        aria-label="Use system theme"
        title="Use system preference"
      >
        <Laptop size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
