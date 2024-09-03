import React, { useCallback, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const generateColumns = (numColumns: number): ColDef[] => {
  return Array.from({ length: numColumns }, (_, index) => ({
    headerName: `Column ${index + 1}`,
    field: `field${index + 1}`,
    resizable: true,
  }));
};

const generateRows = (
  numRows: number,
  numColumns: number
): Record<string, string>[] => {
  return Array.from({ length: numRows }, (_, rowIndex) => {
    const row: Record<string, string> = {};
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      row[`field${colIndex + 1}`] = `Row${rowIndex + 1}Col${colIndex + 1}`;
    }
    return row;
  });
};

const AGGrid = () => {
  const gridRef = useRef<AgGridReact>(null);

  const columnDefs = useMemo(() => generateColumns(1000), []);
  const rowData = useMemo(() => generateRows(10000, 1000), []);

  const handleCopy = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    if (!selectedNodes) return;

    const selectedData = selectedNodes.map((node) => node.data);
    const selectedText = selectedData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");

    navigator.clipboard.writeText(selectedText);
  }, []);

  const onGridReady = (params: any) => {
    if (gridRef.current) {
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "c") {
          handleCopy();
        }
      });
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        enableRangeSelection={true}
        rowSelection="multiple"
        onGridReady={onGridReady}
        defaultColDef={{ resizable: true }}
      />
    </div>
  );
};

export default AGGrid;
