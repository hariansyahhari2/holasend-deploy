import React from 'react';
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  Column2,
  ImgWrap,
  Img,
} from './InfoElement';

import { NavBtn, NavBtnLink } from '../Navbar/NavbarElement';

const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  headLine,
  description,
  img,
  alt,
  lightText,
  darkText,
}) => {
  return (
    <InfoContainer lightBg={lightBg} id={id}>
      <InfoWrapper>
        <InfoRow imgStart={imgStart}>
          <Column1>
            <TextWrapper>
              <TopLine>{topLine}</TopLine>
              <Heading lightText={lightText}>{headLine}</Heading>
              <Subtitle darkText={darkText}>{description}</Subtitle>
              <BtnWrap>
                <NavBtn>
                  { localStorage.getItem("token") ? <NavBtnLink to="login" onClick={() => window.location.href = "/dashboard"}>Get Started</NavBtnLink> : <NavBtnLink to="login">Get Started</NavBtnLink>}
                </NavBtn>
              </BtnWrap>
            </TextWrapper>
          </Column1>
          <Column2>
            <ImgWrap>
              <Img src={img.default} alt={alt} />
            </ImgWrap>
          </Column2>
        </InfoRow>
      </InfoWrapper>
    </InfoContainer>
  );
};

export default InfoSection;
