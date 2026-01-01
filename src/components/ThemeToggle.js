"use client";
import { useTheme } from './ThemeProvider';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:border-cyan-500/50"
            style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-muted)'
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <HiSun size={20} className="hover:text-cyan-400" />
            ) : (
                <HiMoon size={20} className="hover:text-cyan-400" />
            )}
        </button>
    );
}
