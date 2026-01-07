import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  height: 60px;
  background: #1e1e1e;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const Logo = styled.h1`
  color: #3b82f6;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <Logo>React Pattern Playground</Logo>
      </LogoLink>
    </HeaderContainer>
  );
}
