import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';
import Winner from './Winner';

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    }
}

export const Results = React.createClass({
    mixins: [PureRenderMixin],
    getPair: function() {
        return this.props.pair || [];
    },
    getVotes: function(entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }
        return 0;
    },
    // TODO break this down into a Tally component
    render: function() {
        return this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <div className="results">
                <div className="results__body">
                    <div className="results__title">Results</div>
                    {this.getPair().map(entry =>
                        <div key={entry} className="results__item">
                            <div className="results__item__name">{entry}</div>
                            <div className="results__item__votes">{this.getVotes(entry)}</div>
                        </div>
                    )}
                    <div className="results__next">
                        <button ref="next" className="results__next__button" onClick={this.props.next}>
                            <div className="results__next__button__label">Next</div>
                        </button>
                    </div>
                </div>
            </div>;
    }
});

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
