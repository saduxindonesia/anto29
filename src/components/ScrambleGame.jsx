import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, RefreshCcw, Trophy, Timer, Zap, Skull, Star, Flame, Lightbulb, Flag } from 'lucide-react';
import './ScrambleGame.css';
import './PremiumGame.css'; // Shared premium styles

// Database Words organized by difficulty
const WORD_DATABASE = {
    EASY: [
        { word: "BUKU", hint: "Jendela dunia" },
        { word: "BOLA", hint: "Benda bulat ditendang" },
        { word: "MEJA", hint: "Tempat menaruh barang" },
        { word: "GURU", hint: "Pengajar di sekolah" },
        { word: "KOPI", hint: "Minuman hitam" },
        { word: "SUSU", hint: "Minuman putih sehat" },
        { word: "NASI", hint: "Makanan pokok" },
        { word: "JABAT", hint: "Salam tangan" },
        { word: "LARI", hint: "Gerak cepat kaki" },
        { word: "JALAN", hint: "Gerak lambat kaki" },
        { word: "PAGI", hint: "Matahari terbit" },
        { word: "SORE", hint: "Matahari terbenam" },
        { word: "JAM", hint: "Penunjuk waktu" },
        { word: "TAS", hint: "Wadah bawa barang" },
        { word: "BAJU", hint: "Pakaian badan" },
        { word: "TOPI", hint: "Penutup kepala" },
        { word: "KUE", hint: "Makanan manis" },
        { word: "ROTI", hint: "Makanan dari tepung" },
        { word: "IKAN", hint: "Hewan air" },
        { word: "AYAM", hint: "Unggas berkokok" },
        { word: "SAPI", hint: "Penghasil susu" },
        { word: "KUDA", hint: "Hewan tunggangan" },
        { word: "RUSA", hint: "Hewan bertanduk" },
        { word: "KACA", hint: "Benda bening" },
        { word: "PINTU", hint: "Jalan masuk" },
        { word: "RUMAH", hint: "Tempat tinggal" },
        { word: "ATAP", hint: "Pelindung hujan" },
        { word: "LANTAI", hint: "Pijakan kaki" },
        { word: "TAMAN", hint: "Kebun bunga" },
        { word: "BUNGA", hint: "Tanaman indah" }
    ],
    MEDIUM: [
        { word: "SEKOLAH", hint: "Tempat belajar formal" },
        { word: "KANTOR", hint: "Tempat bekerja" },
        { word: "LIBURAN", hint: "Waktu bersantai" },
        { word: "PELANGI", hint: "Warna di langit" },
        { word: "SAHABAT", hint: "Teman dekat" },
        { word: "KELUARGA", hint: "Orang terdekat" },
        { word: "GEMBIRA", hint: "Perasaan senang" },
        { word: "HADIAH", hint: "Pemberian spesial" },
        { word: "DOMPET", hint: "Wadah uang" },
        { word: "SEPATU", hint: "Alas kaki" },
        { word: "SANDAL", hint: "Alas kaki santai" },
        { word: "CELANA", hint: "Pakaian bawahan" },
        { word: "KEMEJA", hint: "Baju berkerah" },
        { word: "DASI", hint: "Aksesoris leher" },
        { word: "CINCIN", hint: "Perhiasan jari" },
        { word: "KALUNG", hint: "Perhiasan leher" },
        { word: "GELANG", hint: "Perhiasan tangan" },
        { word: "MOBIL", hint: "Kendaraan roda empat" },
        { word: "MOTOR", hint: "Kendaraan roda dua" },
        { word: "SEPEDA", hint: "Kendaraan kayuh" },
        { word: "PESAWAT", hint: "Kendaraan udara" },
        { word: "KERETA", hint: "Kendaraan rel" },
        { word: "PERAHU", hint: "Kendaraan air" },
        { word: "DOKTER", hint: "Penyembuh sakit" },
        { word: "PERAWAT", hint: "Asisten dokter" },
        { word: "POLISI", hint: "Penegak hukum" },
        { word: "TENTARA", hint: "Pelindung negara" },
        { word: "PILOT", hint: "Pengemudi pesawat" },
        { word: "SUPIR", hint: "Pengemudi mobil" },
        { word: "RAJA", hint: "Pemimpin kerajaan" }
    ],
    HARD: [
        { word: "PEMIMPIN", hint: "Orang yang di depan" },
        { word: "PRESIDEN", hint: "Kepala negara" },
        { word: "MENTERI", hint: "Pembantu presiden" },
        { word: "GUBERNUR", hint: "Kepala provinsi" },
        { word: "BUPATI", hint: "Kepala kabupaten" },
        { word: "WALIKOTA", hint: "Kepala kota" },
        { word: "CAMAT", hint: "Kepala kecamatan" },
        { word: "LURAH", hint: "Kepala kelurahan" },
        { word: "RW", hint: "Rukun Warga" },
        { word: "RT", hint: "Rukun Tetangga" },
        { word: "PROFESOR", hint: "Guru besar" },
        { word: "DOSEN", hint: "Pengajar kampus" },
        { word: "MAHASISWA", hint: "Pelajar kampus" },
        { word: "SKRIPSI", hint: "Tugas akhir S1" },
        { word: "TESIS", hint: "Tugas akhir S2" },
        { word: "DISERTASI", hint: "Tugas akhir S3" },
        { word: "IJAZAH", hint: "Surat tanda lulus" },
        { word: "WISUDA", hint: "Upacara kelulusan" },
        { word: "SARJANA", hint: "Gelar lulusan" },
        { word: "MAGISTER", hint: "Gelar master" },
        { word: "DOKTOR", hint: "Gelar tertinggi" },
        { word: "ALUMNI", hint: "Lulusan sekolah" },
        { word: "REUNI", hint: "Pertemuan kembali" },
        { word: "ORGANISASI", hint: "Kumpulan orang" },
        { word: "KOMUNITAS", hint: "Kelompok minat" },
        { word: "PARTAI", hint: "Organisasi politik" },
        { word: "PEMILU", hint: "Pesta demokrasi" },
        { word: "KAMPANYE", hint: "Promosi calon" },
        { word: "DEBAT", hint: "Adu argumen" },
        { word: "PIDATO", hint: "Bicara depan umum" }
    ],
    PSYCHOPATH: [
        { word: "IDIOSINKRASI", hint: "Keunikan sifat/karakter khas" },
        { word: "EKUILIBRIUM", hint: "Keseimbangan (Fisika/Ekonomi)" },
        { word: "KALEIDOSKOP", hint: "Aneka ragam peristiwa" },
        { word: "SKIZOFRENIA", hint: "Gangguan mental berat" },
        { word: "AERODINAMIKA", hint: "Ilmu pergerakan udara" },
        { word: "KLAUSTROFOBIA", hint: "Takut ruang sempit" },
        { word: "PSIKOSOMATIS", hint: "Sakit fisik karena pikiran" },
        { word: "HIPOKONDRI", hint: "Cemas sakit berlebihan" },
        { word: "EKSISTENSIALISME", hint: "Paham keberadaan diri" },
        { word: "TOTALITERISME", hint: "Kekuasaan negara mutlak" },
        { word: "NANOTEKNOLOGI", hint: "Teknologi skala atom" },
        { word: "BIOTEKNOLOGI", hint: "Teknologi agen hayati" },
        { word: "KRIPTOGRAFI", hint: "Ilmu sandi dan enkripsi" },
        { word: "ASTRONAUTIKA", hint: "Teknologi penerbangan luar angkasa" },
        { word: "PALEONTOLOGI", hint: "Ilmu tentang fosil" },
        { word: "EPIDEMIOLOGI", hint: "Ilmu penyebaran penyakit" },
        { word: "ENTOMOLOGI", hint: "Ilmu tentang serangga" },
        { word: "FILANTROPI", hint: "Tindakan cinta kasih sesama" },
        { word: "ALTRUISME", hint: "Mementingkan orang lain" },
        { word: "HEDONISME", hint: "Pandangan hidup mencari kesenangan" },
        { word: "SKEPTISISME", hint: "Paham keraguan akan kebenaran" },
        { word: "NARSISISME", hint: "Cinta diri sendiri berlebihan" },
        { word: "PARADOKSAL", hint: "Seolah bertentangan tapi benar" },
        { word: "HIERARKI", hint: "Urutan tingkatan/jenjang" },
        { word: "INTEGRITAS", hint: "Mutu, sifat, atau keadaan bulat utuh" },
        { word: "AKUNTABILITAS", hint: "Pertanggungjawaban fungsi" },
        { word: "KRONOLOGIS", hint: "Berdasarkan urutan waktu" },
        { word: "BIBLIOGRAFI", hint: "Daftar pustaka/buku" },
        { word: "ENSIKLOPEDIA", hint: "Buku himpunan uraian ilmu" },
        { word: "KONSTITUSIONAL", hint: "Sesuai undang-undang dasar" }
    ]
};

