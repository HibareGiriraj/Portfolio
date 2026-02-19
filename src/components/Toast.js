"use client";
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { HiCheckCircle, HiXCircle, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi';

// Toast Context for global access
const ToastContext = createContext(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

// Toast Provider Component
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

// Toast Container - renders all active toasts
function ToastContainer({ toasts, removeToast }) {
    return (
        <div
            className="toast-container"
            role="region"
            aria-label="Notifications"
            aria-live="polite"
        >
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

// Individual Toast Component
function Toast({ id, message, type, duration, onClose }) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsExiting(true);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    useEffect(() => {
        if (isExiting) {
            const exitTimer = setTimeout(() => {
                onClose();
            }, 300); // Match animation duration

            return () => clearTimeout(exitTimer);
        }
    }, [isExiting, onClose]);

    const handleClose = () => {
        setIsExiting(true);
    };

    const icons = {
        success: <HiCheckCircle className="toast-icon toast-icon-success" />,
        error: <HiXCircle className="toast-icon toast-icon-error" />,
        warning: <HiExclamationCircle className="toast-icon toast-icon-warning" />,
        info: <HiInformationCircle className="toast-icon toast-icon-info" />,
    };

    return (
        <div
            className={`toast toast-${type} ${isExiting ? 'toast-exit' : 'toast-enter'}`}
            role="alert"
        >
            {icons[type]}
            <span className="toast-message">{message}</span>
            <button
                onClick={handleClose}
                className="toast-close"
                aria-label="Dismiss notification"
            >
                <HiX />
            </button>
        </div>
    );
}

export default Toast;
