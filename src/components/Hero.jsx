import { motion } from 'framer-motion';
import { Sparkles, PartyPopper, Music, Star, Gift } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            {/* Dynamic Background Elements */}
            <div className="hero-bg-wrapper">
                <div className="hero-blob blob-1"></div>
                <div className="hero-blob blob-2"></div>
                <div className="hero-blob blob-3"></div>
                <div className="confetti-container">
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className={`confetti c-${i % 4}`} style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}></div>
                    ))}
                </div>
            </div>

            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-title-wrapper"
                >
                    {/* Decorative Icons */}
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="icon-decoration icon-tl"
                    >
                        <Star size={56} className="text-yellow-400 drop-shadow-glow" fill="currentColor" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="icon-decoration icon-tr"
                    >
                        <Music size={48} className="text-pink-400 drop-shadow-glow" />
                    </motion.div>

                    <div className="main-title-box">
                        <h1 className="hero-heading-top">
                            HAPPY <span className="text-gradient neon-text" data-text="29TH">29TH</span>
                        </h1>
                        <h2 className="hero-heading-bottom">
                            BIRTHDAY <span className="text-highlight-blue neon-blue" data-text="ANTO">ANTO</span>
                        </h2>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                        className="icon-decoration icon-br"
                    >
                        <PartyPopper size={56} className="text-cyan-400 drop-shadow-glow" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                        className="icon-decoration icon-bl"
                    >
                        <Gift size={48} className="text-green-400 drop-shadow-glow" />
                    </motion.div>
                </motion.div>

                <motion.p
                    className="hero-subtitle glass-text"
                >
                    {"Level 29 Unlocked! Upgrade mental, upgrade rejeki. Siap menaklukkan dunia! 🌍🚀".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, delay: 0.5 + index * 0.03 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="hero-cta-wrapper"
                >
                    <button
                        onClick={() => {
                            const section = document.getElementById('challenges');
                            if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-primary hero-btn pulse-effect"
                    >
                        <PartyPopper size={20} />
                        Birthday Challenge
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
