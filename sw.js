// Gra ładuje się z internetu, gdy jest dostępny (więc poprawki docierają same),
// a bez internetu działa z zapisanej kopii.
// Po zmianie flag lub ikon podbij VERSION, żeby telefon pobrał je od nowa.
const VERSION = "v1";
const CACHE = "flagi-" + VERSION;
const CORE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
const FLAGS = [  "flags/pl.svg",   "flags/de.svg",   "flags/fr.svg",   "flags/it.svg",   "flags/es.svg",   "flags/pt.svg",   "flags/gb.svg",   "flags/ie.svg",   "flags/nl.svg",   "flags/be.svg",   "flags/lu.svg",   "flags/ch.svg",   "flags/at.svg",   "flags/cz.svg",   "flags/sk.svg",   "flags/hu.svg",   "flags/ua.svg",   "flags/by.svg",   "flags/lt.svg",   "flags/lv.svg",   "flags/ee.svg",   "flags/fi.svg",   "flags/se.svg",   "flags/no.svg",   "flags/dk.svg",   "flags/is.svg",   "flags/ru.svg",   "flags/ro.svg",   "flags/md.svg",   "flags/bg.svg",   "flags/gr.svg",   "flags/hr.svg",   "flags/si.svg",   "flags/rs.svg",   "flags/ba.svg",   "flags/me.svg",   "flags/al.svg",   "flags/mk.svg",   "flags/mt.svg",   "flags/cy.svg",   "flags/tr.svg",   "flags/va.svg",   "flags/mc.svg",   "flags/sm.svg",   "flags/li.svg",   "flags/cn.svg",   "flags/jp.svg",   "flags/kr.svg",   "flags/kp.svg",   "flags/in.svg",   "flags/pk.svg",   "flags/id.svg",   "flags/th.svg",   "flags/vn.svg",   "flags/ph.svg",   "flags/my.svg",   "flags/sg.svg",   "flags/mn.svg",   "flags/kz.svg",   "flags/ge.svg",   "flags/am.svg",   "flags/az.svg",   "flags/ir.svg",   "flags/iq.svg",   "flags/sa.svg",   "flags/ae.svg",   "flags/qa.svg",   "flags/jo.svg",   "flags/lb.svg",   "flags/np.svg",   "flags/bd.svg",   "flags/eg.svg",   "flags/ma.svg",   "flags/dz.svg",   "flags/tn.svg",   "flags/ng.svg",   "flags/ke.svg",   "flags/et.svg",   "flags/za.svg",   "flags/gh.svg",   "flags/sn.svg",   "flags/tz.svg",   "flags/cm.svg",   "flags/mg.svg",   "flags/ao.svg",   "flags/us.svg",   "flags/ca.svg",   "flags/mx.svg",   "flags/cu.svg",   "flags/jm.svg",   "flags/br.svg",   "flags/ar.svg",   "flags/cl.svg",   "flags/pe.svg",   "flags/co.svg",   "flags/ve.svg",   "flags/uy.svg",   "flags/py.svg",   "flags/ec.svg",   "flags/au.svg",   "flags/nz.svg",   "flags/fj.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...CORE, ...FLAGS])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("flagi-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Strona gry: najpierw internet, potem kopia.
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put("index.html", copy));
      return res;
    }).catch(() => caches.match("index.html")));
    return;
  }

  // Flagi, ikony i czcionki: najpierw kopia, potem internet (i zapis na później).
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  })));
});
