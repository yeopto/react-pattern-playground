import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProgressStore } from "./useProgressStore";

describe("useProgressStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState({ progress: [] });
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("saveProgress", () => {
    it("should save new progress", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", 'const code = "test"');
      });

      expect(result.current.progress).toHaveLength(1);
      expect(result.current.progress[0]).toMatchObject({
        patternId: "pattern-1",
        userCode: 'const code = "test"',
        completed: false,
      });
      expect(result.current.progress[0].lastModified).toBeDefined();
    });

    it("should update existing progress", async () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "old code");
      });

      const firstModified = result.current.progress[0].lastModified;

      // 타임스탬프가 달라지도록 약간의 딜레이
      await new Promise((resolve) => setTimeout(resolve, 10));

      act(() => {
        result.current.saveProgress("pattern-1", "new code");
      });

      expect(result.current.progress).toHaveLength(1);
      expect(result.current.progress[0].userCode).toBe("new code");
      expect(result.current.progress[0].lastModified).not.toBe(firstModified);
    });

    it("should handle multiple patterns", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "code 1");
        result.current.saveProgress("pattern-2", "code 2");
        result.current.saveProgress("pattern-3", "code 3");
      });

      expect(result.current.progress).toHaveLength(3);
      expect(result.current.progress.map((p) => p.patternId)).toEqual([
        "pattern-1",
        "pattern-2",
        "pattern-3",
      ]);
    });
  });

  describe("markCompleted", () => {
    it("should mark pattern as completed", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "code");
        result.current.markCompleted("pattern-1");
      });

      expect(result.current.progress[0].completed).toBe(true);
    });

    it("should not affect other patterns", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "code 1");
        result.current.saveProgress("pattern-2", "code 2");
        result.current.markCompleted("pattern-1");
      });

      expect(result.current.progress[0].completed).toBe(true);
      expect(result.current.progress[1].completed).toBe(false);
    });
  });

  describe("getProgress", () => {
    it("should return progress for specific pattern", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "code 1");
        result.current.saveProgress("pattern-2", "code 2");
      });

      const progress = result.current.getProgress("pattern-1");

      expect(progress).toMatchObject({
        patternId: "pattern-1",
        userCode: "code 1",
      });
    });

    it("should return undefined for non-existent pattern", () => {
      const { result } = renderHook(() => useProgressStore());

      const progress = result.current.getProgress("non-existent");

      expect(progress).toBeUndefined();
    });
  });

  describe("LocalStorage integration with persist", () => {
    it("should automatically save to localStorage", async () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "code");
      });

      // persist가 자동으로 저장할 시간을 줌
      await new Promise((resolve) => setTimeout(resolve, 50));

      const saved = localStorage.getItem("rpp_progress");
      expect(saved).toBeTruthy();

      const parsed = JSON.parse(saved!);
      expect(parsed.state.progress).toHaveLength(1);
      expect(parsed.state.progress[0].patternId).toBe("pattern-1");
    });

    it("should persist data across sessions", async () => {
      // 첫 번째 세션: 데이터 저장
      const { result: result1 } = renderHook(() => useProgressStore());

      act(() => {
        result1.current.saveProgress("pattern-1", "stored code");
        result1.current.markCompleted("pattern-1");
      });

      // persist가 localStorage에 저장할 시간을 줌
      await new Promise((resolve) => setTimeout(resolve, 50));

      // LocalStorage에 저장되었는지 확인
      const saved = localStorage.getItem("rpp_progress");
      expect(saved).toBeTruthy();

      // 두 번째 세션: 새로운 hook 인스턴스 (persist가 자동으로 복원)
      const { result: result2 } = renderHook(() => useProgressStore());

      // 복원될 시간을 줌
      await new Promise((resolve) => setTimeout(resolve, 50));

      // 데이터가 복원되었는지 확인
      expect(result2.current.progress).toHaveLength(1);
      expect(result2.current.progress[0]).toMatchObject({
        patternId: "pattern-1",
        userCode: "stored code",
        completed: true,
      });
    });

    it("should handle corrupted localStorage data gracefully", () => {
      localStorage.setItem("rpp_progress", "invalid json");

      // persist 미들웨어가 내부적으로 에러를 처리하므로
      // 스토어는 정상적으로 초기화되어야 함
      const { result } = renderHook(() => useProgressStore());

      expect(result.current.progress).toHaveLength(0);
    });

    it("should persist completed status", async () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "code");
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      act(() => {
        result.current.markCompleted("pattern-1");
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const saved = localStorage.getItem("rpp_progress");
      const parsed = JSON.parse(saved!);

      expect(parsed.state.progress[0].completed).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty userCode", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-1", "");
      });

      expect(result.current.progress[0].userCode).toBe("");
    });

    it("should handle very long userCode", () => {
      const { result } = renderHook(() => useProgressStore());
      const longCode = "x".repeat(10000);

      act(() => {
        result.current.saveProgress("pattern-1", longCode);
      });

      expect(result.current.progress[0].userCode).toBe(longCode);
    });

    it("should handle special characters in patternId", () => {
      const { result } = renderHook(() => useProgressStore());

      act(() => {
        result.current.saveProgress("pattern-with-dash_and_underscore", "code");
      });

      expect(result.current.progress[0].patternId).toBe(
        "pattern-with-dash_and_underscore"
      );
    });
  });
});
