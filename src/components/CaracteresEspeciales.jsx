function CaracteresEspeciales({ caracteresEspeciales, setCaracteresEspeciales }) {
  return (
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
  );
};

export default CaracteresEspeciales;