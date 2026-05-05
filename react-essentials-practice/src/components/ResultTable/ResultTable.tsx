import type { ComponentPropsWithoutRef } from "react";
import "./ResultTable.css";

export type TableData = {
    columns: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[][];
}

export type ResultTableProps = ComponentPropsWithoutRef<"table"> & {
    tableData: TableData
};

export default function ResultTable({tableData}: ResultTableProps) {
    return (
        <table id="result">
            <thead>
                <tr>
                    {tableData.columns.map(col => <th key={col} scope="col">{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableData.data.map((row, rowIndex) => <tr key={rowIndex}>
                    {row.map((col, colIndex) => <td key={colIndex}>{col}</td>)}
                </tr>)}
            </tbody>
        </table>
    )
}