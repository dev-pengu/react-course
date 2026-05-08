import { memo, type ComponentPropsWithoutRef, type JSX } from "react";
import { log } from "../../log";

const IconButton = memo(function IconButton({children, icon, ...props}: ComponentPropsWithoutRef<'button'> & { icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element }) {
    log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;