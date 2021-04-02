import React from 'react';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesP,
} from './ServicesElement';
import Icon1 from '../../../assets/images/service-wallet.png';
import Icon2 from '../../../assets/images/service-trusty.png';
import Icon3 from '../../../assets/images/service-digital.png';
const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Service</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesP>
            Support Easy Access to Finance 
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesP>
            Trusted Delivery Service 
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesP>
            Be a Digital Innovator 
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
