import logoUTEC from "../../assets/img/utec/logo-utec.webp";

const Logo = ({ className = "" }) => {
  return (
    <>
      <img
        src={logoUTEC}
        className={className}
        alt="Universidad Tecnológica de El Salvador"
      />
    </>
  );
};

export default Logo;
