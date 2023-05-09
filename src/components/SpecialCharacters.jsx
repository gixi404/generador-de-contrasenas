import "../styles/specialCharaters.css";

function SpecialCharacters({ specialCharacters, setSpecialCharacters }) {
  return (
    <div className="container-special-characters">
      <h3 className="characters-text">
        special <br /> characters
      </h3>
      <div
        className={
          specialCharacters
            ? "btn-special-characters btn-characters-special-red"
            : "btn-special-characters btn-characters-special-green"
        }
        onClick={() => setSpecialCharacters(!specialCharacters)}
      >
        <p>{!specialCharacters ? "YES" : "NO"}</p>
      </div>
    </div>
  );
}

export default SpecialCharacters;
