import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/editbook/:id" element={<EditBook />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
