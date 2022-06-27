import React, { Component } from "react";

class Search extends Component {
  state = {
    Data: [], // list is empty in the beginning
    error: false,
    searchValue: "",
    isLoading: false,
  };

  componentDidMount() {
    this.Data();
    // function call
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.Search();
    }
  }

  Data = async () => {
    //try to get data

    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bc63f0c08d018cf26d4cf02b8efde4d7"
    );

    if (response.ok) {
      // ckeck if status code is 200
      const data = await response.json();
      this.setState({ Data: data.results });
    } else {
      this.setState({ error: true });
    }
  };
  Search = async () => {
    //try to get data
    this.setState({ isLoading: true });
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bc63f0c08d018cf26d4cf02b8efde4d7&query=${this.state.searchValue}`
    );

    if (res.ok) {
      // ckeck if status code is 200
      const data = await res.json();
      this.setState({ Data: data.results });
      this.setState({ isLoading: false });
    } else {
      this.setState({ error: true });
    }
  };

  handleChangeName = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
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
        <div class="input-group">
          <div class="form-outline">
            <input
              type="search"
              id="form1"
              class="form-control"
              onChange={this.handleChangeName}
            />
          </div>
        </div>
        {isLoading && <div>Loading</div>}
        {Data.length > 0 &&
          !isLoading &&
          Data.map((film) => (
            <div
              className="card"
              style={{
                width: "25rem",
                margin: "15px",
              }}
            >
              <div
                style={{
                  height: "22rem",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  style={{
                    height: "20rem",
                    width: "25rem",
                  }}
                />
              </div>

              <div className="card-body">
                <h6>
                  <b style={{ color: "orange" }}>Title :</b> {film.title}
                </h6>
                <p className="card-text">
                  <b style={{ color: "orange" }}>Description :</b>
                  {film.overview}
                </p>
                <h6 className="card-title">
                  <b style={{ color: "orange" }}>Rate :</b> {film.vote_average}
                </h6>
              </div>
            </div>
          ))}
        {error && <div>Fail, can not display the data</div>}
      </div>
    );
  }
}
export default Search;
