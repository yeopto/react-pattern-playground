알겠습니다! 그럼 10일 안에 전체를 구현할 수 있도록 **매우 구체적이고 실행 가능한 태스크**로 쪼개드릴게요.

---

# React Pattern Playground - 10일 MVP 구현 가이드

## 🎯 10일 목표
- ✅ 15개 패턴 모두 구현
- ✅ Monaco Editor 통합
- ✅ 실시간 코드 프리뷰
- ✅ LocalStorage 진도 저장
- ⚠️ 테스트는 최소한만 (핵심 로직만)

## 📋 기술 스택 확정
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "@monaco-editor/react": "^4.6.0",
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "zustand": "^4.5.0",
    "@babel/standalone": "^7.23.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

---

## 📅 Day 1-2: 프로젝트 세팅 & 기본 구조

### Task 1.1: 프로젝트 초기화 (30분)
```bash
# 1. Vite 프로젝트 생성
npm create vite@latest react-pattern-playground -- --template react-ts

# 2. 의존성 설치
npm install react-router-dom @monaco-editor/react @emotion/react @emotion/styled zustand @babel/standalone

# 3. 폴더 구조 생성
mkdir -p src/{components/{Editor,Pattern,Layout},pages,store,data/patterns,utils,hooks,types}
```

**체크포인트**: `npm run dev`로 기본 화면 확인

---

### Task 1.2: 타입 정의 작성 (1시간)

**파일**: `src/types/pattern.ts`
```typescript
export type PatternCategory = 'basic' | 'intermediate' | 'advanced';
export type PatternDifficulty = 1 | 2 | 3 | 4 | 5;

export interface PatternDescription {
  problem: string;
  solution: string;
  whenToUse: string[];
  pros: string[];
  cons: string[];
}

export interface PatternCode {
  before: string;
  after: string;
  highlights: string[];
}

export interface Pattern {
  id: string;
  title: string;
  category: PatternCategory;
  difficulty: PatternDifficulty;
  description: PatternDescription;
  code: PatternCode;
  relatedPatterns: string[];
}

export interface UserProgress {
  patternId: string;
  userCode: string;
  completed: boolean;
  lastModified: string;
}
```

**체크포인트**: TypeScript 에러 없이 컴파일

---

### Task 1.3: 라우팅 설정 (30분)

**파일**: `src/App.tsx`
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PatternPage from './pages/PatternPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pattern/:patternId" element={<PatternPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**파일**: `src/pages/HomePage.tsx`
```typescript
export default function HomePage() {
  return <div>Pattern List (TODO)</div>;
}
```

**파일**: `src/pages/PatternPage.tsx`
```typescript
export default function PatternPage() {
  return <div>Pattern Detail (TODO)</div>;
}
```

**체크포인트**: `/`와 `/pattern/test` 라우팅 동작 확인

---

### Task 1.4: 기본 레이아웃 컴포넌트 (1시간)

**파일**: `src/components/Layout/Header.tsx`
```typescript
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  height: 60px;
  background: #1e1e1e;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const Logo = styled.h1`
  color: #3b82f6;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>React Pattern Playground</Logo>
    </HeaderContainer>
  );
}
```

**파일**: `src/components/Layout/Layout.tsx`
```typescript
import styled from '@emotion/styled';
import Header from './Header';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1e1e1e;
  color: #e5e7eb;
`;

const Main = styled.main`
  flex: 1;
  overflow: auto;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
    </LayoutContainer>
  );
}
```

**체크포인트**: Header가 모든 페이지에 표시됨

---

## 📅 Day 3: Zustand Store & LocalStorage

### Task 3.1: Progress Store 작성 (1시간)

**파일**: `src/store/useProgressStore.ts`
```typescript
import { create } from 'zustand';
import { UserProgress } from '../types/pattern';

interface ProgressState {
  progress: UserProgress[];
  
  // Actions
  saveProgress: (patternId: string, userCode: string) => void;
  markCompleted: (patternId: string) => void;
  getProgress: (patternId: string) => UserProgress | undefined;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: [],
  
  saveProgress: (patternId, userCode) => {
    set((state) => {
      const existing = state.progress.find(p => p.patternId === patternId);
      
      if (existing) {
        return {
          progress: state.progress.map(p =>
            p.patternId === patternId
              ? { ...p, userCode, lastModified: new Date().toISOString() }
              : p
          )
        };
      }
      
      return {
        progress: [
          ...state.progress,
          {
            patternId,
            userCode,
            completed: false,
            lastModified: new Date().toISOString()
          }
        ]
      };
    });
    
    // 자동으로 LocalStorage에 저장
    setTimeout(() => get().saveToLocalStorage(), 0);
  },
  
