import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core'
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() lat: number = 0
  @Input() lon: number = 0
  @Input() zoom: number = 0
  @Input() width: string = ''
  @Input() height: string = ''
  private mapEl: any = ''
  private map: any
  private icon = new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
  })
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#map')
    this.setSize()
  }
  ngAfterViewInit(): void {
    this.initMap()
  }

  private initMap(): void {
    const parcThabor = {
      lat: this.lat,
      lng: this.lon,
    }
    this.map = L.map(this.mapEl, {
      center: [this.lat, this.lon],
      zoom: 13,
    })
    var lat: number = 24.2

    this.map.addLayer(
      L.polyline(
        [
          [lat, -15],
          [lat, -11.2],
          [lat - 1.6, -11.2],
          [lat - 1.6, -15],
          [lat, -15],
        ],
        { color: 'red', fill: true, fillOpacity: 1 },
      ).addTo(this.map),
    )

    var latlngs: [number, number][] = [
      [22.7, -13.95],
      [24.107, -13.15],
      [22.7, -12.35],
      [23.603, -13.95],
      [23.603, -12.35],
      [22.7, -13.95],
    ]

    var polyline = L.polyline(latlngs, { color: 'green' }).addTo(this.map)
    this.map.addLayer(polyline)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)
    const descriptionWikipedia = `here the location`
    const popupOptions = {
      coords: parcThabor,
      text: descriptionWikipedia,
      open: true,
    }
    this.addMarker(popupOptions.coords, popupOptions.text, popupOptions.open)
  }
  addMarker(coords: any, text: any, open: any) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.icon })
    if (open) {
      marker.addTo(this.map)
    } else {
      marker.addTo(this.map)
    }
  }
  private setSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style
      styles.height = this.height
      styles.width = this.width
    }
  }
}
