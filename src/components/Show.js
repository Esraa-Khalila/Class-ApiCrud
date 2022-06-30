import { Component } from "react";
import axios from "axios";

class Show extends Component {
  state = {
    Data: [],

  };

  componentDidMount() {
    this.Data();
  }
  
  Data = async () => {
   

    const res = await fetch(
      `http://127.0.0.1:8000/api${window.location.pathname}`
    );
    if (res.ok) {
    
      const data = await res.json();
      console.log(data);
      this.setState({ Data: data.movies });
    } else {
      this.setState({ error: true });
    }
  };
  
  
    render() {
       
    return (
      <div className="container">
        <h1>Form</h1>
        <h5>{this.state.Data.movie_name}</h5>
        <h5>{this.state.Data.movie_description}</h5>
        <h5>{this.state.Data.movie_gener}</h5>
        <img
          src={`http://127.0.0.1:8000/uploads/Movies/${this.state.Data.path}`}
          style={{
            height: "20rem",
            width: "25rem",
          }}
        />
      </div>
    );
  }
}

export default Show;
