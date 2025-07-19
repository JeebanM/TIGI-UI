'use client';

import { backButton, closingBehavior, viewport } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean
}>) {

  viewport.expand();
  closingBehavior.enableConfirmation();
  
  const router = useRouter();

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    const unsubscribe = backButton.onClick(() => {
      router.back();
    });


    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}