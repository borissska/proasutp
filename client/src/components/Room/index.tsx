import { FC, useRef, useState, Fragment, useEffect, useCallback } from "react";
import RoomModel from "./Content/RoomModel";
import Logo from "./Content/Logo";
import { Vector3, Mesh, MeshStandardMaterial, Group } from "three";
import AlarmLight from "./Content/AlarmLight";
import InfoCard from "./Content/InfoCard";
import { InfoCardState, ObjectClickHandler, ObjectHoverHandler } from "./Room.props";
import DistributionBox from "./Content/DistributionBox";
import Table from "./Content/Table";
import Box from "./Content/Box";
import Model from "./Content/Model";
import ElectricityBox from "./Content/ElecticityBox";
import Phone from "./Content/Phone";
import { useHover } from "../../context/HoverContext";
import WallPaper from "./Content/WallPaper";
import Notepad from "./Content/Notepad";
import { useGLTF } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// В начале файла
const loader = new OBJLoader();
loader.load("/WallPaper/model.obj", (obj) => {
  // Предварительная загрузка
});

// Основной компонент
const Room: FC = () => {
  // Состояние для информационной карточки
  const [infoCard, setInfoCard] = useState<InfoCardState>({
    visible: false,
    title: "",
    description: "",
    position: new Vector3(),
    width: 0,
  });

  const sceneRef = useRef<Group | null>(null);
  // Используем контекст для состояния наведения
  const { setIsHovered, resetHoverState } = useHover();

  // Обработчик клика по объекту
  const handleObjectClick: ObjectClickHandler = useCallback(
    (title: string, description: string, position: Vector3, width: number) => {
      setInfoCard({
        visible: true,
        title,
        description,
        position,
        width,
      });
    },
    []
  );

  // Обработчик наведения - мемоизируем функцию для предотвращения ненужных перерендеров
  const handleObjectHover: ObjectHoverHandler = useCallback(
    (hovered: boolean) => {
      setIsHovered(hovered);
    },
    [setIsHovered]
  );

  // Простой обработчик для невзаимодействующих частей комнаты
  const handleBackgroundClick = useCallback(() => {
    resetHoverState();
    setInfoCard((prev) => ({ ...prev, visible: false }));
  }, [resetHoverState]);

  return (
    <group position={[0, 0, 0]}>
      <Box
        position={[1.7, 0.325, 5]}
        rotation={[0, Math.PI / 2, 0]}
        name={"Box"}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
      />

      <DistributionBox
        position={[-2.52, -1.1, 7.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.018}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
      />

      {/* Информационная карточка */}
      {infoCard.visible && (
        <InfoCard
          title={infoCard.title}
          description={infoCard.description}
          position={infoCard.position}
          visible={true}
          width={infoCard.width}
        />
      )}

      <Table position={[1.7, 0, 7]} rotation={[0, Math.PI / 2, 0]} />
      <Model
        position={[2.15, 0.98, 8.25]}
        rotation={[0, Math.PI / 2, 0]}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
        name='model'
      />
      {/* <ElectricityBox /> */}
      <Phone
        position={[-2.6, 1.7, -9.2]}
        rotation={[0, Math.PI / 2, 0]}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
        name='phone'
      />
      <WallPaper
        position={[-1.9, -2.25, 1]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
        name='box'
      />
      <Notepad
        position={[-2.6, 1.6, -1.5]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
        name='notepad'
      />

      {/* Потолочные светильники вдоль коридора */}
      {[-6, 0, 8].map((z) => (
        <Fragment key={z}>
          {/* Светильники на левой стене */}
          <AlarmLight position={[-2.7, 1.6, z]} rotation={[0, Math.PI / 2, 0]} />
        </Fragment>
      ))}

      {/* Комната и её содержимое */}
      <group position={[0, 0, 0]} onClick={handleBackgroundClick} ref={sceneRef}>
        <RoomModel />

        {/* Размещаем логотип в комнате в нескольких местах */}
        <Logo position={[0, 1.57, -10.4]} rotation={[0, 0, 0]} />
        <Logo position={[0, 1.57, 10.4]} rotation={[0, Math.PI, 0]} />
      </group>
    </group>
  );
};

export default Room;
