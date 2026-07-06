import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { statusCodes } from "./data/statusCodes";
console.log(statusCodes)
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
      <table>
      <caption>Status Code Table</caption>

      <thead></thead>
{/* description and qr code here */}
  <tbody>
{statusCodes.map((row) =>( 
  <tr key={`${row.major}.${row.minor}`}>
      <td>{row.major}</td>
      <td>{row.minor}</td>
      <td>{row.description}
      {row.note && ( <span>{row.note}</span> )}</td>
  </tr>
))}
  </tbody>
      </table>
      </section>

 
      <section id="spacer"></section>
    </>
  )
}

export default App
