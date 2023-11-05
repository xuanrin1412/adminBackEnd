import AddProduct from "./addproduct/AddProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AddProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
