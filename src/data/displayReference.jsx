export const displayColumns = [
    { label: "Display", field: "display" },
    { label: "Description", field: "description" },
  ];

export const systemStatus = [
    { display: "idL", description: "Idle / Standby Mode" },
    { display: "HE2", description: "High Heating Mode" },
    { display: "HE1", description: "Low Heating Mode" },
    { display: "CL2", description: "High Cooling Mode" },
    { display: "CL1", description: "Low Cooling Mode" },
    { display: "HPd", description: "Heat Pump Defrost Mode" },
    { display: "CFn, CF2, CF3", description: "Continuous Fan Mode" },
    { display: "##.#", description: "Active Status Code" },
  ];
  
  export const mainMenu = [
    { display: "idL, HE,...", description: "Current System Status" },
    { display: "FLt", description: "Last 7 faults that occurred" },
    { display: "t°", description: "Temperature Display ON/OFF" },
    { display: "HE", description: "Heating Blower speed" },
    { display: "CL2, CL1", description: "Cooling & Heat Pump Blwr speed" },
    { display: "CFn", description: "Continuous Fan speed" },
    { display: "Hod", description: "Heat OFF delay" },
    { display: "Cod", description: "Cool OFF delay" },
    { display: "HEt", description: "Heating thermostat type" },
    { display: "CEt", description: "Cooling thermostat type" },
    { display: "dir", description: "Orientation upflow or downflow" },
    { display: "Air", description: "CFM display ON/OFF" },
    { display: "inF", description: "Program # and Software version" },
    { display: "CE", description: "Component test" },
    { display: "rSt", description: "Reset All Installer Settings to Factory Defaults" },
  ];