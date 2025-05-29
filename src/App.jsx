/*Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare l'url base:
http://localhost:3333
al posto di:
https://freetestapi.com/api/v1
Ad esempio:
http://localhost:3333/users
per chiamare l'endpoint /users

📌 Milestone 1: Recuperare e visualizzare i dati
Effettua una chiamata API a
https://boolean-spec-frontend.vercel.app/freetestapi/politicians

Salva la risposta in uno stato React (useState).

Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

Nome (name)
Immagine (image)
Posizione (position)
Breve biografia (biography)

Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.
*/

import { useState, useEffect } from 'react';

function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
      /*fetch('http://localhost:3333/politicians')
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))*/
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
