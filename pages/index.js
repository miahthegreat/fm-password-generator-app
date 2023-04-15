import { generatePassword } from "@/utils";
import { classNames, getPasswordStrength } from "@/utils";
import {
  ChevronDoubleRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Home() {
  const [length, setLength] = useState(10);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [strength, setStrength] = useState(null);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const checkboxes = [
    {
      value: "Include lowercase letters",
      name: "lowercase",
      checked: hasLowercase,
      onChange: setHasLowercase,
    },
    {
      value: "Include uppercase letters",
      name: "uppercase",
      checked: hasUppercase,
      onChange: setHasUppercase,
    },
    {
      value: "Include numbers",
      name: "numbers",
      checked: hasNumbers,
      onChange: setHasNumbers,
    },
    {
      value: "Include symbols",
      name: "symbols",
      checked: hasSymbols,
      onChange: setHasSymbols,
    },
  ];

  useEffect(() => {
    const passwordStrength = getPasswordStrength(
      length,
      hasLowercase,
      hasUppercase,
      hasSymbols,
      hasNumbers
    );
    if (passwordStrength) {
      setStrength(passwordStrength);
    } else {
      setStrength("");
    }
  }, [length, hasLowercase, hasUppercase, hasNumbers]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center px-4 py-2 sm:px-2 sm:py-4 md:px-0 md:py-8 lg:pt-24">
      <div className="grid w-full gap-6">
        <h1 className="text-center text-2xl font-normal text-primary-300">
          Password Generator
        </h1>
        {/* Length Input Range */}
        <div className="relative bg-primary-700">
          <input
            disabled
            placeholder="P4$5W0rD!"
            className="bg-primary-700 px-8 py-5 text-2xl font-normal"
            value={password}
          />
          <button
            type="button"
            className="group absolute right-6 top-[50%] flex -translate-y-[50%] items-center gap-2"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(password);
            }}
          >
            <span
              className={classNames(
                "text-sm uppercase text-accent-300 transition duration-200 ease-in group-hover:text-neutral-100",
                copied
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              )}
            >
              Copied
            </span>
            <DocumentDuplicateIcon className="aspect-1 h-6 text-accent-300 transition duration-200 ease-in-out group-hover:text-neutral-100" />
          </button>
        </div>
        <div className="grid w-full gap-6 bg-primary-700 px-8 py-5">
          <div className="flex w-full justify-between">
            <h2 className="flex-grow text-lg leading-6">Character Length</h2>
            <span className="text-xl">{length}</span>
          </div>
          <input
            className="range"
            type="range"
            min="4"
            max="24"
            step="1"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          {/* Checkboxes */}
          <fieldset>
            <legend className="sr-only">Requirements</legend>
            <div className="space-y-5">
              {checkboxes.map((item) => {
                return (
                  <div className="relative flex items-start" key={item.name}>
                    <div className="flex h-6 items-center">
                      <input
                        id={item.name}
                        name={item.name}
                        type="checkbox"
                        className="h-4 w-4 border-primary-100 bg-transparent checked:bg-accent-300 checked:text-primary-900 hover:checked:bg-accent-300 focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent focus:checked:bg-accent-300"
                        defaultChecked={item.checked}
                        onChange={() => {
                          const { onChange, checked } = item;
                          onChange(!checked);
                        }}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={item.name}
                        className="font-medium text-primary-100"
                      >
                        {item.value}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <div className="flex items-center justify-between bg-primary-900 px-4 py-2">
            <div>
              <h2 className="text-lg uppercase leading-6 text-neutral-500">
                Strength
              </h2>
            </div>
            {/* Strength Meter */}
            <div className="flex items-center gap-3">
              <label
                className={classNames(
                  "text-xl uppercase leading-8",
                  strength === "too weak" ? "text-accent-600" : "",
                  strength === "weak" ? "text-accent-500" : "",
                  strength === "medium" ? "text-accent-400" : "",
                  strength === "strong" ? "text-accent-300" : ""
                )}
              >
                {strength}
              </label>
              <div className="flex gap-2">
                <div
                  className={classNames(
                    "h-[28px] w-[10px]",
                    !strength ? "border border-primary-100" : "",
                    strength && strength === "too weak" ? "bg-accent-600" : "",
                    strength && strength === "weak" ? "bg-accent-500" : "",
                    strength && strength === "medium" ? "bg-accent-400" : "",
                    strength && strength === "strong" ? "bg-accent-300" : ""
                  )}
                />
                <div
                  className={classNames(
                    "h-[28px] w-[10px]",
                    !strength ? "border border-primary-100" : "",
                    strength && strength === "too weak"
                      ? "border border-primary-100"
                      : "",
                    strength && strength === "weak" ? "bg-accent-500" : "",
                    strength && strength === "medium" ? "bg-accent-400" : "",
                    strength && strength === "strong" ? "bg-accent-300" : ""
                  )}
                />
                <div
                  className={classNames(
                    "h-[28px] w-[10px]",
                    !strength ? "border border-primary-100" : "",
                    strength && strength === "too weak"
                      ? "border border-primary-100"
                      : "",
                    strength && strength === "weak"
                      ? "border border-primary-100"
                      : "",
                    strength && strength === "medium" ? "bg-accent-400" : "",
                    strength && strength === "strong" ? "bg-accent-300" : ""
                  )}
                />
                <div
                  className={classNames(
                    "h-[28px] w-[10px]",
                    !strength ? "border border-primary-100" : "",
                    strength && strength === "too weak"
                      ? "border border-primary-100"
                      : "",
                    strength && strength === "weak"
                      ? "border border-primary-100"
                      : "",
                    strength && strength === "medium"
                      ? "border-primary-100"
                      : "",
                    strength && strength === "strong"
                      ? "bg-accent-300"
                      : "border border-primary-100"
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="flex w-full items-center justify-center gap-2 border border-primary-700 bg-accent-300 px-4 py-2 uppercase text-primary-700 transition-colors duration-200 ease-in-out hover:border-accent-300 hover:bg-primary-700 hover:text-accent-300"
              onClick={() => {
                const pwd = generatePassword(
                  length,
                  hasLowercase,
                  hasUppercase,
                  hasNumbers,
                  hasSymbols
                );
                if (pwd) {
                  setPassword(pwd);
                  setCopied(false);
                } else {
                  setPassword("");
                  setCopied(false);
                }
              }}
            >
              <span>Generate</span>
              <span>
                <ChevronDoubleRightIcon className="aspect-1 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
