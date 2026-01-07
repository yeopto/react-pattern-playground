import type { Pattern } from "../../types/pattern";

export const controlPropsPattern: Pattern = {
  id: "control-props",
  title: "Control Props Pattern",
  category: "intermediate",
  difficulty: 3,
  description: {
    problem: "컴포넌트의 내부 상태를 외부에서 제어하고 싶지만 방법이 없음",
    solution:
      "제어 가능한 props를 노출하여 외부에서 컴포넌트 상태를 완전히 제어",
    whenToUse: [
      "컴포넌트를 Controlled/Uncontrolled 모두 지원",
      "부모 컴포넌트에서 자식의 상태를 직접 조작",
      "폼 입력, 모달 등 외부 제어가 필요한 경우",
    ],
    pros: [
      "외부에서 완전한 제어 가능",
      "유연성 극대화",
      "상태 동기화 용이",
    ],
    cons: [
      "구현 복잡도 증가",
      "Controlled/Uncontrolled 모두 고려해야 함",
      "props 관리 복잡",
    ],
  },
  code: {
    before: `// Uncontrolled: 내부 상태만 사용
import { useState } from 'react';

function Toggle() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

export default function App() {
  // Toggle 상태를 외부에서 제어할 방법이 없음
  return (
    <div>
      <Toggle />
      {/* 외부에서 ON으로 강제하고 싶지만 불가능 */}
    </div>
  );
}`,
    after: `// Control Props: Controlled/Uncontrolled 모두 지원
import { useState } from 'react';

function Toggle({ isOn: controlledIsOn, onToggle }) {
  // 내부 상태 (Uncontrolled 모드용)
  const [internalIsOn, setInternalIsOn] = useState(false);
  
  // Controlled 모드인지 확인
  const isControlled = controlledIsOn !== undefined;
  const isOn = isControlled ? controlledIsOn : internalIsOn;
  
  const handleToggle = () => {
    if (isControlled) {
      // Controlled: 부모에게 알림
      onToggle?.(!isOn);
    } else {
      // Uncontrolled: 내부 상태 변경
      setInternalIsOn(!isOn);
    }
  };
  
  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

export default function App() {
  const [isToggleOn, setIsToggleOn] = useState(false);
  
  return (
    <div>
      {/* Controlled 모드 */}
      <Toggle isOn={isToggleOn} onToggle={setIsToggleOn} />
      
      {/* Uncontrolled 모드 */}
      <Toggle />
      
      {/* 외부에서 강제로 ON */}
      <button onClick={() => setIsToggleOn(true)}>강제 ON</button>
    </div>
  );
}`,
    highlights: [
      "isOn prop으로 외부 제어 가능",
      "prop이 없으면 내부 상태 사용 (Uncontrolled)",
      "onToggle 콜백으로 변경 알림",
      "유연한 사용 방식 제공",
    ],
  },
  relatedPatterns: ["state-reducer", "compound-components"],
};

