import type { Pattern } from "../../types/pattern";

export const propsGetterPattern: Pattern = {
  id: "props-getter",
  title: "Props Getter Pattern",
  category: "intermediate",
  difficulty: 3,
  description: {
    problem: "여러 props를 일일이 전달하는 것이 번거롭고 실수하기 쉬움",
    solution: "필요한 props를 묶어서 반환하는 getter 함수를 제공",
    whenToUse: [
      "여러 props를 반복적으로 전달해야 할 때",
      "접근성(a11y) 관련 props를 자동으로 추가",
      "이벤트 핸들러와 속성을 일괄 전달",
    ],
    pros: [
      "props 전달 실수 방지",
      "일관된 props 적용",
      "접근성 자동 적용",
      "사용자 경험 향상",
    ],
    cons: [
      "암묵적인 props 전달로 명시성 감소",
      "디버깅 난이도 증가 가능",
      "props 오버라이드 고려 필요",
    ],
  },
  code: {
    before: `// props를 일일이 전달
import { useState } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        선택하기
      </button>
      {isOpen && (
        <ul role="listbox">
          <li
            role="option"
            aria-selected={selectedIndex === 0}
            onClick={() => {
              setSelectedIndex(0);
              setIsOpen(false);
            }}
          >
            Option 1
          </li>
          <li
            role="option"
            aria-selected={selectedIndex === 1}
            onClick={() => {
              setSelectedIndex(1);
              setIsOpen(false);
            }}
          >
            Option 2
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;`,
    after: `// Props Getter Pattern
import { useState } from 'react';

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // 버튼에 필요한 props를 묶어서 반환
  const getToggleButtonProps = () => ({
    onClick: () => setIsOpen(!isOpen),
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox',
    type: 'button',
  });
  
  // 옵션 아이템에 필요한 props를 묶어서 반환
  const getItemProps = (index) => ({
    role: 'option',
    'aria-selected': selectedIndex === index,
    onClick: () => {
      setSelectedIndex(index);
      setIsOpen(false);
    },
  });
  
  const getMenuProps = () => ({
    role: 'listbox',
  });
  
  return {
    isOpen,
    selectedIndex,
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
  };
}

function Dropdown() {
  const { isOpen, getToggleButtonProps, getItemProps, getMenuProps } = useDropdown();
  
  return (
    <div>
      {/* props를 spread로 간단히 적용 */}
      <button {...getToggleButtonProps()}>
        선택하기
      </button>
      {isOpen && (
        <ul {...getMenuProps()}>
          <li {...getItemProps(0)}>Option 1</li>
          <li {...getItemProps(1)}>Option 2</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;`,
    highlights: [
      "getToggleButtonProps로 필요한 props 일괄 반환",
      "접근성 관련 속성 자동 적용",
      "이벤트 핸들러와 상태를 함께 제공",
      "spread 연산자로 간편한 적용",
    ],
  },
  relatedPatterns: ["custom-hooks", "compound-components"],
};

