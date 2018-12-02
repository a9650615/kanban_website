import React from "react";
import PropTypes from "prop-types";
import { Heading } from "grommet";
import Link from "../Link";
import { CardWrapper, CardContainer } from "./Card";

const Card = ({ title }) => (
  <CardWrapper>
    <Heading size="small" level={3} style={{ fontWeight: 300 }}>
      {title}
    </Heading>
  </CardWrapper>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

const Cards = ({ projects = [] }) => (
  <CardContainer>
    {projects.map((project, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Link key={`${i}-${project.title}`} href="/Board">
        <Card title={project.title} />
      </Link>
    ))}
  </CardContainer>
);

Cards.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string }))
    .isRequired,
};

export default Cards;
