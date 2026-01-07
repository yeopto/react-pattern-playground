import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProgress } from "../types/pattern";

interface ProgressState {
  progress: UserProgress[];
  saveProgress: (patternId: string, userCode: string) => void;
  markCompleted: (patternId: string) => void;
  getProgress: (patternId: string) => UserProgress | undefined;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: [],

      saveProgress: (patternId, userCode) => {
        set((state) => {
          const existing = state.progress.find(
            (p) => p.patternId === patternId
          );

          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.patternId === patternId
                  ? { ...p, userCode, lastModified: new Date().toISOString() }
                  : p
              ),
            };
          }

          return {
            progress: [
              ...state.progress,
              {
                patternId,
                userCode,
                completed: false,
                lastModified: new Date().toISOString(),
              },
            ],
          };
        });
      },

      markCompleted: (patternId) => {
        set((state) => ({
          progress: state.progress.map((p) =>
            p.patternId === patternId ? { ...p, completed: true } : p
          ),
        }));
      },

      getProgress: (patternId) => {
        return get().progress.find((p) => p.patternId === patternId);
      },
    }),
    {
      name: "rpp_progress",
      version: 1,
    }
  )
);
