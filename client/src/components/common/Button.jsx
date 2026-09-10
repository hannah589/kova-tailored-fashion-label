import styled from "styled-components";

const StyledButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;

`;

function Button({ children, variant }) {
  return (
    <StyledButton variant={variant}>
      {children}
    </StyledButton>
  );
}

export default Button;
