import "ol/ol.css";
import { Map as OLMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useEffect, useRef } from "react";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerLayer = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = new OLMap({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([110.3042181, -7.7781158]),
          zoom: 17,
        }),
      });

      markerLayer.current = new VectorLayer({
        source: new VectorSource(),
      });
      mapInstance.current.addLayer(markerLayer.current);

      const marker = new Feature({
        geometry: new Point(fromLonLat([110.3042181, -7.7781158])),
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
          }),
        })
      );

      markerLayer.current.getSource().addFeature(marker);
    }
  }, []);

  return <div ref={mapRef} style={{ width: "600px", height: "300px" }} />;
};

export default MapComponent;