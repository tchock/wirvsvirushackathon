import styled from "styled-components";

export type ContentCardHeaderProps = {
  src: string;
};

export const ContentCardHeader = styled.div<ContentCardHeaderProps>`
  background-image: url("${props => props.src}");
  background-repeat: no-repeat;
  background-size: cover;
  height: 96px;
  margin-top: -${props => props.theme.spacing(2.5)}px;
  margin-right: -${props => props.theme.spacing(2.5)}px;
  margin-left: -${props => props.theme.spacing(2.5)}px;
  margin-bottom: ${props => props.theme.spacing(2.5)}px;
`;
