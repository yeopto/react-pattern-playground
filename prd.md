# PRD: React Pattern Playground

## 1. 프로젝트 개요

### 1.1 프로젝트 배경
React 및 JavaScript/TypeScript 디자인 패턴을 **실제로 코드를 작성하며** 학습할 수 있는 인터랙티브 학습 플랫폼. 기존 문서 중심의 학습에서 벗어나 "직접 타이핑하고 리팩토링하는 경험"을 제공.

### 1.2 핵심 가치 제안
- 📝 **실습 중심 학습**: 러프한 코드를 패턴을 적용해 리팩토링
- 🎯 **즉각적 피드백**: 실시간 프리뷰 + 정답 비교
- 💾 **학습 진행 관리**: LocalStorage 기반 진도 저장
- 🎓 **실무 중심 커리큘럼**: 주니어 개발자가 실무에서 자주 마주치는 패턴 우선

### 1.3 타겟 사용자
- 주니어 프론트엔드 개발자
- React 패턴 학습이 필요한 개발자
- TypeScript 실전 연습이 필요한 개발자

### 1.4 프로젝트 목표
**사용자 목표**
- React 디자인 패턴 10개 이상 실습
- 패턴 적용 전후 코드 비교 경험
- 실시간으로 작성한 코드의 동작 확인

**개발자(본인) 목표**
- React 디자인 패턴 깊이 있게 학습
- Monaco Editor 통합 경험
- 동적 코드 실행 구현 경험
- Zustand 상태관리 실전 적용
- 테스트 코드 작성 역량 강화
- 포트폴리오용 프로젝트 완성

---

## 2. 핵심 기능 명세

### 2.1 패턴 학습 시스템

#### 2.1.1 패턴 목록 (우선순위순)

**Phase 1: 기본 패턴 (1-5)**
1. **Props Drilling 해결 (Context API)**
   - 문제: 깊은 컴포넌트 트리에서의 props 전달
   - 해결: Context API로 전역 상태 공유

2. **Compound Components**
   - 문제: 복잡한 컴포넌트의 유연성 부족
   - 해결: 여러 하위 컴포넌트가 협력하는 구조

3. **Custom Hooks**
   - 문제: 로직 재사용의 어려움
   - 해결: 상태 로직을 Hook으로 추출

4. **Render Props**
   - 문제: 컴포넌트 간 로직 공유
   - 해결: 함수를 prop으로 전달해 렌더링 위임

5. **Higher-Order Components (HOC)**
   - 문제: 컴포넌트 기능 확장
   - 해결: 컴포넌트를 받아 새 컴포넌트를 반환

**Phase 2: 중급 패턴 (6-10)**
6. **Container/Presentational Pattern**
   - 문제: 로직과 UI의 혼재
   - 해결: 관심사 분리 (데이터 처리 vs 렌더링)

7. **Control Props Pattern**
   - 문제: 컴포넌트 동작을 외부에서 제어 필요
   - 해결: 제어 가능한 props 노출

8. **State Reducer Pattern**
   - 문제: 복잡한 상태 관리 로직
   - 해결: reducer 함수로 상태 변경 로직 캡슐화

9. **Props Getter Pattern**
   - 문제: 여러 props를 일일이 전달하는 번거로움
   - 해결: props를 묶어서 반환하는 함수 제공

10. **Lazy Loading / Code Splitting**
    - 문제: 초기 번들 크기 증가
    - 해결: React.lazy + Suspense로 동적 import

**Phase 3: 고급 패턴 (11-15)**
11. **Portal Pattern**
    - 문제: DOM 트리 외부 렌더링 필요 (모달 등)
    - 해결: ReactDOM.createPortal 활용

12. **Error Boundary**
    - 문제: 하위 컴포넌트 에러 처리
    - 해결: componentDidCatch로 에러 잡기

13. **Observer Pattern (useEffect 활용)**
    - 문제: 외부 데이터 변경 감지
    - 해결: 구독/해제 패턴 구현

14. **Memoization Pattern**
    - 문제: 불필요한 리렌더링
    - 해결: React.memo, useMemo, useCallback

