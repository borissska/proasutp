export interface EnvironmentObjectProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export interface EarthProps extends EnvironmentObjectProps {
  autoRotate?: boolean;
}

export interface MoonProps extends EnvironmentObjectProps {
  autoRotate?: boolean;
  orbitRadius?: number;
  orbitSpeed?: number;
}

export interface StarsProps extends EnvironmentObjectProps {
  count?: number;
}

export interface SpaceProps extends EnvironmentObjectProps {
  color?: string;
} 