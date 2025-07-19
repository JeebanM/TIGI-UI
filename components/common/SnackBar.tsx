import React from 'react';
import styles from './styles/SnackBar.module.css'

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
};

const SnackBar: React.FC<Props> = ({ open, message, onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={styles.snackbar}>
      {message}
    </div>
  );
};

export default SnackBar;