15. **Proxy Pattern (Immer 스타일)**
    - 문제: 불변성 유지의 어려움
    - 해결: Proxy 기반 불변 업데이트

#### 2.1.2 각 패턴별 구성 요소
```
[패턴 페이지 구조]
┌─────────────────────────────────────────┐
│ 1. 패턴 설명 섹션                        │
│    - 패턴명                              │
│    - 해결하는 문제                       │
│    - 적용 시점                           │
│    - 장단점                              │
├─────────────────────────────────────────┤
│ 2. Before 코드 (러프한 코드)             │
│    - Monaco Editor                       │
│    - 문제가 있는 코드 예시               │
├─────────────────────────────────────────┤
│ 3. 실시간 프리뷰                         │
│    - 작성 중인 코드의 렌더링 결과        │
│    - 에러 발생 시 에러 메시지            │
├─────────────────────────────────────────┤
│ 4. 액션 버튼                             │
│    - "정답 보기" 버튼                    │
│    - "초기화" 버튼                       │
│    - "저장" 버튼                         │
├─────────────────────────────────────────┤
│ 5. After 코드 (모범 답안)                │
│    - 정답 보기 클릭 시 표시              │
│    - 패턴이 적용된 리팩토링 코드         │
│    - 주요 변경점 하이라이트              │
└─────────────────────────────────────────┘
```

### 2.2 코드 에디터 시스템

#### 2.2.1 Monaco Editor 기능
- ✅ **문법 하이라이팅**: TypeScript/JavaScript/JSX 지원
- ✅ **자동완성**: React API, TypeScript 타입 인텔리센스
- ✅ **에러 표시**: 실시간 TypeScript 에러 체크
- ✅ **테마**: VS Code Dark+ 테마 적용
- ✅ **단축키**: 기본 VS Code 단축키 지원

#### 2.2.2 에디터 설정
```typescript
{
  language: 'typescript',
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  tabSize: 2,
}
```

### 2.3 실시간 프리뷰 시스템

#### 2.3.1 동적 코드 실행 전략
**선택한 방법: Babel Standalone + new Function()**

```typescript
// 기술적 구현 개요
1. 유저 코드(문자열) 수집
2. Babel로 JSX → JavaScript 변환
3. new Function()으로 컴포넌트 생성
4. iframe 샌드박스 내에서 렌더링
5. 에러 발생 시 Error Boundary로 캐치
```

**장점**
- 브라우저만으로 실행 가능 (백엔드 불필요)
- 실시간 피드백 제공
- 보안 위험 최소화 (iframe 격리)

**단점**
- 외부 라이브러리 import 제한
- 빌드 시간 없음 (성능은 충분)

#### 2.3.2 에러 핸들링
```typescript
try {
  // 코드 실행
} catch (error) {
  // 문법 에러, 런타임 에러 표시
  <ErrorDisplay error={error} />
}
```

### 2.4 저장 시스템

#### 2.4.1 LocalStorage 구조
```typescript
interface SavedProgress {
  patternId: string;
  userCode: string;
  lastModified: string;
  completed: boolean;
}

// 저장 키
localStorage.setItem('rpp_progress', JSON.stringify(progressArray));
```

#### 2.4.2 저장 기능
- 자동 저장: 코드 변경 후 3초 디바운스
- 수동 저장: "저장" 버튼 클릭
- 진도 체크: 완료한 패턴 표시

### 2.5 네비게이션 & UI

#### 2.5.1 라우팅 구조
```
/                          → 홈 (패턴 목록)
/pattern/:patternId        → 개별 패턴 학습 페이지
/about                     → 프로젝트 소개 (선택)
```

#### 2.5.2 패턴 목록 페이지
```
┌─────────────────────────────────────┐
│ React Pattern Playground            │
├─────────────────────────────────────┤
│ [Progress: 3/15 완료]                │
├─────────────────────────────────────┤
│ ☑ 1. Props Drilling (Context API)   │
│ ☑ 2. Compound Components            │
│ ☑ 3. Custom Hooks                   │
│ ☐ 4. Render Props                   │
│ ☐ 5. HOC                            │
│ ...                                 │
└─────────────────────────────────────┘
```

---

