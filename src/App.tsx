import React from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import styles from "./App.module.css";

function App() {
  const handlePurchase = () => {
    // Handle purchase action
    console.log("Purchase Accumulators contract clicked");
  };

  return (
    <div className={styles.container}>
      <Header title="Novu Integration Example" />
      <Navigation />
      <main className={styles.mainContent}>
        <Button variant="primary" onClick={handlePurchase}>
          Purchase Accumulators Contract
        </Button>
      </main>
    </div>
  );
}

export default App;
