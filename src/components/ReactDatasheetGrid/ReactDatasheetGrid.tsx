import { useState, type ReactNode } from "react";
import {
  checkboxColumn,
  DataSheetGrid,
  dateColumn,
  floatColumn,
  intColumn,
  isoDateColumn,
  keyColumn,
  percentColumn,
  textColumn,
  type Column,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/style.css";
import type { Operation } from "react-datasheet-grid/dist/types";

type Row = {
  id: number | null;
  active: boolean;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  dimension: number | null;
  birthDate: Date | null;
  birthIsoDate: string | null;
  skills: number | null;
  customColumn?: ReactNode | null;
  customComponent?: ReactNode | null;
  [key: `Column${number}`]: string | number | null | boolean | Date;
};

function createLargeDataset(numRows: number, numCols: number): Row[] {
  const rows: Row[] = [];

  for (let i = 0; i < numRows; i++) {
    const row: Row = {
      id: i,
      active: i % 2 === 0,
      firstName: `Name${i}`,
      lastName: `Surname${i}`,
      age: Math.floor(Math.random() * 100),
      dimension: Math.random() * 100,
      birthDate: new Date(1970 + (i % 50), i % 12, i % 28),
      birthIsoDate: new Date(1970 + (i % 50), i % 12, i % 28)
        .toISOString()
        .split("T")[0],
      skills: Math.floor(Math.random() * 10),
    };

    for (let j = 0; j < numCols; j++) {
      row[`Column${j}`] = `Row${i}Col${j}`;
    }

    rows.push(row);
  }

  return rows;
}

function createColumns(numCols: number): Column<Row>[] {
  const columns: Column<Row>[] = [
    {
      ...keyColumn<Row, "id">("id", intColumn),
      title: "ID",
      id: "id",
    },
    {
      ...keyColumn<Row, "firstName">("firstName", textColumn),
      title: "First Name",
      id: "firstName",
    },
    {
      ...keyColumn<Row, "lastName">("lastName", textColumn),
      title: "Last Name",
      id: "lastName",
    },
    {
      ...keyColumn<Row, "age">("age", intColumn),
      title: "Age",
      id: "age",
    },
    {
      ...keyColumn<Row, "dimension">("dimension", floatColumn),
      title: "Dimension",
      id: "dimension",
    },
    {
      ...keyColumn<Row, "birthDate">("birthDate", dateColumn),
      title: "Birth Date",
      id: "birthDate",
    },
    {
      ...keyColumn<Row, "birthIsoDate">("birthIsoDate", isoDateColumn),
      title: "ISO Birth Date",
      id: "birthIsoDate",
    },
    {
      ...keyColumn<Row, "skills">("skills", percentColumn),
      title: "Skills",
      id: "skills",
    },
    {
      ...keyColumn<Row, "active">("active", checkboxColumn),
      title: "Active",
      id: "active",
    },
  ];

  for (let i = 0; i < numCols; i++) {
    columns.push({
      ...keyColumn<Row, `Column${number}`>(`Column${i}`, textColumn as any),
      title: `Column ${i + 1}`,
      id: `Column${i}`,
    });
  }
  return columns;
}

export default function ReactDatasheetGrid() {
  const [data, setData] = useState<Row[]>(() =>
    createLargeDataset(10000, 1000)
  );
  const [columns] = useState<Column<Row>[]>(() => createColumns(1000));

  const handleSetData = (newValue: Row[], operations: Operation[]) => {
    console.log("New value:", newValue);
    console.log("Operations", operations);
    setData(newValue);
  };

  return (
    <DataSheetGrid
      value={data}
      onChange={handleSetData}
      columns={columns}
      height={600}
      headerRowHeight={50}
      stickyRightColumn={{
        component: ({ deleteRow }) => (
          <button onClick={deleteRow} className="text-small">
            X
          </button>
        ),
      }}
      lockRows
      disableExpandSelection
    />
  );
}
