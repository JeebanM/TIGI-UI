// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { InitData } from '@telegram-apps/sdk';
// import { retrieveLaunchParams } from '@telegram-apps/sdk';
// import { useAppDispatch } from '@/store/hooks';
// import { login } from '@/store/slice/authSlice';
// import { validateTelegramWebAppData } from '@/lib/telegramAuth';
// import styles from '@/styles/splash.module.css';
// import { useTelegramMock } from '@/hooks/useTelegramMock';

// const Splash = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const init = async () => {
//       try {
//         // const { initDataRaw } = retrieveLaunchParams();
//         let initDataRaw = retrieveLaunchParams()?.initDataRaw;
//         if (!initDataRaw && process.env.NODE_ENV === 'development') {
//           // initDataRaw =
//           //   "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Dev%22%2C%22last_name%22%3A%22Test%22%2C%22username%22%3A%22devtest%22%2C%22photo_url%22%3A%22https%3A%2F%2Fexample.com%2Favatar.jpg%22%7D&auth_date=1736409902&hash=fakehash";
//           initDataRaw = "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=-9019086117643313246&chat_type=sender&auth_date=1736409902&signature=FNWSy6kv5n4kkmYYmfTbrgRtswTvwXgHTRWBVjp-YOv2srtMFSYCWZ9nGr_PohWZeWcooFo_oQgsnTJge3JdBA&hash=4c710b1d446dd4fd301c0efbf7c31627eca193a2e657754c9e0612cb1eb71d90"
//         }
//         console.log('📦 initDataRaw:', initDataRaw);

//         // const result = validateTelegramWebAppData(initDataRaw);
//         // console.log('✅ Validation result:', result);

//         // if (!result.valid) {
//         //   console.log(' Telegram auth failed:', result.error);
//         // //   return router.replace('/error');
//         // }

//         const response = await dispatch(login({ raw: initDataRaw }));

//         console.log('response', response)

//         if (login.fulfilled.match(response)) {
//           router.replace('/');
//         } else {
//           router.replace('/error');
//         }
//       } catch (err) {
//         console.error('⚠️ Init error', err);
//         router.replace('/error');
//       }
//     };

//     init();
//   }, [dispatch, router]);

//   return (
//     <div className={styles.container}>
//       <h2>Loading Folks Mini App…</h2>
//     </div>
//   );
// };

// export default Splash;
import React from 'react';

const SplashPage = () => {
  return <div>This is the Splash page</div>;
};

export default SplashPage;
