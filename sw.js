/* Service worker del Recetario: guarda la app para abrirla sin conexión.
   Solo toca sus propias cachés (prefijo "recetario-"), porque comparte dominio con el Diario de Lectura. */
var VERSION = "recetario-v2";
var SHELL = ["./", "index.html", "datos.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
var FONTS = "recetario-fonts";

self.addEventListener("install", function (ev) {
  ev.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (ev) {
  ev.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("recetario-") === 0 && k !== VERSION && k !== FONTS; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (ev) {
  var req = ev.request, url = new URL(req.url);
  if (req.method !== "GET") return;

  // Páginas: primero la red (para recibir actualizaciones); sin conexión, la copia guardada.
  if (req.mode === "navigate") {
    ev.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put("index.html", copy); });
      return res;
    }).catch(function () { return caches.open(VERSION).then(function (c) { return c.match("index.html"); }); }));
    return;
  }

  // Tipografías y librerías de Firebase: de la caché, y se refrescan en segundo plano.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" || (url.hostname === "www.gstatic.com" && url.pathname.indexOf("/firebasejs/") === 0)) {
    ev.respondWith(caches.open(FONTS).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }

  // Archivos de la app: red primero para recibir cambios, caché si no hay conexión.
  if (url.origin === location.origin) {
    ev.respondWith(fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return caches.open(VERSION).then(function (c) { return c.match(req); }); }));
  }
});
