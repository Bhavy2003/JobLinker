import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, X } from "lucide-react";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "es", name: "Español(Spanish)" },
    { code: "fr", name: "Français(French)" },
    { code: "jp", name: "日本語 (Japanese)" },
  ];

  return (
    <div className="fixed left-4 bottom-4 z-50">
      {/* Rounded Language Button */}
      <button
        className="flex items-center  space-x-2 px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-400 transition duration-300 shadow-md"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Globe  size={18} />
        <span className="font-medium">{languages.find(lang => lang.code === i18n.language)?.name || "Language"}</span>
      </button>

      {/* Language Selection Menu */}
      {showMenu && (
        <div className="absolute bottom-12 left-0 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-56">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold italic bold">Choose a Language</h3>
            <button onClick={() => setShowMenu(false)}>
              <X size={20} className="hover:text-gray-400 transition duration-200" />
            </button>
          </div>
          {languages.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => { i18n.changeLanguage(code); setShowMenu(false); }}
              className="block w-full text-left px-3 py-2 hover:underline hover:bg-gray-700 rounded transition hover:italic duration-300"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;