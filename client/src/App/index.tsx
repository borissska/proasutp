import React from "react";
import MainPage from "../pages/MainPage";
import styles from "./App.module.scss";
import MobileRedirect from "../components/MobileRedirect";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <MobileRedirect />
      <MainPage />
    </div>
  );
};

export default App;
