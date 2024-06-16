import {
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
  | "eye-slash";

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
};
