import { useTheme } from '@/theme/ThemeContext';
import styles from './EnergyBar.module.css';

type Props = {
  current: number;
  max: number;
};

const EnergyBar = ({ current, max }: Props) => {
  const { colors } = useTheme();
  
  const percent = Math.min((current / max) * 100, 100);

  return (
  <div className={styles.wrapper}>
      <div className={styles.barBackground} style={{
        backgroundColor: '#3669BB',
      }}>
        <div
          className={styles.barFill}
          style={{ 
            width: `${percent}%`,
            backgroundColor: '#3669BB',
          }}
        />
        <p className={styles.text}>
          {current}/{max}
        </p>
      </div>
    </div>
  );
};

export default EnergyBar;
