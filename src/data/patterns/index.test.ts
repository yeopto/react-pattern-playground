import { describe, it, expect } from "vitest";
import {
  patterns,
  getPatternById,
  getPatternsByCategory,
  getPatternsByDifficulty,
  TOTAL_PATTERNS,
  PATTERN_COUNT_BY_CATEGORY,
} from "./index";
import type { Pattern } from "../../types/pattern";

describe("patterns 데이터", () => {
  describe("전체 패턴 목록", () => {
    it("총 15개의 패턴이 있어야 함", () => {
      expect(patterns).toHaveLength(15);
      expect(TOTAL_PATTERNS).toBe(15);
    });

    it("모든 패턴이 필수 필드를 가지고 있어야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern).toHaveProperty("id");
        expect(pattern).toHaveProperty("title");
        expect(pattern).toHaveProperty("category");
        expect(pattern).toHaveProperty("difficulty");
        expect(pattern).toHaveProperty("description");
        expect(pattern).toHaveProperty("code");
        expect(pattern).toHaveProperty("relatedPatterns");
      });
    });

    it("모든 패턴의 ID가 유일해야 함", () => {
      const ids = patterns.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(patterns.length);
    });

    it("모든 패턴의 title이 비어있지 않아야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.title).toBeTruthy();
        expect(pattern.title.length).toBeGreaterThan(0);
      });
    });
  });

  describe("카테고리 분류", () => {
    it("기본 패턴이 5개여야 함", () => {
      const basicPatterns = getPatternsByCategory("basic");
      expect(basicPatterns).toHaveLength(5);
      expect(PATTERN_COUNT_BY_CATEGORY.basic).toBe(5);
    });

    it("중급 패턴이 5개여야 함", () => {
      const intermediatePatterns = getPatternsByCategory("intermediate");
      expect(intermediatePatterns).toHaveLength(5);
      expect(PATTERN_COUNT_BY_CATEGORY.intermediate).toBe(5);
    });

    it("고급 패턴이 5개여야 함", () => {
      const advancedPatterns = getPatternsByCategory("advanced");
      expect(advancedPatterns).toHaveLength(5);
      expect(PATTERN_COUNT_BY_CATEGORY.advanced).toBe(5);
    });

    it("카테고리별로 올바르게 분류되어야 함", () => {
      patterns.forEach((pattern) => {
        expect(["basic", "intermediate", "advanced"]).toContain(
          pattern.category
        );
      });
    });
  });

  describe("난이도", () => {
    it("모든 패턴의 난이도가 1~5 사이여야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.difficulty).toBeGreaterThanOrEqual(1);
        expect(pattern.difficulty).toBeLessThanOrEqual(5);
      });
    });

    it("난이도별 패턴 검색이 동작해야 함", () => {
      const difficulty2Patterns = getPatternsByDifficulty(2);
      difficulty2Patterns.forEach((pattern) => {
        expect(pattern.difficulty).toBe(2);
      });
    });
  });

  describe("패턴 설명(description)", () => {
    it("모든 패턴이 problem 설명을 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.description.problem).toBeTruthy();
        expect(pattern.description.problem.length).toBeGreaterThan(10);
      });
    });

    it("모든 패턴이 solution 설명을 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.description.solution).toBeTruthy();
        expect(pattern.description.solution.length).toBeGreaterThan(10);
      });
    });

    it("모든 패턴이 whenToUse를 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.description.whenToUse).toBeInstanceOf(Array);
        expect(pattern.description.whenToUse.length).toBeGreaterThan(0);
      });
    });

    it("모든 패턴이 pros를 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.description.pros).toBeInstanceOf(Array);
        expect(pattern.description.pros.length).toBeGreaterThan(0);
      });
    });

    it("모든 패턴이 cons를 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.description.cons).toBeInstanceOf(Array);
        expect(pattern.description.cons.length).toBeGreaterThan(0);
      });
    });
  });

  describe("코드(code)", () => {
    it("모든 패턴이 before 코드를 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.code.before).toBeTruthy();
        expect(pattern.code.before.length).toBeGreaterThan(50);
      });
    });

    it("모든 패턴이 after 코드를 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.code.after).toBeTruthy();
        expect(pattern.code.after.length).toBeGreaterThan(50);
      });
    });

    it("모든 패턴이 highlights를 가져야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.code.highlights).toBeInstanceOf(Array);
        expect(pattern.code.highlights.length).toBeGreaterThan(0);
      });
    });

    it("before와 after 코드가 달라야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.code.before).not.toBe(pattern.code.after);
      });
    });
  });

  describe("getPatternById", () => {
    it("유효한 ID로 패턴을 찾을 수 있어야 함", () => {
      const pattern = getPatternById("context-api");
      expect(pattern).toBeDefined();
      expect(pattern?.id).toBe("context-api");
      expect(pattern?.title).toContain("Context API");
    });

    it("존재하지 않는 ID는 undefined를 반환해야 함", () => {
      const pattern = getPatternById("non-existent-id");
      expect(pattern).toBeUndefined();
    });

    it("모든 패턴 ID로 검색이 가능해야 함", () => {
      patterns.forEach((originalPattern) => {
        const foundPattern = getPatternById(originalPattern.id);
        expect(foundPattern).toBeDefined();
        expect(foundPattern?.id).toBe(originalPattern.id);
      });
    });
  });

  describe("관련 패턴(relatedPatterns)", () => {
    it("relatedPatterns이 배열이어야 함", () => {
      patterns.forEach((pattern) => {
        expect(pattern.relatedPatterns).toBeInstanceOf(Array);
      });
    });

    it("관련 패턴 ID가 실제 존재하는 패턴이어야 함", () => {
      patterns.forEach((pattern) => {
        pattern.relatedPatterns.forEach((relatedId) => {
          const relatedPattern = getPatternById(relatedId);
          expect(relatedPattern).toBeDefined();
        });
      });
    });
  });

  describe("특정 패턴 검증", () => {
    it("context-api 패턴이 기본 패턴이어야 함", () => {
      const pattern = getPatternById("context-api");
      expect(pattern?.category).toBe("basic");
    });

    it("error-boundary 패턴이 고급 패턴이어야 함", () => {
      const pattern = getPatternById("error-boundary");
      expect(pattern?.category).toBe("advanced");
    });

    it("state-reducer 패턴이 중급 패턴이어야 함", () => {
      const pattern = getPatternById("state-reducer");
      expect(pattern?.category).toBe("intermediate");
    });
  });

  describe("데이터 일관성", () => {
    it("모든 패턴이 Pattern 타입을 만족해야 함", () => {
      patterns.forEach((pattern) => {
        // TypeScript 타입 체크
        const typedPattern: Pattern = pattern;
        expect(typedPattern).toBeDefined();
      });
    });

    it("패턴 배열이 비어있지 않아야 함", () => {
      expect(patterns.length).toBeGreaterThan(0);
    });
  });
});
