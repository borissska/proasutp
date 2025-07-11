import { DeviceQuality } from './types';

/**
 * Детектор качества устройства для оптимизации загрузки
 */
export class DeviceQualityDetector {
  static detectQuality(): DeviceQuality {
    try {
      // Проверяем поддержку WebGL
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || 
                  canvas.getContext('webgl') || 
                  canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      
      if (!gl) {
        console.warn('WebGL not supported, falling back to LOW quality');
        return 'LOW';
      }
      
      // Проверяем GPU с безопасным обращением к gl параметрам
      let rendererString = '';
      try {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          rendererString = renderer ? renderer.toString() : '';
        } else {
          const renderer = gl.getParameter(gl.RENDERER);
          rendererString = renderer ? renderer.toString() : '';
        }
      } catch (error) {
        console.warn('Could not get GPU info:', error);
        rendererString = '';
      }
      
      const isHighEnd = /nvidia|amd|intel iris|apple m[1-9]|apple gpu|mali-g|adreno 6|adreno 7/i.test(rendererString);
      const isMobile = /mobile|android|ios/i.test(navigator.userAgent);
      
      // Проверяем память (если доступно)
      const memory = (navigator as any).deviceMemory || 4;
      
      // Проверяем connection (если доступно)
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && 
        (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');
      
      // Проверяем производительность процессора
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      
      console.log(`📱 Device info:`, {
        gpu: rendererString || 'Unknown',
        memory: `${memory}GB`,
        mobile: isMobile,
        slowConnection: !!isSlowConnection,
        cores: hardwareConcurrency,
        isHighEnd
      });
      
      // Определяем качество
      if (isMobile || memory < 4 || isSlowConnection || hardwareConcurrency < 4) {
        return 'LOW';
      }
      
      if (!isHighEnd || memory < 8 || hardwareConcurrency < 8) {
        return 'MEDIUM';
      }
      
      return 'HIGH';
    } catch (error) {
      console.warn('Failed to detect device quality:', error);
      return 'MEDIUM';
    }
  }
  
  static shouldUseCompression(quality: DeviceQuality): boolean {
    // В продакшене всегда используем сжатие
    // В разработке - только для слабых устройств
    if (process.env.NODE_ENV === 'production') {
      return true;
    }
    
    return quality !== 'HIGH';
  }
} 