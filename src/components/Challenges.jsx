import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Brain, ChevronLeft, Trophy } from 'lucide-react';
import Game from './Game';
import ScrambleGame from './ScrambleGame';
import './Challenges.css';

const Challenges = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    const games = [
        {
            id: 'memory',
            title: 'Adu Cepat Ingat',
            icon: Gamepad2,
            description: 'Tes seberapa kuat ingatan lu Cari pasangan kartu secepat kilat sebelum waktu habis!',
            colorClass: 'gradient-blue',
            difficulty: 'Dikejar Waktu! ⏱️'
        },
        {
            id: 'scramble',
            title: 'Asah Otak',
            icon: Brain,
            description: 'Susun kata yang berantakan jadi bener. Jangan sampe otak lu nge-lag!',
            colorClass: 'gradient-purple',
            difficulty: 'Uji Nyali Otak 🧠'
        }
    ];

    return (
        <section id="challenges" className="challenges-section">
            <div className="challenges-container">

                <AnimatePresence mode="wait">
                    {!selectedGame ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="selection-wrapper"
                        >
                            <div className="challenges-header">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    className="trophy-icon-wrapper"
                                >
                                    <Trophy size={40} className="text-yellow-400" />
                                </motion.div>
                                <h2 className="challenges-title">
                                    Birthday <span className="text-highlight">Challenges</span>
                                </h2>
                                <p className="challenges-subtitle">
                                    Pilih tantangan lu Buktiin skill lu emang udah "Next Level" di umur 29 ini!
                                </p>
                            </div>

                            <div className="challenges-grid">
                                {games.map((game, index) => (
                                    <motion.div
                                        key={game.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        onClick={() => setSelectedGame(game.id)}
                                        className="challenge-card"
                                    >
                                        <div className={`card-gradient-overlay ${game.colorClass}`} />

                                        <div className="card-content">
                                            <div className={`icon-box ${game.colorClass}`}>
                                                <game.icon size={48} className="icon-white" />
                                            </div>

                                            <h3 className="card-title">{game.title}</h3>
                                            <p className="card-description">{game.description}</p>

                                            <div className="card-footer">
                                                <span className="difficulty-badge">{game.difficulty}</span>
                                                <span className="play-link">
                                                    Gasskeun! 🚀 <ChevronLeft size={16} className="rotate-180" />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="game-view"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="game-view-wrapper"
                        >
                            <div className="back-button-container">
                                <button
                                    onClick={() => setSelectedGame(null)}
                                    className="back-btn"
                                >
                                    <ChevronLeft size={20} /> Kembali ke Menu
                                </button>
                            </div>

                            <div className="game-wrapper">
                                {selectedGame === 'memory' && <Game />}
                                {selectedGame === 'scramble' && <ScrambleGame />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Challenges;
