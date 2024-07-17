import {
  ArrowArcLeft,
  ArrowArcRight,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowsDownUp,
  ArrowSquareLeft,
  ArrowSquareRight,
  ArrowsVertical,
  ArrowUp,
  CalendarDots,
  CaretLeft,
  CaretRight,
  Check,
  Checks,
  Circle,
  DotsThree,
  DotsThreeCircle,
  DotsThreeOutline,
  Eye,
  EyeSlash,
  GithubLogo,
  Hamburger,
  LinkedinLogo,
  Minus,
  Moon,
  Plus,
  SlidersHorizontal,
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
  | "arrow-up"
  | "arrow-down"
  | "arrows-down-up"
  | "caret-left"
  | "caret-right"
  | "arrows-vertical"
  | "check"
  | "checks"
  | "circle"
  | "dots-three"
  | "dots-three-circle"
  | "dots-three-outline"
  | "sliders-horizontal"
  | "calendar-dots";

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
  "arrows-vertical": <ArrowsVertical className={cn} />,
  check: <Check className={cn} />,
  checks: <Checks className={cn} />,
  circle: <Circle className={cn} />,
  "dots-three": <DotsThree className={cn} />,
  "dots-three-circle": <DotsThreeCircle className={cn} />,
  "dots-three-outline": <DotsThreeOutline className={cn} />,
  "arrow-up": <ArrowUp className={cn} />,
  "arrow-down": <ArrowDown className={cn} />,
  "arrows-down-up": <ArrowsDownUp className={cn} />,
  "sliders-horizontal": <SlidersHorizontal className={cn} />,
  "calendar-dots": <CalendarDots className={cn} />,
};
