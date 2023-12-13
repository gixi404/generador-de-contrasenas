import "../styles/password.css";

function Password({ password }) {
  return (
    <div className="container-password">
      <h2 className="password">{password}</h2>
    </div>
  );
}

export default Password;
