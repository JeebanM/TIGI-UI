import React from 'react';
import Colors from '@/theme/Colors';
import styles from './styles/CategoryCard.module.css';
import { Text } from '@telegram-apps/telegram-ui';


interface CardProps {
    icon: React.ElementType;
    title?: string;
    onClick?: () => void;
    className?: string;
    type?: 'round' | 'square' | 'rectangle';
    size?: 'x-small' | 'small' | 'medium' | 'large';
}

const CategoryCard: React.FC<CardProps> = ({ icon: Icon, title, onClick, className, type = 'square', size = 'medium' }) => {
    const cardClass = `${styles.card} ${styles[type]} ${styles[size]} ${className || ''}`;

    return (
        <div className={cardClass} onClick={onClick} style={{ backgroundColor: String(Colors.dark.base[100]) }}>
            {/* <Icon className={styles.icon}/> */}
            <Text weight='3' style={{color: String(Colors.dark.base.content)}}>{title}</Text>
        </div>
    );
};

export default CategoryCard;
