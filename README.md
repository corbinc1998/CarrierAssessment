# Carrier Assessment

**Solution Webpage**


## Running Locally

### First time (or a fresh clone from GitHub)

```bash
git clone https://github.com/corbinc1998/CarrierAssessment.git
cd CarrierAssessment
npm install
npm run dev
```

### Already have the project

```bash
npm run dev
```

`npm run dev` starts the dev server and prints a local URL (usually
`http://localhost:5173`). Open it in your browser — it hot-reloads on save.
Stop it with `Ctrl+C`.

### All scripts

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (first time / after a fresh clone) |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Serve the built `dist/` locally (closest to the live site) |


## Live Updated Notes

First I just created a table. And made note of a [mobile responsive checklist](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Mobile_accessibility_checklist)

I know that the image is an `.svg`, I did think about attempting to parse it, however there are no text nodes present in it. If there were we could utilize `DOMParser`.

```js
const parser = new DOMParser();
```

- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/text
- https://stackoverflow.com/questions/58020337/is-there-a-way-to-parse-a-svg-file-with-javascript

I elected to build a React project with Vite using the Javascript template.

```
npm create vite@latest .
npm run dev
npm run build     # produces the production bundle in dist/
npm run preview   # serves that built dist/ locally, to check the real build
```

https://vite.dev/guide/#command-line-interface

I then created at data folder inside the src folder and added the svg image given to the `/src/assets` folder. And began just listing the structure of the tables in the comments of the file. I want to build these array's of objects because it is a bit easier to navigate to debug them. Instead of having to navigate a hardcoded table potentially having to scroll in all directions.

I want to add the ability for the user to search the tables.

I then will start rendering the data by maping through the text with the key `${major}.${minor}` but first I make the skeleton of the array object:

```js
export const = statusCodes = [
{major: "", minor: "", description: ""}
]
```

I make a note of merged columns and rows, and decide to give an optional "note" field for my object.
Here is the example in the table:
(SS1)

```js
{major: "10", minor: "1", description: "L1 polarity fault", note: "LED: rapid flash"},
```

I decide that the note field will be put in the table that it appears under.
For text that entirely replaces the 2 Major and Minor columns that will be annotated as:

```js
{ major: "otA", minor: "—", description: "Firmware install in process." }
{ major: "btL", minor: "—", description: "Failed to load, retry firmware install." }
```

I'm going to add the very large descriptions and QR codes after completing the 2 tables.

Now I will build the first table by looping through the statusCodes by what is unique:

```jsx
{statusCodes.map((row) =>( 
  <tr key={`${row.major}.${row.minor}`}>
      <td>{row.major}</td>
      <td>{row.minor}</td>
      <td>{row.description}</td>
  </tr>
))}
```

I NEED to account for the occasional note parameter:

```jsx
{statusCodes.map((row) =>( 
  <tr key={`${row.major}.${row.minor}`}>
      <td>{row.major}</td>
      <td>{row.minor}</td>
      <td>{row.description}
      {row.note && ( <span>{row.note}</span> )}</td>
  </tr>
))}
```

I now will build the Menu Navigation data (`displayReference.jsx`)
consisting of 2 array objects:

```js
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

I now build `componentTest.jsx` as it's own data file because it has it's own unique structure.
I will build the table in the same way, by building a key using Display and Description.

```jsx
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

I now want to design a DataTable (`/src/components/DataTables.jsx`) component:
`DataTable(caption, columns, rows, getRowKey)`
columns will need to be passed as an array of objects
Here is the columns data in `statusCodes.jsx`

```js
const columns = [
    { label: "Major", field: "major" },
    { label: "Minor", field: "minor" },
    { label: "Description", field: "description" }
]
```

I want to use useId from react so ids are not duplicated since we are rendering the tables - this will increment all ids to make them unique.
In DataTable.jsx we loop through the column map to display the column headers

```jsx
{columns.map((col) => (
  <th scope="col" key={col.field}>{col.label}</th>
))}
```

Then for the body I loop over the rows, with a nested loop inside for those column values.

```jsx
{rows.map((row) => (
  <tr key={getRowKey(row)}>
    {columns.map((col) => (
      <td key={col.field}>{row[col.field]}</td>
    ))}
  </tr>
))}
```

I can now build the first table in App.jsx

```jsx
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

```jsx
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

```jsx
<td key={col.field}>
    {row[col.field]}
</td>
```

To this - this checks if a render has been defined in the columns of any of the data:

```jsx
<td key={col.field}>
  {col.render ? col.render(row) : row[col.field]}
</td>
```

here is the updated statusColumns:

```jsx
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

```jsx
<p>{componentTest.preconditions}</p>
```

And the ordered sqeuence:

```jsx
<ol>
  {componentTest.steps.map((step) => (
    <li key={step.code}>
      <strong>{step.code}</strong> — {step.action}
    </li>
  ))}
</ol>
```

I added the `<strong>` tags to remind myself that I want to change the font of the screen displays
I have a few left over in the other table.

Now I work on styling:
I want to add a scrollable region
Make each row a card

I make DataTables.css and import it into DataTables.jsx

For responsive behavior I used the accessible scroll-region pattern.
Reference: Adrian Roselli, "Under-Engineered Responsive Tables. https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html
I made a basic test.html and test.css to begin this project just to make a basic mobile responsive table.
I modified the look to try to replicate the .svg given to me.

I now need to update the notes field because I want it to display in it's own row as intended.
I will be using Fragment: https://react.dev/reference/react/Fragment
I will be removing the note from the statusColumns and implementing it into the DataTable.jsx file.
This code allows a normal row to be rendered AND a note row - only displays a note when there is a note (the conditional at the bottom):

```jsx
{rows.map((row) => (
  <Fragment key={getRowKey(row)}>
    <tr>
      {columns.map((col) => (
        <td key={col.field}>
          {col.render ? col.render(row) : row[col.field]}
        </td>
      ))}
    </tr>
    {row.note && (
      <tr>
        <td colSpan={columns.length} className="note-row">{row.note}</td>
      </tr>
    )}
  </Fragment>
))}
```

This makes the note it's own row. However, I need it to flow into the description before it. I might just have to comeback to that.

I add styling to make Component Test look like a table:

```css
.component-test {
  border: 1px solid #000;
  padding: 1rem;
  margin-bottom: 1.5em;
}
.component-test h2 { margin-top: 0; }
.component-test p { margin-bottom: 1rem; }
.component-test ol { padding-left: 1.5rem; }
.component-test li { margin-bottom: 0.5rem; }
```

I generated a new qr code. I used [qr.io](https://qr.io/?gad_source=1&gad_campaignid=11398459434&gbraid=0AAAAAC6IOXLGor0p4_B6fd-eNu51r_WXp&gclid=CjwKCAjwpK3SBhASEiwAtV1SPBPE3um-qpdX2rfj6vlEBn0VkD7EshO0i8w7zanRHxvQJQhf7JbYIRoChvMQAvD_BwE)

I elected to not use the service label image, as I couldnt get a clean version of it and am also assuming I would have access to this asset
in a real work situation.

## TODO


- [x] build menu navigation table
- [x] add note field back to DataTable
- [x] add component test
- [] change the font of text that is clearly supposed to mimic what the user would be seeing on the furnace/device
- [] - make columns span down if the same number
- [x] - notes
- [x] - component test needs to look like a table
- [x] add descriptions + qr codes


Shipping as a single tall table trade off for a responsive table.
Shipping with repeating numbers in columns.
I might ship without changing the font to clearly mimic where the table is showing what the display of the device might look like.
