import styled, { css } from "styled-components";
import { color } from "@styles/styleAsset";
interface ButtonProps {
  margin?: string;
  padding?: string;
  width?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 10px 40px;
  width: 100%;
  border: 1px solid ${color.personal};
  background: none;
  font-weight: bold;
  font-size: 18px;
  transition: color 0.6s, background 0.6s;
  cursor: pointer;
  &:hover {
    color: white;
    background: ${color.personal};
  }
  ${({ margin, padding, width }) => css`
    margin: ${margin};
    padding: ${padding};
    width: ${width};
  `}
`;

export default Button;
