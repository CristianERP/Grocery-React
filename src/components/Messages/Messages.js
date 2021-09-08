const Messages = ({ validation, message }) => {
  return (
    <p
      className={
        validation === "correct"
          ? "message green"
          : validation === "incorrect"
          ? "message red"
          : "message"
      }
    >
      {message}
    </p>
  );
};

export default Messages;
