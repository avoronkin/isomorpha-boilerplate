/**
 * @jsx React.DOM
 */
var React = require('react');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            count: 0
        };
    },

    handleMouseDown: function () {
        alert('I was told: ' + this.props.message);
        this.setState({
            count: this.state.count + 1
        });
    },

    render: function () {

        return <div> 
                 <div onMouseDown = { this.handleMouseDown } >
                   Give me the message!
                 </div>
                 <div>Message conveyed <span>{this.state.count}</span> time(s) </div>
               </div> ;
    }
});
