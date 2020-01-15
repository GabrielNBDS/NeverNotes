import React, { Fragment, useState } from "react";
import {
  Button,
  Field,
  Control,
  Input,
  Column,
  Section,
  Help,
  Label
} from "rbx";
import { Redirect } from "react-router-dom";
import UsersService from "../../../services/users";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const [error, setError] = useState(false);

  const HandleSubmit = async e => {
    e.preventDefault();
    try {
      const user = await UsersService.login({ email, password });
      setRedirectToNotes(true);
    } catch (error) {
      setError(true);
    }
  };

  if (redirectToNotes) {
    return <Redirect to={{ pathname: "/notes" }} />;
  } else if (redirectToRegister) {
    return <Redirect to={{ pathname: "/register" }} />;
  }

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={HandleSubmit}>
          <Column size={12}>
            <Field>
              <Label size="small">Email:</Label>
              <Control>
                <Input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Password:</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <a
                      className="button is-white has-text-custom-purple"
                      onClick={e => setRedirectToRegister(true)}
                    >
                      Registre-se ou
                    </a>
                  </Column>
                  <Column>
                    <Button color="custom-purple" outlined>
                      Login
                    </Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error && <Help color="danger">Email ou senha inválidos</Help>}
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  );
};

export default LoginForm;
