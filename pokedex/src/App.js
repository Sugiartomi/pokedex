import { Route, Routes } from "react-router-dom";
import DetailPokemon from "./pages/DetailPokemon";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailPokemon />} />
      </Routes>
    </div>
  );
}

export default App;
