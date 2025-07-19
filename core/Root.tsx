'use client';

import { type PropsWithChildren, useEffect } from 'react';
import {
    hapticFeedback,
    initData,
    miniApp,
    useLaunchParams,
    useSignal,
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { useTelegramMock } from '../hooks/useTelegramMock';
import { useDidMount } from '../hooks/useDidMount';
import { useClientOnce } from '../hooks/useClientOnce';
import { initApp } from './init';

function RootInner({ children }: PropsWithChildren) {

    const useTGMOCK = process.env.NEXT_PUBLIC_MOCK_TG === "true"

    console.log('useTGMOCK--->', useTGMOCK)
    // Mock Telegram environment in development mode if needed.
    if ( useTGMOCK ) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useTelegramMock();
    }

    const lp = useLaunchParams();
    // const debug = isDev ;

    // Initialize the library.
    useClientOnce(() => {
        initApp();
    });

    const isDark = useSignal(miniApp.isDark);
    const initDataUser = useSignal(initData.user);

    console.log('initDataUser', initDataUser)
    // Set the user locale.
    useEffect(() => {
        initDataUser;
        hapticFeedback.isSupported();
    }, [initDataUser]);

    return (
        <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
            <AppRoot
                appearance={isDark ? 'dark' : 'light'}
                // platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
            >
                {children}
            </AppRoot>
         </TonConnectUIProvider>
    );
}

export function Root(props: PropsWithChildren) {
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of
    // the Server Side Rendering. That's why we are showing loader on the server
    // side.
    const didMount = useDidMount();

    return didMount ? (
        <ErrorBoundary fallback={() => 'Try again'}>
            <RootInner {...props} />
        </ErrorBoundary>
    ) : <div>Loading</div>;
}
