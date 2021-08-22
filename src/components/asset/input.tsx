import styled, { css } from "styled-components";
import { color } from "@styles/styleAsset";
interface InputProps {
  margin?: string;
  padding?: string;
}

const Input = styled.input<InputProps>`
  padding: 10px 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid ${color.personal};
  ${({ margin, padding }) => css`
    margin: ${margin};
    padding: ${padding};
  `}
`;

export default Input;
