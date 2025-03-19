import React from "react";
import styles from "./App.module.css";
import NovuSection from "./components/NovuSection/NovuSection";
import CustomSection from "./components/CustomSection/CustomSection";
import CustomWithNovuHooks from "./components/CustomWithNovuHooks/CustomWithNovuHooks";
import { NovuProvider } from "@novu/react";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Custom Application Components */}
      <CustomSection />

      {/* Visual Divider */}
      <div className={styles.divider} />

      {/* Novu Integration Component */}
      <NovuSection />

      {/* Visual Divider */}
      <div className={styles.divider} />

      {/* Custom Component with Novu Hooks */}
      <NovuProvider subscriberId="1" applicationIdentifier="1atQvhQrjUok">
        <CustomWithNovuHooks />
      </NovuProvider>

      {/* Visual Divider */}
      <div className={styles.divider} />
    </div>
  );
};

export default App;
