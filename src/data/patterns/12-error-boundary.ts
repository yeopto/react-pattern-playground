import type { Pattern } from "../../types/pattern";

export const errorBoundaryPattern: Pattern = {
  id: "error-boundary",
  title: "Error Boundary",
  category: "advanced",
  difficulty: 3,
  description: {
    problem: "하위 컴포넌트에서 발생한 에러가 전체 앱을 중단시킴",
    solution:
      "클래스 컴포넌트의 componentDidCatch로 에러를 잡아 대체 UI 표시",
    whenToUse: [
      "컴포넌트 트리의 에러 처리",
      "에러 로깅 및 모니터링",
      "부분적인 UI 실패 허용",
      "프로덕션 환경의 안정성 향상",
    ],
    pros: [
      "앱 전체 크래시 방지",
      "사용자 친화적 에러 메시지",
      "에러 격리 및 복구",
      "에러 추적 및 로깅",
    ],
    cons: [
      "클래스 컴포넌트 사용 필요",
      "이벤트 핸들러 에러는 캐치 불가",
      "비동기 코드 에러 캐치 불가",
    ],
  },
  code: {
    before: `// 에러 처리 없음
function BuggyComponent() {
  const [count, setCount] = useState(0);
  
  if (count === 3) {
    // 에러 발생 시 전체 앱 크래시
    throw new Error('크래시!');
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>내 앱</h1>
      <BuggyComponent />
      {/* 에러 발생 시 화면 전체가 빈 화면 */}
    </div>
  );
}`,
    after: `// Error Boundary 패턴
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  // 에러를 캐치하는 라이프사이클
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  // 에러 로깅
  componentDidCatch(error, errorInfo) {
    console.error('에러 발생:', error, errorInfo);
    // 에러 모니터링 서비스로 전송
    // logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '2px solid red' }}>
          <h2>오류가 발생했습니다</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            다시 시도
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

function BuggyComponent() {
  const [count, setCount] = useState(0);
  
  if (count === 3) {
    throw new Error('크래시!');
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>내 앱</h1>
      {/* 에러 발생해도 다른 부분은 정상 작동 */}
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}`,
    highlights: [
      "클래스 컴포넌트로 구현",
      "getDerivedStateFromError로 상태 업데이트",
      "componentDidCatch로 에러 로깅",
      "대체 UI(fallback) 표시",
    ],
  },
  relatedPatterns: ["portal", "lazy-loading"],
};

