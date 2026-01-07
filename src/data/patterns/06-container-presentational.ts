import type { Pattern } from "../../types/pattern";

export const containerPresentationalPattern: Pattern = {
  id: "container-presentational",
  title: "Container/Presentational Pattern",
  category: "intermediate",
  difficulty: 2,
  description: {
    problem: "컴포넌트에 로직과 UI가 혼재되어 재사용과 테스트가 어려움",
    solution:
      "로직을 담당하는 Container와 UI를 담당하는 Presentational로 분리",
    whenToUse: [
      "복잡한 비즈니스 로직과 UI가 섞여 있을 때",
      "동일 로직에 다른 UI를 적용해야 할 때",
      "컴포넌트 테스트를 쉽게 하고 싶을 때",
    ],
    pros: [
      "관심사의 명확한 분리",
      "재사용성 향상",
      "테스트 용이성",
      "UI와 로직의 독립적 수정",
    ],
    cons: [
      "파일 수 증가",
      "간단한 컴포넌트에는 과도한 분리",
      "Custom Hooks로 대체 가능",
    ],
  },
  code: {
    before: `// 로직과 UI가 혼재된 컴포넌트
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        placeholder="검색..."
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;`,
    after: `// Container/Presentational 패턴
import { useState, useEffect } from 'react';

// Container: 로직 담당
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <UserListPresentation
      users={filteredUsers}
      loading={loading}
      error={error}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
}

// Presentational: UI만 담당
function UserListPresentation({ users, loading, error, filter, onFilterChange }) {
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="검색..."
      />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserListContainer;`,
    highlights: [
      "Container가 데이터 fetching과 상태 관리",
      "Presentational은 props만 받아 렌더링",
      "테스트 시 Presentational만 독립 테스트 가능",
      "UI 변경 시 Presentational만 수정",
    ],
  },
  relatedPatterns: ["custom-hooks", "context-api"],
};

