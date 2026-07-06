First I just created a table. And made note of a "mobile responsive checklist" https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Mobile_accessibility_checklist

I know that the image is an .svg, I did think about attempting to parse it, however there are no text nodes present in it. If there were we could utilize DOMParser.
```
const parser = new DOMParser();

```
https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/text
https://stackoverflow.com/questions/58020337/is-there-a-way-to-parse-a-svg-file-with-javascript


I elected to build a React project with Vite using the Javascript template.

```
npm create vite@latest .
npm run dev
npm run build     # produces the production bundle in dist/
npm run preview   # serves that built dist/ locally, to check the real build
```
https://vite.dev/guide/#command-line-interface


I then created at data folder inside the src folder and added the svg image given to the /src/assets folder. And began just listing the structure of the tables in the comments of the file. I want to build these array's of objects because it is a bit easier to navigate to debug them. Instead of having to navigate a hardcoded table potentially having to scroll in all directions.
I want to add the ability for the user to search the tables.
I then will start rendering the data by maping through the text with the key `${major}.${minor}` but first I make the skeleton of the array object:
```
export const = statusCodes = [
{major: "", minor: "", description: ""}
]
```
I make a note of merged columns and rows, and decide to give an optional "note" field for my object.
Here is the example in the table:
(SS1)
```
{major: "10", minor: "1", description: "L1 polarity fault", note: "LED: rapid flash"},
```
I decide that the note field will be put in the table that it appears under.
For text that entirely replaces the 2 Major and Minor columns that will be annotated as:
```
{ major: "otA", minor: "—", description: "Firmware install in process." }
{ major: "btL", minor: "—", description: "Failed to load, retry firmware install." }
```
I'm going to add the very large descriptions and QR codes after completing the 2 tables.


Now I will build the first table by looping through the statusCodes by what is unique:
```
{statusCodes.map((row) =>( 
  <tr key={`${row.major}.${row.minor}`}>
      <td>{row.major}</td>
      <td>{row.minor}</td>
      <td>{row.description}</td>
  </tr>
))}
```


I NEED to account for the occasional note parameter:
```
{statusCodes.map((row) =>( 
  <tr key={`${row.major}.${row.minor}`}>
      <td>{row.major}</td>
      <td>{row.minor}</td>
      <td>{row.description}
      {row.note && ( <span>{row.note}</span> )}</td>
  </tr>
))}
```

I now will build the Menu Navigation data (displayReference.jsx)
consisting of 2 array objects:
```
export const systemStatus = [
  { display: "", description: "" },
  // ...
];

export const mainMenu = [
  { display: "", description: "" },
  // ...
];
```
* one quick note on the menu navigation: in the description for FLt - occurred is spelled wrong: "occured" I corrected this.


I now build componentTest.jsx as it's own data file because it has it's own unique structure.
I will build the table in the same way, by building a key using Display and Description.
```
    <table>
      <caption>Menu Navigation</caption>
<thead>
  <tr>
    <th scope="col">Display</th>
    <th scope="col">Description</th>
  </tr>
</thead>
{/* description and qr code here */}
  <tbody>
{systemStatus.map((row) =>( 
  <tr key={`${row.display}.${row.description}`}>
      <td>{row.display}</td>
      <td>{row.description}</td>
  </tr>
))}
  </tbody>
      </table>
```
All of the table building done above was just done as testing in App.jsx
I wanted to just build the tables via the map function.

I now want to design a DataTable (/src/components/DataTables.jsx) component:
DataTable(caption, columns, rows, getRowKey)
columns will need to be passed as an array of objects
Here is the columns data in statusCodes.jsx
```
const columns = [
    { label: "Major", field: "major" },
    { label: "Minor", field: "minor" },
    { label: "Description", field: "description" }
]
```
I want to use useId from react so ids are not duplicated since we are rendering the tables - this will increment all ids to make them unique.
In DataTable.jsx we loop through the column map to display the column headers
```
{columns.map((col) => (
  <th scope="col" key={col.field}>{col.label}</th>
))}
```
Then for the body I loop over the rows, with a nested loop inside for those column values.
```
{rows.map((row) => (
  <tr key={getRowKey(row)}>
    {columns.map((col) => (
      <td key={col.field}>{row[col.field]}</td>
    ))}
  </tr>
))}
```

I can now build the first table in App.jsx
```
<DataTable
caption="Status Code Table"
columns={statusColumns}
rows={statusCodes}
getRowKey={(row) => `${row.major}.${row.minor}`}
/>
```
I build the columns value in displayReference.jsx, it is just 2 columns display and description.
To create that table for getRowKey I just use row.display,
the same thing is done for Main Menu
```
<DataTable 
caption="System Status" 
columns={displayColumns} rows={systemStatus} 
getRowKey={(row) => row.display} />

<DataTable 
caption="Main Menu" 
columns={displayColumns} 
rows={mainMenu} getRowKey={(row) => row.display} />
```

Now I wire the note field back into the tables.
To do this I will update the following line:
```
<td key={col.field}>
    {row[col.field]}
</td>
```
To this - this checks if a render has been defined in the columns of any of the data:
```
<td key={col.field}>
  {col.render ? col.render(row) : row[col.field]}
</td>
```

here is the updated statusColumns:
```
export const statusColumns = [
    { label: "Major", field: "major" },
    { label: "Minor", field: "minor" },
    {
      label: "Description",
      field: "description",
      render: (row) => (
        <>
          {row.description}
          {row.note && <div className="note">{row.note}</div>}
        </>
      ),
    },
  ];
```

I quickly need to add the "Component Test" section of the second table:
We just have to call the paragraph:
```
<p>{componentTest.preconditions}</p>
```
And the ordered sqeuence:
```
<ol>
  {componentTest.steps.map((step) => (
    <li key={step.code}>
      <strong>{step.code}</strong> — {step.action}
    </li>
  ))}
</ol>
```
I added the <strong> tags to remind myself that I want to change the font of the screen displays
I have a few left over in the other table.

Now I work on styling:
I want to add a scrollable region
Make each row a card

I make DataTables.css and import it into DataTables.jsx

For responsive behavior I used the accessible scroll-region pattern.
Reference: Adrian Roselli, "Under-Engineered Responsive Tables. https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html
I made a basic test.html and test.css to begin this project just to make a basic mobile responsive table.

TODO: 
[x] build menu navigation table
[x] add note field back to DataTable
[] add component test
change the font of text that is clearly supposed to mimic what the user would be seeing on the furnace/device
style tables
    [] - make columns span down if the same number
    [] - notes
    [] - component test needs to look like a table
add descriptions + qr codes

