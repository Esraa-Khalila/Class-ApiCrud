import React, { Component } from "react";
import { Link } from "react-router-dom";
class Movie extends Component {
  state = {
    Data: [], // list is empty in the beginning
    error: false,
    searchValue: "",
    isLoading: false,
  };

  componentDidMount() {
    this.Data();
  }

  deleteRequestHandler = async (id) => {
    const response = await fetch(`http://localhost:8000/api/movies/${id}`);
    const newData = this.state.Data.filter((p) => p.id !== id);
    this.setState({ Data: newData });
  };

  Data = async () => {
    //try to get data

    const response = await fetch("http://127.0.0.1:8000/api/movies");

    if (response.ok) {
      // ckeck if status code is 200
      const data = await response.json();
     
      this.setState({ Data: data.movies });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { Data, error, isLoading } = this.state;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1,500px 500px)",
        }}
      >
        <div>
          <button>
            <Link
              to={{
                pathname: "/add/",
              }}
            >
              Add
            </Link>
          </button>
        </div>
        {isLoading && <div>Loading</div>}
        {Data.length > 0 &&
          !isLoading &&
          this.state.Data.map((film) => (
            <div
              className="card"
              style={{
                width: "25rem",
                margin: "15px",
              }}
              key={film.id}
            >
              <div
                style={{
                  height: "22rem",
                }}
              >
                <img
                  src={`http://127.0.0.1:8000/uploads/Movies/${film.path}`}
                  style={{
                    height: "20rem",
                    width: "25rem",
                  }}
                />
              </div>

              <div className="card-body">
                <h6>
                  <b style={{ color: "orange" }}>Title :</b> {film.movie_name}
                </h6>

                <p className="card-text">
                  <b style={{ color: "orange" }}>Description :</b>
                  {film.movie_description}
                </p>
                <h6 className="card-title"></h6>
              </div>
              <button onClick={() => this.deleteRequestHandler(film.id)}>
                Delete
              </button>

              <button>
                <Link
                  to={{
                    pathname: "/movies/" + film.id,
                    state: {
                      film,
                    },
                  }}
                >
                  update
                </Link>
              </button>
              <button>
                <Link
                  to={{
                    pathname: "show/movies/"+ film.id,
                  }}
                >
                  Show
                </Link>
              </button>
            </div>
          ))}
        {error && <div>Fail, can not display the data</div>}

        <div></div>
      </div>
    );
  }
}
export default Movie;
