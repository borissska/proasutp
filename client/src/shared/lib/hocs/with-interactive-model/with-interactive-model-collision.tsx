import { forwardRef, useRef, ComponentType, useState, useEffect } from "react";
import { Group, Box3, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { handleMaterials } from "./lib/handle-materials";
import { useEventThrottle } from "./lib/use-event-throttle";
import { WithInteractionProps, InteractiveModelOptions } from "./types";
import { BaseModelProps } from "../../../../entities/room/model/types";
import { useHover } from "../../../../app/providers/HoverProvider";

// Глобальный менеджер информационных карточек
let globalInfoCardManager: {
  showInfoCard: (modelName: string) => void;
  hideInfoCard: () => void;
} | null = null;

export const setGlobalInfoCardManager = (manager: {
  showInfoCard: (modelName: string) => void;
  hideInfoCard: () => void;
}) => {
  globalInfoCardManager = manager;
  console.log("🔧 Global info card manager registered");
};

/**
 * HOC для создания интерактивных 3D-объектов с невидимой коллизионной моделью (как в играх)
 * Автоматически управляет информационными карточками по имени модели
 */
export const withInteractiveModelCollision = <P extends Partial<BaseModelProps>>(
  WrappedComponent: ComponentType<P>,
  options: InteractiveModelOptions = {}
) => {
  const {
    throttleTime = 80,
    enableEmissive = true,
    emissiveIntensity = 0.5,
    collisionBoxSize,
    collisionBoxOffset = [0, 0, 0],
  } = options;

  const InteractiveModel = forwardRef<Group, P & WithInteractionProps>((props, ref) => {
    const { onHover, onClick, ...componentProps } = props;
    const groupRef = useRef<Group | null>(null);
    const modelRef = useRef<Group | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [collisionData, setCollisionData] = useState<{
      size: [number, number, number];
      position: [number, number, number];
    } | null>(null);
    const canProcessEvent = useEventThrottle(throttleTime);
    const { setIsHovered: setGlobalHover } = useHover();

    // Обработчики событий
    const handleClick = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      console.log(`🖱️ COLLISION CLICK on ${componentProps.name}`);
      console.log("🖱️ Global manager:", globalInfoCardManager);

      // Автоматически показываем информационную карточку по имени модели
      if (globalInfoCardManager && componentProps.name) {
        console.log(`🖱️ Calling showInfoCard for: ${componentProps.name}`);
        globalInfoCardManager.showInfoCard(componentProps.name);
      } else {
        console.error(`❌ No global manager or no component name`);
      }

      // Также вызываем пользовательский onClick если есть
      if (onClick) {
        onClick();
      }
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!canProcessEvent() && isHovered) return;

      console.log(`👆 Collision hover over ${componentProps.name}`);
      setIsHovered(true);
      setGlobalHover(true); // Включаем мигание курсора

      // Применяем эффекты к основной модели
      if (enableEmissive && modelRef.current) {
        handleMaterials(modelRef.current, true, emissiveIntensity);
      }

      if (onHover) {
        onHover(true);
      }
    };

    const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!canProcessEvent() && !isHovered) return;

      console.log(`👆 Collision hover out ${componentProps.name}`);
      setIsHovered(false);
      setGlobalHover(false); // Выключаем мигание курсора

      if (globalInfoCardManager && componentProps.name) {
        globalInfoCardManager.hideInfoCard();
      }

      // Убираем эффекты с основной модели
      if (enableEmissive && modelRef.current) {
        handleMaterials(modelRef.current, false, emissiveIntensity);
      }

      if (onHover) {
        onHover(false);
      }
    };

    // Отслеживание загрузки модели
    useEffect(() => {
      if (!modelRef.current) return;

      const checkModelInterval = setInterval(() => {
        if (modelRef.current && modelRef.current.children.length > 0) {
          setModelLoaded(true);
          clearInterval(checkModelInterval);
        }
      }, 100);

      return () => clearInterval(checkModelInterval);
    }, []);

    // Вычисление параметров коллизии после загрузки модели
    useEffect(() => {
      if (!modelLoaded || !modelRef.current) return;

      console.log(`🔧 Calculating collision for ${componentProps.name}`);

      const box = new Box3().setFromObject(modelRef.current);
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());

      console.log(`📍 Model ${componentProps.name} - Center:`, center, "Size:", size);

      let boxSize: [number, number, number];
      if (collisionBoxSize) {
        boxSize = collisionBoxSize;
      } else {
        if (size.x === 0 || size.y === 0 || size.z === 0) {
          boxSize = [2, 2, 2];
        } else {
          boxSize = [size.x * 1.05, size.y * 1.05, size.z * 1.05];
        }
      }

      const finalPosition: [number, number, number] = [
        center.x + collisionBoxOffset[0],
        center.y + collisionBoxOffset[1],
        center.z + collisionBoxOffset[2],
      ];

      setCollisionData({
        size: boxSize,
        position: finalPosition,
      });

      console.log(`✅ Collision data set for ${componentProps.name}:`, {
        size: boxSize,
        position: finalPosition,
      });
    }, [modelLoaded, collisionBoxSize, collisionBoxOffset, componentProps.name]);

    return (
      <group ref={groupRef}>
        {/* Основная модель */}
        <group ref={modelRef}>
          <WrappedComponent {...(componentProps as any)} ref={ref} />
        </group>

        {/* Коллизионная модель - создаем через JSX для гарантированной работы событий */}
        {collisionData && (
          <mesh
            position={collisionData.position}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerLeave={handlePointerOut}
            userData={{
              isCollisionBox: true,
              isInteractive: true,
              modelName: componentProps.name,
              parentModel: componentProps.name,
            }}
          >
            <boxGeometry args={collisionData.size} />
            <meshBasicMaterial
              transparent
              opacity={0}
              color={0x00ff00}
              wireframe={true}
            />
          </mesh>
        )}
      </group>
    );
  });

  InteractiveModel.displayName = `InteractiveCollision(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return InteractiveModel;
};
