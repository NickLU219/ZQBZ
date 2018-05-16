import React from 'react';

export default class BasicPage extends React.Component {

    componentWillUnmount() {
        const {ClearMsg} = this.props
        ClearMsg("")
        return true
    }

}