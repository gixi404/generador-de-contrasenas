import "../styles/password.css";

function Password(props) {
  return (
    <div className="container-password">
      <h2 className="password">{props.password}</h2>
    </div>
  );
}

export default Password;
