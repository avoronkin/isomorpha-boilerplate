/**
 * @jsx React.DOM
 */
var React = require('react');

/* module.exports = React.createClass({ */
/*   render: function() { */
/*       return <div>Hello {this.props.name}</div>; */
/*     } */
/* }); */
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

        return <div > < div class = "clicker" onMouseDown = { this.handleMouseDown } >
            Give me the message! < /div>
        <div class="message">Message conveyed
          <span class="count">{this.state.count}</span > time(s) < /div>
      </div > ;
    }
});
