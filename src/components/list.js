// Third party imports
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/fontawesome-free-solid'

// Local imports
import { makeApiRequest } from '../utils/apiRequest.util'
import { errorLogger } from '../utils/logger'
import LineDetail from './line'
const statusURL = 'https://api.tfl.gov.uk/line/mode/tube/status'

class StatusList extends Component {
    constructor(props) {
        super(props)
        this.state = { loaded: false, responseData: [] }
    }

    componentDidMount() {
        makeApiRequest(statusURL)
            .then(response => {
                this.setState({ loaded: true, responseData: response.data })
            })
            .catch(error => {
                errorLogger('Error getting underground lines', error)
            })
    }

    render() {
        return (
            <div className="statusList main-content">
                {this.state.loaded ?
                    <div>
                        <h3 className="white-text content-header">All Lines - Status</h3>
                        <ul>
                            {this.state.responseData.map(line => {
                                return (
                                    <li key={line.id}>
                                        <p className="lineName">{line.name} </p>
                                        {line.lineStatuses.map((status, index) => {
                                            return (
                                                <p className="statusName" key={index}>
                                                    Service Status: <span>
                                                        {status.statusSeverityDescription}
                                                    </span>
                                                </p>)
                                        })}
                                        <Link to={`/lines/${line.id}`} className="hvr-icon-forward">
                                            View Line Stop Points <FontAwesomeIcon icon={Icons.faAngleDoubleRight} className="hvr-icon" />
                                        </Link>

                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    :
                    <div className="centre">
                        <br /><br />
                        <h4 className="white-text">Loading</h4>
                    </div>
                }
                <Route path={`/lines/:lineId`} component={LineDetail} />
            </div>
        )
    }
}

export default StatusList
