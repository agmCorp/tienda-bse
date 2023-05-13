// AGM 05/23
import {
  CONTACT_FORM,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from "../../utils/constants";

function Footer({ bgColor, logo, heightLogo, hoverTextColor }) {
  const resourceLink = (text, href, title) => {
    return (
      <a target="_blank" rel="noreferrer" href={href} className="no-underline">
        <div
          className={`mb-2 font-semibold text-white hover:${hoverTextColor} text-sm cursor-pointer`}
          title={title.toUpperCase()}
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
          className={`pi pi-${socialMedia} mb-2 mr-2 text-white hover:${hoverTextColor} text-3xl cursor-pointer`}
          title={socialMedia.toUpperCase()}
        />
      </a>
    );
  };

  return (
    <div className={`text-center ${bgColor} py-5`}>
      <a
        target="_blank"
        rel="noreferrer"
        href={CONTACT_FORM}
        className="no-underline"
      >
        <img
          src={logo}
          alt="bse"
          className={heightLogo}
          title="FORMULARIO DE CONTACTO"
        />
      </a>
      {resourceLink(
        "En Uruguay nadie te da más seguridad.",
        CONTACT_FORM,
        "FORMULARIO DE CONTACTO"
      )}
      <div className="my-2">
        {socialMediaLink("youtube", YOUTUBE_LINK)}
        {socialMediaLink("facebook", FACEBOOK_LINK)}
        {socialMediaLink("twitter", TWITTER_LINK)}
        {socialMediaLink("instagram", INSTAGRAM_LINK)}
        {socialMediaLink("linkedin", LINKEDIN_LINK)}
      </div>
    </div>
  );
}

export default Footer;
