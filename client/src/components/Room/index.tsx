import { FC, useRef, useState, Fragment, useEffect } from "react";
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
  const handleObjectClick: ObjectClickHandler = (
    title: string,
    description: string,
    position: Vector3,
    width: number
  ) => {
    setInfoCard({
      visible: true,
      title,
      description,
      position,
      width,
    });
  };

  // Обработчик наведения
  const handleObjectHover: ObjectHoverHandler = (hovered: boolean) => {
    // Используем функцию setIsHovered из контекста
    setIsHovered(hovered);
  };

  // Простой обработчик для невзаимодействующих частей комнаты
  const handleBackgroundClick = () => {
    // Сбрасываем состояние при клике на невзаимодействующие части
    resetHoverState();
    // Закрываем информационную карточку
    setInfoCard((prev) => ({ ...prev, visible: false }));
  };

  return (
    <group position={[0, 0, 0]}>
      <DistributionBox
        position={[-3.2, -1, 10]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.02}
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
          width={320}
        />
      )}

      <Table />
      <Model />
      <ElectricityBox />
      <Phone
        position={[-3.31, 2, -12]}
        rotation={[0, Math.PI / 2, 0]}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
        name='phone'
      />
      <Box
        position={[2.5, 0.19, 4.7]}
        rotation={[0, 0, 0]}
        handleObjectClick={handleObjectClick}
        handleObjectHover={handleObjectHover}
        name='box'
      />

      {/* Потолочные светильники вдоль коридора */}
      {[-11, 0, 10.5].map((z) => (
        <Fragment key={z}>
          {/* Светильники на левой стене */}
          <AlarmLight position={[-3.4, 2, z]} rotation={[0, Math.PI / 2, 0]} />
        </Fragment>
      ))}

      {/* Комната и её содержимое */}
      <group position={[0, 0, 0]} onClick={handleBackgroundClick} ref={sceneRef}>
        <RoomModel />

        {/* Размещаем логотип в комнате в нескольких местах */}
        <Logo position={[0, 2.15, -13.37]} rotation={[0, 0, 0]} />
        <Logo position={[0, 2.15, 13.37]} rotation={[0, Math.PI, 0]} />
      </group>
    </group>
  );
};

export default Room;
