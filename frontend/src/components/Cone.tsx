const size = 64;
const baseHeight = 4;
const coneHeight = size - baseHeight;
const trapeziumCount = 6;
const trapeziumHeight = coneHeight / trapeziumCount;
const bottomTrapeziumBottomWidth = 52;
const topTrapeziumTopWidth = 4;
const topXOffSetFromCentre = topTrapeziumTopWidth / 2;
const totalXGrowth = bottomTrapeziumBottomWidth - topTrapeziumTopWidth;
const growthPerRow = totalXGrowth / trapeziumCount;
const xOffsetPerRow = growthPerRow / 2;
const trapeziumCentre = size / 2;

const getTrapeziumForCone = (
  row: number,
  mainFill: string,
  secondaryFill: string
) => {
  const x0 = trapeziumCentre - topXOffSetFromCentre - xOffsetPerRow * row;
  const x1 = trapeziumCentre + topXOffSetFromCentre + xOffsetPerRow * row;
  const x2 = x1 + xOffsetPerRow;
  const x3 = x0 - xOffsetPerRow;
  const y0 = row * trapeziumHeight;
  const y1 = (row + 1) * trapeziumHeight;
  const points = `${x0},${y0} ${x1},${y0} ${x2},${y1} ${x3},${y1}`;
  const fill = row === 0 || row % 2 === 1 ? mainFill : secondaryFill;
  return { points, fill };
};

const trapeziums = [0, 1, 2, 3, 4, 5].map((r) =>
  getTrapeziumForCone(r, 'darkOrange', 'white')
);

const Cone = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
    >
      {trapeziums.map((t, i) => (
        <polygon key={i} points={t.points} fill={t.fill} />
      ))}
      <rect
        x="0"
        y="60"
        width={size}
        height={baseHeight}
        fill="#555555"
        rx="5"
      />
    </svg>
  );
};

export default Cone;
