

function PasswordSecurityLevel({ lengthPassword, specialCharacters }) {
  return (
    <div className="bg-[#8272ea99] flex gap-x-6 w-full h-24 items-center justify-center">
      <img
        src={
          lengthPassword >= 25 && !specialCharacters
            ? security
            : lengthPassword === 5
            ? thief
            : buckler
        }
        width={60}
        height={60}
        alt={
          lengthPassword >= 25 && !specialCharacters
            ? "Security Icon"
            : lengthPassword === 5
            ? "Thief Icon"
            : "Shield Icon"
        }
      />
      <p
        className={twMerge(
          "text-2xl sm:text-3xl font-bold text-shadow capitalize",
          lengthPassword === 5
            ? "text-[#ff3e30] red-text"
            : "text-[#3eff3e] green-text"
        )}
      >
        {lengthPassword >= 25 && !specialCharacters
          ? "Very strong password"
          : lengthPassword === 5 && !specialCharacters
          ? "Weak password"
          : lengthPassword >= 15
          ? "Strong password"
          : "Very weak password"}
      </p>
    </div>
  );
}

export default PasswordSecurityLevel;
