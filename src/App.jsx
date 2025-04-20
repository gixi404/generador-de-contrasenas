import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

function App() {
  const [password, setPassword] = useState(""),
    [lengthPassword, setLengthPassword] = useState(10),
    [specialCharacters, setSpecialCharacters] = useState(false),
    [clipboardAlert, setClipboardAlert] = useState(false),
    [openDialog, setOpenDialog] = useState(false);

  useEffect(() => setPassword(generatePass(10)), []);

  useEffect(() => {
    if (lengthPassword > 16384) {
      setLengthPassword(10);
      alert("Limit: 16384");
    }
  }, [lengthPassword]);

  function copyPassword(pass) {
    setClipboardAlert(true);
    navigator.clipboard.writeText(pass);
    setTimeout(() => setClipboardAlert(false), 1100);
  }

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

      <header className="w-full h-20 bg-[#00000053] flex flex-col md:flex-row md:h-16 items-center justify-around mb-16">
        <p
          onClick={() => setOpenDialog(true)}
          className="text-gray-300 hover:text-white cursor-pointer"
        >
          Política de Privacidad
        </p>
        <a
          href="https://github.com/gixi404/generador-de-contrasenas"
          target="_blank"
          title="Repositorio de Github"
          className="text-gray-300 hover:text-white cursor-pointer"
        >
          Repositorio
        </a>
        <a
          href="https://gixi.dev"
          target="_blank"
          className="text-gray-300 hover:text-white cursor-pointer"
          title="Portafolio de gixi"
        >
          Creado con ❤️ por <u>gixi</u>
        </a>
      </header>

      {openDialog && (
        <dialog
          open
          className="bg-[#000000cc] backdrop-blur-lg text-white w-full  md:w-2/6 h-max md:mt-4 md:ml-8 px-3 py-5 md:rounded-lg flex flex-col justify-center items-center gap-y-4"
        >
          <p className="text-center">
            No recopilo ni almaceno ningún tipo de información personal del
            usuario.
            <br /> <br />
            No utilizo cookies ni otras tecnologías de seguimiento para
            recopilar información sobre su visita.
            <br /> <br />
            Atentamente, <b>Gixi</b>
          </p>
          <button
            className="bg-red-600 py-2 px-3 uppercase rounded-lg w-20 h-10"
            onClick={() => setOpenDialog(false)}
            type="button"
          >
            Cerrar
          </button>
        </dialog>
      )}

      <main className="w-full sm:w-3/5 lg:w-2/5 h-4/8 max-h-[700px] bg-[#37306b] rounded-lg flex flex-col items-center justify-between">
        <h1 className="text-white capitalize text-3xl sm:text-4xl text-center flex justify-center items-center w-full h-24">
          Generador de Contraseñas
        </h1>

        <form
          onSubmit={event => event.preventDefault()}
          className="flex flex-col w-full rounded-lg justify-between items-center"
        >
          <div className="flex w-full h-24 justify-center items-center gap-x-6 mb-6">
            <svg
              onClick={createPass}
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              fill="none"
              className="cursor-pointer hover:scale-110 duration-200"
            >
              <path
                d="M16.7275 6C16.7275 5.58579 16.3917 5.25 15.9775 5.25C15.5633 5.25 15.2275 5.58579 15.2275 6V7.0232C12.9877 5.46956 9.91113 5.70783 7.92796 7.73802C5.69068 10.0283 5.69068 13.7346 7.92796 16.0249C10.1748 18.325 13.8252 18.325 16.072 16.0249C17.3754 14.6907 17.9168 12.8781 17.7055 11.1509C17.6552 10.7398 17.2812 10.4472 16.87 10.4975C16.4589 10.5478 16.1663 10.9219 16.2166 11.333C16.3757 12.6337 15.9667 13.9861 14.999 14.9767C13.3407 16.6744 10.6593 16.6744 9.00097 14.9767C7.33301 13.2692 7.33301 10.4937 9.00097 8.78618C10.324 7.4318 12.298 7.15792 13.8844 7.96452H13.3258C12.9116 7.96452 12.5758 8.3003 12.5758 8.71452C12.5758 9.12873 12.9116 9.46452 13.3258 9.46452H15.9775C16.3917 9.46452 16.7275 9.12873 16.7275 8.71452V6Z"
                fill="#4fbffb"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9426 1.25C9.63423 1.24999 7.82519 1.24998 6.4137 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63423 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.4137 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25H11.9426ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62178 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"
                fill="#4fbffb"
              />
            </svg>

            <svg
              width="70px"
              height="70px"
              onClick={() => copyPassword(password)}
              className="copy-to-clipboard cursor-pointer hover:scale-110 duration-200"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
                stroke="#4fbffb"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6"
                stroke="#4fbffb"
                strokeLinecap="round"
                strokeWidth="1.4"
              />
            </svg>
          </div>

          <div className="bg-[#1e60844d] w-full h-20 overflow-x-auto border-y-[#4fbffb] border-y-4 flex justify-center items-center">
            <h2 className="text-white text-3xl tracking-widest w-11/12 text-center">
              {clipboardAlert ? "Copiado" : password}
            </h2>
          </div>

          <div className="flex justify-between px-8 pt-4 pb-2 items-center w-full bg-[#1e6084]">
            <label className="text-white text-2xl tracking-wider">
              Longitud
            </label>
            <input
              type="number"
              min="5"
              max="16384"
              value={lengthPassword}
              onChange={e => setLengthPassword(e.target.value)}
              className="text-2xl outline-none text-center text-black h-12 w-36 rounded-lg border-2 border-[#4fbffb] bg-gray-300"
            />
          </div>

          <div className="flex justify-between px-8 pt-2 pb-4 items-center w-full bg-[#1e6084] rounded-b-lg">
            <label className="text-white text-2xl tracking-wider capitalize">
              Caracteres especiales
            </label>
            <div
              onClick={() => setSpecialCharacters(!specialCharacters)}
              className={twMerge(
                "w-36 rounded-lg h-12 flex justify-center items-center text-white font-bold tracking-widest cursor-pointer",
                specialCharacters ? "bg-green-600" : "bg-red-600"
              )}
            >
              {specialCharacters ? "SI" : "NO"}
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
