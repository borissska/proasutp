import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { 
  Group, 
  Object3D, 
  WebGLRenderer, 
  Mesh, 
  MeshStandardMaterial, 
  LinearMipmapLinearFilter, 
  LinearFilter,
  Texture
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { COMPRESSION_CONFIG } from './compression-config';

/**
 * Настроенный загрузчик с поддержкой сжатия и оптимизации
 */
export class OptimizedLoaderManager {
  private gltfLoader: GLTFLoader;
  private fbxLoader: FBXLoader;
  private dracoLoader: DRACOLoader;
  private ktx2Loader: KTX2Loader | null = null;
  
  constructor(renderer?: WebGLRenderer) {
    // Настройка DRACO декодера
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/gltf/');
    this.dracoLoader.preload();
    
    // Настройка KTX2 декодера (если есть renderer)
    if (renderer) {
      try {
        this.ktx2Loader = new KTX2Loader();
        this.ktx2Loader.setTranscoderPath('/basis/');
        this.ktx2Loader.detectSupport(renderer);
      } catch (error) {
        console.warn('KTX2 loader not available:', error);
      }
    }
    
    // Настройка glTF загрузчика
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    if (this.ktx2Loader) {
      this.gltfLoader.setKTX2Loader(this.ktx2Loader);
    }
    
    // Попытка настроить MeshOpt декодер (убираем, так как пакет не установлен)
    // try {
    //   this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    // } catch (error) {
    //   console.warn('MeshOpt decoder not available:', error);
    // }
    
    // FBX загрузчик (для fallback)
    this.fbxLoader = new FBXLoader();
    
    console.log('🔧 Optimized loader initialized');
  }
  
  async loadModel(originalPath: string, useCompression: boolean): Promise<Object3D> {
    const modelPath = this.getOptimalPath(originalPath, useCompression);
    
    console.log(`📥 Loading model: ${modelPath} (compression: ${useCompression})`);
    
    try {
      if (modelPath.endsWith('.fbx')) {
        // FBX загрузка
        return await new Promise<Group>((resolve, reject) => {
          this.fbxLoader.load(
            modelPath,
            (fbx) => {
              this.optimizeModel(fbx);
              resolve(fbx);
            },
            (progress) => {
              // Прогресс загрузки
              console.log(`Loading progress: ${((progress.loaded / progress.total) * 100).toFixed(1)}%`);
            },
            (error) => {
              console.error(`Failed to load FBX: ${modelPath}`, error);
              reject(error);
            }
          );
        });
      } else {
        // GLB/GLTF загрузка
        const gltf = await new Promise<GLTF>((resolve, reject) => {
          this.gltfLoader.load(
            modelPath,
            (gltf) => {
              resolve(gltf);
            },
            (progress) => {
              // Прогресс загрузки
              console.log(`Loading progress: ${((progress.loaded / progress.total) * 100).toFixed(1)}%`);
            },
            (error) => {
              console.error(`Failed to load GLTF: ${modelPath}`, error);
              reject(error);
            }
          );
        });
        
        // Применяем оптимизации к загруженной модели
        this.optimizeModel(gltf.scene);
        
        return gltf.scene;
      }
    } catch (error) {
      // Fallback на оригинальную модель при ошибке
      if (useCompression && modelPath !== originalPath) {
        console.warn(`⚠️ Compressed model failed, trying original: ${originalPath}`);
        return this.loadModel(originalPath, false);
      }
      throw error;
    }
  }
  
  private getOptimalPath(originalPath: string, useCompression: boolean): string {
    if (!useCompression) return originalPath;
    
    const compressedPath = COMPRESSION_CONFIG.OPTIMIZED_PATHS[originalPath as keyof typeof COMPRESSION_CONFIG.OPTIMIZED_PATHS];
    return compressedPath || originalPath;
  }
  
  private optimizeModel(scene: Object3D) {
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        // Оптимизация геометрии
        if (object.geometry) {
          object.geometry.computeBoundingBox();
          object.geometry.computeBoundingSphere();
        }
        
        // Оптимизация материалов
        if (object.material) {
          // Проверяем, является ли материал MeshStandardMaterial
          if (object.material instanceof MeshStandardMaterial) {
            const material = object.material;
            
            // Оптимизация текстур
            const textures = [
              material.map, 
              material.normalMap, 
              material.roughnessMap, 
              material.metalnessMap,
              material.aoMap,
              material.emissiveMap
            ];
            
            textures.forEach(texture => {
              if (texture && texture instanceof Texture) {
                texture.generateMipmaps = true;
                texture.minFilter = LinearMipmapLinearFilter;
                texture.magFilter = LinearFilter;
              }
            });
          }
          
          // Для массива материалов
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => {
              if (mat instanceof MeshStandardMaterial) {
                const textures = [mat.map, mat.normalMap, mat.roughnessMap, mat.metalnessMap];
                textures.forEach(texture => {
                  if (texture && texture instanceof Texture) {
                    texture.generateMipmaps = true;
                    texture.minFilter = LinearMipmapLinearFilter;
                    texture.magFilter = LinearFilter;
                  }
                });
              }
            });
          }
        }
      }
    });
  }
  
  dispose() {
    this.dracoLoader.dispose();
    if (this.ktx2Loader) {
      this.ktx2Loader.dispose();
    }
  }
} 