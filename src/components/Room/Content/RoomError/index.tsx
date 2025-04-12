import { Component, ReactNode } from "react";

// Компонент для обработки ошибок загрузки 3D-моделей
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Ошибка в компоненте RoomSpace:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Возвращаем фоллбэк или null в случае ошибки
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
