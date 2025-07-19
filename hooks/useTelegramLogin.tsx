import { useEffect, useState } from "react";
import { retrieveRawInitData, isTMA } from "@telegram-apps/sdk";
import { useAppDispatch } from "../store/hooks";
import { login } from "@/store/slice/authSlice";
import { useRouter } from "next/router";

export function useTelegramAuthLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function doLogin() {
      setLoading(true);
      try {
        const inTelegram = await isTMA();
        const initDataRaw = retrieveRawInitData();

        console.log('initDataRaw', initDataRaw)
        if (inTelegram && initDataRaw) {
          await dispatch(login({ raw: initDataRaw })).unwrap();
          router.replace("/home");
        } else {
          router.replace("/");
        }
      } catch (err) {
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }
    doLogin();
  }, [dispatch, router]);

  return loading;
}
