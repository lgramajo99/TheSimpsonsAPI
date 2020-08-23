import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Frase from "./components/Frase";
import Spinner from "./components/Spinner";

function App() {
  // crear state
  const [fraseSimpsons, setFraseSimpsons] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    setLoader(true);
    const api = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes");
    const fraseObtenida = await api.json();
    console.log(api);
    console.log(fraseObtenida[0]);
    
    setTimeout(() => {
      setFraseSimpsons(fraseObtenida[0]);
      setLoader(false);
    }, 1000)
  };

  const componenteCondicional = loader ? (
    <Spinner></Spinner>
  ) : (
      <Frase fraseSimpsons={fraseSimpsons}></Frase>
    );

  return (
    <div className="container text-center my-5">
      <article className="d-flex flex-column my-5 align-items-center">
        <img
          src={process.env.PUBLIC_URL + "image.png"}
          alt="logo de los simpsons"
          className="w-75"
        />
        <button className="btn btn-warning my-5" onClick={() => consultarAPI()}>
          Obtener frase
        </button>
      </article>
      {componenteCondicional}
    </div>
  );
}

export default App;
