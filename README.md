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

I now will build the Menu Navigation data (displayReference.js)
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


I now build componentTest.js as it's own data file because it is it's own unique structure.

TODO: 
build menu navigation table
change the font of text that is clearly supposed to mimic what the user would be seeing on the furnace/device
style tables
add descriptions + qr codes

