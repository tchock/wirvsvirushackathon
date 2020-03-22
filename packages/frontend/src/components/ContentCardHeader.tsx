import styled from "styled-components";

export type ContentCardHeaderProps = {
  src: string;
};

export const ContentCardHeader = styled.div<ContentCardHeaderProps>`
  background-image: url("${props => props.src}");
  background-repeat: no-repeat;
  background-size: cover;
  height: 96px;
`;
