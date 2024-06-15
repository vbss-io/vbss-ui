import {
  GithubLogo,
  Hamburger,
  LinkedinLogo,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react";
import React from "react";

export type Icons =
  | ""
  | "github"
  | "linkedin"
  | "hamburger"
  | "x"
  | "sun"
  | "moon";

export type IconsMap = {
  [key in Icons]: React.ReactNode;
};

const cn = "w-full h-full";

export const IconsMap: Record<Icons, React.ReactNode> = {
  "": "",
  github: <GithubLogo className={cn} />,
  linkedin: <LinkedinLogo className={cn} />,
  hamburger: <Hamburger className={cn} />,
  x: <X className={cn} />,
  sun: <Sun className={cn} />,
  moon: <Moon className={cn} />,
};
