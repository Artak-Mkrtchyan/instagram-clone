import styled, { keyframes } from 'styled-components';

const RotateAnimation = keyframes`
  0% {transform: rotate(0deg);}
  12.5% {transform: rotate(45deg);}
  25% {transform: rotate(90deg);}
  37.5% {transform: rotate(135deg);}
  50% {transform: rotate(180deg);}
  62.5% {transform: rotate(225deg);}
  75% {transform: rotate(270deg);}
  87.5% {transform: rotate(315deg);}
  100%   {transform: rotate(359deg);}
`;

const LoaderElement = styled.div`
  display: block;
  width: 18px;
  height: 18px;
  animation: ${RotateAnimation} 0.8s infinite steps(1, end);
  text-align: center;
`;

const LoaderWrapper = styled.div`
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  right: 5px;
`;

export const SearchLoader = () => {
  return (
    <LoaderWrapper>
      <LoaderElement>
        <svg aria-label="Loading…" viewBox="0 0 100 100">
          <rect
            fill="#555555"
            height="10"
            opacity="0"
            rx="5"
            ry="5"
            transform="rotate(-90 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.125"
            rx="5"
            ry="5"
            transform="rotate(-45 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.25"
            rx="5"
            ry="5"
            transform="rotate(0 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.375"
            rx="5"
            ry="5"
            transform="rotate(45 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.5"
            rx="5"
            ry="5"
            transform="rotate(90 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.625"
            rx="5"
            ry="5"
            transform="rotate(135 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.75"
            rx="5"
            ry="5"
            transform="rotate(180 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
          <rect
            fill="#555555"
            height="10"
            opacity="0.875"
            rx="5"
            ry="5"
            transform="rotate(225 50 50)"
            width="28"
            x="67"
            y="45"
          ></rect>
        </svg>
      </LoaderElement>
    </LoaderWrapper>
  );
};
