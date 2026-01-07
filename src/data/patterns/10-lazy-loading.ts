import type { Pattern } from "../../types/pattern";

export const lazyLoadingPattern: Pattern = {
  id: "lazy-loading",
  title: "Lazy Loading / Code Splitting",
  category: "intermediate",
  difficulty: 2,
  description: {
    problem: "초기 번들 크기가 커서 첫 로딩 시간이 오래 걸림",
    solution: "React.lazy와 Suspense를 사용해 컴포넌트를 필요할 때만 로드",
    whenToUse: [
      "라우트별로 코드 분리",
      "모달, 탭 등 조건부 렌더링 컴포넌트",
      "초기 로딩 속도 개선이 필요할 때",
    ],
    pros: [
      "초기 번들 크기 감소",
      "빠른 첫 페이지 로딩",
      "사용자가 필요한 코드만 다운로드",
      "성능 향상",
    ],
    cons: [
      "코드 분할 지점 결정 필요",
      "네트워크 요청 증가",
      "Suspense fallback UI 필요",
    ],
  },
  code: {
    before: `// 모든 컴포넌트를 한 번에 import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// 초기 번들에 모든 페이지 코드 포함
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`,
    after: `// Lazy Loading 적용
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 필요할 때만 로드되는 컴포넌트
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// 로딩 중 표시할 컴포넌트
function LoadingFallback() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div>로딩 중...</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;`,
    highlights: [
      "React.lazy()로 동적 import",
      "Suspense로 로딩 상태 처리",
      "라우트별 코드 분할",
      "초기 번들 크기 감소",
    ],
  },
  relatedPatterns: ["error-boundary", "portal"],
};

