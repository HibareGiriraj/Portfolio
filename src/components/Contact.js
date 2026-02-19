"use client";
import { useState, useCallback } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiArrowRight, HiExclamation, HiDownload } from 'react-icons/hi';
import { useToast } from './Toast';

// Validation rules
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 100) return 'Name must be less than 100 characters';
        return null;
    },
    email: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
    },
    subject: (value) => {
        if (value && value.length > 200) return 'Subject must be less than 200 characters';
        return null;
    },
    message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 5000) return 'Message must be less than 5000 characters';
        return null;
    }
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    // Validate a single field
    const validateField = useCallback((name, value) => {
        const validator = validators[name];
        return validator ? validator(value) : null;
    }, []);

    // Validate all fields
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [formData, validateField]);

    // Handle input change with real-time validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing (if field was touched)
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    // Handle blur for validation
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({ name: true, email: true, subject: true, message: true });

        // Validate form
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Message sent successfully! I\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTouched({});
                setErrors({});
            } else {
                toast.error(data.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            toast.error('Connection error. Please check your internet and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Input field component for cleaner JSX
    const InputField = ({ name, label, type = 'text', placeholder, required = false }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-400 mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors[name] ? 'true' : 'false'}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors ${errors[name] && touched[name] ? 'input-error' : ''}`}
                placeholder={placeholder}
            />
            {errors[name] && touched[name] && (
                <p id={`${name}-error`} className="error-message" role="alert">
                    <HiExclamation className="w-3 h-3" />
                    {errors[name]}
                </p>
            )}
        </div>
    );

    return (
        <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className="section-title mb-4">Get In Touch</h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                        Looking for a full-time MERN stack developer? Let's connect!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass-card p-4 sm:p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-white mb-4">Let's Work Together</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                I'm actively seeking full-time roles where I can contribute to building scalable products and grow as an engineer.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href="mailto:giriraj.hibare@gmail.com"
                                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"
                                >
                                    <FaEnvelope className="text-cyan-400" />
                                    <span>giriraj.hibare@gmail.com</span>
                                </a>
                                <a
                                    href="https://linkedin.com/in/girirajhibare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"
                                >
                                    <FaLinkedin className="text-cyan-400" />
                                    <span>linkedin.com/in/girirajhibare</span>
                                </a>
                                <a
                                    href="https://github.com/HibareGiriraj"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"
                                >
                                    <FaGithub className="text-cyan-400" />
                                    <span>github.com/HibareGiriraj</span>
                                </a>
                            </div>
                        </div>

                        {/* Resume Download */}
                        <a
                            href="/resume/Giriraj_Hibare_Resume.pdf"
                            download="Giriraj_Hibare_Resume.pdf"
                            className="btn-primary w-full justify-center min-h-[48px] text-sm"
                            aria-label="Download my resume"
                        >
                            <HiDownload className="text-lg" aria-hidden="true" />
                            Download Resume (PDF)
                        </a>

                        <div className="glass-card p-6 rounded-xl">
                            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                                What I'm Looking For
                            </h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                    <span>Full-time MERN Stack Developer roles</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                    <span>Remote or Pune-based opportunities</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                    <span>Product-focused teams with growth potential</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card p-5 sm:p-8 rounded-xl">
                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <InputField
                                name="name"
                                label="Name"
                                placeholder="Your name"
                                required
                            />
                            <InputField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                            <InputField
                                name="subject"
                                label="Subject"
                                placeholder="Job Opportunity / Freelance Project / etc."
                            />
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                                    Message <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={errors.message ? 'true' : 'false'}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                    rows={4}
                                    className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none ${errors.message && touched.message ? 'input-error' : ''}`}
                                    placeholder="Tell me about the opportunity..."
                                />
                                {errors.message && touched.message && (
                                    <p id="message-error" className="error-message" role="alert">
                                        <HiExclamation className="w-3 h-3" />
                                        {errors.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    <>
                                        Send Message <HiArrowRight />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
