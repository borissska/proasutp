import { Object3D } from "three";
import { CompressionStats } from './types';
import { COMPRESSION_CONFIG } from './compression-config';

/**
 * Глобальный кеш для всех загруженных моделей с поддержкой статистики сжатия
 */
export class OptimizedModelCache {
  private cache = new Map<string, Object3D>();
  private compressionStats: CompressionStats = {
    totalOriginalSize: 0,
    totalCompressedSize: 0,
    compressionRatio: 0,
    modelsOptimized: 0
  };
  
  set(path: string, model: Object3D) {
    this.cache.set(path, model);
    this.updateCompressionStats(path);
    console.log(`✅ Model cached: ${path}`);
  }
  
  get(path: string): Object3D | null {
    const model = this.cache.get(path);
    if (model) {
      console.log(`📦 Model retrieved from cache: ${path}`);
      return model.clone();
    } else {
      console.warn(`❌ Model not found in cache: ${path}`);
      return null;
    }
  }
  
  has(path: string): boolean {
    return this.cache.has(path);
  }
  
  clear() {
    this.cache.clear();
    this.compressionStats = {
      totalOriginalSize: 0,
      totalCompressedSize: 0,
      compressionRatio: 0,
      modelsOptimized: 0
    };
  }
  
  getLoadedPaths(): string[] {
    return Array.from(this.cache.keys());
  }
  
  getCompressionStats(): CompressionStats {
    return { ...this.compressionStats };
  }
  
  private updateCompressionStats(path: string) {
    const sizeData = COMPRESSION_CONFIG.SIZE_DATA[path as keyof typeof COMPRESSION_CONFIG.SIZE_DATA];
    if (sizeData) {
      this.compressionStats.totalOriginalSize += sizeData.original;
      this.compressionStats.totalCompressedSize += sizeData.compressed;
      this.compressionStats.modelsOptimized += 1;
      this.compressionStats.compressionRatio = 
        ((this.compressionStats.totalOriginalSize - this.compressionStats.totalCompressedSize) / 
         this.compressionStats.totalOriginalSize) * 100;
    }
  }
}

// Глобальный экземпляр кеша
export const modelCache = new OptimizedModelCache(); 