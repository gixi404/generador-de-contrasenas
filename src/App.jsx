import { useState, useEffect } from "react";
import Background from "./components/Background";
import ClipboardAlert from "./components/ClipboardAlert";
import Tittle from "./components/Tittle";
import PasswordSecurityLevel from "./components/PasswordSecurityLevel";
import RestartButton from "./components/RestartButton";
import CopyButton from "./components/CopyButton";
import Password from "./components/Password";
import ErrorLengthPassword from "./components/ErrorLengthPassword";
import LengthPassword from "./components/LengthPassword";
import SpecialCharacters from "./components/SpecialCharacters";

function App() {
  const [password, setPassword] = useState(""),
    [lengthPassword, setLengthPassword] = useState(10),
    [specialCharacters, setSpecialCharacters] = useState(true),
    [animateRestartBtn, setAnimateRestartBtn] = useState(false),
    [errorLengthPassword, setErrorLengthPassword] = useState(false),
    [clipboardAlert, setClipboardAlert] = useState(false),
    [passwordSecurityLevel, setPasswordSecurityLevel] = useState(false),
    [hasPageLoaded, setHasPageLoaded] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setHasPageLoaded(false), 3000);
    setPassword(generatePass(10));
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (password === "") {
      setPasswordSecurityLevel(true);
    }
  }, [password]);

  useEffect(() => {
    if (lengthPassword >= 25) {
      setPasswordSecurityLevel(true);
    }
  }, [lengthPassword]);

  function generatePass(lengthPassword) {
    if (specialCharacters) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let password = "";
      let randomNumbers = new Uint32Array(lengthPassword);
      crypto.getRandomValues(randomNumbers);

      for (let i = 0; i < lengthPassword; i++) {
        const index = randomNumbers[i] % characters.length;
        password += characters.charAt(index);
      }
      return password;
    } else {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ@!¡#$%&*_abcdefghijklmnopqrstuvwxyz0123456789";
      let password = "";
      let randomNumbers = new Uint32Array(lengthPassword);
      crypto.getRandomValues(randomNumbers);

      for (let i = 0; i < lengthPassword; i++) {
        const index = randomNumbers[i] % characters.length;
        password += characters.charAt(index);
      }

      const addSpecialCharacters = n => parseInt(Math.random() * 10) < n;

      if (addSpecialCharacters(1)) {
        password += "@";
      } else if (addSpecialCharacters(2)) {
        password += "!";
      } else if (addSpecialCharacters(3)) {
        password += "¡";
      } else if (addSpecialCharacters(4)) {
        password += "#";
      } else if (addSpecialCharacters(5)) {
        password += "$";
      } else if (addSpecialCharacters(6)) {
        password += "%";
      } else if (addSpecialCharacters(7)) {
        password += "&";
      } else if (addSpecialCharacters(0.8)) {
        password += "*";
      } else if (addSpecialCharacters(0.9)) {
        password += "_";
      }
      return password;
    }
  }

  function onClickGeneratePass() {
    setAnimateRestartBtn(!animateRestartBtn);
    setPassword(generatePass(lengthPassword));
    setTimeout(() => setAnimateRestartBtn(false), 500);
  }

  return (
    <div className="App">
      <Background />
      {clipboardAlert && <ClipboardAlert />}
      <main className="main-container">
        <Tittle />
        {passwordSecurityLevel && (
          <PasswordSecurityLevel
            lengthPassword={lengthPassword}
            specialCharacters={specialCharacters}
          />
        )}
        <form
          onSubmit={event => event.preventDefault()}
          className="container-form"
        >
          <RestartButton
            hasPageLoaded={hasPageLoaded}
            animateRestartBtn={animateRestartBtn}
            onClickGeneratePass={onClickGeneratePass}
          />
          <CopyButton
            setClipboardAlert={setClipboardAlert}
            password={password}
          />
          <Password password={password} />
          {errorLengthPassword && <ErrorLengthPassword />}
          <LengthPassword
            lengthPassword={lengthPassword}
            setLengthPassword={setLengthPassword}
            setErrorLengthPassword={setErrorLengthPassword}
          />
          <SpecialCharacters
            specialCharacters={specialCharacters}
            setSpecialCharacters={setSpecialCharacters}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
