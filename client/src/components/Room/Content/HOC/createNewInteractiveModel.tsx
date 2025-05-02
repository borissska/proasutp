import { forwardRef, useRef, ComponentType, useState, useEffect } from "react";
import { Object3D, Mesh, Material, MeshStandardMaterial, Group } from "three";
import { ThreeEvent } from "@react-three/fiber";

interface WithInteractionProps {
  onClick?: (object: Object3D | null) => void;
  onHover?: (object: Object3D | null) => void;
}

/**
 * HOC для создания интерактивных 3D-объектов без визуальных эффектов при наведении
 * @param WrappedComponent Компонент, который нужно сделать интерактивным
 */
export const createInteractiveModel = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // Компонент с эффектами интерактивности
  const InteractiveModel = forwardRef<Object3D, React.PropsWithoutRef<P & WithInteractionProps>>(
    (props, ref) => {
      const { onHover, onClick, ...componentProps } = props;
      const objectRef = useRef<Object3D | null>(null);
      const [isHovered, setIsHovered] = useState(false);
      const lastEventTimeRef = useRef(0);

      // Минимальное время между событиями (мс)
      const EVENT_THROTTLE = 80;

      // Функция для обхода всех материалов и сброса настроек свечения
      const resetEmissiveEffects = () => {
        if (!objectRef.current) return;

        objectRef.current.traverse((child) => {
          if (child instanceof Mesh && child.material) {
            // Для одного материала
            if (!Array.isArray(child.material)) {
              if (child.material instanceof MeshStandardMaterial) {
                child.material.emissiveIntensity = 0;
              }
            }
            // Для массива материалов
            else {
              child.material.forEach((mat) => {
                if (mat instanceof MeshStandardMaterial) {
                  mat.emissiveIntensity = 0;
                }
              });
            }
          }
        });
      };

      // Функция для установки обработчиков на все дочерние элементы
      const setupInteractivity = () => {
        if (!objectRef.current) return;

        // Обходим все дочерние элементы
        objectRef.current.traverse((child) => {
          if (child instanceof Mesh || child instanceof Group) {
            // Делаем каждый элемент интерактивным, если он еще не был настроен
            if (!child.userData.__interactive) {
              child.userData.__interactive = true;

              // Если это меш, убеждаемся, что raycast вызывается правильно
              if (child instanceof Mesh) {
                const originalRaycast = child.raycast;
                child.raycast = function (raycaster, intersects) {
                  originalRaycast.call(this, raycaster, intersects);
                };
              }
            }
          }
        });
      };

      // При монтировании и размонтировании компонента
      useEffect(() => {
        resetEmissiveEffects();
        setupInteractivity();

        return () => {
          // Принудительно сбрасываем состояние наведения при размонтировании
          if (onHover && isHovered) {
            onHover(null);
          }
        };
      }, [onHover, isHovered]);

      // Обработчик для события клика
      const handleClick = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        if (onClick) {
          onClick(objectRef.current);
        }
      };

      // Функция для проверки, можно ли обрабатывать событие (предотвращение частых вызовов)
      const canProcessEvent = () => {
        const now = Date.now();
        if (now - lastEventTimeRef.current >= EVENT_THROTTLE) {
          lastEventTimeRef.current = now;
          return true;
        }
        return false;
      };

      // Обработчик для наведения мыши
      const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        // Пропускаем слишком частые события
        if (!canProcessEvent() && isHovered) return;

        // Обновляем локальное состояние
        setIsHovered(true);

        if (onHover) {
          onHover(objectRef.current);
        }
      };

      // Обработчик для отведения мыши
      const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        // Пропускаем слишком частые события
        if (!canProcessEvent() && !isHovered) return;

        // Обновляем локальное состояние
        setIsHovered(false);

        if (onHover) {
          onHover(null);
        }
      };

      return (
        <group
          ref={objectRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerLeave={handlePointerOut} // Дополнительный обработчик
        >
          <WrappedComponent {...(componentProps as unknown as P)} ref={ref} />
        </group>
      );
    }
  );

  // Имя компонента для отладки
  InteractiveModel.displayName = `Interactive(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return InteractiveModel;
};

export default createInteractiveModel;
