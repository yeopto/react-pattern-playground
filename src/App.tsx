import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PatternPage from "./pages/PatternPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pattern/:patternId" element={<PatternPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
