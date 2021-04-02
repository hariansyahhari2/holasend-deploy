import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { SocialIconLink, SocialIcons } from "../../../components/molecules/Footer/FooterElements";

const Footer = () => {
  return (
    <footer className="main-footer">
      <strong>
        holaSend! @ {new Date().getFullYear()} All rights reserved.
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <SocialIcons>
          <SocialIconLink
            href="//www.facebook.com"
            aria-label="Facebook"
            target="_blank"
          >
            <FaFacebook />
          </SocialIconLink>
          <SocialIconLink
            href="//www.instagram.com"
            aria-label="Instagram"
            target="_blank"
          >
            <FaInstagram />
          </SocialIconLink>
          <SocialIconLink
            href="//www.twitter.com"
            aria-label="Twitter"
            target="_blank"
          >
            <FaTwitter />
          </SocialIconLink>
        </SocialIcons>
      </div>
    </footer>
  );
};

export default Footer;
