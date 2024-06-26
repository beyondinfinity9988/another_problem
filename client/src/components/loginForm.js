import React from 'react'    

const loginFormStyle = {
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: "3vh",
};

const loginFieldStyle = {
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
};

const loginLabelStyle = {
    display: "flex",
    flex: "0 0 auto",
    flexFlow: "row-reverse nowrap",
    paddingRight: "3vh",
    width: "30%",
    fontSize: "2.5vh",
};

const loginInputStyle = {
    display: "flex",
    flex: "0 0 auto",
    width: "40%",
    fontSize: "2.5vh",
};

const loginTextInputStyle = { 
    width: "100%", 
    aspectRatio: "12 / 1",
    fontSize: "2.2vh",
    fontFamily: "JetBrains Mono, monospace",
    fontWeight: "400",
};

const loginButtonStyle = {
    height: "3.5vh", 
    aspectRatio: "3 / 1", 
    fontSize: "2vh", 
    fontFamily: "JetBrains Mono, monospace",
    fontWeight: "400",
};

const loginFooterStyle = { 
    display: "flex", 
    flex: "1 1 auto", 
    flexFlow: "row-reverse nowrap", 
    justifyContent: "flex-start", 
    alignItems: "center", 
    fontSize: "2vh", 
    marginRight: "3vh" 
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ 
            [evt.target.name]: evt.target.value,
        });
        evt.preventDefault();
    }

    render() {
        return (
            <form action="/submit-login-form" style={loginFormStyle}>
                <div style={loginFieldStyle}>
                    <div style={loginLabelStyle}>
                        <label>Codeforces Handle:</label>
                    </div>
                    <div style={loginInputStyle}>
                        <input style={loginTextInputStyle} type="text" name="handle" value={this.state.handle} onChange={this.handleChange} />
                    </div>
                </div>
                <div style={loginFieldStyle}>
                    <div style={loginLabelStyle}>
                        <label>Password:</label>
                    </div>
                    <div style={loginInputStyle}>
                        <input style={loginTextInputStyle} type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
                <div style={loginFieldStyle}>
                    <input style={loginButtonStyle} type="submit" value="Login" />
                </div>
                <div style={loginFooterStyle}>
                    {/* <label style={ { cursor: "pointer", color: "#7f0068" } }>I forgot my password :(</label> */}
                </div>
            </form>
        );
    }
}

export default LoginForm;