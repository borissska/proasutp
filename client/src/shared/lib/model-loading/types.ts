import { Object3D, WebGLRenderer } from "three";

export interface AssetLoaderConfig {
  glbModels: string[];
  fbxModels: string[];
}

export interface AssetLoaderState {
  loadedAssets: number;
  totalAssets: number;
  progress: number;
  isComplete: boolean;
  loadedModels: string[];
  failedModels: string[];
  compressionStats: CompressionStats;
}

export interface CompressionStats {
  totalOriginalSize: number;
  totalCompressedSize: number;
  compressionRatio: number;
  modelsOptimized: number;
}

export interface AssetLoaderHook extends AssetLoaderState {
  startLoading: (config: AssetLoaderConfig, renderer?: WebGLRenderer) => void;
  resetLoading: () => void;
}

export type DeviceQuality = 'HIGH' | 'MEDIUM' | 'LOW'; 