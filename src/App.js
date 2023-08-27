import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import WeatherPage from "./components/pages/WeatherPage";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/forecast/:id" exact element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
