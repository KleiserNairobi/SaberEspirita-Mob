import styled, {css} from 'styled-components/native';

type Props = {
  darkBackground?: boolean;
};

export const Container = styled.View<Props>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  ${({darkBackground}: Props) => {
    if (darkBackground) {
      return css`
        background-color: rgba(0, 0, 0, 0.5);
      `;
    }
  }};
`;
