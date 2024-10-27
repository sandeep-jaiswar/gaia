import Table from "@gaia/components/ui/Table";
import { ColDef } from "ag-grid-community";

const Home = () => {
  const rowData = [
    { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
    { id: 3, name: "Bill Gates", age: 65, email: "bill@example.com" },
  ];

  const columnDefs: ColDef[] = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Age", field: "age", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
  ];

  return (
    <div>
      <h1>Example Page with Table</h1>
      <Table
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        gridHeight="400px"
        defaultColDef={{
          resizable: true,
          sortable: true,
        }}
      />
    </div>
  );
};

export default Home;
