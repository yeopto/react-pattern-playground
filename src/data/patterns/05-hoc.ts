import type { Pattern } from "../../types/pattern";

export const hocPattern: Pattern = {
  id: "hoc",
  title: "Higher-Order Components (HOC)",
  category: "basic",
  difficulty: 4,
  description: {
    problem: "여러 컴포넌트에 동일한 기능(인증, 로깅 등)을 추가하고 싶음",
    solution:
      "컴포넌트를 인자로 받아 새로운 기능이 추가된 컴포넌트를 반환하는 함수",
    whenToUse: [
      "인증, 권한 체크 등 공통 로직 적용",
      "로깅, 성능 측정 등 부가 기능 추가",
      "props 조작이나 추가 필요 시",
    ],
    pros: [
      "코드 재사용성",
      "관심사의 분리",
      "컴포넌트 조합 가능",
    ],
    cons: [
      "Props 충돌 가능성",
      "HOC 중첩 시 디버깅 어려움",
      "Custom Hooks로 대체 가능 (현대적 방식)",
      "정적 메서드 복사 필요",
    ],
  },
  code: {
    before: `// 각 컴포넌트에서 로딩 상태를 직접 관리
import { useState, useEffect } from 'react';

function UserProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>로딩 중...</div>;
  return <div>{data?.name}</div>;
}

function PostList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>로딩 중...</div>;
  return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}

export default UserProfile;`,
    after: `// HOC로 로딩 로직 추상화
import { useState, useEffect } from 'react';

// HOC: 로딩 기능을 추가하는 고차 컴포넌트
function withLoading(Component, fetchUrl) {
  return function WithLoadingComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        });
    }, []);
    
    if (loading) return <div>로딩 중...</div>;
    
    return <Component data={data} {...props} />;
  };
}

// 순수한 Presentational 컴포넌트
function UserProfile({ data }) {
  return <div>{data?.name}</div>;
}

function PostList({ data }) {
  return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}

// HOC로 래핑하여 사용
const UserProfileWithLoading = withLoading(UserProfile, '/api/user');
const PostListWithLoading = withLoading(PostList, '/api/posts');

export default UserProfileWithLoading;`,
    highlights: [
      "withLoading HOC가 컴포넌트를 받아 새 컴포넌트 반환",
      "로딩 로직을 HOC에서 처리",
      "원본 컴포�트는 data만 받아 렌더링",
      "여러 컴포넌트에 동일 패턴 적용",
    ],
  },
  relatedPatterns: ["custom-hooks", "render-props"],
};

