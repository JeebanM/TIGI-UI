import React from "react";
import Image from 'next/image';
import styles from '@/styles/profile.module.css'
import BottomBar from "@/components/Bottombar";
import { useSoundVibration } from "@/utils/soundVibration";
import { FaTelegram, FaMedium, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTheme } from "@/theme/ThemeContext";

interface ProfileData {
    username: string;
    level: number;
    nextLevel: number;
    points: number;
    nextLevelPoints: number;
    avatar: string;
}

const Settings = () => {
    const user = useSelector((s: RootState) => s.user.user);
    const { isEnabled, toggleSoundVibration } = useSoundVibration();

    const { colors } = useTheme()

    return (
        <>
            <div className={styles.container}
                style={{
                    backgroundColor: colors.base[100].DEFAULT,
                    color: colors.base.content.DEFAULT,
                }}>
                <div className={styles.profileSection}>
                    <Image
                        src={user?.avatar || "/logo.png"}
                        alt="Avatar"
                        width={80}
                        height={80}
                        className={styles.avatar}
                    />
                    <h2 className={styles.username}>{user?.username || 'Username'}</h2>
                    {/* <div className={styles.levelRow}>
                        <span>Level {user?.level || 1}</span>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (user?.points || 0) / (user?.nextLevelPoints || 1) * 100
                                    )}%`
                                }}
                            ></div>
                        </div>
                        <span>Level {user?.nextLevel || 2}</span>
                    </div> */}
                    <div className={styles.pointsSection}>
                        <h3 className={styles.pointsLabel}>Total Points</h3>
                        <p className={styles.pointsValue}>{user?.points || 0}</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardItem}>
                        <p className={styles.cardTitle}>Sound & Vibration</p>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={isEnabled} onChange={toggleSoundVibration} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <div className={styles.footer}>
                    <p>Folks Finance</p>
                    <div className={styles.socialLinks}>
                        <a href="https://t.me/FolksfinanceOfficial" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                        <a href="https://x.com/folksfinance" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://discord.com/invite/folksfinance" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>


                        <a href="https://folksfinance.medium.com/" target="_blank" rel="noopener noreferrer"><FaMedium /></a>
                        <a href="https://www.linkedin.com/company/folksfinance/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
            <BottomBar />
        </>
    );
};

export default Settings;
