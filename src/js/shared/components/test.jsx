/**
 * @jsx React.DOM
 */
var React = require('react');

var ItemList = React.createClass({
  render: function() {
      var itemNodes = this.props.data.map(function (item, index) {
            return <Item key={index} author={item.username} email={item.email}></Item>;
          });

      return <div className="commentList">{itemNodes}</div>;
    }
});

var Item = React.createClass({
  render: function() {
      return (
            <div className="comment">
              <h2 className="commentAuthor">{this.props.author}</h2>
              <span>{this.props.email}</span>
            </div>
          );
    }
});

module.exports = ItemList;
