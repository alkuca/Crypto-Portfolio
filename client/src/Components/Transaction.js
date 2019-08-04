import React, {  } from 'react';
import '../App.css';
import {connect} from "react-redux";
import Moment from 'react-moment';

const Transaction = ({ date,amount,price }) => {

        return (
            <div className="transaction">
                <div className="transaction--content">
                    <p className="transaction--amount"><Moment format="DD.MM.YYYY HH:MM">{date}</Moment></p>
                    <p className="transaction--value">Price: {price}</p>
                    <p className="transaction--change">Amount: {amount}</p>
                </div>
            </div>
        );
    }


const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {  })(Transaction);
