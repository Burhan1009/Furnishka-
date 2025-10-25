import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IPageHeaderRequiredProps {
  href: string | object;
  as?: string;  
  children;
  style?: any;
  className? :any;
  onClick?: any;
}

const Links = ({
  href,
  as,
  children,
  style,
  className,
  onClick
}: IPageHeaderRequiredProps) => {
   
  return (
    <Link href={href} as={as} target={"_blank"} style={style} className={className} onClick={onClick}
    >
      {children} 
    </Link>
  );
};

export default Links;
