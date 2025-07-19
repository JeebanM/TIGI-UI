import React from "react";
import styles from './styles.module.css'
import { useTheme } from "@/theme/ThemeContext";

type DailyRewardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  currentDay: number;
  claimed?: boolean;
  // reward?: string;
};

const rewards = [
  { label: "Day 1", value: "100" },
  { label: "Day 2", value: "500" },
  { label: "Day 3", value: "1,000" },
  { label: "Day 4", value: "5,000" },
  { label: "Day 5", value: "Skin" },
  { label: "Day 6", value: "20,000" },
  { label: "Day 7", value: "50,000" },
  { label: "Day 8", value: "100,000" },
  { label: "Day 9", value: "250,000" },
  { label: "Day 10", value: "500,000" },
  { label: "Day 11", value: "1M" },
  { label: "Day 12", value: "5M" },
];

const DailyRewardModal: React.FC<DailyRewardModalProps> = ({
  isOpen,
  onClose,
  onClaim,
  currentDay,
  claimed,
  // reward,
}) => {
  if (!isOpen) return null;

  const { colors } = useTheme();

  return (
    <div className={styles.rewardoverlay}>
      <div className={styles.rewardmodal}
        style={{
          backgroundColor: colors.primary[20],
        }}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h1>{currentDay}</h1>
        <p>Daily reward</p>
        <div className={styles.grid}>
          {rewards.map((r, i) => (
            <div
              key={i}
              className={`${styles.dayCard} ${currentDay - 1 === i ? styles.active : ""}`}
              style={{
                backgroundColor: colors.base[200],
              }}>
              <p>{r.label}</p>
              <div className={styles.iconBox}>🎁</div>
              <span>{r.value}</span>
            </div>
          ))}
        </div>
        <button
          className={styles.collectBtn}
          onClick={onClaim}
          disabled={claimed}
        >
          {claimed ? 'Collected' : 'Collect'}
        </button>
        {claimed && <p className={styles.rewardNote}>Already claimed today!</p>}
      </div>
    </div>
  );
};

export default DailyRewardModal;