const LEVELS = [
    { id: 'EASY', label: 'EZ PZ', icon: Star, color: 'text-green-300', desc: 'Pemanasan doang, mah gampang.' },
    { id: 'MEDIUM', label: 'Lumayan', icon: Zap, color: 'text-blue-300', desc: 'Mulai mikir dikit lah ya.' },
    { id: 'HARD', label: 'Suhu', icon: Flame, color: 'text-orange-300', desc: 'Uji wawasan luas elo.' },
    { id: 'PSYCHOPATH', label: 'Psychopath', icon: Skull, color: 'text-red-400', desc: 'Yang suka ngaku pinter/jenius.' }
];

const TOTAL_STAGES = 10;
const TIME_PER_STAGE = 10;

const ScrambleGame = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing, won, gameover
    const [difficulty, setDifficulty] = useState('EASY');
    const [gameQuestions, setGameQuestions] = useState([]);
    const [currentStage, setCurrentStage] = useState(0);
    const [currentScramble, setCurrentScramble] = useState('');
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_PER_STAGE);

    const timerRef = useRef(null);

    const scrambleWord = (word) => {
        let arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        if (arr.length > 1 && arr.join('') === word) return scrambleWord(word);
        return arr.join('');
    };

    const startGame = (selectedLevel) => {
        setDifficulty(selectedLevel);
        const pool = WORD_DATABASE[selectedLevel];
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, TOTAL_STAGES);

        setGameQuestions(selectedQuestions);
        setCurrentStage(0);
        setScore(0);
        setGameState('playing');
        loadStage(0, selectedQuestions);
    };

    const loadStage = (index, questions = gameQuestions) => {
        if (!questions[index]) return;
        const wordObj = questions[index];
        setCurrentScramble(scrambleWord(wordObj.word));
        setUserInput('');
        setMessage('');
        setTimeLeft(TIME_PER_STAGE);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    };

    // Timer Limit Check
    useEffect(() => {
        if (gameState === 'playing' && timeLeft < 0) {
            handleTimeOut();
        }
    }, [timeLeft, gameState]);

    const handleTimeOut = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        const correctWord = gameQuestions[currentStage]?.word;
        setMessage(`YAH TELAT! Jawabannya: ${correctWord}`);

        setTimeout(() => {
            nextStage();
        }, 2000);
    };

    const nextStage = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        if (currentStage < TOTAL_STAGES - 1) {
            const nextIdx = currentStage + 1;
            setCurrentStage(nextIdx);
            loadStage(nextIdx);
        } else {
            setGameState('won');
        }
    };

    const handleCheck = () => {
        if (!gameQuestions[currentStage]) return;

        const target = gameQuestions[currentStage].word;
        if (userInput.toUpperCase().trim() === target) {
            if (timerRef.current) clearInterval(timerRef.current);
            const timeBonus = (timeLeft > 0 ? timeLeft : 0) * (difficulty === 'PSYCHOPATH' ? 50 : 10);
            const baseScore = difficulty === 'PSYCHOPATH' ? 500 : difficulty === 'HARD' ? 200 : 100;

            setScore(prev => prev + baseScore + timeBonus);
            setMessage('MANTAP! 🎉');
            setTimeout(() => {
                nextStage();
            }, 800);
        } else {
            setMessage('Salah woy! 😂');
            // Shake effect logic could go here
        }
    };

    // New Give Up Handler
    const handleGiveUp = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setMessage("Yailah nyerah. 👎");
        setTimeout(() => {
            setGameState('menu');
            setMessage('');
            setScore(0); // Optional: reset score when giving up
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleCheck();
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Get current level icon
    const CurrentIcon = LEVELS.find(l => l.id === difficulty)?.icon || Brain;

    return (
        <section className="scramble-section" id="scramble">
            <div className="scramble-game-container">
                <AnimatePresence mode='wait'>
                    {gameState === 'menu' && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="scramble-card glass-panel"
                        >
                            <div className="start-icon-box">
                                <Brain size={48} className="text-purple-400" />
                            </div>
                            <h2 className="title-game">Asah <span className="text-highlight">Otak</span></h2>
                            <p className="description">Pilih level Knowledge lu, gausah maksa saran gua.</p>

                            <div className="level-grid">
                                {LEVELS.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => startGame(level.id)}
                                        className={`level-card ${level.id === 'PSYCHOPATH' ? 'psycho-border' : ''}`}
                                    >
                                        <div className="level-icon-wrapper">
                                            <level.icon size={32} className="text-white" />
                                        </div>
                                        <h3 className="level-title">{level.label}</h3>
                                        <span className="level-desc">{level.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="scramble-card glass-panel"
                        >
                            <div className="game-header">
                                <div className="game-info-badge">
                                    <span className="game-info-label">Round</span>
                                    <span className="game-info-value">{currentStage + 1}<span className="text-slate-500 text-lg">/ {TOTAL_STAGES}</span></span>
                                </div>
                                <div className="game-info-badge">
                                    <Timer size={20} className={`${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`} />
                                    <span className="game-info-value">{timeLeft}s</span>
                                </div>
                                <div className="game-info-badge">
                                    <Trophy size={20} className="text-yellow-400" />
                                    <span className="game-info-value">{score}</span>
                                </div>
                            </div>

                            <motion.div
                                key={currentScramble}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="word-container"
                            >
                                {currentScramble.split('').map((char, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`letter-tile ${difficulty === 'PSYCHOPATH' ? 'glitch' : ''}`}
                                    >
                                        {char}
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hint-box"
                            >
                                <Lightbulb className="hint-icon" />
                                <p className="hint-text">{gameQuestions[currentStage]?.hint}</p>
                            </motion.div>

                            <div className="answer-section">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="KETIK DISINI..."
                                    className="modern-input"
                                    autoFocus
                                />
                            </div>

                            <div className="feedback-message">
                                <AnimatePresence mode='wait'>
                                    {message && (
                                        <motion.p
                                            key={message}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={message.includes('MANTAP') ? 'feedback-success' : 'feedback-error'}
                                        >
                                            {message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button onClick={handleGiveUp} className="btn-giveup">
                                <Flag size={20} /> Nyerah
                            </button>
                        </motion.div>
                    )}

                    {gameState === 'won' && (
                        <motion.div
                            key="won"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="glass-panel victory-message"
                        >
                            <Trophy size={80} className="text-yellow-400 mb-6 animate-bounce mx-auto" />
                            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
                                🎉 KELAR BOS! 🎉
                            </h3>
                            <div className="text-xl text-slate-300 mb-4">Level: <span className={LEVELS.find(l => l.id === difficulty).color}>{difficulty}</span></div>

                            <div className="final-score-box mb-8">
                                <span className="block text-slate-400 text-sm uppercase tracking-widest mb-2">Total Skor</span>
                                <span className="score-value text-6xl">{score}</span>
                            </div>

                            <button onClick={() => setGameState('menu')} className="btn-primary-glow">
                                <RefreshCcw size={24} /> Balik ke Menu
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ScrambleGame;
