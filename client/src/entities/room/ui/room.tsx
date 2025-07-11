import { FC, useEffect } from "react";
import { InfoCard } from "../../../shared/ui";
import { ROOM_CONFIG } from "../model/constants";
import { useLoading } from "../../../app/providers/LoadingProvider";
import { useInfoCardManager } from "../../../shared/lib/hooks/use-info-card-manager";
import { setGlobalInfoCardManager } from "../../../shared/lib/hocs/with-interactive-model/with-interactive-model-collision";
import {
  Box,
  DistributionBox,
  Boilerhouse,
  Notepad,
  Phone,
  Table,
  WallBox,
  AlarmLight,
  Logo,
  RoomModel,
} from "./models";
import { toEuler, toVector3 } from "../../../shared/types/three";

export const Room: FC = () => {
  const { isComplete } = useLoading();
  const { currentCard, showInfoCard, hideInfoCard } = useInfoCardManager();

  // Регистрируем глобальный менеджер для использования в коллизионной системе
  useEffect(() => {
    setGlobalInfoCardManager({ showInfoCard, hideInfoCard });
  }, [showInfoCard, hideInfoCard]);

  return (
    <>
      {/* RoomModel отрисовывается всегда - он контролирует готовность сцены */}
      <RoomModel {...ROOM_CONFIG.ROOM} />

      {/* Остальные модели и UI показываем только после завершения загрузки */}
      {isComplete && (
        <>
          {/* Интерактивные модели */}
          <Box
            position={toVector3(ROOM_CONFIG.BOX.position)}
            rotation={toEuler(ROOM_CONFIG.BOX.rotation)}
            scale={ROOM_CONFIG.BOX.scale}
            name={ROOM_CONFIG.BOX.name}
          />
          <DistributionBox
            position={toVector3(ROOM_CONFIG.DISTRIBUTION_BOX.position)}
            rotation={toEuler(ROOM_CONFIG.DISTRIBUTION_BOX.rotation)}
            scale={ROOM_CONFIG.DISTRIBUTION_BOX.scale}
            name={ROOM_CONFIG.DISTRIBUTION_BOX.name}
          />
          <Boilerhouse
            position={toVector3(ROOM_CONFIG.BOILERHOUSE.position)}
            rotation={toEuler(ROOM_CONFIG.BOILERHOUSE.rotation)}
            scale={ROOM_CONFIG.BOILERHOUSE.scale}
            name={ROOM_CONFIG.BOILERHOUSE.name}
          />
          <Notepad
            position={toVector3(ROOM_CONFIG.NOTEPAD.position)}
            rotation={toEuler(ROOM_CONFIG.NOTEPAD.rotation)}
            scale={ROOM_CONFIG.NOTEPAD.scale}
            name={ROOM_CONFIG.NOTEPAD.name}
          />
          <Phone
            position={toVector3(ROOM_CONFIG.PHONE.position)}
            rotation={toEuler(ROOM_CONFIG.PHONE.rotation)}
            scale={ROOM_CONFIG.PHONE.scale}
            name={ROOM_CONFIG.PHONE.name}
          />
          <WallBox
            position={toVector3(ROOM_CONFIG.WALL_BOX.position)}
            rotation={toEuler(ROOM_CONFIG.WALL_BOX.rotation)}
            scale={ROOM_CONFIG.WALL_BOX.scale}
            name={ROOM_CONFIG.WALL_BOX.name}
          />

          {/* Неинтерактивные модели */}
          <Table {...ROOM_CONFIG.TABLE} />
          <AlarmLight {...ROOM_CONFIG.ALARM_LIGHT_FRONT} />
          <AlarmLight {...ROOM_CONFIG.ALARM_LIGHT_BACK} />
          <Logo {...ROOM_CONFIG.LOGO_FRONT} />
          <Logo {...ROOM_CONFIG.LOGO_BACK} />

          {/* Информационная карточка - управляется автоматически */}
          {currentCard && <InfoCard {...currentCard} visible={true} />}
        </>
      )}
    </>
  );
};
