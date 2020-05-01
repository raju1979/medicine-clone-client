import React from 'react';

import styled from 'styled-components';
import LoadingOverlay from 'react-loading-overlay';

import {connect} from 'react-redux';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1000;
    background: rgba(10,10,10, .5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = (props) => {
    console.log(props)

    if(props.global.loading) {
        return (
            <Wrapper>
                <LoadingOverlay
                    active={true}
                    spinner
                    text='Loading...'
                >
                </LoadingOverlay>
            </Wrapper>

        )
    } else {
        return null;
    }



};

const mapStateToProps = (state, props) => {
    return {
        global: state.global
    }
};

export default connect(mapStateToProps)(Loader);
