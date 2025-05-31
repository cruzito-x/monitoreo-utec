import { useState, useEffect, useRef } from "react";
import Logo from "../../components/logo/Logo";
import Logo2 from "../../components/logo/Logo2";
import { useNavigate } from "react-router-dom";

const Top = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const showDropdown = () => {
    setIsOpen((status) => !status);
  };

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    function dropdownClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", dropdownClickOutside);

    return () => {
      document.removeEventListener("mousedown", dropdownClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-primary min-h-32 flex">
        <div className="flex-grow flex justify-between items-center px-10">
          <div className="flex items-center">
            <Logo className="w-20 sm:w-20" />
            <Logo2 className="w-4/12 sm:w-3/12 mx-7" />
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={showDropdown}
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="User avatar"
                className="w-16 rounded-full border-2 cursor-pointer border-slate-300 hover:border-red-900 transition duration-200"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2">
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Nombre de alumno
                  </label>
                  <div className="border-t border-gray-200 my-1"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
