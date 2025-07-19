import styles from './Avatar.module.css';
import Image from 'next/image';

const Avatar = () => (
  <div className={styles.container}>
    <Image
      src="/cat-character.png"
      width={260}
      height={320}
      alt="Avatar"
      className={styles.character}
    />

    <div className={styles.leftActions}>
      <button className={styles.actionBtn}>Friends</button>
      <button className={styles.actionBtn}>
        Tasks <span className={styles.badge}>23</span>
      </button>
    </div>

    <div className={styles.rightActions}>
      <button className={styles.locked}>Clans 🔒</button>
      <button className={styles.locked}>Leagues 🔒</button>
    </div>
  </div>
);

export default Avatar;
