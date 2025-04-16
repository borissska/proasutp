import {
  forwardRef,
  useRef,
  ComponentType,
  useEffect,
  PropsWithoutRef,
} from "react";
import { Object3D, Mesh, Material } from "three";
import { WithHoverEffectProps } from "./withHoverEffect.props";
import { ThreeEvent } from "@react-three/fiber";

/**
 * HOC для добавления эффекта подсветки при наведении и клике
 * @param WrappedComponent Компонент, к которому добавляется эффект
 */
export const withHoverEffect = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // Компонент с эффектом подсветки
  const WithHoverEffect = forwardRef<Object3D, PropsWithoutRef<P & WithHoverEffectProps>>(
    (props, ref) => {
      const { onHover, onClick, ...componentProps } = props;

      const objectRef = useRef<Object3D | null>(null);

      // Хранить для каждого меша ссылку на оригинальный материал
      const originalMaterials = useRef(new Map<Mesh, Material>());

      // Применить постоянную слабую белую подсветку
      const applyConstantWhiteGlow = () => {
        if (!objectRef.current) return;

        objectRef.current.traverse((child) => {
          if (child instanceof Mesh && child.material) {
            // Сохраняем оригинальный материал, если еще не сохранен
            if (!originalMaterials.current.has(child)) {
              originalMaterials.current.set(child, child.material.clone());
            }

            // Применяем слабую белую подсветку
            child.material.emissive.set(0x00ff00);
            child.material.emissiveIntensity = 0.025; // Очень слабая подсветка
          }
        });
      };

      // Обработчик для события клика
      const handleClick = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        // Вызываем пользовательский обработчик, если он предоставлен
        if (onClick) {
          onClick(objectRef.current);
        }
      };

      // Применяем постоянную белую подсветку при монтировании компонента
      useEffect(() => {
        applyConstantWhiteGlow();
      }, []);

      // Очистка ресурсов при размонтировании
      useEffect(() => {
        return () => {
          // Очищаем карту материалов
          originalMaterials.current.clear();
        };
      }, []);

      return (
        <group ref={objectRef} onClick={handleClick}>
          <WrappedComponent {...(componentProps as unknown as P)} ref={ref} />
        </group>
      );
    }
  );

  // Задаем отображаемое имя для компонента
  WithHoverEffect.displayName = `withHoverEffect(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithHoverEffect;
};

export default withHoverEffect;
