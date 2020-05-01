import React, { useState, useEffect, useCallback } from 'react';

import {connect} from 'react-redux';
import {signupNewUser, signUpEmailConfirm} from '../redux';
import {compose} from 'redux'

import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Redirect} from 'react-router-dom';

const LoginWrapper = styled.section`
            width: 300px;
            min-height: 400px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
        `;

const Form = styled.section`
            width: 100%;
            padding: 10px;
        `;

const styles = theme => ({
    buttonPadding: {
        padding: '30px',
    },
    inputMargin: {
        margin: '5px'
    }
});


const SignUp = (props) => {

    // console.log(props)

    const { classes } = props;
    const [signup, setSignUp] = useState({ email: '', password: '', name: '' });
    const [loading, setLoading] = useState(false);
    const [mailconfirm, setMailConfirm] = useState({ token: '' });

    const changeTextHandler = e => {
        setSignUp({
            ...signup,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = (e) => {
        console.log('submitted', signup);
        // props.history.push('/home');
        // useEffect(() => {
        //   fetchUser({})
        // });
        props.signupNewUser(signup)
        e.preventDefault();
    };

    const changeTokenTextHandler = e => {
        setMailConfirm({
            ...mailconfirm,
            token: e.target.value
        })
    };

    const confirmEmail = (e) => {
        console.log('submitted', mailconfirm);
        // props.history.push('/home');
        // useEffect(() => {
        //   fetchUser({})
        // });
        props.signUpEmailConfirm(mailconfirm)
        e.preventDefault();
    };


    if(props.user.user.hasOwnProperty("email")) {
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <LoginWrapper>
            <Paper elevation={3} square>
                <Form>
                    <form onSubmit={onSubmit}>
                        <TextField
                            className={classes.inputMargin}
                            id="outlined-basic"
                            label="name"
                            variant="outlined"
                            type="text"
                            name="name"
                            value={signup.name}
                            onChange={changeTextHandler}
                        />
                        <TextField
                            className={classes.inputMargin}
                            id="outlined-basic"
                            label="email"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={signup.email}
                            onChange={changeTextHandler}
                        />
                        <TextField
                            className={classes.inputMargin}
                            id="outlined-basic"
                            label="password"
                            type="password"
                            variant="outlined"
                            name="password"
                            value={signup.password}
                            onChange={changeTextHandler}
                        />
                        <Box display="flex" width="75%" className={classes.inputMargin} justifyContent="flex-start">
                            <Button type="submit" variant="contained" color="primary">
                                SignUp
                            </Button>
                        </Box>
                    </form>
                </Form>
            </Paper>
            <br />
            {Object.keys(props.user.user).length > 0
                ?
                <Paper elevation={3} square>
                    <Form>
                        <form onSubmit={confirmEmail}>
                            <TextField
                                className={classes.inputMargin}
                                id="outlined-basic"
                                label="token"
                                type="text"
                                variant="outlined"
                                name="token"
                                value={mailconfirm.token}
                                onChange={changeTokenTextHandler}
                            />
                            <Box display="flex" width="75%" className={classes.inputMargin} justifyContent="flex-start">
                                <Button type="submit" variant="contained" color="primary">
                                    Confirm Email
                                </Button>
                            </Box>
                        </form>
                    </Form>
                </Paper>
                : null
            }
        </LoginWrapper>
    )


};

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        signupNewUser: (user) => dispatch(signupNewUser(user)),
        signUpEmailConfirm: (token) => dispatch(signUpEmailConfirm(token))
    }
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(SignUp);
