import { motion } from 'framer-motion';
import './Wishes.css';

const specialWishes = [
    {
        name: "Dhani",
        role: "Adik Perempuan",
        text: "Happy Birthday Mas Anto! 🎉 Semoga panjang umur, sehat selalu, makin sukses karirnya, dan selalu jadi kakak serta suami yang baik. Doa terbaik selalu menyertai Mas Anto!",
        isSpecial: true
    },
    {
        name: "Anisa",
        role: "Adik Perempuan",
        text: "Selamat Ulang Tahun Mas Anto yang ke-29! 🎂 Semoga di usia yang baru ini makin berkah, rumah tangganya sakinah mawaddah warahmah, dan semua impiannya tercapai. Stay healthy and happy!",
        isSpecial: true
    }
];

const wishesData = [
    { name: "Budi", text: "Happy Birthday Anto! Makin sukses karirnya bro! 🚀" },
    { name: "Siti", text: "Selamat ulang tahun ke-29! Semoga rejekinya makin lancar terus ya! 🎁" },
    { name: "Andi", text: "HBD Bro! Ditunggu traktiran baksonya! 🍜" },
    { name: "Dewi", text: "Wish you all the best! Sehat selalu dan bahagia bersama keluarga." },
    { name: "Putri", text: "Selamat ulang tahun Anto! Semoga tahun ini tahun terbaikmu." },
    { name: "Rizky", text: "Happy Level Up! 29 tahun bukan main, semangat terus! 💪" },
    { name: "Doni", text: "Gas terus bosku! HBD ya! 🎉" },
    { name: "Rina", text: "Semoga panjang umur, sehat, dan banyak rejeki. Aamiin." },
    { name: "Eko", text: "Selamat menua bro haha. Enjoy your 29! 🎂" },
    { name: "Fani", text: "Happy Birthday! Jangan lupa bersyukur." },
    { name: "Gilang", text: "Sukses project-projectnya, lancar jaya!" },
    { name: "Hani", text: "HBD Anto! Stay cool and awesome. 😎" },
];

const Wishes = () => {
    return (
        <section id="wishes" className="wishes-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Words form the <span className="text-highlight">Heart</span>
                </motion.h2>

                {/* Special Wishes */}
                <div className="special-wishes-container">
                    {specialWishes.map((wish, index) => (
                        <motion.div
                            key={`special-${index}`}
                            className="special-wish-card glass-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="special-wish-header">
                                <div className="special-avatar">
                                    {wish.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="special-name">{wish.name}</h3>
                                    <span className="special-role">{wish.role}</span>
                                </div>
                            </div>
                            <p className="special-text">"{wish.text}"</p>
                        </motion.div>
                    ))}
                </div>

                {/* Regular Wishes */}
                <div className="wishes-grid">
                    {wishesData.map((wish, index) => (
                        <motion.div
                            key={index}
                            className="glass-card wish-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="wish-avatar">
                                {wish.name.charAt(0)}
                            </div>
                            <div className="wish-content">
                                <h3 className="wish-name">{wish.name}</h3>
                                <p className="wish-text">"{wish.text}"</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Wishes;
