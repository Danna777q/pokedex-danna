import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busquedaPokemon, setBusquedaPokemon] = useState("");
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
const pokemonesFiltrados = pokemones.filter((p) => {
  return p.name.toLowerCase().includes(busquedaPokemon)
})
  return (
    <>
      <h1>Pokedex - Danna Victoria</h1>
      <h2>Welcome to the Pokedex</h2>
      <p>Here you can find information about your favorite Pokemon.</p>


<input ClassName="busqueda"
type="text"
 placeholder="Busca tu pokemon"
 value={busquedaPokemon}
 onChange={(e) => setBusquedaPokemon(e.target.value.toLowerCase())}
 />
 {

console.log(busquedaPokemon)
 }
      {pokemonesFiltrados.map((pokemon) => (
        <div className="card" key={pokemon.id}>
          <h1>{pokemon.nombre} #({pokemon.id}) </h1>
          <img src={pokemon.imagen} alt="" />
          <p>Altura : {pokemon.altura / 10} m</p>
          <p>Peso: {pokemon.peso / 10} kg </p>
        </div>
      ))}

      <div>
        <p>Developed by Danna Victoria</p>
        <p>2025</p>
        <p>All rights reserved</p>
      </div>
    </>
  );
}

export default App;