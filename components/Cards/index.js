import React from "react";
import PropTypes from "prop-types";
import { Heading } from "grommet";
import Link from "../Link";
import { CardWrapper, CardContainer } from "./Card";

const Card = ({ name }) => (
  <CardWrapper>
    <Heading size="small" level={3} style={{ fontWeight: 300, color: "#333" }}>
      {name}
    </Heading>
  </CardWrapper>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

const Cards = ({ projects = [] }) => (
  <CardContainer>
    {projects.map((project, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Link key={`${i}-${project.name}`} href={`/Board/${project.ID}`}>
        <Card name={project.name} />
      </Link>
    ))}
  </CardContainer>
);

Cards.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default Cards;
