function aStar(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // cost from start
  const gCost = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  // parent tracking
  const parent = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  const visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const visitedOrder = [];

  // Manhattan heuristic
  const heuristic = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  // open list (acts like priority queue)
  const openList = [];

  const [sx, sy] = start;
  const [ex, ey] = end;

  gCost[sx][sy] = 0;

  openList.push({
    node: start,
    fCost: heuristic(start, end),
  });

  while (openList.length > 0) {
    // sort by lowest fCost
    openList.sort((a, b) => a.fCost - b.fCost);

    const current = openList.shift();
    const [x, y] = current.node;

    if (visited[x][y]) continue;

    visited[x][y] = true;
    visitedOrder.push([x, y]);

    // goal check
    if (x === ex && y === ey) {
      const path = [];
      let cur = end;

      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }

      return {
        path: path.reverse(),
        visited: visitedOrder,
      };
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < rows &&
        ny < cols &&
        grid[nx][ny] === 0
      ) {
        const newG = gCost[x][y] + 1;

        if (newG < gCost[nx][ny]) {
          gCost[nx][ny] = newG;
          parent[nx][ny] = [x, y];

          const fCost = newG + heuristic([nx, ny], end);

          openList.push({
            node: [nx, ny],
            fCost,
          });
        }
      }
    }
  }

  return {
    path: [],
    visited: visitedOrder,
  };
}

module.exports = aStar;
