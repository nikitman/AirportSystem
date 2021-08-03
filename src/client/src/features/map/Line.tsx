import { LatLngTuple, PathOptions } from 'leaflet';
import { Component } from 'react';
import { Polyline } from 'react-leaflet';
import { getCurvedLine } from './helpers';
import { InjectedContexts, withMapContexts } from './withMapContexts';
import { LineOptions } from './LineOptions';
import L from 'leaflet';
import "leaflet-polylinedecorator";

interface LineProps extends LineOptions, InjectedContexts {
    positions: [LatLngTuple, LatLngTuple];
    pathOptions?: PathOptions;
}

export const Line = withMapContexts(
    class Line extends Component<LineProps, { arrow: L.PolylineDecorator | null }> {
        constructor(props: LineProps) {
            super(props);

            this.state = {
                arrow: null
            }
        }

        get options() {
            return { ...this.props.mapOptions.line, ...this.props };
        }

        get positions() {
            return this.options.curved ? getCurvedLine(...this.props.positions) : this.props.positions;
        }

        handleArrow = () => {
            if (this.options.directed) {
                const patterns = [{
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 15,
                        polygon: false,
                        pathOptions: {
                            stroke: true,
                            weight: 2,
                            color: this.props.pathOptions?.color
                        }
                    })
                }];

                if (!this.state.arrow) {
                    const arrow = L.polylineDecorator(this.positions as any, { patterns });
                    this.setState({ arrow });
                    this.props.leafletContext.map.addLayer(arrow);
                } else {
                    this.state.arrow.setPaths(this.positions);
                    this.state.arrow.setPatterns(patterns);
                }
            } else if (this.state.arrow) {
                this.props.leafletContext.map.removeLayer(this.state.arrow);
                this.setState({ arrow: null });
            }
        }

        componentDidMount() {
            this.handleArrow();
        }

        componentDidUpdate() {
            this.handleArrow();
        }

        componentWillUnmount() {
            if (this.state.arrow) {
                this.props.leafletContext.map.removeLayer(this.state.arrow);
            }
        }

        render() {
            const dashArray = this.options.dashed
                ? (this.props.pathOptions?.dashArray || [5, 5])
                : undefined;

            return (
                <Polyline
                    positions={this.positions}
                    pathOptions={{ ...this.props.pathOptions, dashArray }}
                />
            );
        }
    });