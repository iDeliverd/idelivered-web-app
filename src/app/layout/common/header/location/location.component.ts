import { Router } from '@angular/router';
import { ApiUrl } from './../../../../core/apiUrl';
import { UtilityService } from './../../../../services/utility/utility.service';
import { HttpService } from './../../../../services/http/http.service';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { StyleConstants } from './../../../../core/theme/styleConstants.model';
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './../../../../services/user/user.service';
import { LocationService } from '../../../../services/location/location.service';
import { MessagingService } from '../../../../services/messaging/messaging.service';
import { GlobalVariable } from './../../../../../app/core/global';
import { AppSettings } from '../../../../shared/models/appSettings.model';

import { FormControl } from '@angular/forms';
import { W3WSettings, What3wordsService } from 'src/app/services/what3words/what3words.service';
import { TranslateService } from '@ngx-translate/core';
declare const google: any;

declare var what3words: any;
var mapGrid;
var squareGrid;
var data_layer_1;
var data_layer_2;
var infowindow;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() settings: AppSettings;
  isMobile: boolean = GlobalVariable.IS_MOBILE;

  primaryButton: StyleConstants;
  primaryInverse: StyleConstants;
  style: StyleVariables;
  styleSubscription: Subscription;
  userSubscription: Subscription;
  settingLoadSubscription: Subscription;
  routerSubscription: Subscription;

  pincode: string = '';
  selectedLocation: string = 'Choose Your Location!';
  placeSearch: string = '';
  zoom: number = 4;

  location: any = {};
  initLocation: any = {};
  allParams: any = {};
  map: any = {};
  marker: any = {};
  locationToggle: boolean = false;
  site_name: string = GlobalVariable.SITE_NAME.toUpperCase();
  client_code: string = GlobalVariable.UNIQUE_ID;
  userDetails: any;
  isLoading: boolean = false;

  searchText = new FormControl();

  square: any;
  wordSearch: string = '';
  foundWords: any[] = [];
  searchSubscription: Subscription
  isSuggest: boolean = false;
  styleSettings: W3WSettings = {
    rounded: true,
    width: "100%",
    visible: false
  }
  lat: number;
  lng: number;
  arbaicButtonDone:boolean = false;

  constructor(
    private http: HttpService,
    private util: UtilityService,
    private user: UserService,
    private locationService: LocationService,
    private messageService: MessagingService,
    private w3wService: What3wordsService,
    private router: Router,
  ) {

    this.primaryButton = new StyleConstants();
    this.primaryInverse = new StyleConstants();
    this.style = new StyleVariables();

    this.initLocation = {
      lat: '',
      lng: '',
    };

    this.location = {
      lat: '',
      lng: ''
    };
  }

  ngOnInit() {
    this.styleSubscription = this.util.getStyles
      .subscribe((style: StyleVariables) => {
        this.style = style;
        this.primaryButton.color = '#ffffff';
        this.primaryButton.backgroundColor = style.primaryColor;
        this.primaryInverse.backgroundColor = '#ffffff';
        this.primaryInverse.borderColor = style.primaryColor;
        this.primaryInverse.color = style.primaryColor;
      });

    this.routerSubscription = this.router.events.subscribe((val) => {
      if (val) {
        this.locationToggle = false;
        if (this.marker.position) {
          this.resetMarker();
        }
      }
    });

    this.util.locationToggle.subscribe(toggle => {
      if (toggle) {
        this.locationToggle = toggle;
      }
    });

    // Load what3words script
    if (this.settings.enable_what3words_map == 1) {
      this.w3wService.loadWhat3WordsScript();
    }
    setTimeout(() => {
      this.util.getUserLocation.subscribe((res) => {
        this.placeSearch = this.util.handler.address;
        // this.selectedLocation = this.util.handler.address;
        if (this.settings.enable_what3words_map == 1) {
          setTimeout(() => {
            console.log('Address', res);
            if (!!res) {
              if (!!res.isDefault) {
                this.w3wService.loadScriptFromService().then((e) => {
                  console.log(e);
                  this.w3wService.convertTo3Words(res.latitude, res.longitude).then((data) => {
                    console.log(res, data);
                    // this.util.setUserLocation({ ...res, "three_words": data.words });
                    this.selectedLocation = data.words;
                  }).catch((e) => {
                    console.log(e);
                  })
                }).catch(e => console.log(e))

              } else {
                this.selectedLocation = res.three_words
              }
            }
          }, 100);
          // this.selectedLocation = res.words;

        } else {
          this.selectedLocation = this.util.handler.address ? this.util.handler.address : 'Choose Your Location!'
        }
      })
    }, 1000)
  
    if(this.util.getLocalData('langData')){
    const arName = JSON.parse(this.util.getLocalData('langData')).language_code
       if (arName == 'ar'){
        this.arbaicButtonDone=true;
       }
      }

  }

  ngAfterViewInit(): void {
    this.settingLoadSubscription = this.util.settingsLoaded.subscribe(loaded => {
      if (loaded && this.settings) {
        setTimeout(() => {
          this.initialize();
        }, 1000);
        this.userSubscription = this.user.currentUser.subscribe(user => {
          this.userDetails = user;
          if (!!user && user['access_token'] && this.settings.app_type != 8) {
            this.getUserAddress();
            if (this.settings.enable_zone_geofence) {
              setTimeout(() => {
                this.getSupplierZones();
              }, 1000);
            }
          }
        });
        if (this.settings.enable_zone_geofence) {
          setTimeout(() => {
            this.getSupplierZones();
          }, 1000);
        }
      }
    });
  }



  getSupplierZones() {
    let obj = {
      latitude: this.util.handler.latitude,
      longitude: this.util.handler.longitude
    }
    this.http.getData(ApiUrl.getSupplierZones, obj, true)
      .subscribe(response => {
        if (!!response && response.data) {
          this.util.setZoneGeofence(response.data);
        }
      });
  }




  getUserAddress() {
    let obj = {
      accessToken: this.user.getUserToken,
      languageId: this.util.handler.languageId,
      latitude: this.util.handler.latitude,
      longitude: this.util.handler.longitude
    }
    this.http.postData(ApiUrl.address.getAddress, obj, true)
      .subscribe(response => {
        if (!!response && response.data) {
          if (response.data.address.length) {
            let address = {} as any;
            var obj = {
              address: this.util.handler.address,
              latitude: this.util.handler.latitude,
              longitude: this.util.handler.longitude
            }
            if (this.settings.enable_zone_geofence) {
              address = obj;
            }
            else {
              address = response.data.address.find((a) => a.is_default === 1) || obj;
            }

            this.locationService.getGeoLocation(address.latitude, address.longitude).subscribe((address) => {
              this.util.getUserLocation.subscribe(userloc => {
                if (userloc.from_map == true) {
                  return;
                }


              })

              if (this.settings.enable_what3words_map == 1) {
                this.w3wService.convertTo3Words(this.util.handler.latitude, this.util.handler.longitude).then((res) => {
                  let new_address = { ...address };
                  new_address.latitude = this.util.handler.latitude;
                  new_address.longitude = this.util.handler.longitude
                  this.util.setUserLocation({ ...new_address, "three_words": res.words });
                })
              } else {
                this.util.setUserLocation(address);
              }

            }, (err) => {
              // this.messageService.alert('error', err.message);
            });
          }
        }
      });
  }


  initialize() {
    const self = this;
    var latlng = new google.maps.LatLng(this.util.handler.latitude, this.util.handler.longitude);
    var myOptions = {
      zoom: 12,
      center: latlng,
      streetViewControl: false,
      disableDefaultUI: false,
      mapTypeControl: false
    };

    if (!document.getElementById("mapLocation")) return;
    if (this.settings.enable_what3words_map == 1) {
      var icon = {
        url: "assets/images/IC.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(30, 30) // anchor
      };
    }

    self.map = new google.maps.Map(document.getElementById("mapLocation"), myOptions);
    self.marker = new google.maps.Marker({
      position: latlng,
      map: self.map,
      draggable: true,
      icon: this.settings.enable_what3words_map == 1 ? icon : undefined
    });

    self.addYourLocationButton(self.map, self.marker);
    self.map.setZoom(22);
    infowindow = new google.maps.InfoWindow();
    data_layer_1 = new google.maps.Data({ map: self.map });
    data_layer_2 = new google.maps.Data({ map: self.map });

    // this.locationService.getGeoLocation(this.util.handler.latitude, this.util.handler.longitude).subscribe((address) => {
    //   this.util.setUserLocation(address);
    // }, (err) => {
    //   // this.messageService.alert('error', err.message);
    // });

    // google.maps.event.addListener(self.marker, 'dragend', function (event) {
    //   self.markerDragEnd(event);
    // });

    // google.maps.event.addListener(self.map, 'click', function (event) {
    //   self.mapClicked(event);
    // });

    google.maps.event.addListener(self.marker, 'dragend', function (event) {
      self.isSuggest = false;
      self.markerDragEnd(event);
      self.location.lat = parseFloat(event.latLng.lat());
      self.location.lng = parseFloat(event.latLng.lng());
      var latte = event.latLng.lat();
      var longee = event.latLng.lng();
      const latlng = new google.maps.LatLng(latte, longee);
      self.map.setCenter(latlng);
      if (self.settings.enable_what3words_map == 1) {
        self.w3wService.convertTo3Words(latte, longee)
          .then(() => {
            const zoom = self.map.getZoom();
            if (zoom != 22) {
              self.map.setZoom(22);
            }
            // if (zoom > 22) {
            //   setTimeout(() => {
            //     self.createSquare(self.map);
            //   }, 500)
            // }
          })

      }

    });


    google.maps.event.addListener(self.map, 'click', function (event) {
      self.mapClicked(event);
      self.isSuggest = false;


      if (self.settings.enable_what3words_map == 1) {

        const zoom = self.map.getZoom();
        if (zoom != 24) {
          self.map.setZoom(24);
        }
        // if (zoom > 17) {
        //   setTimeout(() => {
        //     self.createSquare(self.map);
        //   }, 500)
        // }
      }



    });

    // Add the what3words grid to the Google Map data layer once the desired zoom level is meet
    google.maps.event.addListener(self.map, 'bounds_changed', function () {
      // self.createGrid(self);
    });
  }

  markerDragEnd(event: any) {
    this.location.lat = parseFloat(event.latLng.lat());
    this.location.lng = parseFloat(event.latLng.lng());
    this.locationService.getGeoLocation(this.location.lat, this.location.lng).subscribe((location) => {
      if (location) {
        this.placeSearch = location['address'];
      }
    });
  }

  mapClicked(event: any) {
    let self = this;
    this.location.lat = parseFloat(event.latLng.lat());
    this.location.lng = parseFloat(event.latLng.lng());
    var center = new google.maps.LatLng(this.location.lat, this.location.lng);
    self.marker.setPosition(center);
    self.map.panTo(center);
    this.locationService.getGeoLocation(this.location.lat, this.location.lng).subscribe((location) => {
      this.placeSearch = location.address;
    });

    if (self.settings.enable_what3words_map == 1) {
      var latte = event.latLng.lat();
      var longee = event.latLng.lng();
      this.w3wService.convertTo3Words(latte, longee)
        .then((response: any) => {
          console.log("[convertTo3wa]", response.words);
          this.square = response.square;
          this.searchText.patchValue(response.words);
          let what3wordsStyles = { ...this.styleSettings };
          what3wordsStyles.value = response.words;
          this.styleSettings = null;
          this.styleSettings = what3wordsStyles;
          console.log("styles----", this.styleSettings);
        }).catch(err => console.log(err));
    }
  }

  addressSearch(data) {
    let self = this;
    self.location.lat = data.lat;
    self.location.lng = data.lng;
    var center = new google.maps.LatLng(self.location.lat, self.location.lng);
    self.marker.setPosition(center);
    self.map.panTo(center);

    if (this.settings.enable_what3words_map == 1) {
      this.w3wService.convertTo3Words(data.lat, data.lng).then((response: any) => {
        this.square = response.square;
        this.searchText.patchValue(response.words);
        let styles = { ...this.styleSettings };
        styles.visible = false;
        styles.value = response.words;
        this.styleSettings = null;
        this.styleSettings = { ...styles }
        this.map.setZoom(22);
        this.isSuggest = false;
        // this.createSquare(self.map)
      }).catch(err => console.log(err));

    }
  }

  onDone() {
    if (!this.location || !this.location.lat || !this.location.lng) {
      this.locationToggle = !this.locationToggle
      return;
    }
    if (this.settings.app_type != 8) this.isLoading = true;
    this.locationService.getGeoLocation(this.location.lat, this.location.lng).subscribe((address) => {
      let myaddress = { ...address, 'from_map': true };
      if (this.settings.enable_what3words_map == 1) {
        this.util.setUserLocation({ ...address, 'three_words': this.searchText.value });
      } else {
        this.util.setUserLocation(address);

      }

      this.isLoading = false;
      setTimeout(() => {
        window.scrollTo(0, 10);
        window.scrollTo(0, 0);
      }, 100)
      this.locationToggle = false;
    }, (err) => {
      this.isLoading = false;
      this.messageService.alert('error', err.message);
      this.locationToggle = !this.locationToggle
    });
    if (this.settings.enable_zone_geofence) {
      setTimeout(() => {
        this.getSupplierZones();
      }, 1000);
    }
  }

  onClickedOutside() {
    this.resetMarker();
    this.locationToggle = false;
  }

  resetMarker() {
    var center = new google.maps.LatLng(this.util.handler.latitude, this.util.handler.longitude);
    this.marker.setPosition(center);
    this.map.panTo(center);
  }

  addYourLocationButton(map, marker) {
    var controlDiv: any = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0 0';
    secondChild.style.backgroundRepeat = 'no-repeat';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'center_changed', function () {
      secondChild.style['background-position'] = '0 0';
    });

    firstChild.addEventListener('click', () => {
      const self = this;
      var imgX = '0',
        animationInterval = setInterval(function () {
          imgX = imgX === '-18' ? '0' : '-18';
          secondChild.style['background-position'] = imgX + 'px 0';
        }, 500);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(latlng);
          self.marker.setPosition(latlng);
          self.map.panTo(latlng);
          clearInterval(animationInterval);
          secondChild.style['background-position'] = '-144px 0';
          self.location.lat = position.coords.latitude;
          self.location.lng = position.coords.longitude;
          self.locationService.getGeoLocation(self.location.lat, self.location.lng).subscribe((location) => {
            self.placeSearch = location.address;
          });
        });
      } else {
        clearInterval(animationInterval);
        secondChild.style['background-position'] = '0 0';
      }
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }


  setBackgroundColor() {
    var color = "";
    if (this.settings.is_custom_category_template === '1') {
      return color = "#0c2d1c";
    }
    else {
      return color = this.style.topHeaderBackgroundColor || this.style.headerBackgroundColor;
    }
  }
  setTextColor() {
    var color = "";
    if (this.settings.is_custom_category_template === '1') {
      return color = "#fff";
    }
    else {
      return color = this.style.topHeaderTextColor || this.style.headerTextColor
    }
  }


  createSquare(map) {
    console.log(['square'], this.square);
    if (this.square != undefined) {
      // Call the what3words Grid API to obtain the grid squares within the current visble bounding box
      what3words.api
        .gridSectionGeoJson({
          southwest: {
            lat: this.square.southwest.lat, lng: this.square.southwest.lng
          },
          northeast: {
            lat: this.square.northeast.lat, lng: this.square.northeast.lng
          }
        }).then(function (data) {
          console.log(['geodata'], data.features[0].geometry.coordinates);
          if (squareGrid !== undefined) {
            data_layer_2.forEach(feature => {
              data_layer_2.remove(feature);
            });
          }
          setTimeout(() => {
            squareGrid = data_layer_2.addGeoJson(data);

          }, 500)
        }).catch(console.error);


      data_layer_2.setStyle({
        visible: true,
        strokeColor: 'black',
        strokeWeight: 2,
        clickable: false
      });

      setTimeout(() => {
        let content = "<p style='color:black'>" + this.searchText.value + "</p>";
        infowindow.setContent(content);
        infowindow.open(this.map, this.marker);
      }, 1000)


    }
  }

  locateWord(word: string) {
    this.searchText.patchValue(word);
    // this.foundWords = [];
    this.isSuggest = false;
    this.w3wService.convertToCoordinates(word).then((response) => {
      console.log("[convertToCoordinates]", response);
      let lat = response.coordinates.lat;
      let lng = response.coordinates.lng;
      const latlng = new google.maps.LatLng(lat, lng);

      this.map.setCenter(latlng)
      this.marker.setPosition(latlng);
      this.location.lat = lat;
      this.location.lng = lng;
      this.locationService.getGeoLocation(lat, lng).subscribe(res => {
        this.placeSearch = res.address;
      })


      this.w3wService.convertTo3Words(lat, lng).then((response) => {
        console.log("[convertTo3wa]", response.words);
        this.square = response.square;
        this.searchText.patchValue(response.words);
        this.selectedLocation = response.words;
        this.map.setZoom(22);
        // this.createSquare(this.map);
      }).catch(err => console.log(err));
    });
    setTimeout(() => {
      this.locationToggle = true
    }, 200);
  }



  createGrid(self) {
    const zoom = self.map.getZoom();
    const loadFeatures = zoom > 17;
    console.log(loadFeatures);
    if (self.settings.enable_what3words_map == 1) {
      if (loadFeatures) { // Zoom level is high enough
        var ne = self.map.getBounds().getNorthEast();
        var sw = self.map.getBounds().getSouthWest();
        // Call the what3words Grid API to obtain the grid squares within the current visble bounding box
        what3words.api
          .gridSectionGeoJson({
            southwest: {
              lat: sw.lat(), lng: sw.lng()
            },
            northeast: {
              lat: ne.lat(), lng: ne.lng()
            }
          }).then(function (data) {
            if (mapGrid !== undefined) {
              for (var i = 0; i < mapGrid.length; i++) {
                data_layer_1.remove(mapGrid[i]);
              }
            }
            mapGrid = data_layer_1.addGeoJson(data);
          }).catch(console.error);


        // Set the grid display style


        data_layer_1.setStyle({
          visible: true,
          strokeColor: '#777',
          strokeWeight: 0.5,
          clickable: true
        });

      }
    }
  }

  ngOnDestroy() {
    if (!!this.styleSubscription) this.styleSubscription.unsubscribe();
    if (!!this.settingLoadSubscription) this.settingLoadSubscription.unsubscribe();
    if (!!this.userSubscription) this.userSubscription.unsubscribe();
    if (!!this.routerSubscription) this.routerSubscription.unsubscribe();
  }

}
