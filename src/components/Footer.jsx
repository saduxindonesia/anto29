import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 1rem 5rem',
            textAlign: 'center',
            background: 'var(--color-bg)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            color: 'var(--color-text-muted)'
        }}>
            <p className="flex items-center justify-center gap-2">
                Made with <Heart size={16} fill="#ef4444" color="#ef4444" /> for Anto's 29th
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                &copy; {new Date().getFullYear()} Special Edition by <a href="https://sadux.my.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>SaduX</a>
            </p>
        </footer>
    );
};

export default Footer;
