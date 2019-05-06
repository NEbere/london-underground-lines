/**
 * getFeaturesFromStopPoints: Get an array of features from stop points
 * @param { Array } stopPoints Array of stop points
 * @returns { Array } An array of features with properties
 */
export const getFeaturesFromStopPoints = stopPoints => {
    const features = stopPoints.map(stopPoint => {
        let feature
        if(stopPoint.lat && stopPoint.lon) {
            feature = {
                "type": "Feature",
                "properties": {"name": stopPoint.name},
                "geometry": {
                    "type": "Point",
                    "coordinates": [stopPoint.lat, stopPoint.lon]
                }
            }
        }
        return feature
        
    })
    return features
}

/**
 * getFeatureCollection: Returns a feature collection object
 * @param { Array } features : An array of features
 * @returns { Object } Returns a featureCollection object
 */
export const getFeatureCollection = (features) => {
    return  {
        "type": "FeatureCollection",
        "features": features
    }
}

/** getFeature: Get a feature object with type and properties
 * @param { Object } feature: feature object
 * @returns { object } feature object with type and properties
 */
export const getFeature = (feature) => {
    return  {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "MultiLineString",
            "coordinates": feature
        }
    }
}

// Constants
export const lineStringStyle = {
    color: 'black',
    width: 4
}

export const geojsonMarkerOptions = {
    radius: 5,
    fillColor: "red",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

export const mapTiles = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
export const mapAttributes = 'Map tiles by <a href="http://osm.com">OSM</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
export const mapCenter = [51.522883, -0.15713]
export const zoomLevel = 11