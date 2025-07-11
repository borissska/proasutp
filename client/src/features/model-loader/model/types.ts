export interface ModelLoaderConfig {
  glbModels: string[];
  fbxModels: string[];
}

export interface LoadingProgress {
  loaded: number;
  total: number;
} 