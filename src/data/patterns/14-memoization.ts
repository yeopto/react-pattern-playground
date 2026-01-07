import type { Pattern } from "../../types/pattern";

export const memoizationPattern: Pattern = {
  id: "memoization",
  title: "Memoization (React.memo, useMemo, useCallback)",
  category: "advanced",
  difficulty: 4,
  description: {
    problem: "불필요한 리렌더링과 연산으로 인한 성능 저하",
    solution:
      "React.memo, useMemo, useCallback을 활용해 결과를 캐싱하여 재사용",
    whenToUse: [
      "무거운 연산을 수행하는 컴포넌트",
      "props가 자주 변경되지 않는 컴포넌트",
      "큰 리스트 렌더링",
      "복잡한 계산 결과 캐싱",
    ],
    pros: [
      "불필요한 리렌더링 방지",
      "연산 비용 감소",
      "성능 향상",
      "메모리 효율성",
    ],
    cons: [
      "과도한 사용 시 오히려 성능 저하",
      "메모리 사용량 증가",
      "코드 복잡도 증가",
      "의존성 배열 관리 필요",
    ],
  },
  code: {
    before: `// 최적화 없음
import { useState } from 'react';

// 무거운 계산 함수
function expensiveCalculation(num) {
  console.log('계산 중...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
}

// 매번 리렌더링되는 자식 컴포넌트
function ChildComponent({ onClick, data }) {
  console.log('ChildComponent 렌더링');
  return <button onClick={onClick}>{data}</button>;
}

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // text 변경 시에도 매번 무거운 계산 수행
  const expensiveResult = expensiveCalculation(count);
  
  // 매번 새로운 함수 생성
  const handleClick = () => {
    console.log('클릭!');
  };
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <p>계산 결과: {expensiveResult}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      
      <input value={text} onChange={(e) => setText(e.target.value)} />
      
      {/* text 변경 시에도 리렌더링 */}
      <ChildComponent onClick={handleClick} data="버튼" />
    </div>
  );
}

export default App;`,
    after: `// Memoization 최적화
import { useState, useMemo, useCallback, memo } from 'react';

function expensiveCalculation(num) {
  console.log('계산 중...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
}

// React.memo로 props 변경 시만 리렌더링
const ChildComponent = memo(function ChildComponent({ onClick, data }) {
  console.log('ChildComponent 렌더링');
  return <button onClick={onClick}>{data}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // useMemo: count 변경 시에만 재계산
  const expensiveResult = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]); // count가 변경될 때만 재계산
  
  // useCallback: 함수 재생성 방지
  const handleClick = useCallback(() => {
    console.log('클릭!');
  }, []); // 의존성 없으므로 한 번만 생성
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <p>계산 결과: {expensiveResult}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      
      <input value={text} onChange={(e) => setText(e.target.value)} />
      
      {/* text 변경해도 리렌더링 안 됨 */}
      <ChildComponent onClick={handleClick} data="버튼" />
    </div>
  );
}

export default App;`,
    highlights: [
      "React.memo: 컴포넌트 메모이제이션",
      "useMemo: 계산 결과 캐싱",
      "useCallback: 함수 참조 유지",
      "의존성 배열로 재계산 시점 제어",
    ],
  },
  relatedPatterns: ["observer-pattern", "custom-hooks"],
};

