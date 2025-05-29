/*Milestone 2: Implementare la ricerca ottimizzata
Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.
*/

import { useState, useEffect } from 'react';

function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
      const fetchPoliticians = async () => {
        try{
          const response = await fetch('http://localhost:3333/politicians');
          const data = await response.json();
          console.log(data)
          setPoliticians(data);
        } catch (error) {
        console.error(error)
        }
    }

    fetchPoliticians()
  }, [])

  return (
    <>
    <h1>Lista dei politici</h1>
    <div className="cards-container">
      {politicians.map((politician, index) => (
        <div className="card" key={index}>
          <img src={politician.image} alt={politician.name} />
          <h4>{politician.name}</h4>
          <p className="position">Position: {politician.position}</p>
          <p>{politician.biography}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