  markCompleted: (patternId) => {
    set((state) => ({
      progress: state.progress.map(p =>
        p.patternId === patternId ? { ...p, completed: true } : p
      )
    }));
    get().saveToLocalStorage();
  },
  
  getProgress: (patternId) => {
    return get().progress.find(p => p.patternId === patternId);
  },
  
  loadFromLocalStorage: () => {
    const saved = localStorage.getItem('rpp_progress');
    if (saved) {
      set({ progress: JSON.parse(saved) });
    }
  },
  
  saveToLocalStorage: () => {
    localStorage.setItem('rpp_progress', JSON.stringify(get().progress));
  }
}));
```

**체크포인트**: Store에서 데이터 저장/불러오기 테스트

---

### Task 3.2: Editor Store 작성 (30분)

**파일**: `src/store/useEditorStore.ts`
```typescript
import { create } from 'zustand';

interface EditorState {
  currentCode: string;
  showAnswer: boolean;
  
  setCurrentCode: (code: string) => void;
  toggleAnswer: () => void;
  resetCode: (initialCode: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentCode: '',
  showAnswer: false,
  
  setCurrentCode: (code) => set({ currentCode: code }),
  toggleAnswer: () => set((state) => ({ showAnswer: !state.showAnswer })),
  resetCode: (initialCode) => set({ currentCode: initialCode, showAnswer: false })
}));
```

**체크포인트**: Store 동작 확인

---

## 📅 Day 4: 패턴 데이터 작성 (15개)

### Task 4.1: 패턴 데이터 템플릿 (30분)

**파일**: `src/data/patterns/template.ts`
```typescript
import { Pattern } from '../../types/pattern';

export const patternTemplate: Pattern = {
  id: 'example-pattern',
  title: 'Pattern Name',
  category: 'basic',
  difficulty: 1,
  description: {
    problem: '해결하려는 문제',
    solution: '패턴 설명',
    whenToUse: ['언제 사용하는지'],
    pros: ['장점'],
    cons: ['단점']
  },
  code: {
    before: `// Before 코드`,
    after: `// After 코드`,
    highlights: ['주요 변경점']
  },
  relatedPatterns: []
};
```

---

### Task 4.2: 15개 패턴 데이터 작성 (6시간)

**각 패턴당 20-30분 투자**

**파일**: `src/data/patterns/01-context-api.ts`
```typescript
import { Pattern } from '../../types/pattern';

export const contextApiPattern: Pattern = {
  id: 'context-api',
  title: 'Props Drilling 해결 (Context API)',
  category: 'basic',
  difficulty: 2,
  description: {
    problem: '깊은 컴포넌트 트리에서 props를 여러 단계 거쳐 전달해야 하는 문제',
    solution: 'Context API를 사용해 전역 상태를 공유하고 중간 컴포넌트를 거치지 않고 데이터 전달',
    whenToUse: [
      '3단계 이상 props를 전달해야 할 때',
      '여러 컴포넌트에서 동일한 데이터가 필요할 때',
      '테마, 언어, 사용자 정보 등 전역 상태가 필요할 때'
    ],
    pros: [
      'Props drilling 제거',
      '코드 가독성 향상',
      'React 내장 API로 추가 라이브러리 불필요'
    ],
    cons: [
      'Context 값 변경 시 모든 구독 컴포넌트 리렌더링',
      '과도한 사용 시 컴포넌트 재사용성 감소',
      '테스트 복잡도 증가'
    ]
  },
  code: {
    before: `// Props Drilling 문제
function App() {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <div>{user.name}</div>;
}`,
    after: `// Context API 사용
import { createContext, useContext, useState } from 'react';

// 1. Context 생성
const UserContext = createContext(null);

// 2. Provider 컴포넌트
function App() {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

// 3. 중간 컴포넌트는 props 불필요
function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

// 4. 필요한 곳에서 직접 사용
function GrandChild() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}`,
    highlights: [
      'createContext()로 Context 생성',
      'Provider로 값 제공',
      'useContext()로 값 소비',
      '중간 컴포넌트의 props 제거'
    ]
  },
  relatedPatterns: ['custom-hooks', 'state-reducer']
};
```

**나머지 14개 패턴도 동일한 형식으로 작성**

**파일 목록**:
- `02-compound-components.ts`
- `03-custom-hooks.ts`
- `04-render-props.ts`
- `05-hoc.ts`
- `06-container-presentational.ts`
- `07-control-props.ts`
- `08-state-reducer.ts`
- `09-props-getter.ts`
- `10-lazy-loading.ts`
- `11-portal.ts`
- `12-error-boundary.ts`
- `13-observer-pattern.ts`
- `14-memoization.ts`
- `15-proxy-pattern.ts`

---

### Task 4.3: 패턴 인덱스 파일 (15분)

**파일**: `src/data/patterns/index.ts`
```typescript
import { contextApiPattern } from './01-context-api';
import { compoundPattern } from './02-compound-components';
// ... 나머지 import

