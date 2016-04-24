import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    getPair: function() {
        return this.props.pair || [];
    },
    hasVotedFor: function(entry) {
        return this.props.hasVoted === entry;
    },
    render: function() {
        return <div className="vote">
            <div className="vote__greet">Pick your favorite</div>
            <div className="vote__buttons-wrapper">
                {this.getPair().map(entry =>
                    <button className="vote__button"
                            key={entry}
                            disabled={this.hasVotedFor(entry)}
                            onClick={() => this.props.vote(entry)}
                    >
                        <div className="vote__button__label">{entry}</div>
                        {this.hasVotedFor(entry) ?
                            <div className="vote__button__label--voted">Voted</div> : null}
                    </button>
                )}
            </div>
        </div>;
    }
});
