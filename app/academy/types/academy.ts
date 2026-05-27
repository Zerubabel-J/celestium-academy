export type AnchorPosition = "top" | "bottom" | "left" | "right" | "middle";

export type RelationStyle = {
  lineStyle?: "angle" | "straight" | "curve";
  endMarker?: boolean;
  startMarker?: boolean;
};

export type StepRelationVariant = {
  sourceAnchor: AnchorPosition;
  targetAnchor: AnchorPosition;
  style?: RelationStyle;
};

export type StepRelationConfig = {
  targetId: string;
  desktop?: StepRelationVariant | null;
  mobile?: StepRelationVariant | null;
};

export type ResolvedStepRelation = {
  targetId: string;
  sourceAnchor: AnchorPosition;
  targetAnchor: AnchorPosition;
  style?: RelationStyle;
};

export type AcademyStep = {
  id: string;
  title: string;
  badgeNumber: number;
  buttonText?: string;
  containerClassName?: string;
  cardClassName?: string;
  relations?: StepRelationConfig[];
};

export type AcademyStar = {
  level: number;
  title?: string;
  subtitle?: string;
  className?: string;
  wrapperClassName?: string;
};

export type AcademyLevelLayout = {
  sectionClassName: string;
  contentClassName: string;
  stepsClassName: string;
};

export type AcademyLevel = {
  id: string;
  star?: AcademyStar;
  layout: AcademyLevelLayout;
  steps: AcademyStep[];
};

export type AcademyResolvedStep = Omit<AcademyStep, "relations"> & {
  relations?: ResolvedStepRelation[];
};

export type AcademyLevelResolved = Omit<AcademyLevel, "steps"> & {
  steps: AcademyResolvedStep[];
};
