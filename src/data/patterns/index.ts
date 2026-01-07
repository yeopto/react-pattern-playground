import type { Pattern } from "../../types/pattern";
import { contextApiPattern } from "./01-context-api";
import { compoundPattern } from "./02-compound-components";
import { customHooksPattern } from "./03-custom-hooks";
import { renderPropsPattern } from "./04-render-props";
import { hocPattern } from "./05-hoc";
import { containerPresentationalPattern } from "./06-container-presentational";
import { controlPropsPattern } from "./07-control-props";
import { stateReducerPattern } from "./08-state-reducer";
import { propsGetterPattern } from "./09-props-getter";
import { lazyLoadingPattern } from "./10-lazy-loading";
import { portalPattern } from "./11-portal";
import { errorBoundaryPattern } from "./12-error-boundary";
import { observerPattern } from "./13-observer-pattern";
import { memoizationPattern } from "./14-memoization";
import { proxyPattern } from "./15-proxy-pattern";

/**
 * 전체 패턴 목록 (15개)
 */
export const patterns: Pattern[] = [
  // 기본 패턴 (1-5)
  contextApiPattern,
  compoundPattern,
  customHooksPattern,
  renderPropsPattern,
  hocPattern,

  // 중급 패턴 (6-10)
  containerPresentationalPattern,
  controlPropsPattern,
  stateReducerPattern,
  propsGetterPattern,
  lazyLoadingPattern,

  // 고급 패턴 (11-15)
  portalPattern,
  errorBoundaryPattern,
  observerPattern,
  memoizationPattern,
  proxyPattern,
];

/**
 * ID로 패턴 찾기
 */
export function getPatternById(id: string): Pattern | undefined {
  return patterns.find((pattern) => pattern.id === id);
}

/**
 * 카테고리별 패턴 가져오기
 */
export function getPatternsByCategory(
  category: Pattern["category"]
): Pattern[] {
  return patterns.filter((pattern) => pattern.category === category);
}

/**
 * 난이도별 패턴 가져오기
 */
export function getPatternsByDifficulty(
  difficulty: Pattern["difficulty"]
): Pattern[] {
  return patterns.filter((pattern) => pattern.difficulty === difficulty);
}

/**
 * 전체 패턴 개수
 */
export const TOTAL_PATTERNS = patterns.length;

/**
 * 카테고리별 패턴 개수
 */
export const PATTERN_COUNT_BY_CATEGORY = {
  basic: getPatternsByCategory("basic").length,
  intermediate: getPatternsByCategory("intermediate").length,
  advanced: getPatternsByCategory("advanced").length,
};
