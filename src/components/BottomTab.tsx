import * as d3 from 'd3';
import React from 'react'
import { View, Dimensions, GestureResponderEvent, Animated, findNodeHandle } from 'react-native'
import { Circle, G, Path, Rect, Svg } from 'react-native-svg'

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const screen = Dimensions.get("screen")
const center = screen.width / 2;

type BottomTabProps = {
}

const height = 80;
const radius = 30;
const edgePointConstant = 2.5;
const edgeControlConstant = 1;
const centerControlConstant = 1;
const maxX = screen.width - radius * 2.5;
const minX = radius * 2.5;

const getFakeGoo = (blobRadius: number, extrusion: number) => {
  const extrudedRadius = blobRadius * extrusion;
  const spreadConstant = 2;
  const interpolatedControlConstant = d3.interpolate(
    edgePointConstant * spreadConstant,
    edgePointConstant
  )(extrusion);
  return `
    M ${-blobRadius * interpolatedControlConstant},0
    C ${-blobRadius * edgeControlConstant},0
      ${-blobRadius * centerControlConstant},-${extrudedRadius}
      0,-${extrudedRadius}
    C ${blobRadius * centerControlConstant},-${extrudedRadius}
      ${blobRadius * edgeControlConstant},0
      ${blobRadius * interpolatedControlConstant},0
    Z
  `;
}

const BottomTab: React.FC<BottomTabProps> = () => {
  const extrusion = React.useRef(new Animated.Value(1)).current;
  const iconPos = [center - 120, center, center + 120];
  const x = React.useRef(new Animated.Value(iconPos[0])).current;
  const iconY = React.useRef([new Animated.Value(-20), new Animated.Value(0), new Animated.Value(0)]).current;

  const toggleNth = (n: number) => {
    const duration = 300;
    const locationX = iconPos[n];
    Animated.parallel([
      ...iconY.filter((_, i) => i !== n).map((y) => Animated.timing(y, {
        toValue: 0,
        useNativeDriver: false,
      })),
      Animated.timing(x, {
        toValue: locationX,
        useNativeDriver: false,
        duration: duration,
      }),
      Animated.sequence([
        Animated.timing(extrusion, {
          toValue: 0.5,
          useNativeDriver: false,
          duration: duration / 2,
        }),
        Animated.timing(extrusion, {
          toValue: 1,
          useNativeDriver: false,
          duration: duration / 2,
        }),
      ]),
      Animated.timing(iconY[n], {
        toValue: -20,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <View style={{backgroundColor: "black", height: "100%", justifyContent: "flex-end"}}>
      <Svg width={screen.width} height={height + radius} viewBox={`0 -${radius} ${screen.width} ${height + radius}`}>
        <Rect fill="white" width={screen.width} height={height} />
        <AnimatedG
          x={x.interpolate({
            inputRange: [minX, maxX],
            outputRange: [minX, maxX],
          })}
          y={1}
        >
          <AnimatedPath
            fill="white"
            d={extrusion.interpolate({
              inputRange: [0, 1],
              outputRange: [getFakeGoo(radius, 0), getFakeGoo(radius, 0.8)],
            })}
          />
        </AnimatedG>
        <AnimatedG y={iconY[0]}>
          <Circle onStartShouldSetResponder={() => true} onResponderStart={() => toggleNth(0)} x={iconPos[0]} y="40" r="30" fill="grey" />
        </AnimatedG>
        <AnimatedG y={iconY[1]}>
          <Circle onStartShouldSetResponder={() => true} onResponderStart={() => toggleNth(1)} x={iconPos[1]} y="40" r="30" fill="grey" />
        </AnimatedG>
        <AnimatedG y={iconY[2]}>
          <Circle onStartShouldSetResponder={() => true} onResponderStart={() => toggleNth(2)} x={iconPos[2]} y="40" r="30" fill="grey" />
        </AnimatedG>
      </Svg>
    </View>
  )
}

export default BottomTab