## 3. 기술 스택 & 아키텍처

### 3.1 기술 스택

#### 3.1.1 Core
- **React 18.3+**: UI 라이브러리
- **TypeScript 5.0+**: 타입 안정성
- **Vite 5.0+**: 빌드 도구

#### 3.1.2 State Management
- **Zustand**: 전역 상태 관리
  - 학습 진도
  - 현재 작성 중인 코드
  - UI 상태 (사이드바 열림/닫힘 등)

#### 3.1.3 Code Editor
- **@monaco-editor/react**: Monaco Editor 통합
- **@babel/standalone**: JSX → JS 변환

#### 3.1.4 Routing
- **React Router v6**: 클라이언트 사이드 라우팅

#### 3.1.5 Styling
- **Tailwind CSS**: 유틸리티 우선 CSS
- 심플하고 단순한 디자인

#### 3.1.6 Testing
- **Vitest**: 단위 테스트
- **React Testing Library**: 컴포넌트 테스트
- **Playwright** (선택): E2E 테스트

### 3.2 폴더 구조

```
react-pattern-playground/
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   │   ├── MonacoEditor.tsx      # Monaco 에디터 래퍼
│   │   │   ├── CodePreview.tsx       # 실시간 프리뷰
│   │   │   └── ErrorBoundary.tsx     # 에러 처리
│   │   ├── Pattern/
│   │   │   ├── PatternList.tsx       # 패턴 목록
│   │   │   ├── PatternCard.tsx       # 패턴 카드
│   │   │   └── PatternDetail.tsx     # 패턴 상세
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   ├── pages/
│   │   ├── HomePage.tsx              # 패턴 목록 페이지
│   │   └── PatternPage.tsx           # 패턴 학습 페이지
│   ├── store/
│   │   ├── useProgressStore.ts       # 진도 저장
│   │   └── useEditorStore.ts         # 에디터 상태
│   ├── data/
│   │   ├── patterns/
│   │   │   ├── 01-context-api.ts     # 패턴 데이터
│   │   │   ├── 02-compound.ts
│   │   │   └── ...
│   │   └── types.ts                  # 패턴 타입 정의
│   ├── utils/
│   │   ├── codeExecutor.ts           # 코드 실행 유틸
│   │   ├── localStorage.ts           # 저장 유틸
│   │   └── formatCode.ts             # 코드 포맷팅
│   ├── hooks/
│   │   ├── useCodeExecution.ts
│   │   └── useLocalStorage.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   └── integration/
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### 3.3 데이터 구조

#### 3.3.1 Pattern 타입
```typescript
interface Pattern {
  id: string;
  title: string;
  category: 'basic' | 'intermediate' | 'advanced';
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: {
    problem: string;           // 해결하는 문제
    solution: string;          // 패턴 설명
    whenToUse: string[];       // 적용 시점
    pros: string[];            // 장점
    cons: string[];            // 단점
  };
  code: {
    before: string;            // 러프한 코드
    after: string;             // 리팩토링된 코드
    highlights: string[];      // 주요 변경점
  };
  relatedPatterns: string[];   // 관련 패턴 ID
}
```

#### 3.3.2 Progress 타입
```typescript
interface UserProgress {
  patternId: string;
  userCode: string;
  completed: boolean;
  lastModified: string;
}
```

---

## 4. UI/UX 요구사항

### 4.1 디자인 원칙
- **심플함**: 불필요한 장식 최소화
- **명확함**: 기능이 직관적으로 이해됨
- **집중**: 학습에 방해되지 않는 UI

### 4.2 컬러 스킴
```
Primary: #3B82F6 (Blue)
Secondary: #8B5CF6 (Purple)
Success: #10B981 (Green)
Warning: #F59E0B (Orange)
Error: #EF4444 (Red)
Background: #1E1E1E (Dark)
Text: #E5E7EB (Light Gray)
```

### 4.3 반응형 디자인
- **Desktop First**: 코드 에디터는 큰 화면에 최적화
- **Tablet**: 768px 이하에서 레이아웃 조정
- **Mobile**: 모바일은 미지원 (경고 메시지 표시)

### 4.4 접근성
- 키보드 네비게이션 지원
- ARIA 라벨 적용
- 충분한 색상 대비

---

## 5. 개발 단계별 계획

### Phase 1: 기본 구조 (Week 1-2)
**목표: 프로젝트 세팅 및 핵심 UI 구현**

#### Task 1.1: 프로젝트 초기화
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] 필요한 라이브러리 설치
- [ ] Tailwind CSS 설정
- [ ] 폴더 구조 생성
- [ ] ESLint, Prettier 설정

#### Task 1.2: 라우팅 및 레이아웃
- [ ] React Router 설정
- [ ] Header, Sidebar, Footer 컴포넌트
- [ ] HomePage (패턴 목록)
- [ ] PatternPage (패턴 학습) 기본 레이아웃

#### Task 1.3: 패턴 데이터 구조
- [ ] Pattern 타입 정의
- [ ] 첫 3개 패턴 데이터 작성
  - Context API
  - Compound Components
  - Custom Hooks

**산출물**
- 기본 네비게이션 동작
- 패턴 목록 표시
- 패턴 페이지 라우팅

---

### Phase 2: 코드 에디터 통합 (Week 3-4)
**목표: Monaco Editor 통합 및 기본 편집 기능**

#### Task 2.1: Monaco Editor 설정
- [ ] @monaco-editor/react 통합
- [ ] TypeScript 설정 적용
- [ ] 테마 및 기본 옵션 설정
- [ ] 코드 포맷팅 (Prettier 통합)

#### Task 2.2: 에디터 컴포넌트
- [ ] MonacoEditor 래퍼 컴포넌트
- [ ] 코드 변경 핸들러
- [ ] 자동 저장 (디바운스)
- [ ] 초기화 버튼

#### Task 2.3: Zustand 상태 관리
- [ ] useEditorStore 생성
- [ ] 현재 코드 상태 관리
- [ ] 저장/불러오기 액션

**산출물**
- 동작하는 코드 에디터
- 코드 작성 및 수정 가능
- 상태 관리 연결

---

### Phase 3: 실시간 프리뷰 구현 (Week 5-6)
**목표: 동적 코드 실행 및 렌더링**

#### Task 3.1: 코드 실행 엔진
- [ ] Babel Standalone 통합
- [ ] JSX → JavaScript 변환
- [ ] new Function() 기반 컴포넌트 생성
- [ ] iframe 샌드박스 구현

#### Task 3.2: 프리뷰 컴포넌트
- [ ] CodePreview 컴포넌트
- [ ] 실시간 렌더링
- [ ] ErrorBoundary 구현
- [ ] 에러 메시지 표시

#### Task 3.3: 에러 핸들링
- [ ] 문법 에러 캐치
- [ ] 런타임 에러 캐치
- [ ] 사용자 친화적 에러 메시지
- [ ] 에러 위치 하이라이트 (선택)

**산출물**
- 작성한 코드가 실시간으로 렌더링
- 에러 발생 시 적절한 피드백

---

### Phase 4: 패턴 콘텐츠 작성 (Week 7-8)
**목표: 15개 패턴 데이터 완성**

#### Task 4.1: 기본 패턴 (1-5)
- [ ] Context API 패턴 작성
- [ ] Compound Components 작성
- [ ] Custom Hooks 작성
- [ ] Render Props 작성
- [ ] HOC 작성

#### Task 4.2: 중급 패턴 (6-10)
- [ ] Container/Presentational 작성
- [ ] Control Props 작성
- [ ] State Reducer 작성
- [ ] Props Getter 작성
- [ ] Lazy Loading 작성

#### Task 4.3: 고급 패턴 (11-15)
- [ ] Portal 작성
- [ ] Error Boundary 작성
- [ ] Observer Pattern 작성
- [ ] Memoization 작성
- [ ] Proxy Pattern 작성

**각 패턴별 작성 내용**
- 패턴 설명 (문제, 해결책, 적용 시점, 장단점)
- Before 코드 (문제가 있는 코드)
- After 코드 (리팩토링된 코드)
- 주요 변경점 하이라이트

**산출물**
- 15개 패턴 완성
- 각 패턴별 학습 페이지 동작

---

### Phase 5: 저장 및 진도 관리 (Week 9)
**목표: LocalStorage 기반 진도 관리**

#### Task 5.1: 저장 시스템
- [ ] LocalStorage 유틸 함수
- [ ] 자동 저장 (3초 디바운스)
- [ ] 수동 저장 버튼
- [ ] 불러오기 기능

#### Task 5.2: 진도 관리
- [ ] useProgressStore 생성
- [ ] 패턴 완료 체크
- [ ] 진도율 표시
- [ ] 패턴 목록에 완료 표시

#### Task 5.3: 데이터 마이그레이션
- [ ] 버전 관리 (데이터 구조 변경 대응)
- [ ] 초기화 기능 (전체 진도 리셋)

**산출물**
- 학습 진도 저장/불러오기
- 진도율 시각화

---

### Phase 6: 테스트 코드 작성 (Week 10-11)
**목표: 주요 기능 테스트 커버리지 확보**

#### Task 6.1: 단위 테스트
- [ ] 유틸 함수 테스트
  - codeExecutor.test.ts
  - localStorage.test.ts
  - formatCode.test.ts
- [ ] Store 테스트
  - useProgressStore.test.ts
  - useEditorStore.test.ts

#### Task 6.2: 컴포넌트 테스트
- [ ] MonacoEditor 테스트
- [ ] CodePreview 테스트
- [ ] PatternCard 테스트
- [ ] PatternList 테스트

#### Task 6.3: 통합 테스트
- [ ] 패턴 학습 플로우 테스트
- [ ] 저장/불러오기 테스트
- [ ] 에러 핸들링 테스트

**테스트 커버리지 목표**
- 유틸 함수: 90%+
- Store: 80%+
- 컴포넌트: 70%+

**산출물**
- 테스트 코드 작성 완료
- CI에서 테스트 자동 실행

---

### Phase 7: 폴리싱 및 최적화 (Week 12)
**목표: 사용자 경험 개선 및 성능 최적화**

#### Task 7.1: 성능 최적화
- [ ] Monaco Editor lazy loading
- [ ] 코드 실행 디바운스 최적화
- [ ] React.memo 적용
- [ ] 번들 크기 분석 및 최적화

#### Task 7.2: UX 개선
- [ ] 로딩 인디케이터
- [ ] 키보드 단축키
- [ ] 툴팁 추가
- [ ] 애니메이션 (subtle)

#### Task 7.3: 접근성
- [ ] ARIA 라벨 추가
- [ ] 키보드 네비게이션 개선
- [ ] 색상 대비 검증

**산출물**
- 매끄러운 사용자 경험
- 빠른 로딩 속도

---

### Phase 8: 문서화 및 배포 (Week 13)
**목표: 프로젝트 완성 및 배포**

#### Task 8.1: 문서 작성
- [ ] README.md
  - 프로젝트 소개
  - 기술 스택
  - 주요 기능
  - 실행 방법
  - 학습 내용
- [ ] CONTRIBUTING.md (선택)
- [ ] 아키텍처 문서 (선택)

#### Task 8.2: 배포 준비
- [ ] 환경변수 설정
- [ ] 빌드 최적화
- [ ] SEO 메타 태그
- [ ] favicon 및 og 이미지

#### Task 8.3: 배포
- [ ] Vercel 배포
- [ ] 도메인 연결 (선택)
- [ ] 배포 테스트

#### Task 8.4: 포트폴리오 준비
- [ ] 프로젝트 스크린샷
- [ ] 기술적 의사결정 정리
- [ ] 챌린지 및 해결 과정 문서화

**산출물**
- 배포된 웹사이트
- 포트폴리오용 문서

---

## 6. 학습 목표 & 기대효과

### 6.1 기술적 학습 목표

#### 6.1.1 React 심화
- ✅ 15개 디자인 패턴 실전 적용
- ✅ 패턴별 장단점 및 사용 시점 체득
- ✅ 컴포넌트 설계 역량 강화

#### 6.1.2 TypeScript 숙련도
- ✅ 제네릭 타입 활용
- ✅ 유틸리티 타입 (Partial, Pick 등)
- ✅ 타입 가드 및 narrowing
- ✅ 패턴별 타입 정의

#### 6.1.3 상태 관리
- ✅ Zustand 실전 경험
- ✅ 전역 vs 로컬 상태 구분
- ✅ 상태 설계 패턴

#### 6.1.4 고급 프론트엔드 기술
- ✅ Monaco Editor 통합
- ✅ 동적 코드 실행 (Babel + Function)
- ✅ iframe 샌드박스
- ✅ 에러 바운더리 실전

#### 6.1.5 테스트
- ✅ Vitest 사용법
- ✅ React Testing Library
- ✅ 테스트 작성 습관 형성

### 6.2 포트폴리오 가치

#### 6.2.1 기술적 깊이
- 단순 CRUD가 아닌 **기술적 챌린지 해결**
- 동적 코드 실행이라는 **독특한 기능**
- 테스트 코드 포함으로 **품질 입증**

#### 6.2.2 실용성
- 실제 사용 가능한 학습 도구
- 오픈소스로 공개 가능
- 커뮤니티 기여 가능성

#### 6.2.3 문서화
- 명확한 기술적 의사결정 기록
- 챌린지 및 해결 과정 정리
- 학습 과정 가시화

---

## 7. 기술적 챌린지 & 해결 방안

### 7.1 동적 코드 실행

#### 챌린지
유저가 작성한 문자열 코드를 실제 React 컴포넌트로 변환해 렌더링

#### 해결 방안
```typescript
// 1. Babel로 JSX → JS 변환
import { transform } from '@babel/standalone';

