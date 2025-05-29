import { FC, useRef, useMemo, useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, Group, Euler } from "three";
import { NotepadProps } from "./Notepad.props";

// Предварительно загружаем модель
useGLTF.preload("/Notepad/model.gltf");

const BaseNotepad = forwardRef<
  Group,
  Omit<NotepadProps, "handleObjectHover" | "handleObjectClick">
>(({ position = [0, 0, 0], rotation = [0, 0, 0], name = "Notepad" }, ref) => {
  const localRef = useRef<Group>(null);
  const notepadRef = ref || localRef;

  // Загружаем GLTF модель с обработкой ошибок
  const { scene } = useGLTF("/Notepad/model.gltf", true);

  // Клонируем и оптимизируем модель один раз
  const optimizedModel = useMemo(() => {
    if (!scene) return null;

    try {
      const cloned = scene.clone(true);
      cloned.scale.set(0.01, 0.01, 0.01); // Масштабируем модель

      // Применяем начальное вращение к модели
      cloned.rotation.set(rotation[0], rotation[1], rotation[2]); // Поворачиваем модель на 90 градусов вокруг оси X

      // Оптимизируем геометрию и материалы
      cloned.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.name = `${child.name || "mesh"}_${name}`;
          child.userData.__interactive = true;
        }
      });

      return cloned;
    } catch (error) {
      console.error("Error optimizing notepad model:", error);
      return null;
    }
  }, [scene, name]);

  useEffect(() => {
    if (notepadRef && "current" in notepadRef && notepadRef.current && optimizedModel) {
      try {
        // Очищаем предыдущие модели
        while (notepadRef.current.children.length > 0) {
          notepadRef.current.remove(notepadRef.current.children[0]);
        }
        // Добавляем оптимизированную модель
        notepadRef.current.add(optimizedModel);
      } catch (error) {
        console.error("Error adding notepad model to scene:", error);
      }
    }
  }, [optimizedModel, notepadRef]);

  // Создаем объект Euler для правильного порядка вращения
  const eulerRotation = new Euler(rotation[0], rotation[1], rotation[2], "XYZ");

  return <group ref={notepadRef} position={position} rotation={eulerRotation} name={name} />;
});

BaseNotepad.displayName = "BaseNotepad";

export default BaseNotepad;
