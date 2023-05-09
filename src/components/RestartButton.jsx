import "../styles/restartButton.css";
import { VscDebugRestart as RestartIcon } from "react-icons/vsc";

function RestartButton({
  hasPageLoaded,
  animateRestartBtn,
  handleClickPasswordGenerator,
}) {
  return (
    <div
      className={
        hasPageLoaded
          ? "container-generate-password firstAnimationRestartBtn"
          : animateRestartBtn
          ? "container-generate-password secondAnimationRestartBtn"
          : "container-generate-password"
      }
      onClick={handleClickPasswordGenerator}
    >
      <RestartIcon title="GENERATE PASSWORD" className="restart-icon" />
    </div>
  );
}

export default RestartButton;
