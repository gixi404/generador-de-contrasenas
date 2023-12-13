import { VscDebugRestart as RestartIcon } from "react-icons/vsc";
import "../styles/restartButton.css";

function RestartButton(props) {
  const { hasPageLoaded, animateRestartBtn, onClickGeneratePass } = props;

  return (
    <div
      onClick={onClickGeneratePass}
      className={
        hasPageLoaded
          ? "container-generate-password firstAnimationRestartBtn"
          : animateRestartBtn
          ? "container-generate-password secondAnimationRestartBtn"
          : "container-generate-password"
      }
    >
      <RestartIcon title="Create Password" className="restart-icon" />
    </div>
  );
}

export default RestartButton;
