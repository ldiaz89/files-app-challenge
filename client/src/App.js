import React from "react";
import { HolaComponent } from "./component/HolaComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Header } from "./component/Header";
import "./styles.css";
import { CustomTable } from "./component/CustomTable";
import FilterDropdown from "./component/FilterDropdown";
function App() {
  return (
    <div className="App">
      <Header />
      <CustomTable />
    </div>
  );
}
export default App;
