import stylex from "@stylexjs/stylex";

const styles = stylex.create({ button: { color: "red" } });

const Button = () => {
  return <button {...stylex.props(styles.button)} />;
};

export default Button;
