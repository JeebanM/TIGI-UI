import { JSX, ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Tapper.module.css';
import { cubicBezier } from "framer-motion";

interface TapcoinProps {
  canIClickPlease?: boolean;
  clickValue?: number;
  cooldown?: number;
  handleClick(): void;
  children?: ReactNode;
  className?: string;
}

interface NumberInfo {
  id: string;
  value: number;
  x: number;
  y: number;
}

const numberAnimationDurationMs = 1000;
const numberAnimationDurationSec = numberAnimationDurationMs / 1000;

const notCoinAppearence = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
  transition: {
    duration: 0.3,
    ease: cubicBezier(0, 0.71, 0.2, 1.01),
    scale: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      restDelta: 0.001,
    },
  },
};

const cooldownAppearence = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
  transition: {
    duration: 0.7,
  },
};

export const FolksTapper = ({
  canIClickPlease,
  clickValue = 1,
  cooldown,
  handleClick,
  children,
  className,
}: TapcoinProps): JSX.Element => {
  const notCoinRef = useRef<HTMLDivElement>(null);
  const [buttonTransform, setButtonTransform] = useState({
    scale: 1,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
  });
  const [numbers, setNumbers] = useState<NumberInfo[]>([]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    handleClick();
    if (notCoinRef.current) {
      const touch = event.touches[0];
      const rect = notCoinRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = touch.clientX - centerX;
      const offsetY = centerY - touch.clientY;

      const rotateXValue = offsetY * 0.1;
      const rotateYValue = offsetX * 0.1;

      setButtonTransform({
        scale: 1,
        translateZ: -5,
        rotateX: rotateXValue,
        rotateY: rotateYValue,
      });

      const randomOffset = Math.floor(Math.random() * 21) - 10;

      const newNumber: NumberInfo = {
        id: `${Date.now()}`,
        value: clickValue,
        x: touch.clientX + randomOffset,
        y: touch.clientY,
      };

      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, numberAnimationDurationMs);
    }
  };

  const handleTouchEnd = () => {
    setButtonTransform({
      scale: 1,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
    });
  };

  const tapperClass = `${styles.container} ${className || ''}`;

  return (
    <AnimatePresence mode="popLayout">
      {canIClickPlease ? (
        <motion.div className={styles.root} {...notCoinAppearence} key="tap">
          <div className={tapperClass}>
            {children}
            <div
              ref={notCoinRef}
              className={styles.notcoin}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `
                  scale(${buttonTransform.scale})
                  translateZ(${buttonTransform.translateZ}px)
                  rotateX(${buttonTransform.rotateX}deg)
                  rotateY(${buttonTransform.rotateY}deg)
                `,
              }}
            />
          </div>

          <div>
            <AnimatePresence>
              {numbers.map((number) => (
                <motion.div
                  key={number.id}
                  className={styles.clickAmount}
                  initial={{ opacity: 1, y: number.y - 50, x: number.x }}
                  animate={{ opacity: 0, y: number.y - 200 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: numberAnimationDurationSec }}
                >
                  {number.value}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <motion.div className={styles.root} {...cooldownAppearence} key="cooldown">
          <div className={styles.cooldownContainer}>
            <div className={styles.cooldownNumber}>
              {cooldown !== undefined ? cooldown : <small>nothing</small>}
            </div>
            <svg className={styles.cooldown}>
              <circle className={styles.cooldownCircle} r="140" cx="150" cy="150" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
