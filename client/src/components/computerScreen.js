import LoginForm from './loginForm'

const computerScreenStyle = {
    // backgroundColor: "#533e6d",
    // borderColor: "#251b37",
    // width: "100%",
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    margin: "17vh 0 0 0",
};

const computerTitleBarStyle = {
    display: "flex",
    flex: "0 0 auto",
    backgroundColor: "#eeeeee",
    borderColor: "#b7b7b7",
    borderStyle: "solid",
    borderWidth: "0.5vh",
    height: "6vh",
    borderRadius: "1vh 1vh 0 0",
    justifyContent: "center",
    flexFlow: "column nowrap",
    alignItems: "center",
};

const computerTitleStyle = {
    fontFamily: "JetBrains Mono, monospace",
    fontWeight: "800",
    fontSize: "3vh",
};

const computerContentStyle = {
    display: "flex",
    flex: "0 0 auto",
    backgroundColor: "#ffffff",
    borderColor: "#b7b7b7",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderTopStyle: "none",
    borderBottomStyle: "solid",
    borderWidth: "0.5vh",
    height: "37vh",
    borderRadius: "0 0 1vh 1vh",
    fontFamily: "JetBrains Mono, monospace",
    fontWeight: "400",
};

function ComputerScreen(props) {
    let screenTitle = "Login";
    if (props.userId)
        screenTitle = "@" + props.userId;

    return (
        <div style={computerScreenStyle}>
            <div style={computerTitleBarStyle}>
                <span style={computerTitleStyle}>
                    { screenTitle }
                </span>
            </div>
            <div style={computerContentStyle}>
                <LoginForm />
            </div>
        </div>
    );
}

export default ComputerScreen;