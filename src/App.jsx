import { useState, useEffect } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import iconPolicia from "./img/security-guard.png";
import iconLadron from "./img/ladron.png";
import iconEscudo from "./img/proteccion.png";

function App() {
  const [password, setPassword] = useState("");
  const [longitud, setLongitud] = useState(10);
  const [caracteresEspeciales, setCaracteresEspeciales] = useState(true);
  const [animar, setAnimar] = useState(false);
  const [errorLongitud, setErrorLongitud] = useState(false);
  const [menosDiez, setMenosDiez] = useState(true);
  const [alerta, setAlerta] = useState(false);
  const [seguridad, setSeguridad] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => setPassword(generarContraseña(10)), []);

  useEffect(() => {
    if (password === "") {
      setSeguridad(true);
    };
  }, [password]);

  useEffect(() => {
    if (longitud >= 25) {
      setSeguridad(true);
    }
  }, [longitud]);

  useEffect(() => setTimeout(() => setPrimeraVez(false), 3000), []);

  useEffect(() => {
    function handleGlobalMouseUp() {
      console.log("Botón soltado globalmente");
      setIsPressed(false);
      clearInterval(intervalId);
    };
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [intervalId]);

  function generarContraseña(longitud) {
    if (caracteresEspeciales) {
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let contraseña = "";
      let numerosAleatorios = new Uint32Array(longitud);
      crypto.getRandomValues(numerosAleatorios);
      for (let i = 0; i < longitud; i++) {
        const indice = numerosAleatorios[i] % caracteres.length;
        contraseña += caracteres.charAt(indice);
      }
      return contraseña;
    } else {
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ@!¡#$%&*_abcdefghijklmnopqrstuvwxyz0123456789";
      let contraseña = "";
      let numerosAleatorios = new Uint32Array(longitud);
      crypto.getRandomValues(numerosAleatorios);
      for (let i = 0; i < longitud; i++) {
        const indice = numerosAleatorios[i] % caracteres.length;
        contraseña += caracteres.charAt(indice);
      }
      const aleatorio = (n) => Math.random() < n;
      if (aleatorio(0.1)) {
        contraseña += "@";
      } else if (aleatorio(0.2)) {
        contraseña += "!";
      } else if (aleatorio(0.3)) {
        contraseña += "¡";
      } else if (aleatorio(0.4)) {
        contraseña += "#";
      } else if (aleatorio(0.5)) {
        contraseña += "$";
      } else if (aleatorio(0.6)) {
        contraseña += "%";
      } else if (aleatorio(0.7)) {
        contraseña += "&";
      } else if (aleatorio(0.8)) {
        contraseña += "*";
      } else if (aleatorio(0.9)) {
        contraseña += "_";
      }
      return contraseña;
    }
  };

  const handleSubmit = event => event.preventDefault();

  function handleClickGenerar() {
    setAnimar(!animar);
    setPassword(generarContraseña(longitud));
    setTimeout(() => setAnimar(false), 500);
  };

  const ManejarError = () => (
    <div className="container_error">
      <p className="error">mínimo 10 caracteres</p>
    </div>
  );

  const arrowUp = () => setLongitud(longitud + 5);

  function arrowDown() {
    setLongitud(longitud - 5);
    if (longitud === 10) {
      setLongitud(10);
      setErrorLongitud(true);
      setMenosDiez(false);
      setTimeout(() => {
        setErrorLongitud(false);
        setMenosDiez(true);
      }, 2000);
    }
  };

  function handleMouseDownBajar() {
    setIsPressed(true);
    const id = setInterval(() => {
      setLongitud(longitud_ => {
        const nuevaLongitud = longitud_ === 10 ? 10 : Math.max(longitud_ - 5, 0);
        setErrorLongitud(longitud_ === 10);
        setMenosDiez(longitud_ !== 10);
        setTimeout(() => {
          setErrorLongitud(false);
          setMenosDiez(true);
        }, 2000);
        return nuevaLongitud;
      });
    }, 200);
    setIntervalId(id);
  };

  function handleMouseDownSubir() {
    setIsPressed(true);
    const id = setInterval(
      () => setLongitud(longitud => longitud + 5), 200);
    setIntervalId(id);
  };

  function handleMouseUp() {
    setIsPressed(false);
    clearInterval(intervalId);
  };

  function handleMouseLeave() {
    console.log("Mouse leave");
    if (isPressed) {
      setIsPressed(false);
      clearInterval(intervalId);
    };
  };

  const Alerta = () => (
    <div className="container-alerta">
      <div className="alerta">
        <p>Copiado al portapapeles</p>
      </div>
    </div>
  );

  //* Copiar contraseña.
  const clipboard = new ClipboardJS(".copy");
  clipboard.on("success", () => {
    setAlerta(true);
    setTimeout(() => setAlerta(false), 2000);
  });

  return (
    <div className="App">
      {alerta && <Alerta />}

      <div className="container">
        <h1>
          Generador <br /> De <br /> Contraseñas
        </h1>

        {seguridad && (
          <div className="img_icon">
            <img
              src={
                longitud >= 25 && !caracteresEspeciales
                  ? iconPolicia
                  : longitud === 10
                  ? iconLadron
                  : iconEscudo
              }
              width={60}
              height={60}
            />
            <p
              className={
                longitud === 10 ? "img_texto textoRojo" : "img_texto textoVerde"
              }
            >
              {longitud >= 25 && !caracteresEspeciales
                ? "Contraseña muy segura"
                : longitud === 10 && !caracteresEspeciales
                ? "Contraseña Débil"
                : longitud >= 15
                ? "Contraseña segura"
                : "Contraseña Muy Débil"}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="container-formulario">
          <div
            className={
              primeraVez
                ? "container_generar agrandarGenerar"
                : animar
                ? "container_generar animarGenerar"
                : "container_generar"
            }
            onClick={handleClickGenerar}
          >
            <VscDebugRestart
              title="GENERAR CONTRASEÑA"
              className="imgGenerar"
            />
          </div>

          <MdContentCopy
            data-clipboard-text={password}
            title="COPIAR"
            className="copy"
          />

          <div className="container_password">
            <h2 className="password">{password}</h2>
          </div>

          {errorLongitud && <ManejarError />}

          <div className={menosDiez ? "container_longitud" : "min10c"}>
            <h3 className="longitud-texto">Longitud</h3>

            <div className="container_input">
              <input
                onChange={e => setLongitud(e.target.value)}
                value={longitud}
                disabled
                className="longitud"
              />
              <AiOutlineArrowUp
                onClick={arrowUp}
                onMouseDown={handleMouseDownSubir}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsPressed(false)}
                className="flechas"
              />

              <AiOutlineArrowDown 
              onClick={arrowDown} 
              onMouseDown={handleMouseDownBajar}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="flechas" 
              />
              {/* onMouseEnter={() => setIsPressed(false)}. La razón por la cual se establece isPressed como false cuando el cursor entra en el botón es para asegurarse de que el estado isPressed no quede en un estado inconsistente si el usuario deja el botón mientras lo está presionando. Si el usuario deja el botón mientras lo está presionando y luego mueve el cursor fuera del botón y luego lo vuelve a ingresar sin presionarlo, el estado isPressed permanecerá en true si no se establece como false al entrar en el botón nuevamente. Establecer isPressed como false cuando el cursor entra en el botón garantiza que el estado isPressed siempre esté sincronizado con el estado real del botón. */}
            </div>
          </div>

          <div className="container_caracteres">
            <h3 className="caracteres-texto">
              Caracteres <br /> Especiales
            </h3>
            <div
              className={
                caracteresEspeciales
                  ? "botones button-caracteres-especiales-rojo"
                  : "botones button-caracteres-especiales-verde"
              }
              onClick={() => setCaracteresEspeciales(!caracteresEspeciales)}
            >
              <p className="activar">{!caracteresEspeciales ? "SI" : "NO"}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;