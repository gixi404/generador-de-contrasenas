import iconPolicia from "../img/policia.png";
import iconLadron from "../img/ladron.png";
import iconEscudo from "../img/escudo.png";

function SeguridadContraseña({ longitud, caracteresEspeciales }) {
  return (
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
  );
};

export default SeguridadContraseña;
