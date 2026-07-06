import { Fragment, useId } from "react"
import "./DataTable.css";

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
                </tbody>
            </table>

        </div>
    )
}

export default DataTable;