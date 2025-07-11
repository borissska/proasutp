import { FC, useEffect } from "react";
import { MOBILE_BREAKPOINT, MOBILE_REDIRECT_URL } from "../model/constants";

export const MobileRedirect: FC = () => {
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        window.location.href = MOBILE_REDIRECT_URL;
      }
    };

    // Проверяем размер экрана сразу при загрузке
    checkScreenSize();

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", checkScreenSize);

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return null; // Компонент не рендерит ничего
};
