import type { Pattern } from "../../types/pattern";

export const contextApiPattern: Pattern = {
  id: "context-api",
  title: "Props Drilling 해결 (Context API)",
  category: "basic",
  difficulty: 2,
  description: {
    problem:
      "깊은 컴포넌트 트리에서 props를 여러 단계 거쳐 전달해야 하는 문제 (Props Drilling)",
    solution:
      "Context API를 사용해 전역 상태를 공유하고 중간 컴포넌트를 거치지 않고 데이터 전달",
    whenToUse: [
      "3단계 이상 props를 전달해야 할 때",
      "여러 컴포넌트에서 동일한 데이터가 필요할 때",
      "테마, 언어, 사용자 정보 등 전역 상태가 필요할 때",
    ],
    pros: [
      "Props drilling 제거",
      "코드 가독성 향상",
      "React 내장 API로 추가 라이브러리 불필요",
    ],
    cons: [
      "Context 값 변경 시 모든 구독 컴포넌트 리렌더링",
      "과도한 사용 시 컴포넌트 재사용성 감소",
      "테스트 복잡도 증가",
    ],
  },
  code: {
    before: `// Props Drilling 문제
import { useState } from 'react';

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
  return <div>사용자: {user.name}</div>;
}

export default App;`,
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
  return <div>사용자: {user.name}</div>;
}

export default App;`,
    highlights: [
      "createContext()로 Context 생성",
      "Provider로 값 제공",
      "useContext()로 값 소비",
      "중간 컴포넌트의 props 제거",
    ],
  },
  relatedPatterns: ["custom-hooks", "state-reducer"],
};
