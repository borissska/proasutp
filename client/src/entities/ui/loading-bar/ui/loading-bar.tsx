import { FC } from "react";
import { useLoading } from "../../../../app/providers/LoadingProvider";
import styles from "./loading-bar.module.scss";

export const LoadingBar: FC = () => {
  const { progress, isComplete, loadingStage, loadedAssets, totalAssets } = useLoading();

  if (isComplete) return null;

  const getLoadingText = () => {
    switch (loadingStage) {
      case "models":
        return `Загрузка моделей... ${loadedAssets}/${totalAssets}`;
      case "scene":
        return "Подготовка сцены к отображению...";
      case "complete":
        return "Готово!";
      default:
        return "Загрузка...";
    }
  };

  const getStageClass = (stage: "models" | "scene" | "complete") => {
    if (loadingStage === stage) return `${styles.stage} ${styles.active}`;

    // Логика для завершенных стадий
    const stageOrder = ["models", "scene", "complete"];
    const currentIndex = stageOrder.indexOf(loadingStage);
    const stageIndex = stageOrder.indexOf(stage);

    if (stageIndex < currentIndex) return `${styles.stage} ${styles.complete}`;
    return styles.stage;
  };

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${progress}%`,
            transition: "width 0.3s ease-out",
          }}
        />
      </div>
      <div className={styles.progressText}>
        {getLoadingText()} ({progress}%)
      </div>
      <div className={styles.stageIndicator}>
        <div className={getStageClass("models")}>Модели</div>
        <div className={getStageClass("scene")}>Сцена</div>
        <div className={getStageClass("complete")}>Готово</div>
      </div>
    </div>
  );
};
