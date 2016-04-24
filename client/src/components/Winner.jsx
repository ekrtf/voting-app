import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return <div className="winner">
            <div className="winner__suspense">The winner is:</div>
            <div className="winner__result">{this.props.winner}</div>
        </div>;
    }
});
