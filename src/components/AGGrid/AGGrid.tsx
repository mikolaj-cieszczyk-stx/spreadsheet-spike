import React, { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef, type GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface RowData {
  athlete: string;
  age: number;
  country: string;
  custom: string;
}

const AGGrid = () => {
  const gridRef = useRef<GridApi | null>(null);

  const handleCopy = useCallback(() => {
    const selectedNodes = gridRef.current?.getSelectedNodes();
    if (!selectedNodes) return;

    const selectedData = selectedNodes.map((node) => node.data);
    const selectedText = selectedData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");

    navigator.clipboard.writeText(selectedText);
  }, []);

  const onGridReady = (params: any) => {
    gridRef.current = params.api;
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "c") {
        handleCopy();
      }
    });
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 820 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        enableRangeSelection
        rowSelection="multiple"
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default AGGrid;

const CustomCellRenderer = (params: { value: string }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: "4px" }}
      >
        <path d="M8 0L6.4 5H0l5.2 3.8L3.6 16 8 12.2 12.4 16l-1.6-7.2L16 5h-6.4L8 0z" />
      </svg>
      <span>{params.value}</span>
    </div>
  );
};

const columnDefs: ColDef<RowData>[] = [
  {
    headerName: "Athlete",
    field: "athlete",
    colSpan: (params) => {
      return params.data?.athlete.includes("Mo Farah") ? 2 : 1;
    },
  },
  {
    headerName: "Age",
    field: "age",
  },
  {
    headerName: "Country",
    field: "country",
    colSpan: (params) => {
      return params.data?.country.includes("China") ? 2 : 1;
    },
  },
  {
    headerName: "Custom Field",
    field: "custom",
    cellRenderer: CustomCellRenderer,
  },
];

const rowData: RowData[] = [
  {
    athlete: "Michael Phelps",
    age: 23,
    country: "USA",
    custom: "Gold Medalist",
  },
  {
    athlete: "Usain Bolt",
    age: 30,
    country: "Jamaica",
    custom: "World Record Holder",
  },
  {
    athlete: "Yohan Blake",
    age: 28,
    country: "Jamaica",
    custom: "Silver Medalist",
  },
  {
    athlete: "Allyson Felix",
    age: 34,
    country: "USA",
    custom: "Champion Sprinter",
  },
  {
    athlete: "Mo Farah with colSpan 2",
    age: 37,
    country: "UK",
    custom: "Long Distance Runner",
  },
  {
    athlete: "Simone Biles",
    age: 23,
    country: "USA",
    custom: "Gymnastics Star",
  },
  {
    athlete: "Katie Ledecky",
    age: 24,
    country: "USA",
    custom: "Swimming Prodigy",
  },
  {
    athlete: "Sun Yang",
    age: 29,
    country: "China with colSpan 2",
    custom: "Swimming Champion",
  },
  {
    athlete: "David Rudisha",
    age: 31,
    country: "Kenya",
    custom: "800m World Record Holder",
  },
  {
    athlete: "Wayde van Niekerk",
    age: 27,
    country: "South Africa",
    custom: "400m World Record Holder",
  },
  {
    athlete: "Shelly-Ann Fraser-Pryce",
    age: 34,
    country: "Jamaica",
    custom: "100m Sprinter",
  },
  {
    athlete: "Elaine Thompson",
    age: 28,
    country: "Jamaica",
    custom: "Double Olympic Champion",
  },
  {
    athlete: "Caster Semenya",
    age: 30,
    country: "South Africa",
    custom: "800m Specialist",
  },
  {
    athlete: "Dina Asher-Smith",
    age: 25,
    country: "UK",
    custom: "200m Specialist",
  },
  {
    athlete: "Justin Gatlin",
    age: 38,
    country: "USA",
    custom: "Veteran Sprinter",
  },
];
