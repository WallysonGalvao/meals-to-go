import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

type Props = {
  duration?: number;
  children: React.ReactNode;
};

const FadeInView = ({ duration = 1500, children }: Props): JSX.Element => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
  );
};

export default FadeInView;
