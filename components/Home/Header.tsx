import styles from './Header.module.css';
import Image from 'next/image';


type Props = {
  avatarUrl: string;
  username: string;
  level: number;
  points: number;
  coinIconUrl: string;
  onAboutClick?: () => void;
};

const Header = ({
  avatarUrl,
  username,
  level,
  points,
  coinIconUrl,
  onAboutClick,
}: Props) => (
  <header className={styles.header}>
    <div className={styles.topRow}>
      <div className={styles.userBlock}>
        <div className={styles.avatarWrap}>
          <Image src={avatarUrl} width={42} height={42} alt="User" className={styles.avatar} />
          <span className={styles.level}>{level}</span>
        </div>
        <span className={styles.username}>{username}</span>
      </div>
      {/* <div className={styles.brandWrap}>
        <div className={styles.brand}>Folks</div>
      </div> */}
      <button className={styles.aboutBtn} onClick={onAboutClick}>
        About Folks
      </button>
    </div>
    <div className={styles.centerRow}>
      <Image src={coinIconUrl} width={30} height={30} alt="coin" className={styles.coin} />
      <span className={styles.points}>{points.toLocaleString()}</span>
    </div>
    {/* <div className={styles.badgesRow}>
      {badges.map((badge, i) => (
        <button
          className={`${styles.badge} ${badge.highlight ? styles.badgeHighlight : ''}`}
          key={i}
          onClick={badge.onClick}
        >
          {badge.icon && <span className={styles.badgeIcon}>{badge.icon}</span>}
          <span className={styles.badgeLabel}>{badge.label}</span>
        </button>
      ))}
    </div> */}
  </header>
);

export default Header;
