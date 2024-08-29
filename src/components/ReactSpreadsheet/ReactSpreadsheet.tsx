import React from "react";
import { Spreadsheet } from "react-spreadsheet";

interface ReactSpreadsheetProps {}

const ReactSpreadsheet: React.FC<ReactSpreadsheetProps> = () => {
  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate", readOnly: true }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  return (
    <Spreadsheet
      data={data}
      columnLabels={columnLabels}
      rowLabels={rowLabels}
    />
  );
};

export default ReactSpreadsheet;
