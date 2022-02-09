import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
  user: {
    name: '',
    email: ''
  },
  list: []
}
class UserCrud extends Component {
  state = { ...initialState }

  clear() {
    this.setState({ user: initialState.user })
  }

  save() {
    const user = this.state.user
    const methods = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    axios[methods](url, user).then((response) => {
      const list = this.getUpdatedList(response.data)
      this.setState({ user: initialState.user, list })
    })
  }

  updateField(event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user: user })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome: </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail: </label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={this.state.user.email}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o e-mail..."
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  getUpdatedList(user) {
    const list = this.state.list.filter((u) => u.id !== user.id)
    list.unshift(user)
    return list
  }
  render() {
    return <Main {...headerProps}>{this.renderForm()}</Main>
  }
}

export default UserCrud
