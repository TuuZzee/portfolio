export interface SectionPosition {
  readonly id: string;
  readonly top: number;
  readonly bottom: number;
}

interface ReadingPosition {
  readonly top: number;
  readonly line: number;
  readonly viewportHeight: number;
  readonly atPageEnd: boolean;
}

// Positions are in document order and viewport coordinates, independent of callback order or hash.
export function activeSection(
  sections: readonly SectionPosition[],
  position: ReadingPosition,
): string | undefined {
  const visible = sections.filter(
    (section) => section.bottom > position.top && section.top < position.viewportHeight,
  );
  if (position.atPageEnd) {
    return visible.at(-1)?.id;
  }
  return visible.find((section) => section.top <= position.line && section.bottom > position.line)
    ?.id;
}
