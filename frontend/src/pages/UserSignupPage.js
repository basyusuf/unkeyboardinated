import React from "react";
import { signup } from '../api/apiCall';
import Input from "../components/Input";

class UserSignupPage extends React.Component {
    state = {
        username: "",
        displayName: "",
        password: "",
        passwordRepeat: "",
        pendingApiCall: false,
        errors: {}
    };

    onChangeGeneric = (event) => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        if (name === "password" || name === "passwordRepeat") {
            if (name === "password" && value !== this.state.passwordRepeat) {
                errors["passwordRepeat"] = "Password mismatch";
            } else if (name === "passwordRepeat" && value !== this.state.password) {
                errors["passwordRepeat"] = "Password mismatch";
            } else {
                errors["passwordRepeat"] = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignUp = async (event) => {
        event.preventDefault(); //Stop form action
        const { username, displayName, password } = this.state;
        let formBody = {
            username,
            displayName,
            password
        }
        this.setState({ pendingApiCall: true });
        try {
            let result = await signup(formBody);
            console.info("Result:", result);
        } catch (err) {
            console.info("Error:", err);
            if (err.response.data.validationErrors) {
                this.setState({ errors: err.response.data.validationErrors });
            }
        }
        this.setState({ pendingApiCall: false });
    }
    render() {
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input label="Username" name="username" value={this.state.username} onChange={this.onChangeGeneric} error={this.state.errors.username} />
                    <Input label="Display Name" name="displayName" value={this.state.displayName} onChange={this.onChangeGeneric} error={this.state.errors.displayName} />
                    <Input label="Password" name="password" value={this.state.password} onChange={this.onChangeGeneric} error={this.state.errors.password} type="password" />
                    <Input label="Password Repeat" name="passwordRepeat" value={this.state.passwordRepeat} onChange={this.onChangeGeneric} error={this.state.errors.passwordRepeat} type="password" />
                    <div className="text-center">
                        <button className="btn btn-primary" disabled={this.state.pendingApiCall || this.state.errors.passwordRepeat !== undefined} onClick={this.onClickSignUp}>
                            Sign Up {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm" role="status" />}
                        </button>
                    </div>
                </form>
            </div>

        );
    }
}

export default UserSignupPage;
