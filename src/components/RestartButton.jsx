import { VscDebugRestart as RestartIcon } from "react-icons/vsc";

function RestartButton(props) {
  const { onClickGeneratePass } = props;

  return (
    <div
      onClick={onClickGeneratePass}
      className="bg-[#4fbffb] text-white text-5xl rounded-full cursor-pointer p-2"
    >
      <RestartIcon title="Create Password" className="restart-icon" />
    </div>
  );
}

export default RestartButton;
