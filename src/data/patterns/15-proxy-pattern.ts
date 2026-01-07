import type { Pattern } from "../../types/pattern";

export const proxyPattern: Pattern = {
  id: "proxy-pattern",
  title: "Proxy Pattern (불변성 관리)",
  category: "advanced",
  difficulty: 5,
  description: {
    problem: "복잡한 중첩 객체의 불변성을 유지하면서 업데이트하기 어려움",
    solution:
      "Proxy 객체를 사용하거나 Immer 라이브러리로 불변 업데이트를 간편하게 처리",
    whenToUse: [
      "깊게 중첩된 객체 상태 관리",
      "불변성 유지가 복잡한 경우",
      "Redux reducer에서 복잡한 상태 업데이트",
      "폼 상태 관리",
    ],
    pros: [
      "불변성 유지 자동화",
      "코드 간결성",
      "실수 방지",
      "가독성 향상",
    ],
    cons: [
      "추가 라이브러리 필요 (Immer)",
      "성능 오버헤드 (소규모)",
      "디버깅 복잡도 증가",
    ],
  },
  code: {
    before: `// 수동 불변성 관리 (복잡하고 실수하기 쉬움)
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    name: 'John',
    address: {
      city: 'Seoul',
      detail: {
        street: 'Gangnam',
        zipCode: '12345',
      },
    },
    hobbies: ['reading', 'coding'],
  });
  
  // 중첩된 객체 업데이트 - 매우 복잡!
  const updateCity = (newCity) => {
    setUser({
      ...user,
      address: {
        ...user.address,
        city: newCity,
      },
    });
  };
  
  const updateStreet = (newStreet) => {
    setUser({
      ...user,
      address: {
        ...user.address,
        detail: {
          ...user.address.detail,
          street: newStreet,
        },
      },
    });
  };
  
  const addHobby = (hobby) => {
    setUser({
      ...user,
      hobbies: [...user.hobbies, hobby],
    });
  };
  
  return (
    <div>
      <p>City: {user.address.city}</p>
      <p>Street: {user.address.detail.street}</p>
      <button onClick={() => updateCity('Busan')}>도시 변경</button>
      <button onClick={() => updateStreet('Haeundae')}>거리 변경</button>
      <button onClick={() => addHobby('gaming')}>취미 추가</button>
    </div>
  );
}

export default App;`,
    after: `// Proxy Pattern (Immer 사용)
import { useState } from 'react';
import { produce } from 'immer';

function App() {
  const [user, setUser] = useState({
    name: 'John',
    address: {
      city: 'Seoul',
      detail: {
        street: 'Gangnam',
        zipCode: '12345',
      },
    },
    hobbies: ['reading', 'coding'],
  });
  
  // Immer의 produce로 간편한 불변 업데이트
  const updateCity = (newCity) => {
    setUser(produce(user, draft => {
      // draft를 직접 수정하듯 작성 (내부적으로 불변성 유지)
      draft.address.city = newCity;
    }));
  };
  
  const updateStreet = (newStreet) => {
    setUser(produce(user, draft => {
      draft.address.detail.street = newStreet;
    }));
  };
  
  const addHobby = (hobby) => {
    setUser(produce(user, draft => {
      draft.hobbies.push(hobby);
    }));
  };
  
  // 또는 useImmer 훅 사용
  // import { useImmer } from 'use-immer';
  // const [user, updateUser] = useImmer(initialState);
  // updateUser(draft => { draft.address.city = 'Busan'; });
  
  return (
    <div>
      <p>City: {user.address.city}</p>
      <p>Street: {user.address.detail.street}</p>
      <button onClick={() => updateCity('Busan')}>도시 변경</button>
      <button onClick={() => updateStreet('Haeundae')}>거리 변경</button>
      <button onClick={() => addHobby('gaming')}>취미 추가</button>
    </div>
  );
}

export default App;`,
    highlights: [
      "produce 함수로 불변 업데이트 간소화",
      "draft 객체를 직접 수정하듯 작성",
      "내부적으로 Proxy를 활용해 불변성 자동 유지",
      "복잡한 spread 연산자 제거",
    ],
  },
  relatedPatterns: ["state-reducer", "custom-hooks"],
};

