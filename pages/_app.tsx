import "../styles/globals.css";
import "../styles/App.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PrivyProvider } from "@privy-io/react-auth";
import store from "../store";
import Layout from "../components/layout";
import { SoundVibrationProvider } from "../utils/soundVibration";

function MyApp({ Component, pageProps }: AppProps) {

    return (

        <Provider store={store}>
            {/* <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}> */}
                <SoundVibrationProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SoundVibrationProvider>
            {/* </PrivyProvider> */}
        </Provider>
    );
}

export default MyApp;
