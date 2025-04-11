import "../styles.css";

const Button = ({ text, variant,onClick  }) => {
  return (
    <button className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
