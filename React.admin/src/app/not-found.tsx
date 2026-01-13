// app/not-found.tsx or pages/404.tsx
'use client'; // Only needed in app/not-found.tsx if you use interactive features

import Link from 'next/link';
import { CSSProperties } from 'react';

export default function NotFound() {
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>404 - Page Not Found</h1>
            <p style={subtitleStyle}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/">
                <button style={buttonStyle}>Go Home</button>
            </Link>
        </div>
    );
}

const containerStyle: CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    color: '#fff',
    textAlign: 'center',
    padding: '0 20px',
};

const titleStyle: CSSProperties = {
    fontSize: '3rem',
    marginBottom: '0.5rem',
};

const subtitleStyle: CSSProperties = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
};

const buttonStyle: CSSProperties = {
    backgroundColor: '#fff',
    color: '#764ba2',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};
