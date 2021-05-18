import React from "react";
import { Link, LinkProps } from "react-router-dom";

const styleClasses = "px-4 py-3 rounded-sm text-alabaster bg-el-paso";

const ButtonLink: React.FC<LinkProps> = ({ to, ...restProps }) => (
  <Link to={to} {...restProps} className={styleClasses} />
);

export default ButtonLink;
