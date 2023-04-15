import { toast } from "react-hot-toast";

export const getPasswordStrength = (
  length,
  hasLowercase,
  hasUppercase,
  hasSymbols,
  hasNumbers
) => {
  if (length < 0 || length > 24) {
    console.error("Invalid length parameter: must be between 0 and 20");
    toast.error("Invalid length parameter: must be between 0 and 20", {
      style: {
        icon: "❌",
        border: "1px solid #A4FFAF",
        padding: "16px",
        color: "#E6E5EA",
        background: "#151515",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#151515",
      },
    });
  }
  if (
    length < 0 &&
    !hasLowercase &&
    !hasUppercase &&
    !hasSymbols &&
    !hasNumbers
  ) {
    return "";
  }
  if (!hasLowercase && !hasUppercase && !hasSymbols && !hasNumbers) {
    console.error(
      "At least one of the character types (lowercase, uppercase, symbols, numbers) must be enabled"
    );
    toast.error(
      "At least one of the character types (lowercase, uppercase, symbols, numbers) must be enabled",
      {
        style: {
          icon: "❌",
          border: "1px solid #A4FFAF",
          padding: "16px",
          color: "#E6E5EA",
          background: "#151515",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#151515",
        },
      }
    );
    return "";
  }
  let score = 0;
  if (hasLowercase) score += 1;
  if (hasUppercase) score += 1;
  if (hasSymbols) score += 1;
  if (hasNumbers) score += 1;
  if (length < 8) score -= 1;
  if (length > 12) score += 1;
  if (score < 1) {
    return "too weak";
  } else if (score < 3) {
    return "weak";
  } else if (score < 4) {
    return "medium";
  } else {
    return "strong";
  }
};

export const generatePassword = (
  length,
  hasLowercase,
  hasUppercase,
  hasNumbers,
  hasSymbols
) => {
  if (length <= 0) {
    console.log("Length parameter must be greater than 0");
    return null;
  }
  if (!hasLowercase && !hasUppercase && !hasNumbers && !hasSymbols) {
    console.log(
      "At least one of the character types (lowercase, uppercase, symbols, numbers) must be enabled"
    );
    toast.error(
      "At least one of the character types (lowercase, uppercase, symbols, numbers) must be enabled",
      {
        style: {
          icon: "❌",
          border: "1px solid #A4FFAF",
          padding: "16px",
          color: "#E6E5EA",
          background: "#151515",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#151515",
        },
      }
    );
    return null;
  }
  let charset = "";
  if (hasLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (hasUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (hasNumbers) charset += "0123456789";
  if (hasSymbols) charset += "!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
