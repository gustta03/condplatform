import { useState, useCallback } from 'react'
import { Form, FormMain } from './styled'

import { api } from '../../services/api/api'
import { signIn, TokenValidate } from '../../auth/auth'
import { useNavigate } from 'react-router-dom'

export const LoginApp = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const signin = useCallback(async () => {
    await api
      .post('/auth/login', {
        email,
        password,
      })
      .then(res => {
        if (res.data.error === '') {
          signIn(res.data.token)
          TokenValidate()
          navigate('/dashboard')
        }
      })
  }, [email, navigate, password])

  return (
    <FormMain>
      <Form>
        <div>
          <h1>Entrar no Sistema</h1>
          <form>
            <input
              placeholder="Digite seu email"
              type={'email'}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Digite sua senha"
              type={'password'}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </form>
          <button onClick={signin}>Entrar</button>
        </div>
      </Form>
    </FormMain>
  )
}
