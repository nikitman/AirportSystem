import L, { LatLngTuple } from "leaflet";
// @ts-ignore
import arc from "arc";

export function latLngToXY(latLng: LatLngTuple) {
    return {
        x: latLng[1],
        y: latLng[0]
    }
}

export function createLatLngs(line: any, from: LatLngTuple) {
    if (line.geometries[0] && line.geometries[0].coords[0]) {
        let wrap = from[1] - line.geometries[0].coords[0][0] - 360;

        return line.geometries
            .map((subLine: any) => {
                wrap += 360;
                return subLine.coords.map((point: any) => L.latLng([point[1], point[0] + wrap]));
            })
            .reduce((all: any, latlngs: any) => all.concat(latlngs));
    } else {
        return [];
    }
}

export function getCurvedLine(from: LatLngTuple, to: LatLngTuple): LatLngTuple[] {
    const generator = new arc.GreatCircle(latLngToXY(from), latLngToXY(to));
    const arcLine = generator.Arc(100, { offset: 10 });
    const coords = createLatLngs(arcLine, from);
    return coords;
}