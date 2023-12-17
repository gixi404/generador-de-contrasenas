import { twMerge } from "tailwind-merge";

function SpecialCharacters({ specialCharacters, setSpecialCharacters }) {
  return (
    <div className="flex h-24 w-full justify-center items-center bg-[#1e6084] rounded-b-lg">
      <h3 className="capitalize text-white text-3xl w-3/5">
        special characters
      </h3>

      <div
        onClick={() => setSpecialCharacters(!specialCharacters)}
        className={twMerge(
          "w-1/4 rounded-lg h-12 flex justify-center items-center font-bold",
          specialCharacters
            ? "bg-red-600 text-white"
            : "bg-green-600 text-black"
        )}
      >
        <p>{!specialCharacters ? "YES" : "NO"}</p>
      </div>
    </div>
  );
}

export default SpecialCharacters;
