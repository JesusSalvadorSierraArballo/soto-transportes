import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

useEffect(() => {
  axios.post('https://dummyjson.com/auth/login', { username: "emilys", password: "emilyspass" }).then(response => {
    console.log({response});
    console.log(response.data)
  })
}, [])
useEffect(() => {
  axios.get('https://dummyjson.com/posts?limit=10&skip=0').then(response => {
    console.log({postResponse: response.data});
  })
}, [])
useEffect(() => {
  axios.get('https://dummyjson.com/posts/search?q=love').then(response => {
    console.log({postSearchResponse: response.data});
  })
}, [])
useEffect(() => {
  axios.post('https://dummyjson.com/posts/add', {
    title: 'I am in love with someone.',
    userId: 5,
  }).then(response => {
    console.log({postAddResponse: response.data});
  })
}, [])
useEffect(() => {
  axios.put('https://dummyjson.com/posts/1',{
    title: 'I think I should shift to the moon',
  }).then(response => {
    console.log({postUpdateResponse: response.data});
  })
}, [])
useEffect(() => {
  axios.delete('https://dummyjson.com/posts/1').then(response => {
    console.log({postDeleteResponse: response.data});
  })
}, [])
useEffect(() => {
  axios.get('https://dummyjson.com/users?limit=5&skip=10&select=firstName,age').then(response => {
    console.log({GetUserResponse: response.data});
  })
}, [])
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
