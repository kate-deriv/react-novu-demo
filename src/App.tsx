import React from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import PurchaseButton from "./components/PurchaseButton";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header title="Novu integration example" />
      <Navigation />
      <main className={styles.mainContent}>
        <PurchaseButton />
      </main>
    </div>
  );
};

export default App;
