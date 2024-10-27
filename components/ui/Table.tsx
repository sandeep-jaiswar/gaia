"use client";

import React, { memo } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export type TableProps = AgGridReactProps & {
  gridHeight?: string;
};

const Table: React.FC<TableProps> = ({ gridHeight = "500px", ...agGridProps }) => {

  return (
    <div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
      <AgGridReact {...agGridProps} />
    </div>
  );
};

export default memo(Table);
