import { FC, useRef, useMemo, useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, Group, MeshStandardMaterial, BufferGeometry } from "three";

interface BaseWallpaperProps {
  position: [number, number, number];
  rotation: [number, number, number];
  name: string;
}

// Создаем материал один раз для всех экземпляров
const defaultMaterial = new MeshStandardMaterial({
  color: 0x808080,
  roughness: 0.7,
  metalness: 0.0,
  emissive: 0x000000,
  envMapIntensity: 0.0,
});

// Предварительно загружаем модель
useGLTF.preload("/WallPaper/result.gltf");

const BaseWallpaper = forwardRef<Group, BaseWallpaperProps>(({ position, rotation, name }, ref) => {
  const localRef = useRef<Group>(null);
  const wallpaperRef = ref || localRef;

  // Загружаем GLTF модель
  const { scene } = useGLTF("/WallPaper/result.gltf", true);

  // Клонируем и оптимизируем модель один раз
  const optimizedModel = useMemo(() => {
    if (!scene) return null;

    const cloned = scene.clone(true);
    cloned.scale.set(0.0015, 0.0015, 0.0015);

    // Оптимизируем геометрию и материалы
    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        // Оптимизируем геометрию
        if (child.geometry) {
          // Вычисляем нормали для оптимизации рендеринга
          child.geometry.computeVertexNormals();

          // Оптимизируем буферы
          if (child.geometry instanceof BufferGeometry) {
            child.geometry.setDrawRange(0, Infinity);
            child.geometry.attributes.position.needsUpdate = false;
            child.geometry.attributes.normal.needsUpdate = false;
          }
        }

        // Используем предварительно созданный материал
        child.material = defaultMaterial;

        // Делаем меш интерактивным
        child.userData.__interactive = true;
        child.castShadow = false;
        child.receiveShadow = false;
        child.name = `${child.name || "mesh"}_${name}`;
      }
    });

    return cloned;
  }, [scene, name]);

  useEffect(() => {
    if (wallpaperRef && "current" in wallpaperRef && wallpaperRef.current && optimizedModel) {
      // Очищаем предыдущие модели
      while (wallpaperRef.current.children.length > 0) {
        wallpaperRef.current.remove(wallpaperRef.current.children[0]);
      }
      // Добавляем оптимизированную модель
      wallpaperRef.current.add(optimizedModel);
    }
  }, [optimizedModel, wallpaperRef]);

  return <group ref={wallpaperRef} position={position} rotation={rotation} name={name} />;
});

BaseWallpaper.displayName = "BaseWallpaper";

export default BaseWallpaper;
