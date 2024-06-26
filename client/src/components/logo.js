function Logo(props) {
    const logoStyle = {
        backgroundColor: "transparent",
        color: "#ffecef",
        fontFamily: "Orbitron, Arial, sans-serif",
        fontSize: "5vh",
        textDecoration: "none",
    };

    if (props.fontSize) {
        logoStyle.fontSize = props.fontSize;
    }
    
    return (
        <a href="/" style={logoStyle}>
            AP
        </a>
    );
}

export default Logo;