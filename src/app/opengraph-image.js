import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Giriraj Hibare - Full-Stack MERN Developer';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                        display: 'flex',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-150px',
                        right: '-100px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
                        display: 'flex',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        zIndex: 10,
                    }}
                >
                    {/* Name */}
                    <div
                        style={{
                            fontSize: '72px',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '-2px',
                            lineHeight: 1.1,
                            display: 'flex',
                        }}
                    >
                        Giriraj Hibare
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: '32px',
                            fontWeight: 600,
                            color: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        Full-Stack Developer
                        <span style={{ color: '#475569' }}>|</span>
                        <span style={{ color: '#06b6d4' }}>MERN Stack</span>
                    </div>

                    {/* Stats */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '40px',
                            marginTop: '32px',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '36px', fontWeight: 700, color: '#06b6d4' }}>500+</span>
                            <span style={{ fontSize: '14px', color: '#94a3b8' }}>Active Users</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '36px', fontWeight: 700, color: '#06b6d4' }}>2+</span>
                            <span style={{ fontSize: '14px', color: '#94a3b8' }}>Production Apps</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '36px', fontWeight: 700, color: '#06b6d4' }}>0</span>
                            <span style={{ fontSize: '14px', color: '#94a3b8' }}>Critical Incidents</span>
                        </div>
                    </div>

                    {/* URL */}
                    <div
                        style={{
                            marginTop: '24px',
                            fontSize: '18px',
                            color: '#64748b',
                            display: 'flex',
                        }}
                    >
                        girirajhibare.dev
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
