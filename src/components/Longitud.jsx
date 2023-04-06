import { useState, useEffect } from "react";
import { AiOutlineArrowUp as FlechaSubir } from "react-icons/ai";
import { AiOutlineArrowDown as FlechaBajar } from "react-icons/ai";

function Longitud({ longitud, setLongitud, errorLongitud, setErrorLongitud }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); //* Verificar dispositivo
  const [menosDiez, setMenosDiez] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    function handleGlobalMouseUp() {
      setIsPressed(false);
      clearInterval(intervalId);
    }
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [intervalId]);

  //* Sumar.
  const arrowUp = () => setLongitud(longitud + 5);

  //* Restar.
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
  }

  //* Controlar Mouse.
  function handleMouseUp() {
    setIsPressed(false);
    clearInterval(intervalId);
  };

  function handleMouseLeave() {
    if (isPressed) {
      setIsPressed(false);
      clearInterval(intervalId);
    }
  };

  function handleMouseDownBajar() {
    setIsPressed(true);
    const id = setInterval(() => {
      setLongitud((longitud_) => {
        const nuevaLongitud =
          longitud_ === 10 ? 10 : Math.max(longitud_ - 5, 0);
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
    const id = setInterval(() => setLongitud((longitud) => longitud + 5), 200);
    setIntervalId(id);
  };

  return (
    <div className={menosDiez ? "container_longitud" : "min10c"}>
      <h3 className="longitud-texto">Longitud</h3>

      <div className="container_input">
        <input
          onChange={(e) => setLongitud(e.target.value)}
          value={longitud}
          disabled
          className="longitud"
        />
        {isMobile ? (
          <>
            <FlechaSubir
              onClick={arrowUp}
              onTouchStart={handleMouseDownSubir}
              onTouchEnd={handleMouseUp}
              onTouchCancel={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="flechas"
            />
            <FlechaBajar
              onClick={arrowDown}
              onTouchStart={handleMouseDownBajar}
              onTouchEnd={handleMouseUp}
              onTouchCancel={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="flechas"
            />
          </>
        ) : (
          <>
            <FlechaSubir
              onClick={arrowUp}
              onMouseDown={handleMouseDownSubir}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="flechas"
            />
            <FlechaBajar
              onClick={arrowDown}
              onMouseDown={handleMouseDownBajar}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="flechas"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Longitud;

/* onMouseEnter={() => setIsPressed(false)}. La razón por la cual se establece isPressed como false cuando el cursor entra en el botón es para asegurarse de que el estado isPressed no quede en un estado inconsistente si el usuario deja el botón mientras lo está presionando. Si el usuario deja el botón mientras lo está presionando y luego mueve el cursor fuera del botón y luego lo vuelve a ingresar sin presionarlo, el estado isPressed permanecerá en true si no se establece como false al entrar en el botón nuevamente. Establecer isPressed como false cuando el cursor entra en el botón garantiza que el estado isPressed siempre esté sincronizado con el estado real del botón. */