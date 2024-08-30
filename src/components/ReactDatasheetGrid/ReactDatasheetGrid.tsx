import { useState } from "react";
import {
  checkboxColumn,
  type Column,
  DataSheetGrid,
  dateColumn,
  floatColumn,
  intColumn,
  isoDateColumn,
  keyColumn,
  percentColumn,
  textColumn,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/style.css";
import type { Operation } from "react-datasheet-grid/dist/types";

// Define your row type anywhere
type Row = {
  id: number;
  active: boolean;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  dimension: number | null;
  birthDate: Date | null;
  birthIsoDate: string | null;
  skills: number | null;
};

export default function ReactDatasheetGrid() {
  // Type your data (not DSG specific)
  const [data, setData] = useState<Row[]>(fakeData);

  const handleSetData = (
    newValue: Record<string, any>[],
    operations: Operation[]
  ) => {
    console.log("New value:", newValue);
    console.log("Operations", operations);
  };

  // Type your columns to get type checks in your IDE
  const columns: Column<Row>[] = [
    {
      ...keyColumn<Row, "firstName">("firstName", textColumn),
      title: "Text",
      id: "2",
    },
    {
      ...keyColumn<Row, "lastName">("lastName", textColumn),
      title: "Text",
      id: "3",
    },
    {
      ...keyColumn<Row, "age">("age", intColumn),
      title: "Int",
      id: "4",
    },
    {
      ...keyColumn<Row, "dimension">("dimension", floatColumn),
      title: "Float",
      id: "5",
    },
    {
      ...keyColumn<Row, "birthDate">("birthDate", dateColumn),
      title: "Date",
      id: "6",
    },
    {
      ...keyColumn<Row, "birthIsoDate">("birthIsoDate", isoDateColumn),
      title: "ISO Date",
      id: "7",
    },
    {
      ...keyColumn<Row, "skills">("skills", percentColumn),
      title: "Percent",
      id: "8",
    },
    {
      ...keyColumn<Row, "active">("active", checkboxColumn),
      title: "Checkbox",
      id: "1",
    },
  ];

  return (
    <DataSheetGrid value={data} onChange={handleSetData} columns={columns} />
  );
}

const fakeData = [
  {
    id: 1,
    active: true,
    firstName: "Elon",
    lastName: "Musk",
    age: 52,
    dimension: 18.92,
    birthDate: new Date(1971, 5, 28),
    birthIsoDate: new Date(1971, 5, 28).toISOString().split("T")[0],
    skills: 5,
  },
  {
    id: 2,
    active: false,
    firstName: "Jeff",
    lastName: "Bezos",
    age: 59,
    dimension: 19.64,
    birthDate: new Date(1964, 0, 12),
    birthIsoDate: new Date(1964, 0, 12).toISOString().split("T")[0],
    skills: 8,
  },
  {
    id: 3,
    active: true,
    firstName: "Alice",
    lastName: "Johnson",
    age: 34,
    dimension: 22.58,
    birthDate: new Date(1989, 3, 14),
    birthIsoDate: new Date(1989, 3, 14).toISOString().split("T")[0],
    skills: 3,
  },
  {
    id: 4,
    active: false,
    firstName: "Bob",
    lastName: "Smith",
    age: 45,
    dimension: 20.48,
    birthDate: new Date(1978, 7, 22),
    birthIsoDate: new Date(1978, 7, 22).toISOString().split("T")[0],
    skills: 7,
  },
  {
    id: 5,
    active: true,
    firstName: "Charlie",
    lastName: "Brown",
    age: 29,
    dimension: 17.76,
    birthDate: new Date(1994, 10, 5),
    birthIsoDate: new Date(1994, 10, 5).toISOString().split("T")[0],
    skills: 4,
  },
  {
    id: 6,
    active: true,
    firstName: "Diana",
    lastName: "Prince",
    age: 31,
    dimension: 19.95,
    birthDate: new Date(1992, 1, 22),
    birthIsoDate: new Date(1992, 1, 22).toISOString().split("T")[0],
    skills: 6,
  },
  {
    id: 7,
    active: false,
    firstName: "Eve",
    lastName: "Adams",
    age: 26,
    dimension: 15.87,
    birthDate: new Date(1997, 8, 3),
    birthIsoDate: new Date(1997, 8, 3).toISOString().split("T")[0],
    skills: 2,
  },
  {
    id: 8,
    active: true,
    firstName: "Frank",
    lastName: "Wilson",
    age: 38,
    dimension: 23.12,
    birthDate: new Date(1985, 2, 11),
    birthIsoDate: new Date(1985, 2, 11).toISOString().split("T")[0],
    skills: 9,
  },
  {
    id: 9,
    active: false,
    firstName: "Grace",
    lastName: "Lee",
    age: 41,
    dimension: 16.43,
    birthDate: new Date(1982, 4, 17),
    birthIsoDate: new Date(1982, 4, 17).toISOString().split("T")[0],
    skills: 10,
  },
  {
    id: 10,
    active: true,
    firstName: "Henry",
    lastName: "Miller",
    age: 50,
    dimension: 21.65,
    birthDate: new Date(1973, 6, 30),
    birthIsoDate: new Date(1973, 6, 30).toISOString().split("T")[0],
    skills: 12,
  },
  {
    id: 11,
    active: false,
    firstName: "Isabella",
    lastName: "Martinez",
    age: 27,
    dimension: 14.78,
    birthDate: new Date(1996, 2, 9),
    birthIsoDate: new Date(1996, 2, 9).toISOString().split("T")[0],
    skills: 5,
  },
  {
    id: 12,
    active: true,
    firstName: "Jack",
    lastName: "Davis",
    age: 36,
    dimension: 18.32,
    birthDate: new Date(1987, 11, 19),
    birthIsoDate: new Date(1987, 11, 19).toISOString().split("T")[0],
    skills: 11,
  },
  {
    id: 13,
    active: true,
    firstName: "Karen",
    lastName: "Garcia",
    age: 43,
    dimension: 20.11,
    birthDate: new Date(1980, 9, 14),
    birthIsoDate: new Date(1980, 9, 14).toISOString().split("T")[0],
    skills: 8,
  },
  {
    id: 14,
    active: false,
    firstName: "Leo",
    lastName: "Martins",
    age: 33,
    dimension: 17.58,
    birthDate: new Date(1990, 6, 25),
    birthIsoDate: new Date(1990, 6, 25).toISOString().split("T")[0],
    skills: 6,
  },
  {
    id: 15,
    active: true,
    firstName: "Mia",
    lastName: "Lopez",
    age: 25,
    dimension: 19.34,
    birthDate: new Date(1998, 5, 10),
    birthIsoDate: new Date(1998, 5, 10).toISOString().split("T")[0],
    skills: 3,
  },
  {
    id: 16,
    active: false,
    firstName: "Noah",
    lastName: "Anderson",
    age: 47,
    dimension: 22.47,
    birthDate: new Date(1976, 1, 18),
    birthIsoDate: new Date(1976, 1, 18).toISOString().split("T")[0],
    skills: 9,
  },
  {
    id: 17,
    active: true,
    firstName: "Olivia",
    lastName: "Kim",
    age: 39,
    dimension: 15.67,
    birthDate: new Date(1984, 11, 4),
    birthIsoDate: new Date(1984, 11, 4).toISOString().split("T")[0],
    skills: 7,
  },
  {
    id: 18,
    active: false,
    firstName: "Paul",
    lastName: "Hernandez",
    age: 44,
    dimension: 18.92,
    birthDate: new Date(1979, 8, 2),
    birthIsoDate: new Date(1979, 8, 2).toISOString().split("T")[0],
    skills: 4,
  },
  {
    id: 19,
    active: true,
    firstName: "Quincy",
    lastName: "Nguyen",
    age: 28,
    dimension: 21.37,
    birthDate: new Date(1995, 0, 7),
    birthIsoDate: new Date(1995, 0, 7).toISOString().split("T")[0],
    skills: 2,
  },
  {
    id: 20,
    active: false,
    firstName: "Rachel",
    lastName: "Clark",
    age: 32,
    dimension: 16.89,
    birthDate: new Date(1991, 3, 23),
    birthIsoDate: new Date(1991, 3, 23).toISOString().split("T")[0],
    skills: 10,
  },
];
