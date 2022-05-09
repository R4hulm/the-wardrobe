   
import styled from 'styled-components';

import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px) {
    flex-direction: row;
    height: auto;
    
  }
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;

  h2{
    @media screen and (max-width: 800px) {
    font-size:21px;
    }
  }

  @media screen and (max-width: 800px) {
    height: auto;
    min-width: 80vw;
    margin-top: 50px;
  }

`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;