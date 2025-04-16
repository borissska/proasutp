import { Suspense, FC, useEffect, useRef, useState, Fragment } from "react";
import RoomModel from "./Content/RoomModel";
import RoomFallback from "./Content/RoomFallback";
import ErrorBoundary from "./Content/RoomError";
import Logo from "./Content/Logo";
import { PointerLockControls, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, Mesh, MeshStandardMaterial, Group } from "three";
import AlarmLight from "./Content/AlarmLight";
import InfoCard from "./Content/InfoCard";
import { InfoCardState } from "./Room.props";
import Environment from "../Environment";
import DistributionBox from "./Content/DistributionBox";
import Table from "./Content/Table";
import Box from "./Content/Box";
import Model from "./Content/Model";
import ElectricityBox from "./Content/ElecticityBox";

// Основной компонент
const Room: FC = () => {
  // Состояние для информационной карточки
  const [infoCard, setInfoCard] = useState<InfoCardState>({
    visible: false,
    title: "",
    description: "",
    position: new Vector3(),
  });

  const sceneRef = useRef<Group | null>(null);

  // Обработчик клика по объекту
  const handleObjectClick = (title: string, description: string, position: Vector3) => {
    setInfoCard({
      visible: true,
      title,
      description,
      position,
    });
  };

  // Обработчик наведения на объекты
  const handleObjectHover = (title: string) => {
    if (!sceneRef.current) return;

    const hoveredObject = sceneRef.current.getObjectByName(title);

    if (hoveredObject instanceof Mesh) {
      // Сохраняем оригинальный материал
      const originalMaterial = hoveredObject.material;

      // Создаем новый материал с подсветкой
      const highlightMaterial = new MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.5,
      });

      // Применяем подсветку
      hoveredObject.material = highlightMaterial;

      // Возвращаем оригинальный материал при уходе курсора
      const handlePointerLeave = () => {
        hoveredObject.material = originalMaterial;
        hoveredObject.removeEventListener("pointerleave", handlePointerLeave);
      };

      hoveredObject.addEventListener("pointerleave", handlePointerLeave);
    }
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
        />
      )}

      <Table />
      <Model />
      <ElectricityBox />
      <Box
        position={[2.5, 0.19, 4.7]}
        rotation={[0, 0, 0]}
        handleObjectClick={handleObjectClick}
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
      <group
        position={[0, 0, 0]}
        onClick={() => {
          // Закрываем информационную карточку при клике на пустое пространство
          setInfoCard((prev) => ({ ...prev, visible: false }));
        }}
        ref={sceneRef}
      >
        <RoomModel />

        {/* Размещаем логотип в комнате в нескольких местах */}
        <Logo position={[0, 2.15, -13.37]} rotation={[0, 0, 0]} />
        <Logo position={[0, 2.15, 13.37]} rotation={[0, Math.PI, 0]} />
      </group>
    </group>
  );
};

export default Room;
