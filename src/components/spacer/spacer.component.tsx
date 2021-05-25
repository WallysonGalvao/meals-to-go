import React from 'react';
import styled, { useTheme, DefaultTheme } from 'styled-components/native';

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
} as const;

const positionVariant = {
  top: 'marginTop',
  left: 'marginLeft',
  right: 'marginRight',
  bottom: 'marginBottom',
} as const;

type VariantProps = {
  position?: keyof typeof positionVariant;
  size: keyof typeof sizeVariant;
  theme: DefaultTheme;
};

type SpaceViewProps = {
  variant: string;
};

type SpacerProps = {
  children?: React.ReactNode;
} & Omit<VariantProps, 'theme'>;

const getVariant = ({ position = 'top', size, theme }: VariantProps) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View<SpaceViewProps>`
  ${({ variant }) => variant};
`;

const Spacer = ({
  position = 'top',
  size,
  children,
}: SpacerProps): JSX.Element => {
  const theme = useTheme();
  const variant = getVariant({ position, size, theme });
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

export default Spacer;
