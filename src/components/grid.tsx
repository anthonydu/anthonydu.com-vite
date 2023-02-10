import "./grid.scss";

export const Col = ({ className="", ...props }) => {
  return (
    <div className={`Col col-${props.span} ${className}`} {...props}>
      {props.children}
    </div>
  );
}

export const Row = ({ className="", ...props }) => {
  return (
    <div className={`Row ${className}`} {...props}>
      {props.children}
    </div>
  );
}