import NextLink from "next/link";
import React from "react";

interface NextComposedProps {
    as: string;
    href: string;
    children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, any>(
    (
        { as, href, children, ...other }: NextComposedProps,
        ref:
            | string
            | ((instance: HTMLAnchorElement | null) => void)
            | React.RefObject<HTMLAnchorElement>
            | null
            | undefined
    ) => {
        return (
            <NextLink href={href} as={as}>
                <a ref={ref} {...other}>
                    {children}
                </a>
            </NextLink>
        );
    }
);

export default Link;
