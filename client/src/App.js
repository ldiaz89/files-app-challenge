import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./component/Header";
import "./styles.css";
import { CustomTable } from "./component/CustomTable";
function App() {
  return (
    <div className="App">
      <Header />
      <CustomTable />
    </div>
  );
}
export default App;
