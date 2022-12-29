import React from "react";

function Table({ chartData }) {
    const xAxis = chartData.labels;
    const yAxis = chartData.datasets;

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama Produk</th>
                    {xAxis.map((entry, index) => (
                        <th key={index}>{entry}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {yAxis.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.label}</td>
                        {entry.data.map((entry, index) => (
                            <td key={index}>{`${Number(entry)}%`}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
