function Emoji(props) {
    const emojiStyle = {
        fontSize: "30vh",
        margin: "6vh 0 0 0",
        textAlign: "center"
    }

    if (props.fontSize) {
        emojiStyle.fontSize = props.fontSize;
    }

    return (
        <p style={emojiStyle}>
            🫵
        </p>
    );
}

export default Emoji;