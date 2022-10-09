import { useState, useCallback } from "react";
import { Form, FormMain } from "./styled";

import { api } from "../../services/api/api";
import { signIn, } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

export const LoginApp = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  const signin = useCallback( async () => {
    const response = await api.post("/auth/login",
     { 
      email,
      password 
    });

    const data = response.data;

    if (data.error === "") {
      signIn(data.token);
      navigate("/");
    }

  }, [email, password])

  return (
    <FormMain>
      <Form>
        <div>
          <h1>Entrar no Sistema</h1>
          <form>
            <input
              placeholder="Digite seu email"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Digite sua senha"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </form>
          <button onClick={signin}>Entrar</button>
        </div>
      </Form>
    </FormMain>
  );
};
