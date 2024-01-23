/*
Input:
[[0.78,1.47,1.77,3.92], ["s1", "s2", "e1", "e2"]]
data sanitation v
[[s,e],           [s,e]]
[[0.78, 1.77], [1.47, 3.92]]
*/

const numIntersections = (input) => {
  const numberOfChords = determineNumberOfChords(input[1]); // calculate number of chords in input

  const allPoints = [];

  // creating array of points, each point in format of [s,e]
  // data sanitation
  let pointNames = input[1];
  for (let i = 0; i < numberOfChords; i++) {
    let currPoint = [0, 0];

    for (j = 0; j < pointNames.length; j++) {
      if (pointNames[j][0] === "s" && Number(pointNames[j][1]) === i + 1) {
        currPoint[0] = input[0][j];
      }

      if (pointNames[j][0] === "e" && Number(pointNames[j][1]) === i + 1) {
        currPoint[1] = input[0][j];
      }
    }
    allPoints.push(currPoint);
  }

  // convert radians to x, y coordinates
  // radians = degrees * pi / 180 or radians = r*cos(A), r*sin(B)
  const xYPoints = [];

  for (let line of allPoints) {
    currXYPoint = [
      [0, 0],
      [0, 0],
    ];

    currXYPoint[0][0] = Math.cos(line[0]);
    currXYPoint[0][1] = Math.sin(line[0]);

    currXYPoint[1][0] = Math.cos(line[1]);
    currXYPoint[1][1] = Math.sin(line[1]);

    xYPoints.push(currXYPoint);
  }
  total_result = 0;

  // check every line and see if they intersect
  // iterate through every line, and check if it intersects with any of the other lines

  // pointA = [0,0]
  // pointB = [1,0]
  // lineA = [pointA, pointB]
  // [lineA, lineB, lineC, lineD, lineE]
  for (let i = 0; i < xYPoints.length; i++) {
    for (let j = i + 1; j < xYPoints.length; j++) {
      let val = xYPoints[i];
      let val2 = xYPoints[j];
      if (
        determineIfLinesIntersect(
          val[0][0],
          val[0][1],
          val[1][0],
          val[1][1],
          val2[0][0],
          val2[0][1],
          val2[1][0],
          val2[1][1]
        )
      ) {
        total_result++;
      }
    }
  }

  return total_result;
}

// ("s1", "s2", "e1", "e2")
const determineNumberOfChords = (chords) => Math.floor(chords.length / 2);

const determineIfLinesIntersect = (a, b, c, d, p, q, r, s) => {
  let det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
};

console.log(
  numIntersections([
    [0.78, 1.47, 1.77, 3.92],
    ["s1", "s2", "e1", "e2"],
  ])
);
console.log(
  numIntersections([
    [0.9, 1.3, 1.7, 2.92],
    ["s1", "e1", "s2", "e2"],
  ])
);

// Runtime
// O(n^2)