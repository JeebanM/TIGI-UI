import '@telegram-apps/telegram-ui/dist/styles.css';
import React from "react";
import { Root } from '../core/Root';
import Head from 'next/head';
import { useTelegramUser } from "../hooks/useTelegramUser";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { loading, user, inTelegram, error } = useTelegramUser();

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }
  if (!inTelegram) {
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <p>
          Could not detect Telegram Mini App context.<br />
          Please open this app in Telegram, or enable mock mode for development.
        </p>
      </div>
    );
  }

  if (!user || error) {
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <p>
          {error ? error : "Loading user..."}
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Folks</title>
        <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
        <meta name="description" content="Folks Finance" />
      </Head>
      <div className="app-container">
        <Root>
          {children}
        </Root>
      </div>
    </>
  );
}

