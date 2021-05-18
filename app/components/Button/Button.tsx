import React from "react";

const styleClasses =
  "px-4 py-3 rounded-sm appearance-none text-alabaster bg-el-paso";

const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = (
  restProps,
) => <button {...restProps} className={styleClasses} />;

export default Button;
