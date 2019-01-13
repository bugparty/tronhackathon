import React from 'react';
import InputField from './InputField';
class BarCode extends React.Component {
    componentDidMount() {

    }

    render() {


        return (
            < div
        className = "panel-block is-paddingless is-12" >
            < div
        className = "column is-12"
        id = "token-lists" >
            < img height="600"
        src = "/icons/barcode.png" / >

            < /div>
            < /div>
    )
    }
}

export default BarCode;
