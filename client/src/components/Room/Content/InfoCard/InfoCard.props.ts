import { Vector3 } from "three";

/**
 * Интерфейс для информационной карточки, которая появляется при клике на объект
 */
export interface InfoCardProps {
    title: string;        // Заголовок карточки
    description: string;  // Описание объекта
    position: Vector3;    // Позиция карточки в 3D пространстве
    visible: boolean;     // Флаг видимости
    width?: number;       // Ширина карточки (опционально)
  }