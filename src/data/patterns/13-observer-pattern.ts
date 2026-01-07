import type { Pattern } from "../../types/pattern";

export const observerPattern: Pattern = {
  id: "observer-pattern",
  title: "Observer Pattern (구독 패턴)",
  category: "advanced",
  difficulty: 4,
  description: {
    problem: "외부 데이터 소스(WebSocket, DOM 이벤트 등)의 변경을 감지하고 반영",
    solution:
      "useEffect를 활용해 외부 데이터를 구독하고 정리(cleanup) 함수로 구독 해제",
    whenToUse: [
      "WebSocket 연결 관리",
      "DOM 이벤트 리스너 (resize, scroll 등)",
      "외부 store나 상태 관리 라이브러리 구독",
      "실시간 데이터 스트림 처리",
    ],
    pros: [
      "외부 데이터 소스와의 동기화",
      "메모리 누수 방지 (cleanup)",
      "반응형 데이터 처리",
      "실시간 업데이트",
    ],
    cons: [
      "구독/해제 로직 복잡",
      "메모리 관리 주의 필요",
      "디버깅 어려움",
    ],
  },
  code: {
    before: `// 이벤트 리스너 정리하지 않음 (메모리 누수)
import { useState, useEffect } from 'react';

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    // cleanup 함수 없음 → 메모리 누수!
  }, []);
  
  return <div>창 크기: {size.width} x {size.height}</div>;
}

export default WindowSize;`,
    after: `// Observer Pattern (구독/해제)
import { useState, useEffect } from 'react';

// Custom Hook으로 재사용 가능하게
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    // 1. 구독 (Subscribe)
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // 2. 정리 (Cleanup/Unsubscribe)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 마운트 시 한 번만 실행
  
  return size;
}

// WebSocket 예제
function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('연결 중...');
  
  useEffect(() => {
    // 구독
    const ws = new WebSocket(url);
    
    ws.onopen = () => setStatus('연결됨');
    ws.onmessage = (event) => setData(event.data);
    ws.onerror = () => setStatus('에러');
    ws.onclose = () => setStatus('연결 끊김');
    
    // 정리: 컴포넌트 언마운트 시 연결 해제
    return () => {
      ws.close();
    };
  }, [url]);
  
  return { data, status };
}

function WindowSize() {
  const size = useWindowSize();
  return <div>창 크기: {size.width} x {size.height}</div>;
}

export default WindowSize;`,
    highlights: [
      "useEffect로 구독 설정",
      "cleanup 함수로 구독 해제",
      "메모리 누수 방지",
      "Custom Hook으로 재사용성 향상",
    ],
  },
  relatedPatterns: ["custom-hooks", "memoization"],
};

