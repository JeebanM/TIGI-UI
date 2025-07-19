import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, markTaskComplete } from '@/store/slice/tasksSlice';
import { AppDispatch, RootState } from '@/store';
import GameCard from '@/components/common/GameCard';
import BottomBar from '@/components/Bottombar';
import styles from '@/styles/task.module.css';
import SnackBar from '@/components/common/SnackBar';
import { useTheme } from '@/theme/ThemeContext';

const TASK_TYPES = ['daily', 'weekly', 'monthly', 'promos'];

const TasksScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: tasks, status } = useSelector((s: RootState) => s.tasks);
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  
  
  const [activeTab, setActiveTab] = useState('daily');

  const { colors } = useTheme()

  useEffect(() => {
    dispatch(loadTasks(activeTab));
  }, [dispatch, activeTab]);

  const handleGoToTask = (task: any) => {

    window.open(task.url, '_blank', 'noopener,noreferrer');
    

    localStorage.setItem(`task:${task.id}:startedAt`, String(Date.now()));

    setSnack({ open: true, msg: 'Task started! Come back later to claim.' });
  };

  const handleClaim = async (taskId: number) => {
    const action = await dispatch(markTaskComplete({ taskId, proof: {} })) as any;
    if (markTaskComplete.fulfilled.match(action)) {
      setSnack({ open: true, msg: `You earned ${action.payload.reward} points!` });
    } else {
      setSnack({ open: true, msg: `Couldn't claim: ${action.error.message}` });
    }
  };

  const now = Date.now();
  

  const renderCard = (task: any) => {
    const startedAt = Number(localStorage.getItem(`task:${task.id}:startedAt`)) || 0;
    const elapsed = now - startedAt;
    // Example: 1 hour timer. You can make this dynamic based on the task later.
    const oneHour = 1000 * 60 * 60; 
    const isClaimable = startedAt > 0 && elapsed >= oneHour;

    let btnText: React.ReactNode = 'Go';
    let onClick = () => handleGoToTask(task);

    if (isClaimable) {
      btnText = 'Claim';
      onClick = () => handleClaim(task.id);
    } else if (startedAt > 0) {
      btnText = 'Pending';
      onClick = () => {}; // Disable button while pending
    }

    return (
      <GameCard
        key={task.id}
        // 4. Use the new description for the main text
        mainText={task.description}
        secondaryText={`+${task.reward} FP`}
        className={styles.gameCard}
        btnText={btnText}
        userReward={false}
        onClick={onClick}
      />
    );
  };

  return (
    <>
      <div className={styles.screen}
        style={{
        backgroundColor: colors.base[100].DEFAULT,
        color: colors.base.content.DEFAULT,
      }}>
        <div className={styles.header}>
          {/* <Title level={'2'}>Tasks</Title> */}
        </div>

        {/* 5. Add the Tab UI */}
        <div className={styles.tabs}>
          {TASK_TYPES.map((type) => (
            <button
              key={type}
              className={`${styles.tab} ${activeTab === type ? styles.active : ''}`}
              onClick={() => setActiveTab(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {status === 'loading' && <div className={styles.statusText}>Loading tasks…</div>}
        {status === 'succeeded' && (
          <div className={styles.taskList}>
            {tasks.length > 0 ? (
                tasks.map(renderCard)
            ) : (
                <div className={styles.statusText}>No tasks available for this category.</div>
            )}
          </div>
        )}
        {status === 'failed' && <div className={styles.statusText}>Error loading tasks. Please try again.</div>}
      </div>
      <BottomBar />
      <SnackBar
        open={snack.open}
        message={snack.msg}
        onClose={() => setSnack({ open: false, msg: '' })}
        duration={3000}
      />
    </>
  );
};

export default TasksScreen;