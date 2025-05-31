import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

const CheckVoucher = () => {
  const navigate = useNavigate();
  const validateVoucher = (event) => {
    event.preventDefault();

    Swal.fire({
      icon: "success",
      text: `Acceso concedido, a continuación podrá ver el estado del estacionamiento.`,
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
            <Logo className="w-40 sm:w-48" />
          </div>
          <form>
            <div className="mb-6">
              <p className="text-white text-sm font-medium mb-6">
                Para hacer efectivo su derecho al uso del estacionamiento
                estudiantil, por favor introduzca el código generado en su
                voucher de estacionamiento.
              </p>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-3 bg-white rounded placeholder:text-slate-400 text-black"
                placeholder="Introduzca el código del voucher"
              />
            </div>
            <Button
              text="Validar Voucher"
              className="bg-primary-dark w-full py-3.5"
              onClick={validateVoucher}
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckVoucher;
