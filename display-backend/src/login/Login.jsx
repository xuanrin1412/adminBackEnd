import "./login.scss";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        const data = {
            email,
            password,
        };
        axios
            .post("http://localhost:3001/api/login/", data, {
                withCredentials: true,
            })
            .then((result) => {
                // console.log("result", result);
                if (result.data.message === "Login Success") {
                    navigate("/");
                } else {
                    alert("Check your email and password");
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="showForm">
            <div className="contain">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="">Login</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="email"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        placeholder="mat khau"
                    />

                    <input type="submit" />
                </form>

                <Link to="/register">
                    <button>Don't have account</button>
                </Link>
                <Link to="/">
                    <button>Back to Home</button>
                </Link>
            </div>
        </div>
    );
}
