import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Zap, Rocket } from 'lucide-react';
import './RoadTo30.css';

const RoadTo30 = () => {
    const calculateTimeLeft = () => {
        // Target: Jan 3, 2027 (Next Birthday - 30th)
        // Note: Assuming current date is shortly after Jan 3, 2026 based on context
        const targetDate = new Date('2027-01-03T00:00:00');
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeUnits = [
        { label: 'HARI', value: timeLeft.days || 0 },
        { label: 'JAM', value: timeLeft.hours || 0 },
        { label: 'MENIT', value: timeLeft.minutes || 0 },
        { label: 'DETIK', value: timeLeft.seconds || 0 },
    ];

    return (
        <section className="road-to-30-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="road-content"
                >
                    <div className="road-header">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20"
                        >
                            <Timer size={120} className="text-accent" />
                        </motion.div>

                        <h2 className="section-title">
                            <span className="text-gradient">ROAD TO 30</span> <br />
                            <span className="subtitle-sm">The Next Level Loading...</span>
                        </h2>
                        <p className="section-desc">
                            Perjalanan menuju level legendaris dimulai sekarang!
                            Setiap detik adalah kesempatan untuk upgrade diri. 🚀
                        </p>
                    </div>

                    <div className="countdown-grid">
                        {timeUnits.map((unit, index) => (
                            <motion.div
                                key={unit.label}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="time-card glass-card"
                            >
                                <div className="time-value text-gradient">{unit.value}</div>
                                <div className="time-label">{unit.label}</div>
                                <div className="card-glow"></div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="progress-bar-container"
                    >
                        <div className="progress-label">
                            <Zap size={16} className="text-yellow-400" />
                            <span>Level 29 Progress</span>
                            <Rocket size={16} className="text-blue-400" />
                        </div>
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: '0.5%' }}></div>
                            <div className="progress-glow"></div>
                        </div>
                        <div className="progress-stats">
                            <span>Started</span>
                            <span>Target: 30</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default RoadTo30;
