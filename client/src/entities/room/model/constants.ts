import { toVector3 } from "@/shared/types/three";
import { Euler} from "three";

// Asset paths
export const MODEL_PATHS = {
  ROOM: "/Room/Space.fbx",
  LOGO: "/Room/logo.glb",
  BOX: "/Box/model.glb",
  DISTRIBUTION_BOX: "/DistributionBox/model.fbx",
  ELECTRICITY_BOX: "/ElectricityBox/model.glb",
  BOILERHOUSE: "/Model/model.glb",
  NOTEPAD: "/Notepad/model.gltf",
  PHONE: "/Phone/model.glb",
  TABLE: "/Table/model.glb",
  WALL_BOX: "/WallPaper/result.gltf",
} as const;

// Interaction settings
export const INTERACTION_SETTINGS = {
  HOVER_DISTANCE: 5,
  CLICK_DISTANCE: 3,
  MOVEMENT_SPEED: 0.1,
} as const;

// Масштабы моделей
const BASE_MODEL_SCALES = {
  ROOM: 0.0035,
  LOGO: 3,
  BOX: 0.6,
  DISTRIBUTION_BOX: 0.018,
  ELECTRICITY_BOX: 1.6,
  BOILERHOUSE: 0.0012,
  NOTEPAD: 0.01,
  PHONE: 0.4,
  TABLE: 0.46,
  WALL_BOX: 0.0015,
} as const;

// Базовые позиции для объектов
const BASE_POSITIONS = {
  ROOM: [0, 0, 0] as [number, number, number],
  BOX: [1.7, 0.325, 5] as [number, number, number],
  DISTRIBUTION_BOX: [-2.52, -1.1, 7.5] as [number, number, number],
  ELECTRICITY_BOX: [-2.5, 1.2, 1] as [number, number, number],
  BOILERHOUSE: [2.15, 1.13, 8.25] as [number, number, number],
  NOTEPAD: [-2.6, 1.6, -1.5] as [number, number, number],
  PHONE: [-2.6, 1.7, -9.2] as [number, number, number],
  TABLE: [1.7, 0, 7] as [number, number, number],
  WALL_BOX: [-1.9, -2.25, 1] as [number, number, number],
  ALARM_LIGHT_FRONT: [-2.7, 1.6, -6] as [number, number, number],
  ALARM_LIGHT_BACK: [-2.7, 1.6, 8] as [number, number, number],
  LOGO_FRONT: [0, 1.57, -10.4] as [number, number, number],
  LOGO_BACK: [0, 1.57, 10.4] as [number, number, number],
} as const;

// Повороты моделей по умолчанию
const BASE_ROTATIONS = {
  ROOM: [0, 0, 0] as [number, number, number],
  BOX: [0, Math.PI / 2, 0] as [number, number, number],
  DISTRIBUTION_BOX: [-Math.PI / 2, 0, Math.PI / 2] as [number, number, number],
  ELECTRICITY_BOX: [0, Math.PI / 2, 0] as [number, number, number],
  BOILERHOUSE: [0, Math.PI / 2, 0] as [number, number, number],
  TABLE: [0, Math.PI / 2, 0] as [number, number, number],
  PHONE: [0, Math.PI / 2, 0] as [number, number, number],
  WALL_BOX: [-Math.PI / 2, 0, Math.PI / 2] as [number, number, number],
  NOTEPAD: new Euler(Math.PI / 2, 0, -Math.PI / 2, "XYZ"),
  ALARM_LIGHT_FRONT: [0, Math.PI / 2, 0] as [number, number, number],
  ALARM_LIGHT_BACK: [0, Math.PI / 2, 0] as [number, number, number],
  LOGO_FRONT: [0, 0, 0] as [number, number, number],
  LOGO_BACK: [0, Math.PI, 0] as [number, number, number],
} as const;

