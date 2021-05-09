import styled from 'styled-components/native';
import { Camera } from 'expo-camera';

export const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;
