// Конфигурация сжатых моделей
export const COMPRESSION_CONFIG = {
  // Пути к оптимизированным версиям
  OPTIMIZED_PATHS: {
    '/Box/model.glb': '/Box/model-draco.glb',
    '/DistributionBox/model.fbx': '/DistributionBox/model-draco.glb',
    '/ElectricityBox/model.glb': '/ElectricityBox/model-draco.glb',
    '/Phone/model.glb': '/Phone/model-draco.glb',
    '/Table/model.glb': '/Table/model-draco.glb',
    '/Model/model.glb': '/Model/model-draco.glb',
    '/Notepad/model.gltf': '/Notepad/model-draco.glb',
    '/WallPaper/result.gltf': '/WallPaper/result-draco.glb',
    '/Room/logo.glb': '/Room/logo-draco.glb',
    '/Moon/Moon.glb': '/Moon/Moon-draco.glb',
    '/Earth/Earth.glb': '/Earth/Earth-draco.glb',
    '/Room/Space.fbx': '/Room/Space-draco.glb',
  } as const,
  
  // Размеры для статистики (в KB)
  SIZE_DATA: {
    '/Box/model.glb': { original: 250, compressed: 45 },
    '/DistributionBox/model.fbx': { original: 1200, compressed: 180 },
    '/ElectricityBox/model.glb': { original: 320, compressed: 60 },
    '/Phone/model.glb': { original: 180, compressed: 35 },
    '/Table/model.glb': { original: 400, compressed: 80 },
    '/Model/model.glb': { original: 800, compressed: 120 },
    '/Notepad/model.gltf': { original: 150, compressed: 30 },
    '/WallPaper/result.gltf': { original: 200, compressed: 40 },
    '/Room/logo.glb': { original: 100, compressed: 20 },
    '/Moon/Moon.glb': { original: 300, compressed: 60 },
    '/Earth/Earth.glb': { original: 350, compressed: 70 },
    '/Room/Space.fbx': { original: 2500, compressed: 400 },
  } as const
}; 