export const patterns = [
  contextApiPattern,
  compoundPattern,
  // ... 나머지 패턴
];

export const getPatternById = (id: string) => {
  return patterns.find(p => p.id === id);
};
```

**체크포인트**: `patterns` 배열에 15개 모두 포함 확인

---

## 📅 Day 5: Monaco Editor 통합

### Task 5.1: Monaco Editor 기본 설정 (1시간)

**파일**: `src/components/Editor/MonacoEditor.tsx`
```typescript
import { Editor } from '@monaco-editor/react';
import styled from '@emotion/styled';

const EditorContainer = styled.div`
  height: 100%;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
`;

interface MonacoEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function MonacoEditor({ value, onChange, readOnly = false }: MonacoEditorProps) {
  return (
    <EditorContainer>
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          readOnly,
          automaticLayout: true,
        }}
      />
    </EditorContainer>
  );
}
```

**체크포인트**: 에디터가 화면에 표시되고 타이핑 가능

---

### Task 5.2: 코드 변경 디바운스 Hook (30분)

**파일**: `src/hooks/useDebounce.ts`
```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**체크포인트**: 디바운스 동작 확인

---

## 📅 Day 6: 동적 코드 실행 시스템

### Task 6.1: Babel 변환 유틸 (1.5시간)

**파일**: `src/utils/codeExecutor.ts`
```typescript
import { transform } from '@babel/standalone';

export interface ExecutionResult {
  success: boolean;
  component?: React.ComponentType;
  error?: string;
}

export function executeCode(code: string): ExecutionResult {
  try {
    // 1. Babel로 JSX -> JS 변환
    const transformed = transform(code, {
      presets: ['react', 'typescript'],
      filename: 'component.tsx'
    }).code;

    if (!transformed) {
      throw new Error('변환 실패');
    }

    // 2. React import 추가
    const fullCode = `
      const { useState, useEffect, useContext, createContext, useMemo, useCallback, memo } = React;
      ${transformed}
      return Component;
    `;

    // 3. Function으로 컴포넌트 생성
    const ComponentFunction = new Function('React', fullCode);
    const Component = ComponentFunction(React);

    return {
      success: true,
      component: Component
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 에러'
    };
  }
}
```

**체크포인트**: 간단한 컴포넌트 코드 실행 테스트

---

### Task 6.2: 코드 프리뷰 컴포넌트 (2시간)

**파일**: `src/components/Editor/CodePreview.tsx`
```typescript
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { executeCode, ExecutionResult } from '../../utils/codeExecutor';

const PreviewContainer = styled.div`
  height: 100%;
  border: 1px solid #333;
  border-radius: 8px;
  background: #fff;
  padding: 16px;
  overflow: auto;
  position: relative;
`;

const ErrorDisplay = styled.div`
  background: #fee;
  color: #c00;
  padding: 16px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  white-space: pre-wrap;
`;

const LoadingDisplay = styled.div`
  color: #666;
  text-align: center;
  padding: 32px;
`;

interface CodePreviewProps {
  code: string;
}

export default function CodePreview({ code }: CodePreviewProps) {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // 약간의 딜레이를 주어 UI 블로킹 방지
    const timer = setTimeout(() => {
      const executionResult = executeCode(code);
      setResult(executionResult);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [code]);

  if (isLoading) {
    return (
      <PreviewContainer>
        <LoadingDisplay>코드 실행 중...</LoadingDisplay>
      </PreviewContainer>
    );
  }

  if (!result) {
    return (
      <PreviewContainer>
        <LoadingDisplay>코드를 작성해주세요</LoadingDisplay>
      </PreviewContainer>
    );
  }

  if (!result.success || !result.component) {
    return (
      <PreviewContainer>
        <ErrorDisplay>{result.error}</ErrorDisplay>
      </PreviewContainer>
    );
  }

  const Component = result.component;

  return (
    <PreviewContainer>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </PreviewContainer>
  );
}

// Error Boundary
class ErrorBoundary extends React.Component
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay>
          런타임 에러: {this.state.error?.message}
        </ErrorDisplay>
      );
    }

    return this.props.children;
  }
}
```

**체크포인트**: 코드 작성 시 실시간으로 렌더링 확인

---

## 📅 Day 7: 패턴 페이지 구현

### Task 7.1: 패턴 상세 페이지 레이아웃 (2시간)

**파일**: `src/pages/PatternPage.tsx`
```typescript
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getPatternById } from '../data/patterns';
import { useProgressStore } from '../store/useProgressStore';
import { useEditorStore } from '../store/useEditorStore';
import { useDebounce } from '../hooks/useDebounce';
import MonacoEditor from '../components/Editor/MonacoEditor';
import CodePreview from '../components/Editor/CodePreview';
import Layout from '../components/Layout/Layout';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 16px;
  padding: 24px;
  height: calc(100vh - 60px);
`;

