import React from "react";
import { useRouter } from "next/router";
import styles from './navbar.module.css';
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { useTheme } from "@/theme/ThemeContext";
import { Home, ListTodo, User } from "lucide-react";

const BottomBar: React.FC = () => {

    const router = useRouter();
    const { colors } = useTheme();
    const activePath = router.pathname;

    const handleNavigation = (path: string) => {
        if (hapticFeedback.notificationOccurred.isAvailable()) {
            hapticFeedback.impactOccurred("heavy");
        }
        router.push(path);
    };

    return (
        <div className={styles.bottomNavigation} style={{
            backgroundColor: colors.primary[20]
        }}>
            <div className={`${styles.bottomNavItem} ${['/', '/home'].includes(activePath) ? styles.active : ''}`} onClick={() => handleNavigation("/")}>
                <Home size={20} strokeWidth={1.5} />
                <p>Home</p>
            </div>
            <div className={`${styles.bottomNavItem} ${activePath === '/task' ? styles.active : ''}`} onClick={() => handleNavigation("/task")}>
                <ListTodo size={20} strokeWidth={1.5} />
                <p>Task</p>
            </div>
            <div className={`${styles.bottomNavItem} ${activePath === '/profile' ? styles.active : ''}`} onClick={() => handleNavigation("/profile")}>
                <User size={20} strokeWidth={1.5} />
                <p>Profile</p>
            </div>
        </div>
    )
}

export default BottomBar