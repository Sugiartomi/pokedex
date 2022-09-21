import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { fetchPoke } from "../store/actions";
import CardPokemons from "../components/CardPokemons";

export default function Home() {
  const [dataPoke, setDataPoke] = useState([]);
  const { pokemons } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPoke());
  }, []);
  useEffect(() => {
    if (pokemons) {
      if (location.pathname == "/") {
        setDataPoke(pokemons); // ini plain
      } else {
        const filterPoke = pokemons.filter(
          (e) => e.type == location.pathname.slice(1)
        );
        setDataPoke(filterPoke); // ini udah filter
      }
    }
  }, [pokemons, location.pathname]);

  console.log(pokemons);

  if(!pokemons){ return ( <h1>Loading...</h1>)}
  return (
  <>
  <div className="container-fluid">
    <div className="container text-center">
        <div className="row">
            <div className="col-12">
                <CardPokemons data={pokemons}/>
            </div>
        </div>
    </div>
  </div>
  </>
  )
}
