import React from "react";
import { signup } from '../api/apiCall';

class UserSignupPage extends React.Component {
    state = {
        username: "",
        displayName: "",
        password: "",
        passwordRepeat: "",
        pendingApiCall: false,
    };

    onChangeGeneric = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
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
        }
        this.setState({ pendingApiCall: false });
    }
    render() {
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" name="username" value={this.state.username} onChange={this.onChangeGeneric} />
                    </div>
                    <div className="form-group">
                        <label>Display Name</label>
                        <input className="form-control" name="displayName" value={this.state.displayName} onChange={this.onChangeGeneric} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" value={this.state.password} onChange={this.onChangeGeneric} type="password" />
                    </div>
                    <div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" value={this.state.passwordRepeat} type="password" onChange={this.onChangeGeneric} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" disabled={this.state.pendingApiCall} onClick={this.onClickSignUp}>
                            Sign Up {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm" role="status" />}
                        </button>
                    </div>
                </form>
            </div>

        );
    }
}

export default UserSignupPage;
