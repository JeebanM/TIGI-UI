import { useEffect, useState } from "react";
import { isTMA, retrieveRawInitData } from "@telegram-apps/sdk";
import { useRouter } from "next/router";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "@/store/slice/userSlice";
import { telegramLogin } from "@/services/authApi";
import API from "@/services/apiService";
import { useTelegramMock } from "@/hooks/useTelegramMock";

export function useTelegramUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUserState] = useState<any | null>(null);
  const [inTelegram, setInTelegram] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useTelegramMock();

  useEffect(() => {
    let cancelled = false;
    async function authenticate() {
      setLoading(true);
      setError(null);
      try {
        const telegramStatus = await isTMA();
        setInTelegram(telegramStatus);

        const initDataRaw = retrieveRawInitData();

        console.log('initDataRaw',initDataRaw)

        if ((telegramStatus || process.env.NODE_ENV === "development") && initDataRaw) {
          // 1. Login via Telegram (fetch token + user)
          const res = await telegramLogin(initDataRaw);

          console.log('Res', res)
          const { accessToken, user } = res.data;

          if (!cancelled) {
            dispatch(setUser({ accessToken, user }));
            setUserState(user);
            // Now you have the token in Redux and localStorage!
          }
        } else {
          if (!cancelled) {
            setError("Not in Telegram context or missing initData.");
            setUserState(null);
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          setError("Login failed: " + (e?.response?.data?.error || e.message));
          setUserState(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    authenticate();
    return () => {
      cancelled = true;
    };
  }, [dispatch, router]);

  return { user, loading, inTelegram: inTelegram || process.env.NODE_ENV === "development", error };
}