// Базовые позиции для объектов
const BASE_INFO_POSITIONS = {
  BOX: [BASE_POSITIONS.BOX[0], BASE_POSITIONS.BOX[1] + 0.5, BASE_POSITIONS.BOX[2]] as [number, number, number],
  DISTRIBUTION_BOX: [BASE_POSITIONS.DISTRIBUTION_BOX[0], BASE_POSITIONS.DISTRIBUTION_BOX[1] + 2.55, BASE_POSITIONS.DISTRIBUTION_BOX[2] - 0.8] as [number, number, number],
  ELECTRICITY_BOX: [BASE_POSITIONS.ELECTRICITY_BOX[0], BASE_POSITIONS.ELECTRICITY_BOX[1] + 0.5, BASE_POSITIONS.ELECTRICITY_BOX[2]] as [number, number, number],
  BOILERHOUSE: [BASE_POSITIONS.BOILERHOUSE[0], BASE_POSITIONS.BOILERHOUSE[1] + 0.5, BASE_POSITIONS.BOILERHOUSE[2]] as [number, number, number],
  NOTEPAD: [BASE_POSITIONS.NOTEPAD[0], BASE_POSITIONS.NOTEPAD[1] + 0.3, BASE_POSITIONS.NOTEPAD[2]] as [number, number, number],
  PHONE: [BASE_POSITIONS.PHONE[0], BASE_POSITIONS.PHONE[1] + 0.3, BASE_POSITIONS.PHONE[2]] as [number, number, number],
  WALL_BOX: [BASE_POSITIONS.WALL_BOX[0], BASE_POSITIONS.WALL_BOX[1] + 4, BASE_POSITIONS.WALL_BOX[2] - 4.4] as [number, number, number],
} as const;

// Базовые размеры для объектов
const BASE_INFO_WIDTH = {
  BOX: 320,
  DISTRIBUTION_BOX: 300,
  ELECTRICITY_BOX: 300,
  BOILERHOUSE: 320,
  NOTEPAD: 280,
  PHONE: 320,
  WALL_BOX: 280,
} as const;

const BASE_INFO_DATA = {
  BOX: {
    title: "Области деятельности",
    description: "Мы занимаемся поставкой оборудования для производства и промышленных предприятий"
  },
  DISTRIBUTION_BOX: {
    title: "Распределительный щит",
    description: "Контролирует подачу энергии и защищает от перегрузок"
  },
  ELECTRICITY_BOX: {
    title: "Панель управления",
    description: "Система мониторинга и управления оборудованием. Статус: Online. Последнее обновление: 2 мин назад"
  },
  BOILERHOUSE: {
    title: "3D Модель",
    description: "Интерактивная 3D модель для демонстрации возможностей"
  },
  NOTEPAD: {
    title: "Блокнот",
    description: "Записная книжка с важными заметками"
  },
  PHONE: {
    title: "Информация о компании",
    description: `Эл почта: sales@asutp.pro \n
        юр. адрес: 614066, г. Пермь, ул. Чайковского, д.33, оф.314\n
        ИНН: 1657000010\n
        ОГРН: 1181690000000\n
        ссылка на сро: https://asutp.pro/sro\n
        Год начала работы: 2018`
  },
  WALL_BOX: {
    title: "Ящик у стены",
    description: "Ящик для хранения документов и бумаг"
  },
} as const;

