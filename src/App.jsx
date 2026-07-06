import { useState } from 'react'
import './App.css'
import { statusCodes, statusColumns } from "./data/statusCodes";
import { displayColumns, mainMenu, systemStatus } from './data/displayReference'
import DataTable from './components/DataTable'
import { componentTest } from './data/componentTest';
function App() {

  return (
    <>
<section className="label-header">
  <img src="/qr-code.png" alt="QR code linking to the troubleshooting guide in the installation manual" width="120" height="120" />
  <p>Scan QR code or reference troubleshooting guide in installation manual.
The major status code is displayed in the first 2 digits of the display. 
The minor status code is displayed in the third digit. 
The major status code is also displayed on the LED indicator through the door with the first digit being the number of short flashes 
and the second digit being the number of long flashes.</p>
</section>
  <DataTable
caption="Status Code Table"
columns={statusColumns}
rows={statusCodes}
getRowKey={(row) => `${row.major}.${row.minor}`}/>

<DataTable 
caption="System Status" 
columns={displayColumns} rows={systemStatus} 
getRowKey={(row) => row.display} />


<section className="menu-nav-intro">
   <p>Scroll through main menu by pressing the MENU/SELECT button. 
        Press NEXT/OPTION button to view current setting (will flash on display) and to scroll through setting options. 
        Press MENU/SELECT button to save new setting and return to main menu. 
        The display will flash to confirm setting selection before returning to the main menu.</p>
</section>

<DataTable 
caption="Main Menu" 
columns={displayColumns} 
rows={mainMenu} getRowKey={(row) => row.display} />

<section className="component-test">
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

    <footer className="service-label">
        <p>All copyrighted materials used herein are the property of their respective owners.</p>
        <p>SERVICE LABEL · 349422-201 REV.B</p>
      </footer>

    </>
  )
}

export default App
