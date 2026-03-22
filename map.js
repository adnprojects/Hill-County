const mapElement = document.getElementById("map")

if (mapElement) {
mapElement.innerHTML = `
<div class="map-panel">
<div>
<p class="eyebrow">Location snapshot</p>
<h3>Pragna Hill County, Yadadri corridor</h3>
</div>
<p>This page avoids a fragile API-based embed and instead shows the decision-critical location story directly on the page.</p>
<ul>
<li>Quick access to NH163</li>
<li>Regional Ring Road influence</li>
<li>Reach toward Yadadri Temple and Bibinagar growth zones</li>
</ul>
<a class="btn btn-primary" href="https://maps.google.com/?q=17.513,78.885" target="_blank" rel="noopener">Launch Google Maps</a>
</div>
`
}
