import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Room } from "../../../entities/room/ui/room";
import { Environment } from "../../../entities/environment/ui";
import { PerspectiveCamera } from "@react-three/drei";
import { RoomError } from "../../../entities/room/ui/error/room-error";
import { RoomFallback } from "../../../entities/room/ui/fallback/room-fallback";
import { useModelPreloader } from "../../model-loader/lib/use-model-preloader";

export const Scene: FC = () => {
  // Предзагрузка моделей
  useModelPreloader();

  return (
    <ErrorBoundary fallback={<RoomError />}>
      <Suspense fallback={<RoomFallback />}>
        <PerspectiveCamera makeDefault />
        <Room />
        <Environment />
      </Suspense>
    </ErrorBoundary>
  );
};
