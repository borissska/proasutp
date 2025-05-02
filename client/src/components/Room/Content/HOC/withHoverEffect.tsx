import { forwardRef, useRef, ComponentType, useEffect, PropsWithoutRef } from "react";
import { Object3D, Mesh, Material } from "three";
import { WithHoverEffectProps } from "./withHoverEffect.props";
import { ThreeEvent } from "@react-three/fiber";

/**
 * HOC для добавления эффектов интерактивности объектам
 * @param WrappedComponent Компонент, к которому добавляется эффект
 */
export const withHoverEffect = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // Компонент с эффектами интерактивности
  const WithHoverEffect = forwardRef<Object3D, PropsWithoutRef<P & WithHoverEffectProps>>(
    (props, ref) => {
      const { onHover, onClick, ...componentProps } = props;

      const objectRef = useRef<Object3D | null>(null);

      // Обработчик для события клика
      const handleClick = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        // Вызываем пользовательский обработчик, если он предоставлен
        if (onClick) {
          onClick(objectRef.current);
        }
      };

      // Обработчик для наведения мыши
      const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (onHover) {
          onHover(objectRef.current);
        }
      };

      // Обработчик для отведения мыши
      const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
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
        >
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
