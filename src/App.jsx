import { useState, useEffect } from "react";
import { VscDebugRestart as RestartIcon } from "react-icons/vsc";
import { MdContentCopy as Copy } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function App() {
  const [password, setPassword] = useState(""),
    [lengthPassword, setLengthPassword] = useState(10),
    [specialCharacters, setSpecialCharacters] = useState(false),
    [clipboardAlert, setClipboardAlert] = useState(false),
    copyToClipboard = new ClipboardJS(".copy-to-clipboard");

  useEffect(() => setPassword(generatePass(10)), []);

  copyToClipboard.on("success", () => {
    setClipboardAlert(true);
    setTimeout(() => setClipboardAlert(false), 1000);
  });

  function generatePass(lengthPassword) {
    if (specialCharacters) {
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
      } else if (addSpecialCharacters(8)) {
        password += "*";
      } else if (addSpecialCharacters(9)) {
        password += "_";
      }
      password = password.replace(password[0], "");
      return password;
    } else {
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
    }
  }

  function createPass() {
    if (lengthPassword < 5) {
      setLengthPassword(5);
      alert("Minimum 5 Characters");
    } else {
      setPassword(generatePass(lengthPassword));
    }
  }

  return (
    <>
      <div className="lines">
        <span className="line" />
        <span className="line" />
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>

      <main className="w-full sm:w-3/5 lg:w-2/5 h-4/8 max-h-[700px] bg-[#37306b] rounded-lg flex flex-col items-center justify-between">
        <h1 className="text-white capitalize text-4xl sm:text-5xl text-center flex justify-center items-center w-full h-24">
          Password Create
        </h1>

        <form
          onSubmit={event => event.preventDefault()}
          className="flex flex-col w-full rounded-lg justify-between items-center"
        >
          <div className="flex w-full h-24 justify-center items-center gap-x-6">
            <div
              onClick={createPass}
              className="bg-[#4fbffb] text-white text-5xl rounded-full cursor-pointer p-2 btn-form"
            >
              <RestartIcon title="Create Password" className="restart-icon" />
            </div>
            <Copy
              data-clipboard-text={password}
              title="Copy to Clipboard"
              className="copy-to-clipboard bg-[#4fbffb] text-white text-6xl rounded-lg cursor-pointer p-2 btn-form"
            />
          </div>

          <div className="bg-[#1e60844d] w-full h-20 overflow-x-auto border-y-[#4fbffb] border-y-4 flex justify-center items-center">
            <h2 className="text-white text-3xl tracking-widest">
              {clipboardAlert ? "Copied" : password}
            </h2>
          </div>

          <div className="flex justify-between px-8 pt-4 pb-2 items-center w-full bg-[#1e6084]">
            <label className="text-white text-2xl tracking-wider">Length</label>
            <input
              type="number"
              min="5"
              max="16384"
              value={lengthPassword}
              onChange={e => setLengthPassword(e.target.value)}
              className="outline-none text-center text-black h-12 w-36 rounded-lg border-2 border-[#4fbffb] bg-gray-300"
            />
          </div>

          <div className="flex justify-between px-8 pt-2 pb-4 items-center w-full bg-[#1e6084] rounded-b-lg">
            <label className="text-white text-2xl tracking-wider capitalize">
              special characters
            </label>
            <div
              onClick={() => setSpecialCharacters(!specialCharacters)}
              className={twMerge(
                "w-36 rounded-lg h-12 flex justify-center items-center font-bold tracking-widest",
                specialCharacters
                  ? "bg-green-600 text-black"
                  : "bg-red-600 text-white"
              )}
            >
              {specialCharacters ? "YES" : "NO"}
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
