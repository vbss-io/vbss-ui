import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, JSXElementConstructor } from "react"

type ClassValue = string | false | null | undefined

export const twMerge = (...classLists: string[]): string => {
  const allClasses = classLists.join(" ").split(/\s+/)
  const uniqueClasses = Array.from(new Set(allClasses))
  return uniqueClasses.join(" ")
}

export const clsx = (...classes: (string | false | null | undefined)[]): string => {
  return classes.filter(Boolean).join(" ")
}

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

type PropsOf<C extends keyof JSX.IntrinsicElements | JSXElementConstructor<unknown>> = JSX.LibraryManagedAttributes<
  C,
  ComponentPropsWithoutRef<C>
>

type AsProp<C extends ElementType> = {
  as?: C
}

type ExtendableProps<ExtendedProps = object, OverrideProps = object> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

type InheritableElementProps<C extends ElementType, Props = object> = ExtendableProps<PropsOf<C>, Props>

type PolymorphicComponentProps<C extends ElementType, Props = object> = InheritableElementProps<C, Props & AsProp<C>>

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"]

type PolymorphicComponentPropsWithRef<C extends ElementType, Props = object> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>
}

export type ExtendableComponentProps<C extends ElementType, D> = PolymorphicComponentPropsWithRef<C, D>
