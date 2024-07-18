import request from 'sync-request'
import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [matchingWords, setMatchingWords] = useState([])

  const lookup_word = (word: string) => {
    const url = `https://monkfish-app-h5qm7.ondigitalocean.app/api/word/${word}`
    const response = request('GET', url);
    return JSON.parse(response.body.toString())
  }

  return (
    <>
      <p className='read-the-docs'>
        Type in a word to see its definitions
      </p>
      <div>
        <input value={searchTerm} onChange={(e) => {
          setSearchTerm(e.target.value)
          const result = lookup_word(searchTerm)
          console.log(result);
          setMatchingWords(result as unknown as [])
        }}/>
        <div>
          <h1>Word Definitions</h1>
          <ul>
            {Object.entries(matchingWords).map(([word, definition]) => (
              <li key={word}>
                <strong>{word}</strong>: {definition}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
