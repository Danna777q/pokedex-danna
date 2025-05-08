import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [pokemones, setPokemones] = useState([]);
  useEffect(() => {
    const fetchPokemones = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      const data = await response.json();
      const { results } = data;

      const detallesPokemon = await Promise.all(
        results.map(async (pokemon) => {
          const respuesta = await fetch(pokemon.url);
          const datos = await respuesta.json();
          return {
            id: datos.id,
            nombre: datos.name,
            imagen: datos.sprites.front_default,
            altura:datos.height,
            peso:datos.weight
          };
        })
      );
      setPokemones(detallesPokemon);
    };

    fetchPokemones();
  }, []);

  return (
    <>
      <h1>ℙ𝕠𝕜𝕖𝕕𝕖𝕩 - 𝔻𝕒𝕟𝕟𝕒</h1>
      <h2>Welcome to the Pokedex</h2>
      <p>ℌ𝔢𝔯𝔢 𝔶𝔬𝔲 𝔠𝔞𝔫 𝔣𝔦𝔫𝔡 𝔦𝔫𝔣𝔬𝔯𝔪𝔞𝔱𝔦𝔬𝔫 𝔞𝔟𝔬𝔲𝔱 𝔶𝔬𝔲𝔯 𝔣𝔞𝔳𝔬𝔯𝔦𝔱𝔢 𝔓𝔬𝔨𝔢𝔪𝔬𝔫.</p>

      {pokemones.map((pokemon) => (
        <div className = "card" key={pokemon.id}>
          <div className = "border" key={pokemon.id}>
          <h1>{pokemon.nombre } #({pokemon.id})</h1>
          <img src={pokemon.imagen} alt="" />
          <p>Altura : {pokemon.altura / 10} </p>
          <p>Peso : {pokemon.peso / 10} kg </p>
        </div>
      ))}

      <div>
        <p>꧁༺Developed by Danna Victoria ༻꧂</p>
        <p>₂₀₂₅</p>
        <p>All rights reserved</p>
      </div>
    </>
  );
}

export default App;
