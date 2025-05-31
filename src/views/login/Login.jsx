import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import { IMaskInput } from "react-imask";
import { useRef } from "react";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import Logo from "../../components/logo/Logo";

const Login = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const usernameRef = useRef(null);

  const login = (event) => {
    event.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    Swal.fire({
      icon: "info",
      text: `Bienvenid@ ${username}, a continuación se validará si posee vales de estacionamiento.`,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/home");
      }
    });
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
                htmlFor="username"
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
                value=""
                unmask={true}
                ref={ref}
                inputRef={usernameRef}
                id="username"
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
              <input
                type="password"
                id="password"
                className="w-full px-3 py-3 bg-white rounded placeholder:text-slate-400 text-black"
                placeholder="• • • • • • • • • •"
              />
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