const transformedCode = transform(userCode, {
  presets: ['react', 'typescript'],
}).code;

// 2. Function 생성
const ComponentFunction = new Function(
  'React',
  `
  ${transformedCode}
  return MyComponent; // 유저가 정의한 컴포넌트
  `
)(React);

// 3. iframe에서 렌더링
<iframe>
  <ComponentFunction />
</iframe>
```

#### 리스크 및 대응
- **리스크**: `eval()` 보안 위험
- **대응**: iframe 샌드박스로 격리 + CSP 헤더

### 7.2 TypeScript 지원

#### 챌린지
Monaco Editor에서 TypeScript 타입 체크 및 자동완성

#### 해결 방안
```typescript
// Monaco에 React 타입 정의 제공
import * as monaco from 'monaco-editor';

monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `
  declare module 'react' {
    export function useState<T>(initial: T): [T, (value: T) => void];
    ...
  }
  `,
  'react.d.ts'
);
```

### 7.3 성능 최적화

#### 챌린지
Monaco Editor는 무거운 라이브러리 (약 3MB)

#### 해결 방안
- **Code Splitting**: React.lazy로 에디터 지연 로딩
- **CDN**: Monaco를 CDN에서 로드
- **Tree Shaking**: 불필요한 언어 제거

```typescript
const MonacoEditor = React.lazy(() => import('./MonacoEditor'));