// Основная конфигурация комнаты и объектов
export const ROOM_CONFIG = {
  BOX: {
    position: BASE_POSITIONS.BOX,
    rotation: BASE_ROTATIONS.BOX,
    scale: BASE_MODEL_SCALES.BOX,
    name: "Box",
    INFO: {
      position: BASE_INFO_POSITIONS.BOX,
      title: BASE_INFO_DATA.BOX.title,
      description: BASE_INFO_DATA.BOX.description,
      width: BASE_INFO_WIDTH.BOX,
    }
  },
  DISTRIBUTION_BOX: {
    position: BASE_POSITIONS.DISTRIBUTION_BOX,
    rotation: BASE_ROTATIONS.DISTRIBUTION_BOX,
    scale: BASE_MODEL_SCALES.DISTRIBUTION_BOX,
    name: "DistributionBox",
    INFO: {
      position: BASE_INFO_POSITIONS.DISTRIBUTION_BOX,
      title: BASE_INFO_DATA.DISTRIBUTION_BOX.title,
      description: BASE_INFO_DATA.DISTRIBUTION_BOX.description,
      width: BASE_INFO_WIDTH.DISTRIBUTION_BOX,
    }
  },
  ELECTRICITY_BOX: {
    position: BASE_POSITIONS.ELECTRICITY_BOX,
    rotation: BASE_ROTATIONS.ELECTRICITY_BOX,
    scale: BASE_MODEL_SCALES.ELECTRICITY_BOX,
    name: "ElectricityBox",
    INFO: {
      position: BASE_INFO_POSITIONS.ELECTRICITY_BOX,
      title: BASE_INFO_DATA.ELECTRICITY_BOX.title,
      description: BASE_INFO_DATA.ELECTRICITY_BOX.description,
      width: BASE_INFO_WIDTH.ELECTRICITY_BOX,
    }
  },
  BOILERHOUSE: {
    position: BASE_POSITIONS.BOILERHOUSE,
    rotation: BASE_ROTATIONS.BOILERHOUSE,
    scale: BASE_MODEL_SCALES.BOILERHOUSE,
    name: "Boilerhouse",
    INFO: {
      position: BASE_INFO_POSITIONS.BOILERHOUSE,
      title: BASE_INFO_DATA.BOILERHOUSE.title,
      description: BASE_INFO_DATA.BOILERHOUSE.description,
      width: BASE_INFO_WIDTH.BOILERHOUSE,
    }
  },
  NOTEPAD: {
    position: BASE_POSITIONS.NOTEPAD,
    rotation: BASE_ROTATIONS.NOTEPAD,
    scale: BASE_MODEL_SCALES.NOTEPAD,
    name: "Notepad",
    INFO: {
      position: BASE_INFO_POSITIONS.NOTEPAD,
      title: BASE_INFO_DATA.NOTEPAD.title,
      description: BASE_INFO_DATA.NOTEPAD.description,
      width: BASE_INFO_WIDTH.NOTEPAD,
    }
  },
  PHONE: {
    position: BASE_POSITIONS.PHONE,
    rotation: BASE_ROTATIONS.PHONE,
    scale: BASE_MODEL_SCALES.PHONE,
    name: "Phone",
    INFO: {
      position: BASE_INFO_POSITIONS.PHONE,
      title: BASE_INFO_DATA.PHONE.title,
      description: BASE_INFO_DATA.PHONE.description,
      width: BASE_INFO_WIDTH.PHONE,
    }
  },
  WALL_BOX: {
    position: BASE_POSITIONS.WALL_BOX,
    rotation: BASE_ROTATIONS.WALL_BOX,
    scale: BASE_MODEL_SCALES.WALL_BOX,
    name: "WallBox",
    INFO: {
      position: BASE_INFO_POSITIONS.WALL_BOX,
      title: BASE_INFO_DATA.WALL_BOX.title,
      description: BASE_INFO_DATA.WALL_BOX.description,
      width: BASE_INFO_WIDTH.WALL_BOX,
    }
  },
  ROOM: {
    position: BASE_POSITIONS.ROOM,
    rotation: BASE_ROTATIONS.ROOM,
    scale: BASE_MODEL_SCALES.ROOM,
    name: "Room",
  },
  TABLE: {
    position: BASE_POSITIONS.TABLE,
    rotation: BASE_ROTATIONS.TABLE,
    scale: BASE_MODEL_SCALES.TABLE,
    name: "Table",
  },
  ALARM_LIGHT_FRONT: {
    position: BASE_POSITIONS.ALARM_LIGHT_FRONT,
    rotation: BASE_ROTATIONS.ALARM_LIGHT_FRONT,
    scale: 1,
    name: "AlarmLight_Front",
  },
  ALARM_LIGHT_BACK: {
    position: BASE_POSITIONS.ALARM_LIGHT_BACK,
    rotation: BASE_ROTATIONS.ALARM_LIGHT_BACK,
    scale: 1,
    name: "AlarmLight_Back",
  },
  LOGO_FRONT: {
    position: BASE_POSITIONS.LOGO_FRONT,
    rotation: BASE_ROTATIONS.LOGO_FRONT,
    scale: BASE_MODEL_SCALES.LOGO,
    name: "ProASUTP_FRONT",
  },
  LOGO_BACK: {
    position: BASE_POSITIONS.LOGO_BACK,
    rotation: BASE_ROTATIONS.LOGO_BACK,
    scale: BASE_MODEL_SCALES.LOGO,
    name: "ProASUTP_BACK",
  },
  INFO_CARD: {
    DEFAULT_WIDTH: 300,
  }
} as const; 