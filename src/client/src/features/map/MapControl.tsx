import { LatLngExpression } from 'leaflet';
import { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LineOptionsControl } from './LineOptionsControl';
import { defaultOptions, MapOptions, MapOptionsContext } from './MapOptionsContext';

interface Props {
    center?: LatLngExpression;
    zoom?: number;
    height?: number;
}

export class MapControl extends Component<Props, MapOptions> {
    static defaultProps: Props = {
        center: [0, 0],
        zoom: 1,
        height: 450
    }

    constructor(props: Props) {
        super(props);
        this.state = defaultOptions;
    }

    render() {
        const { center, zoom, height } = this.props;

        return (
            <MapOptionsContext.Provider value={this.state}>
                <MapContainer center={center} zoom={zoom} style={{ height: height }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.children}
                </MapContainer>
                <LineOptionsControl
                    dashed={this.state.line.dashed!}
                    curved={this.state.line.curved!}
                    directed={this.state.line.directed!}
                    handleChange={(dashed, curved, directed) => this.setState({ line: { dashed, curved, directed } })}
                />
            </MapOptionsContext.Provider>
        );
    }
}