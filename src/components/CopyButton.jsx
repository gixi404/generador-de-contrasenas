import { MdContentCopy as Copy } from "react-icons/md";

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
      className="copy-to-clipboard bg-[#4fbffb] text-white text-6xl rounded-lg cursor-pointer p-2"
    />
  );
}

export default CopyButton;