const DescriptionSection = styled.section`
  grid-column: 1 / -1;
  background: #2a2a2a;
  padding: 24px;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #3b82f6;
  font-size: 28px;
  margin: 0 0 16px 0;
`;

const Description = styled.div`
  color: #e5e7eb;
  line-height: 1.6;
  
  h3 {
    color: #8b5cf6;
    font-size: 18px;
    margin: 16px 0 8px 0;
  }
  
  ul {
    margin: 8px 0;
    padding-left: 20px;
  }
`;

const EditorSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  color: #e5e7eb;
  font-size: 18px;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    &:hover { background: #2563eb; }
  ` : `
    background: #374151;
    color: #e5e7eb;
    &:hover { background: #4b5563; }
  `}
`;

export default function PatternPage() {
  const { patternId } = useParams<{ patternId: string }>();
  const pattern = getPatternById(patternId || '');
  
  const { saveProgress, getProgress, markCompleted } = useProgressStore();
  const { currentCode, showAnswer, setCurrentCode, toggleAnswer, resetCode } = useEditorStore();
  
  const [localCode, setLocalCode] = useState('');
  const debouncedCode = useDebounce(localCode, 1000);

  // 초기 로드
  useEffect(() => {
    if (!pattern) return;
    
    const saved = getProgress(pattern.id);
    const initialCode = saved?.userCode || pattern.code.before;
    
    setLocalCode(initialCode);
    setCurrentCode(initialCode);
  }, [pattern?.id]);

  // 디바운스된 코드 저장
  useEffect(() => {
    if (debouncedCode && pattern) {
      setCurrentCode(debouncedCode);
      saveProgress(pattern.id, debouncedCode);
    }
  }, [debouncedCode]);

  if (!pattern) {
    return (
      <Layout>
        <div>패턴을 찾을 수 없습니다.</div>
      </Layout>
    );
  }

  const handleReset = () => {
    setLocalCode(pattern.code.before);
    resetCode(pattern.code.before);
  };

  const handleComplete = () => {
    markCompleted(pattern.id);
    alert('완료했습니다!');
  };

  return (
    <Layout>
      <PageContainer>
        {/* 설명 섹션 */}
        <DescriptionSection>
          <Title>{pattern.title}</Title>
          <Description>
            <h3>💡 해결하는 문제</h3>
            <p>{pattern.description.problem}</p>
            
            <h3>✅ 해결 방법</h3>
            <p>{pattern.description.solution}</p>
            
            <h3>📌 언제 사용하나요?</h3>
            <ul>
              {pattern.description.whenToUse.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            
            <h3>👍 장점</h3>
            <ul>
              {pattern.description.pros.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            
            <h3>👎 단점</h3>
            <ul>
              {pattern.description.cons.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Description>
        </DescriptionSection>

        {/* 에디터 섹션 */}
        <EditorSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SectionTitle>
              {showAnswer ? '✨ 정답 코드' : '📝 코드 작성'}
            </SectionTitle>
            <ButtonGroup>
              <Button variant="secondary" onClick={handleReset}>
                초기화
              </Button>
              <Button variant="secondary" onClick={toggleAnswer}>
                {showAnswer ? '내 코드 보기' : '정답 보기'}
              </Button>
              <Button variant="primary" onClick={handleComplete}>
                완료 체크
              </Button>
            </ButtonGroup>
          </div>
          
          <div style={{ flex: 1, minHeight: 0 }}>
            <MonacoEditor
              value={showAnswer ? pattern.code.after : localCode}
              onChange={(value) => setLocalCode(value || '')}
              readOnly={showAnswer}
            />
          </div>
        </EditorSection>

        {/* 프리뷰 섹션 */}
        <EditorSection>
          <SectionTitle>🎨 실시간 프리뷰</SectionTitle>
          <div style={{ flex: 1, minHeight: 0 }}>
            <CodePreview code={currentCode} />
          </div>
        </EditorSection>
      </PageContainer>
    </Layout>
  );
}
```

**체크포인트**: 
- 패턴 설명 표시
- 에디터에 코드 작성 가능
- 프리뷰에 결과 표시
- 정답 보기/초기화 동작

---

## 📅 Day 8: 패턴 목록 페이지

### Task 8.1: 패턴 카드 컴포넌트 (1시간)

**파일**: `src/components/Pattern/PatternCard.tsx`
```typescript
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Pattern } from '../../types/pattern';
import { useProgressStore } from '../../store/useProgressStore';

const Card = styled(Link)<{ completed: boolean }>`
  display: block;
  background: #2a2a2a;
  border: 2px solid ${props => props.completed ? '#10b981' : '#333'};
  border-radius: 8px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const CompletedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #10b981;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const Title = styled.h3`
  color: #e5e7eb;
  font-size: 20px;
  margin: 0 0 12px 0;
`;

const Meta = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

const Badge = styled.span<{ color: string }>`
  background: ${props => props.color};
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const Problem = styled.p`
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

interface PatternCardProps {
  pattern: Pattern;
}

const categoryColors = {
  basic: '#3b82f6',
  intermediate: '#f59e0b',
  advanced: '#ef4444'
};

export default function PatternCard({ pattern }: PatternCardProps) {
  const { progress } = useProgressStore();
  const completed = progress.find(p => p.patternId === pattern.id)?.completed || false;

  return (
    <Card to={`/pattern/${pattern.id}`} completed={completed}>
      {completed && <CompletedBadge>✓ 완료</CompletedBadge>}
      
      <Title>{pattern.title}</Title>
      
      <Meta>
        <Badge color={categoryColors[pattern.category]}>
          {pattern.category}
        </Badge>
        <Badge color="#6b7280">
          난이도 {'⭐'.repeat(pattern.difficulty)}
        </Badge>
      </Meta>
      
      <Problem>{pattern.description.problem}</Problem>
    </Card>
  );
}
```

**체크포인트**: 패턴 카드 스타일 확인

---

### Task 8.2: 패턴 목록 페이지 (1.5시간)

**파일**: `src/pages/HomePage.tsx`
```typescript
import styled from '@emotion/styled';
import { patterns } from '../data/patterns';
import { useProgressStore } from '../store/useProgressStore';
import PatternCard from '../components/Pattern/PatternCard';
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #3b82f6;
  margin: 0 0 16px 0;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #9ca3af;
  margin: 0;
`;

const ProgressBar = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
`;

const ProgressText = styled.div`
  font-size: 18px;
  color: #e5e7eb;
  margin-bottom: 12px;
`;

const ProgressTrack = styled.div`
  background: #374151;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s;
`;

const CategorySection = styled.section`
  margin-bottom: 48px;
`;

const CategoryTitle = styled.h2`
  font-size: 28px;
  color: #e5e7eb;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #374151;
`;

const PatternGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

export default function HomePage() {
  const { progress, loadFromLocalStorage } = useProgressStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const completedCount = progress.filter(p => p.completed).length;
  const totalCount = patterns.length;
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const basicPatterns = patterns.filter(p => p.category === 'basic');
  const intermediatePatterns = patterns.filter(p => p.category === 'intermediate');
  const advancedPatterns = patterns.filter(p => p.category === 'advanced');

  return (
    <Layout>
      <Container>
        <Hero>
          <Title>React Pattern Playground</Title>
          <Subtitle>실습으로 배우는 React 디자인 패턴</Subtitle>
        </Hero>

        <ProgressBar>
          <ProgressText>
            학습 진행률: {completedCount} / {totalCount} 완료
          </ProgressText>
          <ProgressTrack>
            <ProgressFill percentage={percentage} />
          </ProgressTrack>
        </ProgressBar>

        {basicPatterns.length > 0 && (
          <CategorySection>
            <CategoryTitle>🌱 기본 패턴</CategoryTitle>
            <PatternGrid>
              {basicPatterns.map(pattern => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </PatternGrid>
          </CategorySection>
        )}

        {intermediatePatterns.length > 0 && (
          <CategorySection>
            <CategoryTitle>🔥 중급 패턴</CategoryTitle>
            <PatternGrid>
              {intermediatePatterns.map(pattern => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </PatternGrid>
          </CategorySection>
        )}

        {advancedPatterns.length > 0 && (
          <CategorySection>
            <CategoryTitle>⚡ 고급 패턴</CategoryTitle>
            <PatternGrid>
              {advancedPatterns.map(pattern => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </PatternGrid>
          </CategorySection>
        )}
      </Container>
    </Layout>
  );
}
```

**체크포인트**:
- 진행률 바 표시
- 카테고리별 패턴 분류
- 완료된 패턴 표시
- 패턴 클릭 시 상세 페이지 이동

---

## 📅 Day 9: 폴리싱 & 버그 수정

### Task 9.1: 전역 스타일 설정 (30분)

**파일**: `src/index.css`
```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1e1e1e;
  color: #e5e7eb;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

#root {
  height: 100vh;
}
```

---

### Task 9.2: 에러 처리 개선 (1시간)

**파일**: `src/utils/codeExecutor.ts` (개선)
```typescript
// 더 친절한 에러 메시지 추가
export function executeCode(code: string): ExecutionResult {
  try {
    // 빈 코드 체크
    if (!code.trim()) {
      return {
        success: false,
        error: '코드를 작성해주세요.'
      };
    }

    // Component export 체크
    if (!code.includes('export default') && !code.includes('function Component')) {
      return {
        success: false,
        error: 'Component를 export 해주세요. 예: export default function Component() { ... }'
      };
    }

    // Babel 변환
    const transformed = transform(code, {
      presets: ['react', 'typescript'],
      filename: 'component.tsx'
    }).code;

    if (!transformed) {
      throw new Error('코드 변환에 실패했습니다.');
    }

    // React API 주입
    const fullCode = `
      const { useState, useEffect, useContext, createContext, useMemo, useCallback, memo, Fragment } = React;
      ${transformed}
      
      // export default 제거하고 컴포넌트 반환
      const exportedComponent = ${transformed.includes('export default') ? 'Component' : 'Component'};
      return exportedComponent;
    `;

    const ComponentFunction = new Function('React', fullCode);
    const Component = ComponentFunction(React);

    return {
      success: true,
      component: Component
    };
  } catch (error) {
    let errorMessage = '알 수 없는 에러가 발생했습니다.';
    
    if (error instanceof Error) {
      if (error.message.includes('Unexpected token')) {
        errorMessage = '문법 에러: JSX 문법을 확인해주세요.';
      } else if (error.message.includes('is not defined')) {
        errorMessage = '변수가 정의되지 않았습니다: ' + error.message;
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}
```

---

### Task 9.3: 로딩 & 빈 상태 UI (1시간)

**파일**: `src/components/Editor/CodePreview.tsx` (개선)
```typescript
// LoadingDisplay와 EmptyDisplay 컴포넌트 추가
const EmptyDisplay = styled.div`
  color: #9ca3af;
  text-align: center;
  padding: 48px 24px;
  
  h3 {
    font-size: 18px;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 14px;
    margin: 0;
  }
`;

// CodePreview 컴포넌트에 빈 상태 처리 추가
export default function CodePreview({ code }: CodePreviewProps) {
  // ... 기존 코드

  if (!code.trim()) {
    return (
      <PreviewContainer>
        <EmptyDisplay>
          <h3>👈 왼쪽에 코드를 작성해보세요</h3>
          <p>작성한 코드가 실시간으로 렌더링됩니다</p>
        </EmptyDisplay>
      </PreviewContainer>
    );
  }

  // ... 나머지 코드
}
```

---

### Task 9.4: 반응형 경고 메시지 (30분)

**파일**: `src/components/Layout/MobileWarning.tsx`
```typescript
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const WarningOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
`;

const WarningBox = styled.div`
  background: #2a2a2a;
  border: 2px solid #ef4444;
  border-radius: 12px;
  padding: 32px;
  max-width: 400px;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: #ef4444;
  font-size: 24px;
  margin: 0 0 16px 0;
`;

const Message = styled.p`
  color: #e5e7eb;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
`;

export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <WarningOverlay>
      <WarningBox>
        <Icon>📱</Icon>
        <Title>모바일은 지원되지 않습니다</Title>
        <Message>
          코드 에디터는 데스크톱 환경에 최적화되어 있습니다.
          <br /><br />
          PC 또는 태블릿에서 접속해주세요.
        </Message>
      </WarningBox>
    </WarningOverlay>
  );
}
```

**파일**: `src/App.tsx` (MobileWarning 추가)
```typescript
import MobileWarning from './components/Layout/MobileWarning';

function App() {
  return (
    <>
      <MobileWarning />
      <BrowserRouter>
        {/* ... */}
      </BrowserRouter>
    </>
  );
}
```

---

### Task 9.5: 버그 수정 체크리스트 (2시간)

**체크 항목**:
- [ ] 에디터에서 코드 입력 시 자동 저장 동작
- [ ] 정답 보기 토글 시 코드 전환
- [ ] 초기화 버튼 동작
- [ ] 진행률 저장/불러오기
- [ ] 에러 발생 시 적절한 메시지 표시
- [ ] 브라우저 새로고침 시 작성 중인 코드 유지
- [ ] Monaco Editor가 창 크기에 맞게 조정
- [ ] 모든 패턴 데이터 올바르게 표시
- [ ] 라우팅 404 처리
- [ ] TypeScript 타입 에러 0개

---

## 📅 Day 10: 배포 & 문서화

### Task 10.1: README 작성 (1시간)

**파일**: `README.md`
```markdown
# React Pattern Playground

실습으로 배우는 React 디자인 패턴 학습 플랫폼

## 🎯 프로젝트 소개

React의 15가지 디자인 패턴을 **직접 코드를 작성하며** 학습할 수 있는 인터랙티브 웹 애플리케이션입니다.

### 주요 기능
- 📝 Monaco Editor 기반 코드 에디터
- 🎨 실시간 코드 프리뷰
- 💾 LocalStorage 기반 학습 진도 저장
- ✨ 15개 React 디자인 패턴 커리큘럼

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Emotion
- **State**: Zustand
- **Editor**: Monaco Editor
- **Code Execution**: Babel Standalone
- **Build**: Vite

## 📦 설치 및 실행

```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 📚 학습 패턴 목록

### 기본 패턴
1. Context API - Props Drilling 해결
2. Compound Components - 복잡한 컴포넌트 구조화
3. Custom Hooks - 로직 재사용
4. Render Props - 렌더링 로직 공유
5. Higher-Order Components - 컴포넌트 기능 확장

### 중급 패턴
6. Container/Presentational - 관심사 분리
7. Control Props - 외부 제어 가능한 컴포넌트
8. State Reducer - 복잡한 상태 관리
9. Props Getter - Props 일괄 전달
10. Lazy Loading - 코드 스플리팅

### 고급 패턴
11. Portal - DOM 트리 외부 렌더링
12. Error Boundary - 에러 처리
13. Observer Pattern - 외부 데이터 구독
14. Memoization - 성능 최적화
15. Proxy Pattern - 불변성 관리

## 🏗️ 아키텍처

```
src/
├── components/       # React 컴포넌트
│   ├── Editor/      # 에디터 관련
│   ├── Pattern/     # 패턴 카드
│   └── Layout/      # 레이아웃
├── pages/           # 페이지 컴포넌트
├── store/           # Zustand 스토어
├── data/            # 패턴 데이터
├── utils/           # 유틸리티 함수
├── hooks/           # 커스텀 훅
└── types/           # TypeScript 타입
```

## 💡 주요 구현 사항

### 동적 코드 실행
- Babel Standalone으로 JSX를 JavaScript로 변환
- `new Function()`으로 동적 컴포넌트 생성
- Error Boundary로 런타임 에러 처리

### 상태 관리
- Zustand로 전역 상태 관리
- LocalStorage로 진도 영속화
- 디바운스 기반 자동 저장

### 코드 에디터
- Monaco Editor 통합
- TypeScript 지원
- VS Code 테마 적용

## 🎓 학습 효과

이 프로젝트를 통해 다음을 학습할 수 있습니다:
- React 디자인 패턴 15가지
- TypeScript 고급 타입 활용
- 동적 코드 실행 구현
- Monaco Editor 통합
- Zustand 상태 관리

## 📝 라이선스

MIT License

## 👤 개발자

Geonyeop Kim
```

---

### Task 10.2: Vercel 배포 (30분)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 프로젝트 연결 및 배포
vercel

# 4. 프로덕션 배포
vercel --prod
```

**배포 설정** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**체크포인트**:
- [ ] 배포 성공
- [ ] URL 접속 가능
- [ ] 모든 기능 정상 동작

---

### Task 10.3: 포트폴리오 문서 작성 (1시간)

**파일**: `PORTFOLIO.md`
```markdown
# React Pattern Playground - 포트폴리오

## 📌 프로젝트 개요

**개발 기간**: 10일  
**역할**: 개인 프로젝트 (기획, 설계, 개발)  
**목적**: React 디자인 패턴 학습 및 고급 프론트엔드 기술 습득

## 🎯 기술적 도전 과제

### 1. 동적 코드 실행 시스템
**문제**: 사용자가 작성한 문자열 코드를 실제 React 컴포넌트로 실행

**해결**:
- Babel Standalone으로 JSX → JavaScript 변환
- `new Function()`으로 동적 함수 생성
- Error Boundary로 3단계 에러 처리 (변환/타입/런타임)

**결과**: 
- 백엔드 없이 브라우저에서 코드 실행
- 실시간 프리뷰 제공
- 안전한 에러 핸들링

### 2. Monaco Editor 통합
**문제**: VS Code 수준의 코드 편집 경험 제공

**해결**:
- @monaco-editor/react 라이브러리 통합
- TypeScript 타입 정의 주입
- 자동완성, 문법 하이라이팅 설정

**결과**:
- 전문적인 코드 편집 환경
- TypeScript 타입 체크
- VS Code 테마 적용

### 3. 상태 관리 및 영속화
**문제**: 학습 진도를 저장하고 관리

**해결**:
- Zustand로 전역 상태 관리
- LocalStorage로 데이터 영속화
- 디바운스 기반 자동 저장 (1초)

**결과**:
- 브라우저 새로고침해도 진도 유지
- 패턴별 완료 상태 추적
- 진행률 시각화

## 📊 기술 스택 선택 이유

| 기술 | 선택 이유 |
|------|----------|
| Vite | 빠른 개발 서버, 간단한 설정 |
| TypeScript | 타입 안정성, 코드 품질 향상 |
| Emotion | CSS-in-JS, 컴포넌트 스타일링 용이 |
| Zustand | 가볍고 간단한 상태 관리 |
| Monaco | 최고 수준의 코드 에디터 |
| Babel Standalone | 브라우저에서 JSX 변환 |

## 🏗️ 아키텍처 설계

### 컴포넌트 구조
```
App
├── Layout
│   ├── Header
│   └── MobileWarning
├── HomePage
│   └── PatternCard
└── PatternPage
    ├── MonacoEditor
    └── CodePreview (with ErrorBoundary)
```

### 데이터 플로우
```
사용자 입력
    ↓
Monaco Editor
    ↓
디바운스 (1초)
    ↓
Zustand Store
    ↓
├─ LocalStorage 저장
└─ CodePreview 업데이트
    ↓
Babel 변환
    ↓
동적 실행
    ↓
렌더링 or 에러 표시
```

## 💪 개발 역량

### 강점
- ✅ React 디자인 패턴 15개 구현
- ✅ 복잡한 상태 관리 (에디터, 진도, UI)
- ✅ 동적 코드 실행 시스템 구현
- ✅ TypeScript 타입 안정성
- ✅ Emotion 스타일링

### 개선 여지
- 테스트 코드 미작성 (시간 제약)
- 성능 최적화 여지 (Monaco 번들 크기)
- 접근성 개선 필요

## 🎓 학습 성과

### 기술적 학습
1. **React 패턴**: 15개 패턴의 실전 사용법
2. **고급 프론트엔드**: 동적 코드 실행, Monaco Editor
3. **상태 관리**: Zustand 실전 경험
4. **TypeScript**: 복잡한 타입 정의

### 문제 해결
- Babel 변환 에러 핸들링
- React API 동적 주입
- 에디터 성능 최적화

## 📈 향후 개선 계획

1. **테스트 추가**: Vitest + React Testing Library
2. **성능 최적화**: Monaco lazy loading, 코드 스플리팅
3. **기능 확장**: 
   - 유저 간 코드 공유
   - AI 코드 리뷰
   - 퀴즈 모드

## 🔗 링크

- **배포 URL**: [Vercel URL]
- **GitHub**: [Repository URL]
```

---

### Task 10.4: 최종 체크리스트 (30분)

**기능 체크**:
- [ ] 모든 패턴 (15개) 정상 작동
- [ ] 코드 에디터 입력 가능
- [ ] 실시간 프리뷰 동작
- [ ] 정답 보기/초기화 동작
- [ ] 진도 저장/불러오기
- [ ] 완료 체크 동작
- [ ] 진행률 바 표시
- [ ] 패턴 카드 클릭 시 이동
- [ ] 모바일 경고 표시

**코드 품질**:
- [ ] TypeScript 에러 0개
- [ ] ESLint 경고 0개
- [ ] Console 에러 없음
- [ ] 주석 추가 (복잡한 로직)

**배포 확인**:
- [ ] Vercel 배포 성공
- [ ] 프로덕션 빌드 정상
- [ ] 모든 라우트 접근 가능
- [ ] 빠른 로딩 속도

**문서화**:
- [ ] README.md 완성
- [ ] PORTFOLIO.md 완성
- [ ] 코드 주석 적절

---

## ✅ 최종 점검 사항

### Day 1-2: 기본 세팅
- [x] Vite 프로젝트 생성
- [x] 타입 정의
- [x] 라우팅 설정
- [x] 레이아웃 컴포넌트

### Day 3: Store
- [x] Progress Store
- [x] Editor Store
- [x] LocalStorage 연동

### Day 4: 패턴 데이터
- [x] 15개 패턴 데이터 작성
- [x] 패턴 인덱스

### Day 5: Monaco Editor
- [x] 에디터 통합
- [x] 디바운스 Hook

### Day 6: 코드 실행
- [x] Babel 변환 유틸
- [x] 코드 프리뷰
- [x] Error Boundary

### Day 7: 패턴 페이지
- [x] 패턴 상세 페이지
- [x] 에디터/프리뷰 연동

### Day 8: 목록 페이지
- [x] 패턴 카드
- [x] 패턴 목록
- [x] 진행률 표시

### Day 9: 폴리싱
- [x] 전역 스타일
- [x] 에러 처리 개선
- [x] 빈 상태 UI
- [x] 모바일 경고
- [x] 버그 수정

### Day 10: 배포
- [x] README 작성
- [x] Vercel 배포
- [x] 포트폴리오 문서
- [x] 최종 체크

---

## 🎉 완성!

이제 다음을 얻었습니다:
1. ✅ 동작하는 React Pattern Playground
2. ✅ 15개 패턴 실습 플랫폼
3. ✅ 포트폴리오 프로젝트
4. ✅ React 패턴 깊은 이해
5. ✅ 고급 프론트엔드 기술 경험

**다음 단계**: 테스트 코드 추가, 성능 최적화, 기능 확장!