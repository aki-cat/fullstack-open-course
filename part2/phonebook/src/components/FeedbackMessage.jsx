const FeedbackMessage = ({ success, message }) => {
    const messageStyle = {
        borderRadius: 8,
        color: "white",
        padding: 8,
        margin: 8
    };

    const successStyle = {
        backgroundColor: "#30d040"
    };

    const errorStyle = {
        backgroundColor: "#d03030"
    };

    if (message !== "") {
        return <div style={success ? { ...messageStyle, ...successStyle } : { ...messageStyle, ...errorStyle }}>
            <span>{message}</span>
        </div>;
    }

    return <></>;
};

export default FeedbackMessage;