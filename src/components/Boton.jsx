import { MdContentCopy as Copiar } from "react-icons/md";
import { VscDebugRestart as Generar } from "react-icons/vsc";

function Boton({ handleClickGenerar, primeraVez, title, animar, password }) {
  return title === "GENERAR CONTRASEÑA" ? (
    <div
      onClick={handleClickGenerar}
      className={
        primeraVez
          ? "container_generar agrandarGenerar"
          : animar
          ? "container_generar animarGenerar"
          : "container_generar"
      }
    >
      <Generar title={title} className="imgGenerar" />
    </div>
  ) : (
    <Copiar data-clipboard-text={password} title={title} className="copy" />
  );
};

export default Boton;
