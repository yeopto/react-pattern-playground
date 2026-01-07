import type { Pattern } from "../../types/pattern";

export const customHooksPattern: Pattern = {
  id: "custom-hooks",
  title: "Custom Hooks (커스텀 훅)",
  category: "basic",
  difficulty: 2,
  description: {
    problem: "여러 컴포넌트에서 동일한 로직이 반복되어 코드 중복 발생",
    solution: "상태 로직을 재사용 가능한 함수(Hook)로 추출하여 공유",
    whenToUse: [
      "여러 컴포넌트에서 동일한 상태 로직 사용",
      "복잡한 로직을 분리하여 가독성 향상",
      "API 호출, 폼 관리 등 공통 로직 추출",
    ],
    pros: [
      "로직 재사용성 극대화",
      "컴포넌트 코드 간결화",
      "테스트 용이성",
      "관심사의 분리",
    ],
    cons: [
      "Hook 규칙 준수 필요",
      "과도한 추상화 위험",
      "디버깅 난이도 증가 가능",
    ],
  },
  code: {
    before: `// 로직이 중복되는 컴포넌트들
import { useState, useEffect } from 'react';

function UserProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  return <div>{data?.name}</div>;
}

function PostList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}

export default UserProfile;`,
    after: `// Custom Hook으로 로직 추출
import { useState, useEffect } from 'react';

// 재사용 가능한 Hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// 간결한 컴포넌트
function UserProfile() {
  const { data, loading, error } = useFetch('/api/user');
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  return <div>{data?.name}</div>;
}

function PostList() {
  const { data, loading, error } = useFetch('/api/posts');
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}

export default UserProfile;`,
    highlights: [
      "중복 로직을 useFetch Hook으로 추출",
      "useState와 useEffect를 내부에서 사용",
      "필요한 값만 반환",
      "컴포넌트 코드 간결화",
    ],
  },
  relatedPatterns: ["context-api", "state-reducer"],
};

