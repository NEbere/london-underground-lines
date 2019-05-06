// Third party import
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/fontawesome-free-solid'
import { groupBy } from 'lodash'

// Local import
import { makeApiRequest } from '../utils/apiRequest.util'
import { errorLogger } from '../utils/logger'
const stopPointURL = 'https://api.tfl.gov.uk/StopPoint'

class StationDetail extends Component {
    constructor(props) {
        super(props)
        this.state = { loaded: false, responseData: [], stationName: '' }
        this.goBack = this.goBack.bind(this)
    }
    goBack() {
        this.props.history.goBack()
    }
    componentDidMount() {
        const stationId = this.props.match.params.stationId
        makeApiRequest(`${stopPointURL}/${stationId}/arrivals`)
            .then(response => {
                const platformGroups = groupBy(response.data, 'platformName')
                for (let index in platformGroups) {
                    platformGroups[index].splice(3)
                }
                if (response.data.length !== 0) {
                    this.setState({
                        loaded: true,
                        responseData: platformGroups,
                        stationName: response.data[0].stationName
                    })
                } else {
                    this.setState({
                        loaded: true,
                        responseData: [],
                        stationName: 'No data for selected station'
                    })
                }
                
            })
            .catch(error => {
                errorLogger('Error getting line branches and stops', error)
            })

    }

    render() {
        return (
            <div className="main-content">
                {this.state.loaded ?
                    <div className="platforms">
                        <h3 className="white-text content-header">{this.state.stationName}</h3>
                        <button onClick={this.goBack} className="white-text go-back">
                            <FontAwesomeIcon icon={Icons.faAngleDoubleLeft} /> Go Back
                        </button>
                            <div className="row">
                            <ul className="platforms-list">
                                {Object.keys(this.state.responseData).map((key, index) => {
                                    return (
                                        <div key={key + index}>
                                            <p key={key} className="lineName">{key}</p>
                                            {
                                                this.state.responseData[key].map((station, index) => {
                                                    return (
                                                        <li key={station.id} className="white-text">
                                                            <p className="statusName">{station.towards}</p>
                                                            <p className="depart-detail">
                                                                <span>
                                                                    <FontAwesomeIcon icon={Icons.faMapMarkerAlt} /> Current Location:
                                                            </span> {station.currentLocation}
                                                            </p>
                                                            <p className="depart-detail">
                                                                <span>
                                                                    <FontAwesomeIcon icon={Icons.faMapMarkerAlt} /> Destination:
                                                            </span> {station.destinationName}</p>
                                                            <p className="depart-detail">
                                                                <span>
                                                                    <FontAwesomeIcon icon={Icons.faClock} /> Time to station:
                                                            </span> {station.timeToStation} minutes
                                                        </p>
                                                            <p className="depart-detail">
                                                                <span>
                                                                    <FontAwesomeIcon icon={Icons.faCompass} /> Direction:
                                                            </span> {station.direction}
                                                            </p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                        <br /><br />
                    </div>
                    :
                    <div className="centre">
                        <br /><br />
                        <h4 className="white-text">Loading</h4>
                    </div>
                }
            </div>
        )
    }
}

export default StationDetail
