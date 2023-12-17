function LengthPassword(props) {
  const { lengthPassword, setLengthPassword } = props;

  return (
    <div className="flex h-24 w-full justify-center items-center bg-[#1e6084]">
      <p className="text-white text-3xl">Length</p>

      <div className="flex w-2/4 justify-end items-center select-none">
        <input
          onChange={e => setLengthPassword(e.target.value)}
          value={lengthPassword}
          className="text-center w-20 h-6 outline-none text-2xl p-2 text-black rounded-lg border-2 border-[#4fbffb]"
        />
      </div>
    </div>
  );
}

export default LengthPassword;
