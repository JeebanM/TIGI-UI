import {
    backButton,
    viewport,
    themeParams,
    miniApp,
    initData,
    init ,
    hapticFeedback,
    closingBehavior,
    shareMessage
  } from '@telegram-apps/sdk-react';
  
  /**
   * Initializes the application and configures its dependencies.
   */
  export function initApp(): void {
    // Set @telegram-apps/sdk-react debug mode.
    // $debug.set(debug);
  
    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    init();
  
    // Mount all components used in the project.
    hapticFeedback.isSupported();
    backButton.isSupported() && backButton.mount();
    // miniApp.mount().then(() => {
    //   miniApp.bindCssVars();
    // });
    // themeParams.mount().then(() => {
    //   themeParams.bindCssVars();
    // });
    closingBehavior.mount();
    initData.restore();
    // void viewport.mount().then(() => {
    //   viewport.expand();
    //   viewport.bindCssVars();
    // }).catch(e => {
    //   console.error('Something went wrong mounting the viewport', e);
    // });
    // Define components-related CSS variables.

  }