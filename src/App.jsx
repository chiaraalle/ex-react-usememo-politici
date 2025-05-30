/* Milestone 3: Ottimizzare il rendering delle card con React.memo
Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.
*/

import { useState, useEffect, useMemo, memo } from 'react';

const PoliticiansCard = memo(({ name, image, position, biography }) => {
  console.log("Render politiciansCard:", name);
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p className="position">Position: {position}</p>
      <p>{biography}</p>
    </div>
  );
});


function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
      const fetchPoliticians = async () => {
        try{
          const response = await fetch('http://localhost:3333/politicians');
          const data = await response.json();
          setPoliticians(data);
        } catch (error) {
        console.error(error)
        }
    }
    fetchPoliticians()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPoliticians = useMemo(() => {
      return politicians.filter(politician => 
      politician.name.toLowerCase().includes(search.toLowerCase()) ||
      politician.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [politicians, search]);


  return (
    <>
    <h1>Lista dei politici</h1>
    <input 
    value={search} 
    onChange={handleSearch} 
    type="text" name="text" 
    placeholder='Cerca per nome o biografia...'
    />
    <div className="cards-container">
      {filteredPoliticians.map((politician, index) => (
        <PoliticiansCard
          key={index}
          {...politician}
        />
      ))}
    </div>
    </>
  )
}

export default App
