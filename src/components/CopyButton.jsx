import { MdContentCopy as Copy } from "react-icons/md";
import "../styles/copyButton.css";

function CopyButton(props) {
  const { setClipboardAlert, password } = props,
    copyToClipboard = new ClipboardJS(".copy-to-clipboard");
  copyToClipboard.on("success", () => {
    setClipboardAlert(true);
    setTimeout(() => setClipboardAlert(false), 2000);
  });

  return (
    <Copy
      data-clipboard-text={password}
      title="Copy to Clipboard"
      className="copy-to-clipboard"
    />
  );
}

export default CopyButton;
