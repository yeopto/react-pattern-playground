import type { Pattern } from "../../types/pattern";

export const compoundPattern: Pattern = {
  id: "compound-components",
  title: "Compound Components (복합 컴포넌트)",
  category: "basic",
  difficulty: 3,
  description: {
    problem: "복잡한 컴포넌트에서 props가 너무 많아지고, 커스터마이징이 어려움",
    solution:
      "여러 하위 컴포넌트가 협력하여 하나의 기능을 구성하는 패턴. Context를 활용해 상태를 공유",
    whenToUse: [
      "Select, Accordion, Tab 같은 복합 UI 컴포넌트",
      "컴포넌트 내부 구조를 유연하게 조정해야 할 때",
      "여러 하위 컴포넌트가 상태를 공유해야 할 때",
    ],
    pros: [
      "높은 유연성과 커스터마이징",
      "명확한 API 제공",
      "컴포넌트 간 암묵적 상태 공유",
    ],
    cons: [
      "구현 복잡도 증가",
      "하위 컴포넌트 순서나 구조에 제약",
      "초기 학습 곡선",
    ],
  },
  code: {
    before: `// 단일 컴포넌트 방식
import { useState } from 'react';

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setOpenIndex(index === openIndex ? null : index)}>
            {item.title}
          </button>
          {openIndex === index && <div>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Accordion
      items={[
        { title: '질문 1', content: '답변 1' },
        { title: '질문 2', content: '답변 2' },
      ]}
    />
  );
}`,
    after: `// Compound Components 패턴
import { createContext, useContext, useState } from 'react';

const AccordionContext = createContext(null);

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ index, children }) {
  const { openIndex, setOpenIndex } = useContext(AccordionContext);
  const isOpen = openIndex === index;
  
  return (
    <div>
      {children({ isOpen, toggle: () => setOpenIndex(isOpen ? null : index) })}
    </div>
  );
}

Accordion.Item = AccordionItem;

export default function App() {
  return (
    <Accordion>
      <Accordion.Item index={0}>
        {({ isOpen, toggle }) => (
          <>
            <button onClick={toggle}>질문 1</button>
            {isOpen && <div>답변 1</div>}
          </>
        )}
      </Accordion.Item>
      <Accordion.Item index={1}>
        {({ isOpen, toggle }) => (
          <>
            <button onClick={toggle}>질문 2</button>
            {isOpen && <div>답변 2</div>}
          </>
        )}
      </Accordion.Item>
    </Accordion>
  );
}`,
    highlights: [
      "Context로 상태 공유",
      "하위 컴포넌트를 부모에 할당 (Accordion.Item)",
      "유연한 내부 구조 커스터마이징",
      "명확한 컴포넌트 간 관계",
    ],
  },
  relatedPatterns: ["context-api", "render-props"],
};
