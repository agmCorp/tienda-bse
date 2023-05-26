import pageNotFound from "../images/page-not-found.png";

function GenericPageNotFound() {
  return (
    <div
      className="flex flex-column text-center fixed top-50 left-50"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <img src={pageNotFound} alt="Página no encontrada" className="w-full" />
      <span className="text-lg md:text-6xl text-500">PAGE NOT FOUND</span>
    </div>
  );
}

export default GenericPageNotFound;
