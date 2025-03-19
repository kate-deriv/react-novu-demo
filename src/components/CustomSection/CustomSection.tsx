import React from 'react';
import Header from '../Header';
import Navigation from '../Navigation';
import PurchaseButton from '../PurchaseButton';
import styles from './CustomSection.module.css';

const CustomSection: React.FC = () => {
  return (
    <div className={styles.customSection}>
      <Header title="Custom components + Rest API" />
      <Navigation />
      <main className={styles.mainContent}>
        <PurchaseButton />
      </main>
    </div>
  );
};

export default CustomSection;
