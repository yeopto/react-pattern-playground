import type { Pattern } from "../../types/pattern";

export const portalPattern: Pattern = {
  id: "portal",
  title: "Portal Pattern",
  category: "advanced",
  difficulty: 3,
  description: {
    problem:
      "모달, 툴팁 등을 DOM 트리 외부에 렌더링해야 하는데 CSS나 z-index 문제 발생",
    solution:
      "ReactDOM.createPortal을 사용해 부모 컴포넌트의 DOM 계층 구조 외부에 렌더링",
    whenToUse: [
      "모달, 다이얼로그 구현",
      "툴팁, 드롭다운 메뉴",
      "오버레이, 알림(Toast)",
      "z-index stacking context 문제 해결",
    ],
    pros: [
      "CSS overflow 제약 회피",
      "z-index 관리 용이",
      "접근성 향상",
      "레이아웃 독립성",
    ],
    cons: [
      "이벤트 버블링 주의 필요",
      "DOM 구조 복잡도 증가",
      "서버 사이드 렌더링 고려 필요",
    ],
  },
  code: {
    before: `// 일반 렌더링 방식
import { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  // 부모 DOM 내부에 렌더링 → overflow, z-index 문제
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
      }}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <h1>Portal 예제</h1>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      {/* 부모의 overflow: hidden 영향 받음 */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>모달 내용</h2>
        <p>이것은 모달입니다</p>
      </Modal>
    </div>
  );
}`,
    after: `// Portal Pattern
import { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  // document.body에 직접 렌더링
  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
      }}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>,
    document.body // DOM 트리 외부로 렌더링
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <h1>Portal 예제</h1>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      {/* 부모의 CSS 영향 받지 않음 */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>모달 내용</h2>
        <p>부모 overflow에 영향받지 않습니다</p>
      </Modal>
    </div>
  );
}`,
    highlights: [
      "createPortal(children, container)",
      "document.body에 직접 렌더링",
      "부모의 CSS 제약에서 자유로움",
      "이벤트는 여전히 React 트리를 따라 버블링",
    ],
  },
  relatedPatterns: ["lazy-loading", "error-boundary"],
};

