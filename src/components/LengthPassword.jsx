import "../styles/lengthPassword.css";
import { useState, useEffect } from "react";
import { AiOutlineArrowUp as ArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown as ArrowDown } from "react-icons/ai";

function LengthPassword({
  lengthPassword,
  setLengthPassword,
  setErrorLengthPassword,
}) {
  const [passwordLessThanTen, setPasswordLessThanTen] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    function handleGlobalMouseUp() {
      setIsPressed(false);
      clearInterval(intervalId);
    }
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [intervalId]);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const arrowUp = () => setLengthPassword(lengthPassword + 5);

  function arrowDown() {
    setLengthPassword(lengthPassword - 5);

    if (lengthPassword === 10) {
      setLengthPassword(10);
      setErrorLengthPassword(true);
      setPasswordLessThanTen(false);
      setTimeout(() => {
        setErrorLengthPassword(false);
        setPasswordLessThanTen(true);
      }, 2000);
    }
  }

  function handleTouchStart() {
    setIsPressed(true);

    const ID = setInterval(() => {
      setLengthPassword(lengthPassword_ => {
        const newLengthPassword =
          lengthPassword_ === 10 ? 10 : Math.max(lengthPassword_ - 5, 0);
        setErrorLengthPassword(lengthPassword_ === 10);
        setPasswordLessThanTen(lengthPassword_ !== 10);
        setTimeout(() => {
          setErrorLengthPassword(false);
          setPasswordLessThanTen(true);
        }, 2000);
        return newLengthPassword;
      });
    }, 200);

    setIntervalId(ID);
  }

  function handleTouchEnd() {
    setIsPressed(true);

    const ID = setInterval(
      () => setLengthPassword(lengthPassword => lengthPassword + 5),
      200,
    );
    setIntervalId(ID);
  }

  function handleMouseUp() {
    setIsPressed(false);
    clearInterval(intervalId);
  }

  function handleMouseLeave() {
    if (isPressed) {
      setIsPressed(false);
      clearInterval(intervalId);
    }
  }

  return (
    <div
      className={
        passwordLessThanTen
          ? "container-length-password"
          : "min-ten-length-password"
      }
    >
      <h3 className="length-password-tittle">Length</h3>

      <div className="container-input-length-password">
        <input
          onChange={e => setLengthPassword(e.target.value)}
          value={lengthPassword}
          disabled
          className="length-password"
        />

        {isMobile ? (
          <>
            <ArrowUp
              onClick={arrowUp}
              onTouchStart={handleTouchEnd}
              onTouchEnd={handleMouseUp}
              onTouchCancel={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="arrow"
            />
            <ArrowDown
              onClick={arrowDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleMouseUp}
              onTouchCancel={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="arrow"
            />
          </>
        ) : (
          <>
            <ArrowUp
              onClick={arrowUp}
              onMouseDown={handleTouchEnd}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="arrow"
            />
            <ArrowDown
              onClick={arrowDown}
              onMouseDown={handleTouchStart}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPressed(false)}
              className="arrow"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default LengthPassword;
