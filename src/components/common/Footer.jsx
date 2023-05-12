// AGM 05/23
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from "../../utils/constants";

function Footer({ bgColor, logo, heightLogo, hoverTextColor }) {
  const resourceLink = (text, href) => {
    return (
      <a target="_blank" rel="noreferrer" href={href} className="no-underline">
        <div
          className={`mb-2 font-semibold text-white hover:${hoverTextColor} text-lg cursor-pointer`}
        >
          {text}
        </div>
      </a>
    );
  };

  const socialMediaLink = (socialMedia, href) => {
    return (
      <a target="_blank" rel="noreferrer" href={href} className="no-underline">
        <span
          className={`pi pi-${socialMedia} mb-2 mr-2 text-white hover:${hoverTextColor} text-5xl cursor-pointer`}
        />
      </a>
    );
  };

  return (
    <div
      className={`flex flex-column md:flex-row justify-content-center ${bgColor} py-5`}
    >
      <div className="mx-6 text-center m-auto md:pb-5 md:w-3">
        <div className="flex flex-column">
          <div className="mb-2">
            <img src={logo} alt="bici" className={heightLogo} />
          </div>
          <div className="mb-4 font-semibold text-white text-lg">
            Somos la mejor alternativa para mantener tu bici protegida.
          </div>
          <div className="mb-2 font-semibold text-white text-lg">
            En BSE contamos con 110 años de trayectoria en Uruguay, ofrecemos un
            producto moderno adaptado a tus necesidades.
          </div>
          <div className="my-2">
            {socialMediaLink("youtube", YOUTUBE_LINK)}
            {socialMediaLink("facebook", FACEBOOK_LINK)}
            {socialMediaLink("twitter", TWITTER_LINK)}
            {socialMediaLink("instagram", INSTAGRAM_LINK)}
            {socialMediaLink("linkedin", LINKEDIN_LINK)}
          </div>
        </div>
      </div>
      <div className="mx-6 text-center">
        <div className="flex flex-column justify-content-center">
          <span className="my-4 md:mt-0 font-semibold text-white text-3xl">
            Recursos
          </span>
          {resourceLink("Políticas de privacidad", DUMMY_LINK)}
          {resourceLink("Politica de seguros", DUMMY_LINK)}
          {resourceLink("Denuncias", DUMMY_LINK)}
          {resourceLink("Facturas vigentes", DUMMY_LINK)}
          {resourceLink("Contacto", DUMMY_LINK)}
        </div>
      </div>
    </div>
  );
}

export default Footer;
