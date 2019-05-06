// Third party imports
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/fontawesome-free-solid'

// Local imports
import { makeApiRequest } from '../utils/apiRequest.util'
import { errorLogger } from '../utils/logger'
import StationDetail from './stations'
import MapComponent from './map'
const lineDetailUrl = 'https://api.tfl.gov.uk/line'

class LineDetail extends Component {
    constructor(props) {
        super(props)
        this.state = { loaded: false, responseData: [] }
    }

    componentDidMount() {
        const lineId = this.props.match.params.lineId
        makeApiRequest(`${lineDetailUrl}/${lineId}/route/sequence/outbound`)
            .then(response => {
                this.setState({ loaded: true, responseData: response.data })
            })
            .catch(error => {
                errorLogger('Error getting line', error)
            })
    }

    render() {
        return (
            <div className="main-content branches">
                {this.state.loaded ?
                    <div className="row">
                        <div className="col-md-5 branches-list">
                            <h3 className="white-text content-header">{this.state.responseData.lineName} Stations</h3>
                            <Link to={'/'} className="white-text go-back">
                                <FontAwesomeIcon icon={Icons.faAngleDoubleLeft} /> Go Back
                        </Link>
                            <ul>
                                {this.state.responseData.stations.map(station => {
                                    return (
                                        <li key={station.id}>
                                            <Link to={`/stations/${station.id}`} className="hvr-icon-forward">
                                                {station.name} <FontAwesomeIcon icon={Icons.faAngleDoubleRight} className="hvr-icon" />
                                            </Link>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col-md-7">
                            <MapComponent
                                multiLineString={this.state.responseData.lineStrings}
                                stopPointSequences={this.state.responseData.stopPointSequences}
                            />
                        </div>
                        <br /><br />
                    </div>
                    :
                    <div className="centre">
                        <br /><br />
                        <h4 className="white-text">Loading</h4>
                    </div>
                }
                <Route path={`/stations/:stationId`} component={StationDetail} />
            </div>
        );
    }
}

export default LineDetail;
