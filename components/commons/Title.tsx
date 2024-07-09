import classNames from '@/utils/classnames'
import { createElement, PropsWithChildren } from 'react'
import { title } from '@/components/primitives'
import { VariantProps } from 'tailwind-variants'

interface Title
  extends PropsWithChildren,
    React.AllHTMLAttributes<HTMLHeadElement> {
  headerType: (typeof elements)[keyof typeof elements]
  titleProps?: VariantProps<typeof title>
}

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
} as const

const Title = ({ headerType, children, titleProps, ...props }: Title) => {
  const TitleElement = createElement(
    headerType,
    {
      className: classNames(title({ ...titleProps }), props.className),
      ...props
    },
    children
  )
  return TitleElement
}

Title.defaultProps = {
  headerType: 'h1'
}

export default Title