<Suspense fallback={<Loading />}>
  <MonacoEditor />
</Suspense>
```

### 7.4 에러 핸들링

#### 챌린지
유저 코드의 다양한 에러 (문법, 런타임, 타입)

#### 해결 방안
**3단계 에러 캐치**
1. **변환 에러** (Babel): try-catch로 문법 에러 캐치
2. **타입 에러** (TypeScript): Monaco가 자동 표시
3. **런타임 에러** (실행): ErrorBoundary로 캐치

```typescript
// ErrorBoundary
class CodeErrorBoundary extends React.Component {
  componentDidCatch(error: Error) {
    // 에러 메시지를 사용자에게 표시
  }
}
```

---

## 8. 테스트 전략

### 8.1 테스트 피라미드

```
       /\
      /  \   E2E (10%)
     /____\
    /      \  Integration (20%)
   /________\
  /          \ Unit (70%)
 /__________\
```

### 8.2 단위 테스트

#### 8.2.1 유틸 함수
```typescript
// codeExecutor.test.ts
describe('codeExecutor', () => {
  it('should transform JSX to JavaScript', () => {
    const input = '<div>Hello</div>';
    const output = transformCode(input);
    expect(output).toContain('React.createElement');
  });

  it('should handle syntax errors', () => {
    const input = '<div>unclosed';
    expect(() => transformCode(input)).toThrow();
  });
});
```

#### 8.2.2 Store
```typescript
// useProgressStore.test.ts
describe('useProgressStore', () => {
  it('should mark pattern as completed', () => {
    const { result } = renderHook(() => useProgressStore());
    act(() => {
      result.current.markCompleted('pattern-1');
    });
    expect(result.current.isCompleted('pattern-1')).toBe(true);
  });
});
```

### 8.3 컴포넌트 테스트

```typescript
// MonacoEditor.test.tsx
describe('MonacoEditor', () => {
  it('should render with initial code', () => {
    render(<MonacoEditor initialCode="const x = 1;" />);
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it('should call onChange when code changes', () => {
    const onChange = vi.fn();
    render(<MonacoEditor onChange={onChange} />);
    // 코드 변경 시뮬레이션
    expect(onChange).toHaveBeenCalled();
  });
});
```

### 8.4 통합 테스트

```typescript
// pattern-learning-flow.test.tsx
describe('Pattern Learning Flow', () => {
  it('should complete full learning cycle', async () => {
    render(<App />);
    
    // 1. 패턴 선택
    fireEvent.click(screen.getByText('Context API'));
    
    // 2. 코드 작성
    const editor = screen.getByRole('textbox');
    fireEvent.change(editor, { target: { value: 'new code' } });
    
    // 3. 정답 보기
    fireEvent.click(screen.getByText('정답 보기'));
    expect(screen.getByText(/리팩토링된 코드/)).toBeInTheDocument();
    
    // 4. 저장 확인
    expect(localStorage.getItem('rpp_progress')).toBeTruthy();
  });
});
```

### 8.5 E2E 테스트 (선택)

```typescript
// e2e/pattern-learning.spec.ts
test('user can learn a pattern', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=Context API');
  await page.fill('[data-testid="editor"]', 'const MyComponent = () => {}');
  await page.click('text=정답 보기');
  await expect(page.locator('text=createContext')).toBeVisible();
});
```

---

## 9. 배포 계획

### 9.1 호스팅 플랫폼
**선택: Vercel**

**이유**
- Zero-config 배포
- 자동 HTTPS
- Git 연동으로 자동 배포
- 무료 티어 충분

### 9.2 배포 프로세스

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 연결
vercel

# 3. 프로덕션 배포
vercel --prod
```

### 9.3 환경 변수 (필요 시)
```
# .env.production
VITE_APP_VERSION=1.0.0
```

### 9.4 도메인 (선택)
- Vercel 기본 도메인: `react-pattern-playground.vercel.app`
- 커스텀 도메인: 필요 시 구매 및 연결

### 9.5 성능 모니터링
- **Vercel Analytics**: 기본 트래픽 분석
- **Lighthouse**: 성능 점수 측정
- **Web Vitals**: Core Web Vitals 모니터링

---

## 10. 향후 확장 가능성

### 10.1 추가 기능 아이디어

#### 10.1.1 커뮤니티 기능
- 유저가 작성한 코드 공유
- 다른 사람의 풀이 보기
- 좋아요/댓글 기능

#### 10.1.2 학습 강화
- 퀴즈 모드
- 타이머 챌린지
- 배지/업적 시스템

#### 10.1.3 콘텐츠 확장
- JavaScript 디자인 패턴 (GoF)
- TypeScript 유틸리티 타입 연습
- 성능 최적화 패턴

#### 10.1.4 백엔드 추가
- 유저 인증
- 진도 클라우드 동기화
- 관리자 대시보드

### 10.2 기술적 개선
- WebAssembly로 코드 실행 최적화
- AI 코드 리뷰 (GPT API 연동)
- 다국어 지원

### 10.3 오픈소스화
- GitHub Public Repository
- 기여 가이드 작성
- 이슈 템플릿 준비

---

## 11. 성공 지표

### 11.1 개발 완료 기준
- [ ] 15개 패턴 모두 완성
- [ ] 모든 핵심 기능 동작
- [ ] 테스트 커버리지 70% 이상
- [ ] 배포 완료
- [ ] README 작성 완료

### 11.2 품질 기준
- [ ] Lighthouse 성능 점수 90+ 
- [ ] TypeScript 에러 0개
- [ ] ESLint 경고 0개
- [ ] 모바일 접근 시 경고 표시

### 11.3 학습 목표 달성
- [ ] React 패턴 15개 모두 구현 경험
- [ ] Monaco Editor 통합 완료
- [ ] 동적 코드 실행 구현
- [ ] 테스트 코드 작성 습관 형성

---

## 12. 리스크 관리

### 12.1 기술적 리스크

| 리스크 | 가능성 | 영향도 | 대응 방안 |
|--------|--------|--------|-----------|
| Monaco Editor 통합 어려움 | 중 | 고 | 공식 문서 + 예제 참고, 필요 시 대체 에디터 고려 |
| 동적 코드 실행 실패 | 중 | 고 | iframe 샌드박스 + 에러 핸들링 강화 |
| 성능 이슈 (에디터 로딩) | 중 | 중 | Lazy loading + Code splitting |
| 브라우저 호환성 | 저 | 중 | 최신 브라우저 타겟 (Chrome, Firefox, Safari) |

### 12.2 일정 리스크

| 리스크 | 가능성 | 영향도 | 대응 방안 |
|--------|--------|--------|-----------|
| 패턴 콘텐츠 작성 지연 | 중 | 중 | 우선 5개만 완성 후 점진적 추가 |
| 테스트 작성 시간 부족 | 중 | 중 | 핵심 기능만 테스트, E2E는 선택 |
| 예상보다 복잡한 구현 | 고 | 중 | 기능 범위 축소 (프리뷰 제외 등) |

### 12.3 대응 전략
- **우선순위 명확화**: 핵심 기능 먼저 완성
- **MVP 마인드**: 완벽보다 동작하는 버전 우선
- **유연한 일정**: 학습하면서 조정 가능

---

## 13. 참고 자료

### 13.1 기술 문서
- [React Patterns](https://www.patterns.dev/posts/react-patterns)
- [Monaco Editor React](https://github.com/suren-atoyan/monaco-react)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Vitest Guide](https://vitest.dev/guide/)

### 13.2 영감을 받은 사이트
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [CodeSandbox](https://codesandbox.io/)
- [Patterns.dev](https://www.patterns.dev/)
- [React.dev](https://react.dev/)

---

## 14. 부록

### 14.1 Git Commit Convention
```
feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 변경

예시:
feat: Monaco 에디터 통합
fix: 코드 실행 시 에러 핸들링 개선
docs: README에 설치 방법 추가
```

### 14.2 Branch Strategy
```
main          (프로덕션)
  └─ develop  (개발)
      ├─ feature/editor
      ├─ feature/preview
      └─ feature/patterns
```

### 14.3 코드 리뷰 체크리스트
- [ ] TypeScript 타입 정의 완료
- [ ] 에러 핸들링 추가
- [ ] 주석 작성 (복잡한 로직)
- [ ] 테스트 코드 작성
- [ ] 성능 최적화 고려

---

## 15. 최종 요약

### 프로젝트 핵심
**React 패턴을 직접 코드를 작성하며 학습하는 인터랙티브 플랫폼**

### 핵심 가치
1. **실습 중심**: 읽기만 하는 학습에서 벗어남
2. **즉각 피드백**: 실시간 프리뷰로 학습 효과 극대화
3. **체계적 커리큘럼**: 실무 빈도 기반 15개 패턴

### 기술적 하이라이트
- Monaco Editor 통합
- 동적 코드 실행 (Babel + Function)
- Zustand 상태 관리
- 테스트 주도 개발

### 학습 효과
- React 패턴 실전 경험
- 고급 프론트엔드 기술 습득
- 포트폴리오 프로젝트 완성

### 개발 기간
- **핵심 MVP**: 4-6주
- **완성본**: 13주 (여유 있게)

---

**이 PRD를 기반으로 단계별로 구현해나가면 돼. 각 Phase마다 체크리스트를 완성하면서 진행하자!**