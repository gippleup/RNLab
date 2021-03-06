type Position = {
  x: number;
  y: number;
}

type GetAngleParam = {
  from: Position, to: Position
}
export const getAngle = (param: GetAngleParam) => {
  const {from, to} = param;
  return Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
}

export const getDistance = (param: GetAngleParam) => {
  const {from, to} = param;
  return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
}

type GetNewPosParam = {
  origin: Position, angle: number, distance: number;
}
export const getNewPos = (param: GetNewPosParam) => {
  const {angle, distance, origin} = param;
  var result: Position = {x: -1,y: -1};
  result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + origin.x);
  result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + origin.y);
  return result;
}


export const getBezierDistanceForCircle = (n: number) => (4 / 3) * Math.tan(Math.PI/(2 * n));