import { Polyline, PolylineProps, useMap } from "react-leaflet";
import L, { Polyline as RawPolyline } from "leaflet";
import "leaflet-polylinedecorator";
import { useEffect } from "react";
import { useRef } from "react";

interface Props extends PolylineProps {
    patterns: L.Pattern[];
}

// export class PolylineDecorator2 extends React.Component<Props, { element: L.PolylineDecorator | null }> {
//     private polyRef = createRef<RawPolyline>();
//     private element: L.PolylineDecorator | null = null;

//     constructor(props: Props) {
//         super(props);

//         this.state = {
//             element: null
//         };
//     }

//     componentDidMount() {
//         const polyline = this.polyRef.current;

//         if (polyline) {
//             this.element = L.polylineDecorator(polyline, { patterns: this.props.patterns });
//             this.element.addTo(this.props.map);
//             //this.setState({ element: L.polylineDecorator(polyline, { patterns: this.props.patterns }) });
//             //this.state.element!.addTo(this.props.map);
//         }
//     }

//     componentDidUpdate() {
//         if (this.element !== null) {
//             console.log(this.props);
//             const newElement = L.polylineDecorator(this.polyRef.current!, { patterns: this.props.patterns });
//             this.element.removeFrom(this.props.map);
//             this.element = newElement;
//             newElement.addTo(this.props.map);
//         }

//         // const element2 = L.polylineDecorator(this.polyRef.current!, { patterns: this.props.patterns });
//         // element2.addTo(this.props.map);
//     }

//     render() {
//         return (
//             <Polyline ref={this.polyRef} {...this.props} />
//         )
//     }
// }

export function PolylineDecorator({ patterns, ...rest }: Props) {
    const map = useMap();
    const polyRef = useRef<RawPolyline>(null);

    useEffect(() => {
        const polyline = polyRef.current;

        if (polyline) {
            const element = L.polylineDecorator(polyline, { patterns });
            element.addTo(map);

            return () => {
                element.removeFrom(map);
            };
        }
    }, [map, polyRef, patterns]);

    return (
        <Polyline ref={polyRef} {...rest} />
    );
}