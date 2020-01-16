import React from "react";
import presentationImage from "../../assets/images/presentation.png";
import Header from "../../components/Header";
import { Column, Section, Title, Container } from "rbx";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

const HomeScreen = () => (
  <>
    <Header />

    <Section size="medium" className="home">
      <Container>
        <Column.Group>
          <Column size={5}>
            <Title size={2} spaced className="has-text-white">
              Crie notas na nuvem nunca foi tão fácil!
            </Title>
            <Title size={5} spaced className="has-text-light" subtitle>
              Lorem ipsum nulla elit felis amet netus ut consequat felis, litora
              curabitur nulla etiam lobortis odio per non, massa dui urna curae
              turpis donec aliquam scelerisque.
              <br />
              <br />
              Lorem ipsum nulla elit felis amet netus ut consequat felis, litora
              curabitur nulla etiam lobortis odio per non.
            </Title>
            <Link to="/register" className="button is-outlined is-white is-large">
              <strong>Registre-se de graça</strong>
            </Link>
          </Column>
          <Column size={6} offset={1}>
            <img src={presentationImage} />
          </Column>
        </Column.Group>
      </Container>
    </Section>
  </>
);

export default HomeScreen;
