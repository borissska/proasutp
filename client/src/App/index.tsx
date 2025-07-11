import { FC } from "react";
import { withProviders } from "./providers";
import { MobileRedirect } from "../features/mobile-redirect";
import { MainPage } from "../pages/main";
import "./styles/index.scss";

const App: FC = () => {
  return (
    <div className='app'>
      <MobileRedirect />
      <MainPage />
    </div>
  );
};

export default withProviders(App);
