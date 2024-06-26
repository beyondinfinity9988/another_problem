function SmallTitle(props) {
    return (
        <span style={ { color: "#251b37" } }>
            {/* You
            <br /> */}
             A
            <br />
            Problem?
        </span>
    );
}

function BigTitle(props) {
    return (
        <span style={ { color: "#251b37" } }>
            {/* You
            <br /> */}
            {/* Got*/}
             A Problem 
        </span>
    )
}

function Title(props) {
    const titleStyle = {
        fontFamily: "Orbitron, Arial, sans-serif",
        fontSize: "10vh",
        lineHeight: "12vh",
        textAlign: "center",
    };

    if (props.fontSize)
        titleStyle.fontSize = props.fontSize;
    if (props.lineHeight)
        titleStyle.lineHeight = props.lineHeight;
    if (props.textAlign)
        titleStyle.textAlign = props.textAlign;

    let currentTitle;
    if (props.type === "big")
        currentTitle = <BigTitle />;
    else
        currentTitle = <SmallTitle />

    return (
        <h1 style={titleStyle}>
            { currentTitle }
            <span style={ { color: "#7f0068" } }>
                ?
            </span>
        </h1>
    );
}

export default Title;