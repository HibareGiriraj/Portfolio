"use client";
import { useEffect, useState } from 'react';
import { FaEnvelope, FaTrash, FaCheck } from 'react-icons/fa';

export default function MessagesManager() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact');
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Inbox ({messages.length})</h3>

                {messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 bg-slate-800 rounded-lg">
                        <FaEnvelope className="text-4xl mx-auto mb-4 opacity-50" />
                        <p>No messages yet</p>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                onClick={() => setSelectedMessage(message)}
                                className={`bg-slate-800 border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedMessage?._id === message._id
                                        ? 'border-cyan-500 ring-1 ring-cyan-500/50'
                                        : 'border-slate-700 hover:border-slate-600'
                                    } ${!message.read ? 'border-l-4 border-l-cyan-500' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-white truncate">{message.name}</h4>
                                        <p className="text-sm text-slate-400 truncate">{message.email}</p>
                                        {message.subject && (
                                            <p className="text-sm text-cyan-400 mt-1 truncate">{message.subject}</p>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                                        {formatDate(message.createdAt)}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2 line-clamp-2">{message.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Message Detail */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                {selectedMessage ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{selectedMessage.name}</h3>
                                <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    {selectedMessage.email}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(selectedMessage._id)}
                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                    title="Delete message"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        {selectedMessage.subject && (
                            <div>
                                <label className="text-sm text-slate-500">Subject</label>
                                <p className="text-white font-medium">{selectedMessage.subject}</p>
                            </div>
                        )}

                        <div>
                            <label className="text-sm text-slate-500">Message</label>
                            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mt-1">
                                <p className="text-slate-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>
                        </div>

                        <div className="text-sm text-slate-500">
                            Received: {formatDate(selectedMessage.createdAt)}
                        </div>

                        <a
                            href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                        >
                            <FaEnvelope /> Reply via Email
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                        <FaEnvelope className="text-4xl mb-4 opacity-50" />
                        <p>Select a message to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}
