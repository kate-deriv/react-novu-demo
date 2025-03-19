import React from "react";
import { Inbox } from "@novu/react";
import styles from "./Novu.module.css";
import { localization } from "./config/localization";
import { Language } from "../types/Language";

const Novu = ({ currentLanguage }: { currentLanguage: Language }) => {
  return (
    <div className={styles.novu}>
      <Inbox
        applicationIdentifier="1atQvhQrjUok"
        subscriberId="1"
        localization={localization[currentLanguage]}
      />
    </div>
  );
};

export default Novu;
