import type { Pattern } from "../../types/pattern";

export const renderPropsPattern: Pattern = {
  id: "render-props",
  title: "Render Props",
  category: "basic",
  difficulty: 3,
  description: {
    problem: "컴포넌트 간 로직을 공유하면서도 렌더링은 유연하게 제어하고 싶음",
    solution:
      "함수를 prop으로 전달하여, 컴포넌트가 무엇을 렌더링할지 외부에서 결정",
    whenToUse: [
      "로직은 공유하지만 UI는 다른 경우",
      "마우스 추적, 스크롤 감지 등 동작 로직 공유",
      "Custom Hook 이전 시대의 로직 공유 패턴",
    ],
    pros: [
      "높은 유연성",
      "명시적인 데이터 흐름",
      "로직과 UI 완전 분리",
    ],
    cons: [
      "Render Props 중첩 시 가독성 저하 (Callback Hell)",
      "Custom Hooks로 대체 가능",
      "타입 정의 복잡",
    ],
  },
  code: {
    before: `// 마우스 위치를 추적하는 로직이 각 컴포넌트에 중복
import { useState, useEffect } from 'react';

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return <div>마우스 위치: {position.x}, {position.y}</div>;
}

function AnotherComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return <div>X: {position.x}, Y: {position.y}</div>;
}

export default MouseTracker;`,
    after: `// Render Props 패턴
import { useState, useEffect } from 'react';

// 로직을 담당하는 컴포넌트
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return render(position);
}

// UI는 외부에서 결정
function MouseTracker() {
  return (
    <Mouse 
      render={(position) => (
        <div>마우스 위치: {position.x}, {position.y}</div>
      )}
    />
  );
}

function AnotherComponent() {
  return (
    <Mouse 
      render={(position) => (
        <div>X: {position.x}, Y: {position.y}</div>
      )}
    />
  );
}

export default MouseTracker;`,
    highlights: [
      "로직 컴포넌트 (Mouse)와 UI 분리",
      "render prop으로 함수 전달",
      "동일 로직, 다른 UI 렌더링",
      "명시적 데이터 전달",
    ],
  },
  relatedPatterns: ["custom-hooks", "hoc"],
};

