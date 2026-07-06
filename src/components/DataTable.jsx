import { useId } from "react"
import "./DataTable.css";
// columns:
// const columns = [
//     { label: "Major", field: "major" },
//     { label: "Minor", field: "minor" },
//     { label: "Description", field: "description" }
// ]

function DataTable ({caption, columns, rows, getRowKey}){
    const captionId = useId()

    return (
        <div role="region" aria-labelledby={captionId} tabIndex={0}>
            <table>
                <caption id={captionId}>{caption}</caption>
                <thead>
                    <tr>
                    {columns.map((col) => (
                        <th scope="col" key={col.field}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={getRowKey(row)}>
                            {columns.map((col) =>(
                                <td key={col.field}>
                                    {col.render ? col.render(row) : row[col.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default DataTable;