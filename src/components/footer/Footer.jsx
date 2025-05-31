const Footer = () => {
  return (
    <>
      <footer className="text-white py-4">
        <div className="container mx-auto text-center">
          <p className="md:text-sm sm:text-xs">
            &copy; {new Date().getFullYear()} Universidad Tecnológica de El
            Salvador. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
