// STATUS CODE TABLE (desciption and QR code)             | Menu Navigation (description)
// Table 1 | Major | Minor | Description -------- Table 2 | System Status         | Main Menu
//                                                        | Display | Description | Display | Description |
//                                                        '''''''''''''''
//                                                        '''''''''''''''
//                                                        | Component Test              SERVICE LABEL:


export const statusColumns = [
    { label: "Major", field: "major" },
    { label: "Minor", field: "minor" },
    { label: "Description", field: "description",
    },
  ];

export const statusCodes = 
[
{major: "10", minor: "1", description: "L1 polarity fault", note: "LED: rapid flash"},
{major: "10", minor: "2", description: "Dissipation System Active, operate blower"},
{ major: "otA", minor: "—", description: "Firmware install in process" },
{ major: "btL", minor: "—", description: "Failed to load, retry firmware install" },
{major: "12", minor: "1", description: "W on at power up"},
{major: "13 (3hr)", minor: "1", description: "Limit Lockout"},
{major: "14 (3hr)", minor: "1", description: "Ignition Lockout after 4 consecutive ignition tries"},
{major: "14 (3hr)", minor: "2", description: "Flame lost 3 times after 70s of heating"},
{major: "14 (3hr)", minor: "3", description: "Lockout - 7 loss of flame events during a heat request"},
{major: "15 (3hr)", minor: "1", description: "Lockout - no Blower rpms detected"},
{major: "15 (3hr)", minor: "2", description: "Lockout - Failed to reach 500rpm after retry"},
{major: "17", minor: "1", description: "BTM communication loss"},
{major: "21", minor: "1", description: "24VAC sensed on gas valve when shouldn't be, power reset only"},
{major: "22", minor: "1", description: "False flame"},
{major: "23", minor: "4", description: "LPS stuck closed"},
{major: "23", minor: "5", description: "HPS stuck closed"},
{major: "24", minor: "1", description: "Fuse fault"},
{major: "25", minor: "1", description: "No program"},
{major: "25", minor: "2", description: "Corrupted program file, reprogram control"},
{major: "25", minor: "4", description: "Main program invalid, using backup program to operate"},
{major: "25", minor: "5", description: "Installer settings corrupted"},
{major: "25", minor: "6", description: "Wrong program, reprogram control", note: "If program in furnace control is missing, not recognized, or corrupted. Reprogram control with correct program # as listed on the rating plate. Replace control if issue remains."},
{major: "27", minor: "1", description: "Program in super plug is missing, not recognized, or corrupted. Remove super plug then retry. If still have 27 code, try a different super plug. If still fails, replace control." },
{major: "27", minor: "2", description: "Program in super plug is missing, not recognized, or corrupted. Remove super plug then retry. If still have 27 code, try a different super plug. If still fails, replace control." },
{major: "27", minor: "3", description: "Program in super plug is missing, not recognized, or corrupted. Remove super plug then retry. If still have 27 code, try a different super plug. If still fails, replace control." },
{major: "31", minor: "6", description: "Open High pressure switch - HPS failed to close in 75s when high heat is required"},
{major: "31", minor: "7", description: "High Heat Only for remainder of current cycle"},
{major: "32", minor: "2", description: "Open Low pressure switch (LPS)"},
{major: "33", minor: "1", description: "Main Limit circuit open"},
{major: "34", minor: "1", description: "Ignition fault - four consecutive ignition trials"},
{major: "34", minor: "5", description: "Low heat flame lost before blower on-delay"},
{major: "34", minor: "6", description: "Low heat flame lost after blower on-delay"},
{major: "34", minor: "7", description: "High heat flame lost before blower on-delay"},
{major: "34", minor: "8", description: "High heat flame lost after blower on-delay"},
{major: "41", minor: "1", description: "No blower RPM at start up"},
{major: "41", minor: "2", description: "No RPM when blower motor is running"},
{major: "41", minor: "3", description: "Failed to reach 500rpm at startup"},
{major: "43", minor: "1", description: "HPS closed before LPS"},
{major: "45", minor: "1", description: "Internal control error (1hr)"},
{major: "45", minor: "2", description: "GVR relay not closing"},
{major: "45", minor: "3", description: "Micro EEPROM error (1hr)"},
{major: "45", minor: "4", description: "Micro loss of Comm", note: "For code 45, cycle power, if code 45 repeats, replace control"},
{major: "51", minor: "1", description: "OAT - Open"},
{major: "51", minor: "2", description: "OAT - Short"},
{major: "52", minor: "1", description: "SAT - Open"},
{major: "52", minor: "2", description: "SAT - Short"},
{major: "53", minor: "1", description: "RAT - Open"},
{major: "53", minor: "2", description: "RAT - Short"},
]