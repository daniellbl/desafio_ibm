import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { userActions, accountActions, transactionActions } from '../_actions';
const drawerWidth = 240;
const classes = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
const handleDrawerOpen = () => {
    setOpen(true);
};
const handleDrawerClose = () => {
    setOpen(false);
};
class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(accountActions.getByUser(this.props.user.id));
        this.props.dispatch(transactionActions.getByAccount(this.props.user.id));

    }
    render() {
        const { user, account, transac } = this.props;


        return (
            <div >
                {account.loading && <em>Loading Account...</em>}
                {account.error && <span className="text-danger">ERROR: {account.error}</span>}
                {account.items &&

                    <div className={classes.root}>
                        <CssBaseline />

                        <Drawer
                            variant="permanent"
                            classes={{
                                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                            }}
                            open={open}
                        >
                            <div className={classes.toolbarIcon}>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />

                            <Divider />

                        </Drawer>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container}>
                                <Grid container spacing={3}>
                                    {/* Chart */}
                                    <Grid item xs={12} md={8} lg={9}>
                                        <Paper className={fixedHeightPaper}>
                                            <Card >
                                                <CardContent>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        Bem vindo, {this.props.user.name}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Número da Conta: {this.props.user.id}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Agência Bancaria: 01
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        Banco Nº: 0001
                                                    </Typography>

                                                </CardContent>

                                            </Card>
                                        </Paper>
                                    </Grid>
                                    {/* Recent Deposits */}
                                    <Grid item xs={12} md={4} lg={3}>
                                        <Card >
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Saldo:
                                                </Typography>
                                                <Typography variant="h5" component="h2">
                                                    R$: {account.items.balance}
                                                </Typography>
                                                <CardActions>

                                                
                                                        <Link to="/Transaction">Transferências</Link>
                                               
                                                    
                                                </CardActions>
                                            </CardContent>

                                        </Card>
                                    </Grid>
                                </Grid>
                                <Box pt={4}>
                                    {transac.loading && <em>Loading transactions...</em>}
                                    {transac.error && <span className="text-danger">ERROR: {transac.error}</span>}
                                    {transac.items &&
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Transfêrencia para</TableCell>
                                                    <TableCell>Data</TableCell>
                                                    <TableCell>Tipo</TableCell>
                                                    <TableCell>Valor da transação</TableCell>
                                                    <TableCell >Descrição</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {transac.items.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.accountNumber}</TableCell>
                                                        <TableCell>{row.executedDate}</TableCell>
                                                        <TableCell>{row.type}</TableCell>
                                                        <TableCell> R$: {row.value}</TableCell>
                                                        <TableCell>{row.description}</TableCell>

                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    }
                                </Box>
                            </Container>
                        </main>
                    </div>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { account, authentication, transac } = state;
    const { user } = authentication;
    return {
        user,
        account,
        transac
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };