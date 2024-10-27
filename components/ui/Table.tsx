"use client";

import React, { memo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export type TableProps = AgGridReactProps & {
  gridHeight?: string;
  theme?: "alpine" | "balham" | "material";
  className?: string;
  containerStyle?: React.CSSProperties;
};

const TableErrorFallback = () => (
  <div className="text-red-500">
    Failed to load the table. Please try again.
  </div>
);

const Table: React.FC<TableProps> = ({
  className = "",
  containerStyle = {},
  gridHeight = "500px",
  ...agGridProps
}) => {
  return (
    <ErrorBoundary FallbackComponent={TableErrorFallback}>
      <div
        className={`ag-theme-alpine ${className}`}
        style={{ height: gridHeight, width: "100%", ...containerStyle }}
      >
        <AgGridReact
          {...agGridProps}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
            agGridProps.onGridReady?.(params);
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(Table);
