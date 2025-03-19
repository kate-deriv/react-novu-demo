import React, { useState } from "react";
import Novu from "../../novu/Novu";
import styles from "./NovuSection.module.css";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { Language } from "../../types/Language";

const NovuSection: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.RU);

  return (
    <>
      <div className={styles.novuSection}>
        <h2 className={styles.title}>Novu component</h2>
        <Novu currentLanguage={currentLanguage} />
      </div>
      <LanguageToggle
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
    </>
  );
};

export default NovuSection;
