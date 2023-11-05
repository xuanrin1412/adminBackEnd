import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(name);
        console.log(password);
        axios
            .post("http://localhost:3001/api/register/", {
                name,
                email,
                password,
            })
            .then((result) => {
                console.log(result.data);
                navigate("/");

                // navigate("/login");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="showForm">
            <div className="contain">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="">Register</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="email"
                    />
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="tem dang nhap"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        placeholder="mat khau"
                    />

                    <input type="submit" />
                </form>
            </div>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
}
