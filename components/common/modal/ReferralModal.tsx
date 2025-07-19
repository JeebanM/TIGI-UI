import React, { useState } from 'react';
import styles from './styles.module.css';
import GiftIcon from '../../../public/Gift.svg';
import Image from 'next/image';
import { useTheme } from '@/theme/ThemeContext';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode: string;
}

const REFERRAL_BASE_URL = 'https://t.me/your_bot?start='; // replace with your bot username

const ReferralModal: React.FC<ReferralModalProps> = ({
  isOpen, onClose, referralCode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { colors } = useTheme();
  
  const shareUrl = `${REFERRAL_BASE_URL}${referralCode}`;

  const handleShare = () => {
    // Opens Telegram share dialog
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Join me and earn rewards!`,
      '_blank'
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Image src={GiftIcon} alt="Gift" className={styles.giftImage} />
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>
        <div className={styles.modalContent}>
          <span>Send a gift to a friend and earn even more!</span>
          <p>Share your link, earn 20% of each friend’s profits!</p>
          <div className={styles.shareBox}>
            <input value={shareUrl} readOnly className={styles.shareInput} />
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button className={styles.claimBtn} onClick={handleShare}>Share on Telegram</button>
          <p className={styles.rewardNote}>Dont forget to collect the daily reward</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
