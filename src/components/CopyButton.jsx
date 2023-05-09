import "../styles/copyButton.css";
import { MdContentCopy as Copy } from "react-icons/md";

function CopyButton({ setClipboardAlert, password }) {
  const copyToClipboard = new ClipboardJS(".copy-to-clipboard");
  copyToClipboard.on("success", () => {
    setClipboardAlert(true);
    setTimeout(() => setClipboardAlert(false), 2000);
  });

  return (
    <Copy
      data-clipboard-text={password}
      title="COPIAR"
      className="copy-to-clipboard"
    />
  );
}

export default CopyButton;
