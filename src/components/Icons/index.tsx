import {
  ArrowArcLeft,
  ArrowArcRight,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowLeft,
  ArrowRight,
  ArrowSquareLeft,
  ArrowSquareRight,
  CaretLeft,
  CaretRight,
  Check,
  Checks,
  Circle,
  Eye,
  EyeSlash,
  GithubLogo,
  Hamburger,
  LinkedinLogo,
  Minus,
  Moon,
  Plus,
  Sun,
  X,
} from "@phosphor-icons/react";
import React from "react";

export type Icons =
  | "github"
  | "linkedin"
  | "hamburger"
  | "x"
  | "sun"
  | "moon"
  | "plus"
  | "minus"
  | "eye"
  | "eye-slash"
  | "arrow-arc-left"
  | "arrow-arc-right"
  | "arrow-circle-left"
  | "arrow-circle-right"
  | "arrow-left"
  | "arrow-right"
  | "arrow-square-left"
  | "arrow-square-right"
  | "caret-left"
  | "caret-right"
  | "check"
  | "checks"
  | "circle";

export type IconsMap = {
  [key in Icons]: React.ReactNode;
};

const cn = "w-full h-full";

export const IconsMap: Record<Icons, React.ReactNode> = {
  github: <GithubLogo className={cn} />,
  linkedin: <LinkedinLogo className={cn} />,
  hamburger: <Hamburger className={cn} />,
  x: <X className={cn} />,
  sun: <Sun className={cn} />,
  moon: <Moon className={cn} />,
  plus: <Plus className={cn} />,
  minus: <Minus className={cn} />,
  eye: <Eye className={cn} />,
  "eye-slash": <EyeSlash className={cn} />,
  "arrow-arc-left": <ArrowArcLeft className={cn} />,
  "arrow-arc-right": <ArrowArcRight className={cn} />,
  "arrow-circle-left": <ArrowCircleLeft className={cn} />,
  "arrow-circle-right": <ArrowCircleRight className={cn} />,
  "arrow-left": <ArrowLeft className={cn} />,
  "arrow-right": <ArrowRight className={cn} />,
  "arrow-square-left": <ArrowSquareLeft className={cn} />,
  "arrow-square-right": <ArrowSquareRight className={cn} />,
  "caret-left": <CaretLeft className={cn} />,
  "caret-right": <CaretRight className={cn} />,
  check: <Check className={cn} />,
  checks: <Checks className={cn} />,
  circle: <Circle className={cn} />,
};
