import "../styles/passwordSecurityLevel.css";
import security from "../img/security.png";
import thief from "../img/thief.png";
import buckler from "../img/buckler.png";

function PasswordSecurityLevel({ lengthPassword, specialCharacters }) {
  return (
    <article class="password-security-level-container">
      <img
        src={
          lengthPassword >= 25 && !specialCharacters
            ? security
            : lengthPassword === 10
            ? thief
            : buckler
        }
        width={60}
        height={60}
        alt={
          lengthPassword >= 25 && !specialCharacters
            ? "Security icon"
            : lengthPassword === 10
            ? "Thief icon"
            : "Shield icon"
        }
      />
      <p
        class={
          lengthPassword === 10 ? "img-text red-text" : "img-text green-text"
        }
      >
        {lengthPassword >= 25 && !specialCharacters
          ? "Very strong password"
          : lengthPassword === 10 && !specialCharacters
          ? "Weak password"
          : lengthPassword >= 15
          ? "Strong password"
          : "Very weak password"}
      </p>
    </article>
  );
}

export default PasswordSecurityLevel;
