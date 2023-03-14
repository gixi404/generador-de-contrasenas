import { useState, useEffect } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import iconPolicia from "./img/security-guard.png";
import iconLadron from "./img/ladron.png";
import iconEscudo from "./img/proteccion.png";

function App() {
  const [password, setPassword] = useState("GENERA UNA CONTRASEÑA");
  const [longitud, setLongitud] = useState(10);
  const [caracteresEspeciales, setCaracteresEspeciales] = useState(true);
  const [animar, setAnimar] = useState(false);
  const [errorLongitud, setErrorLongitud] = useState(false);
  const [menosDiez, setMenosDiez] = useState(true)
  const [alerta, setAlerta] = useState(false);
  const [seguridad, setSeguridad] = useState(false);

  const handleSubmit = (event) => event.preventDefault();
  const handleClick = () => {
    setAnimar(!animar);
    setPassword(generarContraseña(longitud))
  };
  
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
      };
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
      };
      const aleatorio = n => Math.random() < n;
      if (aleatorio(0.10)) {
        contraseña += "@";
      } else if (aleatorio(0.20)) {
        contraseña += "!";
      } else if (aleatorio(0.30)) {
        contraseña += "¡";
      } else if (aleatorio(0.40)) {
        contraseña += "#";
      } else if (aleatorio(0.50)) {
        contraseña += "$";
      } else if (aleatorio(0.60)) {
        contraseña += "%";
      } else if (aleatorio(0.70)) {
        contraseña += "&";
      } else if (aleatorio(0.80)) {
        contraseña += "*";
      } else if (aleatorio(0.90)) {
        contraseña += "_";
      } ;
      return contraseña;
    };
  };

  function ManejarError() {
   return (
     <div className="container_error">
       <p className="error">mínimo 10 caracteres</p>
     </div>
   );
  };

  function arrowUp() {
    setLongitud(longitud + 5);
  };

  function arrowDown() {
    setLongitud(longitud - 5);
    if (longitud === 10) {
      setLongitud(10);
      setErrorLongitud(true)
      setMenosDiez(false)
      setTimeout(() => {
        setErrorLongitud(false);
        setMenosDiez(true);
      }, 2000);
    };
  };

  function copiarContraseña() {
    navigator.clipboard.writeText(password);  
    setAlerta(true);
    setTimeout(() => setAlerta(false), 2000);
  }; 

  function Alerta() {
    return (
      <div className="container-alerta">
        <div className="alerta">
          <p>Copiado al portapapeles</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (longitud >= 25) {
      setSeguridad(true);
    } else if (longitud >= 15) {
      setSeguridad(true);
    };
  }, [longitud]);

  useEffect(() => {
    if (password === "GENERA UNA CONTRASEÑA") {
      setSeguridad(true)
    };
  }, [password])

  useEffect(() => {
    setPassword(generarContraseña(10));
  }, []);

  // window.open("https://www.youtube.com/watch?v=c5YVvdZ0-a0")
// window.print()
  return (
    <div className="App">
      {alerta && <Alerta />}
      <div className="container">
        <h1>
          Generador <br /> De <br /> Contraseñas
        </h1>
        {seguridad ? (
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
        ) : (
          <div className="img_icon">
            <p className="img_texto">Seguridad de contraseña</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="container-formulario">
          <div
            className={
              animar ? "container_generar animar" : "container_generar"
            }
            onClick={handleClick}
          >
            <VscDebugRestart title="GENERAR CONTRASEÑA" className="img" />
          </div>
          <MdContentCopy
            title="COPIAR"
            onClick={copiarContraseña}
            className="copy"
          />
          <div className="container_password">
            <h2 className="password">{password}</h2>
          </div>

          {errorLongitud ? <ManejarError /> : ""}

          <div className={menosDiez ? "container_longitud" : "fuera"}>
            <h3 className="longitud-texto">Longitud</h3>

            <div className="container_input">
              <input
                onChange={(e) => setLongitud(e.target.value)}
                value={longitud}
                disabled
                className="longitud"
              />
              <AiOutlineArrowUp onClick={arrowUp} className="flechas up" />
              <AiOutlineArrowDown
                onClick={arrowDown}
                className="flechas down"
              />
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

