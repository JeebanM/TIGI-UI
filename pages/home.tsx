import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Confetti from 'react-confetti'

import { RootState } from '@/store'
import { claimCheckIn, setStreak } from '@/store/slice/checkInSlice'
import { getTodayKey } from '@/core/helper'

import { FolksTapper } from '@/components/Tapper'
import EnergyBar from '@/components/Home/EnergyBar'
import SnackBar from '@/components/common/SnackBar'
import BottomBar from '@/components/Bottombar'

import styles from '@/styles/Home.module.css'
import ReferralModal from '@/components/common/modal/ReferralModal'
import DailyRewardModal from '@/components/common/modal/DailyRewardModal'
import { doTap } from '@/store/slice/gameSlice'
import { useTheme } from '@/theme/ThemeContext'

export default function Home() {
  const dispatch = useDispatch()
  const { colors } = useTheme()

  // 1) Grab the user object from the correct slice
  const user = useSelector((s: RootState) => s.user.user)
  // 2) Grab the daily-checkin state
  const checkIn = useSelector((s: RootState) => s.checkIn)

  // Energy always local:
  const [energy, setEnergy] = useState(500)
  // Points: derive from Redux user, keep synced
  const [points, setPoints] = useState(user?.points || 0)

  const [showConfetti, setShowConfetti] = useState(false)
  const [snack, setSnack] = useState({ open: false, msg: '' })

  // Separate modals
  const [shareOpen, setShareOpen] = useState(false)
  const [rewardOpen, setRewardOpen] = useState(false)

  useEffect(() => {
    const referralModalClosed = sessionStorage.getItem('referralModalClosed');
    if (!referralModalClosed) {
      setShareOpen(true);
    }
  }, []);

  useEffect(() => {
    if (user?.streak !== undefined) {
      dispatch(setStreak(user.streak));
    }
  }, [user, dispatch]);

  // Sync points whenever user.points changes
  useEffect(() => {
    if (user?.points != null) {
      setPoints(user.points)
    }
  }, [user?.points])

  // Open daily-reward if not claimed today
  useEffect(() => {
    const today = getTodayKey()
    if (localStorage.getItem('dailyCheckInDate') !== today) {
      setRewardOpen(true)
    }
  }, [])

  // Reset energy at midnight
  useEffect(() => {
    const msUntilMidnight =
      new Date().setHours(24, 0, 0, 0) - Date.now()
    const timer = setTimeout(() => setEnergy(500), msUntilMidnight)
    return () => clearTimeout(timer)
  }, [])

  const handleTap = async () => {
    if (energy <= 0) return
    try {
      const action = await dispatch(doTap(1) as any)
      const { newBalance } = action.payload
      setPoints(newBalance)
      setEnergy(e => e - 1)
    } catch {
      setSnack({ open: true, msg: "Tap failed, try again!" })
    }
  }

  const handleClaimDaily = async () => {
    try {
      const result = await dispatch(claimCheckIn() as any)
      setShowConfetti(true)
      setSnack({
        open: true,
        msg: `🎉 Day ${result.streak}! +${result.reward} points!`,
      })
      localStorage.setItem('dailyCheckInDate', getTodayKey())
    } catch {
      setSnack({ open: true, msg: 'Check-in failed, try later.' })
    } finally {
      setRewardOpen(false)
      setTimeout(() => setShowConfetti(false), 4000)
    }
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: colors.base[100].DEFAULT,
        color: colors.base.content.DEFAULT,
      }}
    >
      {/* Top bar */}
      <div className={styles.topBar}>
        <h2 className={styles.welcome}>
          Welcome, {user?.first_name || user?.username || 'Guest'}!
        </h2>
        <button
          className={styles.aboutBtn}
          onClick={() => window.open('https://folks.finance', '_blank')}
        >
          About Folks
        </button>
      </div>

      {/* Referral (Share) Modal */}
      <ReferralModal
        isOpen={shareOpen}
        onClose={() => {
          setShareOpen(false);
          sessionStorage.setItem('referralModalClosed', 'true');
        }}
        referralCode={user?.referral_code || ''}
      />

      {/* Tapper */}
      <div className={styles.tapperCard}>
        <FolksTapper
          canIClickPlease={energy > 0}
          clickValue={1}
          handleClick={handleTap}
        />
      </div>

      {/* Energy & Points */}
      <div className={styles.energyContainer}>
        <EnergyBar current={energy} max={500} />
        <div className={styles.energyLabel}>
           Points: {points}
        </div>
      </div>

      {/* Confetti & Snack */}
      {showConfetti && <Confetti />}
      <SnackBar
        open={snack.open}
        message={snack.msg}
        onClose={() => setSnack({ open: false, msg: '' })}
        duration={3500}
      />

      {/* Bottom nav */}
      <BottomBar />

      {/* Daily Reward Modal */}
      <DailyRewardModal
        isOpen={rewardOpen}
        onClose={() => setRewardOpen(false)}
        onClaim={handleClaimDaily}
        currentDay={checkIn.streak + 1}
        claimed={checkIn.status === 'succeeded'}
      />
    </div>
  )
}
