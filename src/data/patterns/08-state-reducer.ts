import type { Pattern } from "../../types/pattern";

export const stateReducerPattern: Pattern = {
  id: "state-reducer",
  title: "State Reducer Pattern",
  category: "intermediate",
  difficulty: 4,
  description: {
    problem: "복잡한 상태 변경 로직을 외부에서 커스터마이징하고 싶음",
    solution:
      "useReducer를 사용하고 reducer를 외부에서 주입 가능하게 하여 상태 변경 로직 제어",
    whenToUse: [
      "복잡한 상태 관리가 필요한 컴포넌트",
      "상태 변경 로직을 외부에서 커스터마이징",
      "여러 상태가 서로 의존적인 경우",
    ],
    pros: [
      "복잡한 상태 로직의 명확한 정의",
      "외부에서 상태 변경 제어 가능",
      "예측 가능한 상태 변경",
      "테스트 용이",
    ],
    cons: [
      "초기 학습 곡선",
      "간단한 상태에는 과도한 복잡도",
      "보일러플레이트 코드 증가",
    ],
  },
  code: {
    before: `// useState로 복잡한 상태 관리
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => {
    setCount(0);
    setStep(1);
  };
  
  return (
    <div>
      <div>Count: {count}</div>
      <div>Step: {step}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setStep(step + 1)}>Step++</button>
    </div>
  );
}

export default Counter;`,
    after: `// State Reducer Pattern
import { useReducer } from 'react';

// 상태와 액션 타입 정의
const initialState = { count: 0, step: 1 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'RESET':
      return initialState;
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter({ reducer = counterReducer, initialState: customInitialState }) {
  // 외부에서 reducer를 주입 가능
  const [state, dispatch] = useReducer(
    reducer, 
    customInitialState || initialState
  );
  
  return (
    <div>
      <div>Count: {state.count}</div>
      <div>Step: {state.step}</div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET_STEP', payload: state.step + 1 })}>
        Step++
      </button>
    </div>
  );
}

// 사용 예시: 커스텀 reducer로 로직 변경
function customReducer(state, action) {
  // 카운트가 10을 넘지 못하도록 제한
  if (action.type === 'INCREMENT' && state.count >= 10) {
    return state;
  }
  return counterReducer(state, action);
}

export default function App() {
  return (
    <div>
      <h3>기본 Counter</h3>
      <Counter />
      
      <h3>제한된 Counter (max: 10)</h3>
      <Counter reducer={customReducer} />
    </div>
  );
}`,
    highlights: [
      "useReducer로 상태 관리 로직 분리",
      "액션 타입으로 명확한 상태 변경",
      "외부에서 reducer 주입 가능",
      "복잡한 상태 로직의 예측 가능성 향상",
    ],
  },
  relatedPatterns: ["control-props", "custom-hooks"],
};

