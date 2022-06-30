import { Component } from "react";
import axios from "axios";

class Update extends Component {
  state = {
    Data: [],
    movie_name: "",
    movie_description: "",
    movie_gener: "",
    path: "",
  };

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {}
  Data = async () => {
    //try to get data

    const res = await fetch(
      `http://127.0.0.1:8000/api${window.location.pathname}`
    );
    if (res.ok) {
      // ckeck if status code is 200
      const data = await res.json();
      console.log(data);
      this.setState({ Data: data.movies });
    } else {
      this.setState({ error: true });
    }
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  add = async (e) => {
    e.preventDefault();

    const res = axios.put(
     
      `http://127.0.0.1:8000/api/update${window.location.pathname}`,
      {
        movie_name: e.target.movie_name.value,
        movie_description: e.target.movie_description.value,
        movie_gener: e.target.movie_gener.value,
      }
    );
    if (res.ok) {
    } else {
      alert("Succes");
      window.location.href = "http://localhost:3000/";
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Form</h1>

        <form onSubmit={(e) => this.add(e)} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="movie_name"
              onChange={(e) => this.handleInput(e)}
              value={this.state.Data.movie_name}
            />
            <br />
            <input
              type="text"
              className="form-control"
              name="movie_description"
              onChange={(e) => this.handleInput(e)}
              value={this.state.Data.movie_description}
            />
            <br />
            <input
              type="text"
              className="form-control"
              name="movie_gener"
              onChange={(e) => this.handleInput(e)}
              value={this.state.Data.movie_gener}
            />
            <br />
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default Update;
