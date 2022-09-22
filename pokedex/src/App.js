import { Route, Routes } from "react-router-dom";
import DetailPokemon from "./pages/DetailPokemon";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="container">
          <img
            src="https://cdn.discordapp.com/attachments/956894472120205352/1022365451239563314/banner.jpg"
            alt=""
            className="img-fill card-img-top"
          />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailPokemon />} />
        <Route path="/:id/stats" element={<DetailPokemon />} />
      </Routes>
      <div className="container">
        <img
          src="https://cdn.discordapp.com/attachments/956894472120205352/1022370306427453490/footer.jpg"
          alt=""
          className="img-fill card-img-top my-5"
        />
      </div>
    </div>
  );
}

export default App;
