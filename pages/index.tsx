import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTelegramUser } from "../hooks/useTelegramUser";

export default function HomePage() {
  const { user, loading, inTelegram } = useTelegramUser();
  const router = useRouter();

  
  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }

  console.log('user', user)
  if (!inTelegram) {
    return (
      <div className="ctaContainer">
        <h1>Welcome to Memeonaire!</h1>
        <p>The ultimate game for crypto and fun enthusiasts!</p>
        <a
          href="https://t.me/shivamdemo_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="ctaButton"
        >
          Open in Telegram
        </a>
      </div>
    );
  }

  // If no user, fallback to login or info
  return null;
}

