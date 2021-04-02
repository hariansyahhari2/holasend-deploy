import React from 'react';
import {animateScroll as scroll} from 'react-scroll';
import {
  FooterContainer,
  FooterWrap,
  WebsiteRights,
  SocialIcons,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIconLink,
} from './FooterElements';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';

const Footer = () => {
  const footerLogo = () => {
    scroll.scrollToTop();
  };
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={footerLogo}>
              <span style={{color: '#536DFE'}}>hola</span>Send!
            </SocialLogo>
            <WebsiteRights>
              holaSend! @ {new Date().getFullYear()} All rights reserved.
            </WebsiteRights>
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
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
