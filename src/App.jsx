import { useState } from 'react'
import './App.css'
import { statusCodes, statusColumns } from "./data/statusCodes";
import { displayColumns, mainMenu, systemStatus } from './data/displayReference'
import DataTable from './components/DataTable'
import { componentTest } from './data/componentTest';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <DataTable
caption="Status Code Table"
columns={statusColumns}
rows={statusCodes}
getRowKey={(row) => `${row.major}.${row.minor}`}/>

<DataTable 
caption="System Status" 
columns={displayColumns} rows={systemStatus} 
getRowKey={(row) => row.display} />

<DataTable 
caption="Main Menu" 
columns={displayColumns} 
rows={mainMenu} getRowKey={(row) => row.display} />

<section>
      <h2>Component Test</h2>
      <p>{componentTest.preconditions}</p>
      <ol>
        {componentTest.steps.map((step) => (
          <li key={step.code}>
            <strong>{step.code}</strong> — {step.action}
          </li>
        ))}
      </ol>
    </section>

    </>
  )
}

export default App
