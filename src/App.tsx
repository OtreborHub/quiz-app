import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initFirebase from "./utils/firebase";
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  initFirebase();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result/:score" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
