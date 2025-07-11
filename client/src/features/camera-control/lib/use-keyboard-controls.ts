import { useEffect } from "react";
import { MovementState } from "../model/types";

export const useKeyboardControls = (setMovement: (state: MovementState | ((prev: MovementState) => MovementState)) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          setMovement((prev) => ({ ...prev, forward: true }));
          break;
        case "KeyS":
          setMovement((prev) => ({ ...prev, backward: true }));
          break;
        case "KeyA":
          setMovement((prev) => ({ ...prev, left: true }));
          break;
        case "KeyD":
          setMovement((prev) => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          setMovement((prev) => ({ ...prev, forward: false }));
          break;
        case "KeyS":
          setMovement((prev) => ({ ...prev, backward: false }));
          break;
        case "KeyA":
          setMovement((prev) => ({ ...prev, left: false }));
          break;
        case "KeyD":
          setMovement((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [setMovement]);
}; 