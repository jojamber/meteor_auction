import { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { FaKeycdn } from "react-icons/fa";
import { useCurrentUser } from "./UserContext";

export const AuthModal = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const user = useCurrentUser();

    const mapErrorToMessage = (err) => {
        if (err.reason === "Match failed") return "Please fill out all fields.";
        return err.reason;
    };

    const handleLogin = () => {
        Meteor.loginWithPassword(name, password, (err) => {
            setErrorMessage(err ? mapErrorToMessage(err) : "");
        });
    };

    const handleRegister = () => {
        Accounts.createUser({ username: name, password }, (err) => {
            setErrorMessage(err ? mapErrorToMessage(err) : "");
        });
    };

    // if the user is already logged in, don't show the modal
    if (user) return null;

    return (
        <dialog open>
            <article>
                <header className="auth-modal-header">
                    <FaKeycdn size="2rem" />
                    <h2>Login / Register</h2>
                </header>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="login-error">{errorMessage}</p>}
                <footer>
                    <button className="outline" onClick={handleRegister}>Register</button>
                    <button onClick={handleLogin}>Login</button>
                </footer>
            </article>
        </dialog>
    );
};