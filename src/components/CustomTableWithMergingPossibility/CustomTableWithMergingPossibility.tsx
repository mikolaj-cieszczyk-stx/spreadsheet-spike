import React from "react";

type CellData = {
  value: string | number | null;
  isMerged: boolean;
  masterCell?: [number, number];
};

type MergedRegion = {
  masterCell: [number, number];
  span: [number, number];
};

type TableData = {
  cells: CellData[][];
  mergedRegions: MergedRegion[];
};

const initialTableData: TableData = {
  cells: [
    [
      { value: "A1", isMerged: false },
      { value: "B1", isMerged: false },
      { value: "C1", isMerged: false },
    ],
    [
      { value: "A2", isMerged: false },
      { value: "B2", isMerged: true, masterCell: [1, 1] },
      { value: "C2", isMerged: true, masterCell: [1, 1] },
    ],
    [
      { value: "A3", isMerged: false },
      { value: "B3", isMerged: false },
      { value: "C3", isMerged: false },
    ],
  ],
  mergedRegions: [
    {
      masterCell: [1, 1],
      span: [1, 2],
    },
  ],
};

const CustomTableWithMergingPossibility: React.FC = ({}) => {
  return (
    <table>
      <tbody>
        {tableData.cells.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => {
              const mergedRegion = tableData.mergedRegions.find(
                (region) =>
                  region.masterCell[0] === rowIndex &&
                  region.masterCell[1] === colIndex
              );

              if (mergedRegion) {
                return (
                  <td
                    key={colIndex}
                    rowSpan={mergedRegion.span[0]}
                    colSpan={mergedRegion.span[1]}
                  >
                    {cell.value}
                  </td>
                );
              }

              if (cell.isMerged && cell.masterCell) {
                return null;
              }

              return <td key={colIndex}>{cell.value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTableWithMergingPossibility;

const tableData: TableData = {
  cells: [
    [
      { value: "A1", isMerged: false },
      { value: "B1", isMerged: false },
      { value: "C1", isMerged: false },
      { value: "D1", isMerged: false },
    ],
    [
      { value: "A2", isMerged: false },
      { value: "B2", isMerged: true, masterCell: [1, 1] },
      { value: "C2", isMerged: true, masterCell: [1, 1] },
      { value: "D2", isMerged: false },
    ],
    [
      { value: "A3", isMerged: false },
      { value: "B3", isMerged: false },
      { value: "C3", isMerged: true, masterCell: [2, 2] },
      { value: "D3", isMerged: true, masterCell: [2, 2] },
    ],
    [
      { value: "A4", isMerged: false },
      { value: "B4", isMerged: false },
      { value: "C4", isMerged: false },
      { value: "D4", isMerged: false },
    ],
    [
      { value: "A5", isMerged: false },
      { value: "B5", isMerged: false },
      { value: "C5", isMerged: false },
      { value: "D5", isMerged: false },
    ],
  ],
  mergedRegions: [
    {
      masterCell: [1, 1],
      span: [1, 2],
    },
    {
      masterCell: [2, 2],
      span: [1, 2],
    },
  ],
};
