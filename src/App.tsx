import React from "react";
import styles from "./App.module.css";
import NovuSection from "./components/NovuSection/NovuSection";
import CustomSection from "./components/CustomSection/CustomSection";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Custom Application Components */}
      <CustomSection />

      {/* Visual Divider */}
      <div className={styles.divider} />

      {/* Novu Integration Component */}
      <NovuSection />
    </div>
  );
};

export default App;
