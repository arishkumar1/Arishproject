mapboxgl.accessToken =mapToken 

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
    });

   
    
const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${listing.title},${listing.location}</h4><p>Exact location will be provided after booking </p>`))
        .addTo(map);    

// mapboxgl.accessToken = mapToken; // Add your Mapbox access token
// const coordinates = [77.2088, 28.6139]; // Define coordinates for the marker

// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   center: coordinates, // Starting position [lng, lat]
//   zoom: 9, // Starting zoom level
// });

// const marker = new mapboxgl.Marker({ color: "red" }) // Create marker
//   .setLngLat(coordinates) // Set marker position
//   .addTo(map); // Add marker to map