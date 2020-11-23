import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { transactionActions } from '../_actions';

import Typography from '@material-ui/core/Typography';


const classes = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));




class TransactionPage extends React.Component {

    constructor(props) {
        super(props);
        // reset login status
        //  this.props.dispatch(userActions.logout());
        // this.props.dispatch(userActions.logout());
        this.state = {
            bankNumber: 0,
            branchNumber: 0,
            accountNumber: 0,
            personCode: '',
            value: 0,
            description: ''


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e) {
        e.preventDefault();


        const { bankNumber, branchNumber, accountNumber, value, personCode, description } = this.state;
        const { dispatch } = this.props;

        if (bankNumber && branchNumber && accountNumber && value && personCode && description) {
            dispatch(transactionActions.create(this.props.user.id, parseInt(bankNumber,10), parseInt(branchNumber,10), parseInt(accountNumber,10), parseFloat(value), description));
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        const { user, account } = this.props;
        const { bankNumber, branchNumber, accountNumber, value, personCode, description } = this.state;
        return (
            <React.Fragment>

                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Transferência
                        </Typography>



                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="bankNumber"
                                    name="bankNumber"
                                    label="Código do banco"
                                    value={bankNumber}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="branchNumber"
                                    name="branchNumber"
                                    label="Código da agência"
                                    value={branchNumber}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="accountNumber"
                                    name="accountNumber"
                                    label="Número da conta"
                                    value={accountNumber}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="personCode"
                                    name="personCode"
                                    label="CPF/CNPJ"
                                    value={personCode}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="value"
                                    name="value"
                                    type="number"
                                    label="Valor"
                                    value={value}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="description"
                                    name="description"
                                    value={description}
                                    label="Descrição"
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                className={classes.button}
                            >
                                Transferir
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"

                                className={classes.button}
                            >
                                    <Link to="/">Cancel</Link>
                            </Button>
                        </div>

                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}
const connectedTransactionPage = connect(mapStateToProps)(TransactionPage);
export { connectedTransactionPage as TransactionPage };