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
    <div className="w-full">
      <div className="bg-primary min-h-28 flex items-center">
        <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          <div className="flex justify-start items-center space-x-4">
            <Logo className="w-20 sm:w-24" />
            <Logo2 className="w-6/12 sm:w-1/4 md:w-1/5 lg:w-1/6" />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button onClick={showDropdown} className="focus:outline-none">
              <img
                src="https://i.pravatar.cc/40"
                alt="User avatar"
                className="w-40 lg:w-20 md:w-20 sm:w-20 rounded-full border-2 cursor-pointer border-slate-300 hover:border-red-900 transition duration-200"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2">
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-default">
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
