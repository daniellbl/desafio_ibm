import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            name: '',
            cpf: '',
            birthDate: '',
            email: '',
            password: '',
            confirmPassword: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const {name, cpf, birthDate, email, password, confirmPassword } = this.state;
        const { dispatch } = this.props;
        if (name && cpf && email && birthDate && password && password == confirmPassword) {
          
            dispatch(userActions.create(name, cpf, birthDate, email, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { name, cpf, birthDate, email, password, confirmPassword, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Cadastre-se</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                        {submitted && !name &&
                            <div className="help-block">Nome é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !cpf ? ' has-error' : '')}>
                        <label htmlFor="name">CPF</label>
                        <input type="text" className="form-control" name="cpf" value={cpf} onChange={this.handleChange} />
                        {submitted && !cpf &&
                            <div className="help-block">CPF é obrigatório</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !birthDate ? ' has-error' : '')}>
                        <label htmlFor="name">Nascimento</label>
                        <input type="date" className="form-control" name="birthDate" value={birthDate} onChange={this.handleChange} />
                        {submitted && !birthDate &&
                            <div className="help-block">Data de nascimento é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">E-mail é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Senha</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Senha é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !confirmPassword ? ' has-error' : '')}>
                        <label htmlFor="confirmPassword">confirmar senha</label>
                        <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
                        {submitted && password != confirmPassword &&
                            <div className="help-block">Senha não confirmada</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Cadastrar</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage }; 