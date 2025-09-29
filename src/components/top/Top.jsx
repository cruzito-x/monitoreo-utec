import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import $ from "jquery";
import Logo from "../../components/logo/Logo";
import Logo2 from "../../components/logo/Logo2";

const Top = ({ carnet, user_name }) => {
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

    $(document).on("mousedown", dropdownClickOutside);

    return () => {
      $(document).off("mousedown", dropdownClickOutside);
    };
  }, []);

  // Function to get initials (first name + first surname)
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[2][0]).toUpperCase();
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="bg-rose-950 min-h-28 flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo className="w-20 sm:w-24" />
            <Logo2 className="w-6/12 sm:w-1/4 md:w-1/5 lg:w-1/6" />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={showDropdown}
              className="flex items-center bg-rose-950 text-white py-2 transition duration-200"
            >
              {/* Vista desktop */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="text-start cursor-pointer">
                  <span className="font-semibold">
                    {user_name} <br />
                    <span className="text-xs font-normal">
                      <span className="font-semibold">Carné:</span> {carnet}
                    </span>
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 cursor-pointer" />
              </div>

              {/* Vista mobile */}
              <div className="flex sm:hidden items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-rose-900 flex items-center justify-center text-white font-bold cursor-pointer">
                  {getInitials(user_name)}
                </div>
                <ChevronDown className="w-4 h-4 cursor-pointer" />
              </div>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-rose-950 text-white rounded-md shadow-lg ring-1 ring-transparent z-50">
                <div className="py-2">
                  <span className="block px-4 py-2 text-sm font-semibold">
                    Opciones
                  </span>
                  <div className="border-t border-white/30 my-1"></div>
                  <button
                    onClick={logout}
                    className="w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Cerrar sesión
                  </button>
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
