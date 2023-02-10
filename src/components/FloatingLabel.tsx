const FloatingLabel = ({ ...props }) => {
  const FormControl = props.as === "textarea" ? "textarea" : "input";

  return (
    <div className="FloatingLabel form-floating">
      <FormControl className="form-control" id={props.name} {...props} />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
}

export default FloatingLabel;