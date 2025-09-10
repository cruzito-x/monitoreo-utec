import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import $ from "jquery";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import Logo from "../../components/logo/Logo";

const Login = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const carnetRef = useRef(null);
  const [carnet, setCarnet] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    const carnet = $("#carnet").val().replace(/-/g, "");
    const password = $("#password").val();

    if (!carnet || !password) {
      Swal.fire({
        icon: "error",
        text: "Por favor, complete todos los campos.",
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Aceptar",
      });

      return false;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ carnet, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire({
          icon: "info",
          text: `Bienvenid@ ${data.user_name}, a continuación se validará si posee vales de estacionamiento.`,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (data.has_vouchers === 1) {
            if (result.isConfirmed) {
              navigate("/home", {
                state: {
                  carnet: data.carnet,
                  user_name: data.user_name,
                  role: data.role_id,
                },
              });
            }
          } else {
            Swal.fire({
              icon: "info",
              text: "No posee vales de estacionamiento, por favor solicite uno en colecturía.",
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Aceptar",
            }).then(() => {
              navigate("/");
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Usuario o contraseña incorrectos.",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Aceptar",
        });
      }

      clear();
    } catch (error) {
      console.error("Error al inicializar el login:", error);
      Swal.fire({
        icon: "error",
        text: "Ocurrió un error al intentar iniciar sesión.",
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const clear = () => {
    $("#carnet").val("");
    $("#password").val("");
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white/5 p-6 sm:p-8 rounded-lg w-full max-w-md shadow-md">
          <div className="flex justify-center mb-6">
            <Logo className="w-40 sm:w-52" />
          </div>
          <form>
            <div className="mb-6">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="carnet"
              >
                Usuario
              </label>
              <IMaskInput
                className="w-full px-3 py-3 bg-white rounded placeholder:text-slate-400 text-black"
                mask={"##-####-####"}
                definitions={{
                  "#": /[0-9]/,
                }}
                radix="."
                value={carnet}
                onAccept={(value) => setCarnet(value)}
                unmask={true}
                ref={ref}
                inputRef={carnetRef}
                id="carnet"
                placeholder="xx-xxxx-xxxx"
              />
            </div>
            <div className="mb-10">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-3 bg-white rounded placeholder:text-slate-400 text-black pr-10"
                  placeholder="• • • • • • • • • •"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer text-rose-900"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button
              text="Acceder"
              className="bg-primary-dark w-full py-3.5"
              onClick={login}
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
