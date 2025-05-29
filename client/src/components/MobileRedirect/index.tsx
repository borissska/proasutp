import { FC, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Стандартная точка перехода для мобильных устройств

const MobileRedirect: FC = () => {
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        window.location.href = "https://www.asutp.pro/";
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

export default MobileRedirect;
