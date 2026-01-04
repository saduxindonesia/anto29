import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gift, Cake, PartyPopper, Heart, Star, Music, Camera, Smile, Play, Timer, RotateCcw, Flag } from 'lucide-react';
import './Game.css';
import './PremiumGame.css'; // Import shared premium styles

const icons = [Gift, Cake, PartyPopper, Heart, Star, Music, Camera, Smile];

const Game = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, won
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);

    // Timer states
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef(null);

    const shuffleCards = () => {
        const duplicatedIcons = [...icons, ...icons];
        const shuffled = duplicatedIcons
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({
                id: index,
                icon: icon,
            }));
        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setDisabled(false);
    };

    const startGame = () => {
        shuffleCards();
        setGameState('playing');
        setStartTime(Date.now());
        setElapsedTime(0);

        if (timerRef.current) clearInterval(timerRef.current);
        const start = Date.now();
        setStartTime(start);
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - start);
        }, 100);
    };

    const stopGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameState('won');
    };

    const handleGiveUp = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameState('start');
        setElapsedTime(0);
    };

    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleClick = (id) => {
        if (disabled || solved.includes(id) || flipped.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setDisabled(true);
            const firstId = newFlipped[0];
            const secondId = id;

            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard.icon === secondCard.icon) {
                setSolved(prev => [...prev, firstId, secondId]);
                setFlipped([]);
                setDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    useEffect(() => {
        if (gameState === 'playing' && cards.length > 0 && solved.length === cards.length) {
            stopGame();
        }
    }, [solved, cards, gameState]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, []);

    return (
        <section id="game" className="game-section">
            <div className="center-game">

                {gameState === 'start' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="start-card"
                    >
                        <div className="start-icon-box">
                            <PartyPopper size={48} className="text-blue-400" />
                        </div>
                        <h2 className="title-game">
                            Adu Cepat <span className="text-highlight">Ingat</span>
                        </h2>
                        <p className="game-instruction">
                            Temuin 8 pasang kartu kembar secepat kilat buat buka ucapan ultah spesial lu
                        </p>
                        <button onClick={startGame} className="btn-primary-glow">
                            <Play size={24} fill="currentColor" /> Gasskeun Main!
                        </button>
                    </motion.div>
                )}

                {gameState === 'playing' && (
                    <>
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Adu Cepat <span className="text-highlight">Ingat</span>
                        </motion.h2>

                        <div className="timer-badge mb-8 flex items-center gap-2 px-8 py-3 bg-slate-800/80 rounded-full border border-slate-600 backdrop-blur-md">
                            <Timer size={24} className="text-blue-400" />
                            <span className="font-mono text-2xl text-white font-bold">{formatTime(elapsedTime)}</span>
                        </div>

                        <div className="game-board">
                            {cards.map((card) => {
                                const Icon = card.icon;
                                const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
                                const isSolved = solved.includes(card.id);

                                return (
                                    <motion.div
                                        key={card.id}
                                        className={`card ${isSolved ? 'solved' : ''}`}
                                        onClick={() => handleClick(card.id)}
                                        initial={{ scale: 0.9, rotateY: 0 }}
                                        animate={{
                                            scale: 1,
                                            rotateY: isFlipped || isSolved ? 180 : 0
                                        }}
                                        style={{ transformStyle: 'preserve-3d' }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="card-inner">
                                            <div className="card-front">
                                                <span className="card-question">?</span>
                                            </div>
                                            <div className="card-back">
                                                <Icon size={32} />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <button onClick={handleGiveUp} className="btn-giveup-game">
                            <Flag size={20} /> Nyerah
                        </button>
                    </>
                )}

                {gameState === 'won' && (
                    <motion.div
                        className="glass-panel victory-message"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
                            🎉 GOKIL KELAR! 🎉
                        </h3>
                        <p className="text-2xl text-white mb-2">Lo kelarin cuma dalam <span className="text-cyan-400 font-bold">{formatTime(elapsedTime)}</span>!</p>
                        <p className="text-lg text-slate-400 mb-8">Emang jagoan lu</p>
                        <button onClick={startGame} className="btn-primary-glow">
                            <RotateCcw size={24} /> Main Lagi
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Game;
