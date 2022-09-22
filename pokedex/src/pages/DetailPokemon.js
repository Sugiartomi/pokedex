import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail, fetchPoke } from "../store/actions";
import { ProgressBar } from "react-bootstrap";

export default function DetailPokemon() {
  const [dataDetailPoke, setDataDetailPoke] = useState([]);
  const [props, setProps] = useState([]);
  const [stat, setStat] = useState({});
  const { detail } = useSelector((state) => state);
  const { pokemons } = useSelector((state) => state);

  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDetail(params.id));
  }, []);
  useEffect(() => {
    dispatch(fetchPoke());
  }, []);
  useEffect(() => {
    if (pokemons) {
      let sort = pokemons.find((e) => e.id == params.id);
      setProps(sort);
    }
    if (detail.length !== 0) {
      let temp = {
        hp: 0,
        atk: 0,
        def: 0,
        spatk: 0,
        spdef: 0,
        speed: 0,
      };
      detail[1].forEach((e, i) => {
        if (i == 0) {
          temp.hp = e.base_stat;
        }
        if (i == 1) {
          temp.atk = e.base_stat;
        }
        if (i == 2) {
          temp.def = e.base_stat;
        }
        if (i == 3) {
          temp.spatk = e.base_stat;
        }
        if (i == 4) {
          temp.spdef = e.base_stat;
        }
        if (i == 5) {
          temp.speed = e.base_stat;
        }
      });
      setDataDetailPoke(detail);
      setStat(temp);
    }
  }, [pokemons, detail]);

  const moveQuery = (id, query) => {
    if(query) {
      navigate(`/${id}/${query}`)
    } else {
      navigate(`/${id}`)
    }
  }

  if (dataDetailPoke.length === 0) return <h1>Loading...</h1>;
  if (!props) return <h1>Loading...</h1>;
  if (!stat) return <h1>Loading...</h1>;
  return (
    <>
      {/* {JSON.stringify(stat)} */}
      {/* {JSON.stringify(props.bg)} */}

      <div className="container-fluid">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12" style={{ height: "300px" }}>
              <img
                className="img-fill card-img-top"
                src={props.bg}
                alt=""
                style={{
                  objectFit: "cover",
                  height: "400px",
                  margin: 0,
                  borderRadius: "20px",
                }}
              />
            </div>
            <div
              style={{
                width: "50%",
                height: "200px",
                position: "absolute",
                margin: "100px 0px",
              }}
              className=""
            >
              <div className="row d-flex">
                <div className="container ">
                  <h1
                    className=" text-dark  py-3 pt-1 pb-3 fw-bold text-center"
                    style={{ borderRadius: 24, backgroundColor: "#F7C554" }}
                  >
                    {props.name}
                  </h1>
                  <div className="d-flex justify-content-center">
                    <h3
                      className=" text-white p-2 rounded mt-2 mx-2 text-center"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.329)" }}
                    >
                      {props.type[0]}
                    </h3>
                    {props.type[1] ? (
                      <h3
                        className=" text-white p-2 rounded mt-2 mx-2 text-center"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.329)" }}
                      >
                        {props.type[1]}
                      </h3>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-md-12 h-100 mb-12 d-flex justify-content-end mt-0 ">
                  <img
                    src={props.image}
                    alt=""
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12" style={{ height: "275px" }}></div>
            <div className="row d-flex justify-content-center">
              {location.pathname.length < 4 ? (
                <>
                  <div className="col-9 d-flex justify-content-center text-center">
                    <div
                      className="col-3 py-2 mx-2 bg-secondary text-white  fw-bolder"
                      style={{ fontSize: 18, borderRadius: 24 }}
                      onClick={() => moveQuery(props.id)}
                    >
                      {" "}
                      About
                    </div>
                    <div
                      className="col-3 py-2 mx-2 bg-white fw-bolder border"
                      style={{ fontSize: 18, borderRadius: 24 }}
                      onClick={() => moveQuery(props.id, "stats")}
                    >
                      Stats
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-9 d-flex justify-content-center text-center">
                    <div
                      className="col-3 py-2 mx-2 bg-white text-dark fw-bolder border"
                      style={{ fontSize: 18, borderRadius: 24 }}
                      onClick={() => moveQuery(props.id)}
                    >
                      {" "}
                      About
                    </div>
                    <div
                      className="col-3 py-2 mx-2 bg-secondary text-white fw-bolder"
                      style={{ fontSize: 18, borderRadius: 24 }}
                      onClick={() => moveQuery(props.id, "stats")}
                    >
                      Stats
                    </div>
                  </div>
                </>
              )}
            </div>
            {location.pathname.length < 4 ? (
              <>
                <div className="row d-flex justify-content-center m-5">
                  <div className="col-9 border d-flex p-5 rounded">
                    <div className="col-4">
                      <p>Species</p>
                      <p>Height</p>
                      <p>Weight</p>
                      <p>Abilities</p>
                      <p>Moves</p>
                    </div>
                    <div className="col-8 fw-bolder">
                      <p>{dataDetailPoke[0].species}</p>
                      <p>{dataDetailPoke[0].height * 10} cm</p>
                      <p>{dataDetailPoke[0].weight * 0.1} kg</p>
                      <p>{dataDetailPoke[0].abilities.join(", ")}</p>
                      <p>{dataDetailPoke[2]}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="row d-flex justify-content-center m-5">
                  <div className="col-9 border p-5 d-flex">
                    <div className="col-3">
                      <p>HP</p>
                      <p>Attack</p>
                      <p>Defense</p>
                      <p>Sp. Atk</p>
                      <p>Sp. Def</p>
                      <p>Speed</p>
                    </div>
                    <div className="col-2 fw-bolder">
                      <p>{stat.hp}</p>
                      <p>{stat.atk}</p>
                      <p>{stat.def}</p>
                      <p>{stat.spatk}</p>
                      <p>{stat.spdef}</p>
                      <p>{stat.speed}</p>
                    </div>
                    <div className="col-7">
                      <div className="progressBar p-1">
                        <ProgressBar
                          now={stat.hp}
                          label={`${stat.hp} point / 100`}
                        />
                      </div>
                      <div className="progressBar mt-3 p-1">
                        <ProgressBar
                          now={stat.atk}
                          label={`${stat.atk} point / 100`}
                        />
                      </div>
                      <div className="progressBar mt-3 ">
                        <ProgressBar
                          now={stat.def}
                          label={`${stat.def} point / 100`}
                        />
                      </div>
                      <div className="progressBar mt-4 p-1">
                        <ProgressBar
                          now={stat.spatk}
                          label={`${stat.spatk} point / 100`}
                        />
                      </div>
                      <div className="progressBar mt-3 p-1">
                        <ProgressBar
                          now={stat.spdef}
                          label={`${stat.spdef} point / 100`}
                        />
                      </div>
                      <div className="progressBar mt-3 p-1">
                        <ProgressBar
                          now={stat.speed}
                          label={`${stat.speed} point / 100`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div
              className="d-flex justify-content-center"
              onClick={() => {
                navigate("/");
              }}
            >
              <p
                className="bg-danger px-4 py-2 fw-bolder text-white"
                style={{ borderRadius: 12 }}
              >
                Back to home
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
