import { useState, useEffect } from "react";
import Titulo from "./components/Titulo";
import SeguridadContraseña from "./components/SeguridadContraseña";
import Boton from "./components/Boton";
import Contraseña from "./components/Contraseña";
import Longitud from "./components/Longitud";
import CaracteresEspeciales from "./components/CaracteresEspeciales";

function App() {
  const [password, setPassword] = useState("");
  const [longitud, setLongitud] = useState(10);
  const [caracteresEspeciales, setCaracteresEspeciales] = useState(true);
  const [animar, setAnimar] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [seguridad, setSeguridad] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);
  const [errorLongitud, setErrorLongitud] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPrimeraVez(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => setPassword(generarContraseña(10)), []);

  useEffect(() => {
    if (password === "") {
      setSeguridad(true);
    };
  }, [password]);

  useEffect(() => {
    if (longitud >= 25) {
      setSeguridad(true);
    };
  }, [longitud]);

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
      };
      return contraseña;
    };
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
        <Titulo />

        {seguridad && (
          <SeguridadContraseña
            longitud={longitud}
            caracteresEspeciales={caracteresEspeciales}
          />
        )}

        <form onSubmit={handleSubmit} className="container-formulario">
          <Boton
            handleClickGenerar={handleClickGenerar}
            primeraVez={primeraVez}
            animar={animar}
            title="GENERAR CONTRASEÑA"
          />

          <Boton password={password} title="COPIAR CONTRASEÑA" />

          <Contraseña password={password} />

          {errorLongitud && <ManejarError />}

          <Longitud
            longitud={longitud}
            setLongitud={setLongitud}
            errorLongitud={errorLongitud}
            setErrorLongitud={setErrorLongitud}
          />

          <CaracteresEspeciales
            caracteresEspeciales={caracteresEspeciales}
            setCaracteresEspeciales={setCaracteresEspeciales}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
