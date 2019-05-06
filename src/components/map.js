// Third party imports
import React, { Component } from 'react'
import L from 'leaflet'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

// Local imports
import {
    mapTiles,
    mapAttributes,
    mapCenter,
    zoomLevel,
    getFeaturesFromStopPoints,
    lineStringStyle,
    geojsonMarkerOptions,
    getFeatureCollection,
    getFeature
} from '../utils/mapUtil'

class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { features: [] }
    }

    componentDidMount() {
        const stopPoints = this.props.stopPointSequences[0].stopPoint
        const features = getFeaturesFromStopPoints(stopPoints)
        const linestringArray = []
        this.props.multiLineString.forEach(lineSting => {
            linestringArray.push(JSON.parse(lineSting))
        })

        const multiLineString = [].concat(...linestringArray)
        const lineStringFeature = getFeature(multiLineString)
        features.push(lineStringFeature)

        const featureCollection = getFeatureCollection(features)
        this.setState({ features: featureCollection })
    }

    render() {
        return (
            <div>
                <div>
                    <Map
                        center={mapCenter}
                        zoom={zoomLevel}
                    >
                        <TileLayer
                            attribution={mapAttributes}
                            url={mapTiles}
                        />
                        <GeoJSON data={this.state.features}
                            width={lineStringStyle.width}
                            color={lineStringStyle.color}
                            pointToLayer={(feature, latlng) => {
                                if (feature.geometry.type === 'Point' && feature.properties.name) {
                                    return L.circleMarker(feature.geometry.coordinates, geojsonMarkerOptions)
                                        .bindPopup(`<div class="featurePopup">${feature.properties.name}</div>`)
                                }
                            }}
                        />
                    </Map>
                </div>
            </div>
        )
    }
}

export default MapComponent