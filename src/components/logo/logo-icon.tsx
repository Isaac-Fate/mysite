import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
  withName?: boolean;
}

export function LogoIcon(props: LogoIconProps) {
  const iconWidth = 16;
  const height = 25.88854381999832;

  const textStartOffsetX = 1;
  const textStartX = iconWidth + textStartOffsetX;
  const textLength = height - textStartOffsetX;

  const iconWithNameWidth = Math.ceil(iconWidth + height);

  const width = props.withName ? iconWithNameWidth : iconWidth;

  return (
    <svg
      className={cn("fill-current", props.className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Body */}
      <path d="M 0 0 L 16 0 L 16 9.888543819998318 L 16 12.555210486664985 L 2.6666666666666665 12.555210486664985 L 2.6666666666666665 25.88854381999832 L 0 25.88854381999832 L 0 9.888543819998318 L 13.333333333333334 9.888543819998318 L 13.333333333333334 2.6666666666666665 L 0 2.6666666666666665 Z" />

      {/* Triangle */}
      <path d="M 4.534189906848999 25.88854381999832 L 11.465810093151001 25.88854381999832 L 8.0 15.22187715333165 Z" />

      {/* Rectangle */}
      <path d="M 16 15.22187715333165 L 16 25.88854381999832 L 13.333333333333334 25.88854381999832 L 13.333333333333334 15.22187715333165 Z" />

      {/* Eyes */}
      <circle
        cx="2.5464400750007012"
        cy="6.277605243332493"
        r="1.3333333333333333"
      />
      <circle
        cx="10.786893258332633"
        cy="6.277605243332493"
        r="1.3333333333333333"
      />

      {/* My name */}
      {props.withName && (
        <>
          <text
            x={textStartX}
            y="25.5"
            fontWeight={"bold"}
            textLength={textLength}
            fontSize={10}
          >
            saac
          </text>

          <text
            x={textStartX}
            y={12.5}
            fontWeight={"bold"}
            fill="#9CDCFE"
            textLength={textLength}
            fontSize={11}
          >
            <tspan fontSize={18}>F</tspan>
            <tspan>ei</tspan>
          </text>
        </>
      )}
    </svg>
  );
}
