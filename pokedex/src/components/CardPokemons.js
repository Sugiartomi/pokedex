import { useNavigate } from "react-router-dom";
export default function CardPokemons({ data }) {
  const navigate = useNavigate();
  function seedetail(id) {
    navigate(`/${id}`);
  }

  return (
    <>
      <div className="card border-0 mt-0">
        {/* <p>holla</p> */}
        <div className="container px-4 px-lg-5 ">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {data.map((e, i) => (
              <div className="col mb-5 p-2">
                <div
                  className="card h-100 bg-secondary"
                  style={{
                    "background-image": `url(${e.bg})`,
                    "background-size": "100%",
                  }}
                  onClick={() => seedetail(e.id)}
                >
                  <div className="row p-3">
                    <div className="col-12 d-flex p-1">
                      <div className="col-6">
                        <h6
                          className="fw-bolder text-white p-2 w-100 rounded mt-2 mx-2"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.329)" }}
                        >
                          {e.name}
                        </h6>

                        <div className="d-flex justify-content-center p-1">
                          <h6 className="fw text-secondary mx-2 bg-light p-1 rounded">
                            {" "}
                            {e.type[0]}
                          </h6>
                          {e.type[1] ? (
                            <h6 className="fw text-secondary bg-light p-1 rounded">
                              {e.type[1]}
                            </h6>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="col-6 d-flex justify-content-end align-items-end">
                        <img className="card-img-top" src={e.image} alt="..." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
