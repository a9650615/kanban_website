/* eslint-disable react/react-in-jsx-scope */
import NextLink from "next/link";

// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line no-multi-assign
// eslint-disable-next-line react/prop-types
const Button = props => <a href={props.href}>{props.children}</a>;

// eslint-disable-next-line react/prop-types
const Link = ({ href = "", query = {}, children, noNeedA = false }) => (
  <NextLink href={{ pathname: href, query }} passHref>
    {!noNeedA ? <Button>{children}</Button> : children}
  </NextLink>
);

export default Link;
