export const MODEL_PATHS = {
  EARTH: '/Earth/Earth.glb',
  MOON: '/Moon/Moon.glb',
} as const;

export const MODEL_SCALES = {
  EARTH: 5,
  MOON: 10,
} as const;

export const ENVIRONMENT_CONFIG = {
  BACKGROUND_COLOR: '#000033',
  SPACE_COLOR: '#010a20',
  SPACE_GEOMETRY_ARGS: [1900, 64, 64] as [number, number, number],
  
  STARS: {
    COUNT: 7000,
    RADIUS_MIN: 800,
    RADIUS_MAX: 1500,
  },

  SUN: {
    POSITION: [500, 100, -500] as [number, number, number],
    RADIUS: 15,
  },

  EARTH: {
    POSITION: [120, 0, 50] as [number, number, number],
    RADIUS: 0.7,
    ROTATION_SPEED: 0.0008,
  },

  MOON: {
    ORBIT_RADIUS: 20,
    RADIUS: 0.2,
    ROTATION_SPEED: 0.0015,
    ORBIT_SPEED: 0.001,
  },
} as const; 