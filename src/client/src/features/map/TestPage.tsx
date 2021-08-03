import { Component } from 'react';
import { MapControl } from './MapControl';
import { Line } from './Line';

export class TestPage extends Component {
    render() {
        return (
            <MapControl>
                <Line positions={[[40.70567211744473, -74.00600000000001], [0.2519445389241768, 105.71137499999998]]} pathOptions={{ stroke: true }} />
            </MapControl>
        );
    }
}