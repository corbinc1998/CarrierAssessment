export const componentTest = {
    preconditions:
      'To initiate the component test sequence, the control must be in idle (idL) mode with no thermostat demands (W, Y, G). Select component test (CE) from the menu select buttons to start the sequence. Once initiated, the furnace control performs the following sequence. "Err" during a step means an issue was detected.',
    steps: [
      { code: "Pur", action: "Inducer ON High" },
      { code: "HSi", action: "After waiting 10s, HSI ON for 15s" },
      { code: "Fn", action: "After HSI, then Blower ON for 15s" },
      { code: "End", action: "After Blower, Inducer ON Low for 10s. The test ends" },
    ],
  };