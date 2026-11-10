import { useState } from "react";
   import "./index.css";

/* ---------- DATA (yahan se sab kuch change hoga) ---------- */
const SITE = {
  name: "Shahi Darbar",
  tagline: "Royal flavors · Timeless heritage",
  phone: "+92 300 0228786",
  phoneLink: "+923000228786",
  closes: "1:30 AM",
  city: "Multan, Pakistan",
  rating: "4.1",
  guests: "730+",
  address: ["Khanewal Rd, near Food Festival,", "opposite Shell Pump, Ahmad Park", "Wapda Colony, Multan 60000"],
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Shahi+Darbar+Ahmad+Park+Wapda+Colony+Multan",
  foodpanda: "https://www.foodpanda.pk/",
  website: "https://shahidarbar.co",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
};

/* Free images (Unsplash). Kisi ko badalna ho to sirf URL replace karo. */
const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  hero: U("photo-1555939594-58d7cb561ad1", 1800),
  story: U("photo-1589302168068-964664d93dc0", 1000),
  kabab: U("photo-1529042410759-befb1204b468"),
  ribs: U("photo-1544025162-d76694265947"),
  sajji: U("photo-1633945274405-b6c8069047b0"),
  handi: U("photo-1631452180519-c014fe946bc7"),
  rice: U("photo-1596797038530-2c107229654b"),
  dessert: U("photo-1601303516534-bf4e1bbd6b35"),
};

const MENU = [
  { id: 1, cat: "Signature", name: "Mutton Arabic Kabab", desc: "Charcoal-grilled mutton, fragrant herbs, and a royal house marinade.", price: 1650, img: IMG.kabab, popular: true },
  { id: 2, cat: "Signature", name: "Shahi Special Ribs", desc: "Fall-apart tender ribs glazed with our signature spice reduction.", price: 1950, img: IMG.ribs, popular: true },
  { id: 3, cat: "Mutton", name: "Mutton Khadda Sajji", desc: "Slow-roasted Sajji with saffron rice and mint chutney.", price: 2400, img: IMG.sajji },
  { id: 4, cat: "Handi", name: "Chicken Handi", desc: "Creamy handi, hand-ground spices, and a warm tandoor finish.", price: 1250, img: IMG.handi },
  { id: 5, cat: "Rice", name: "Mutton Kabuli Pulao", desc: "Long-grain rice with tender mutton, carrots, and raisins.", price: 950, img: IMG.rice, popular: true },
  { id: 6, cat: "Dessert", name: "Gulab Jamun", desc: "Soft cardamom dumplings, rose syrup, and pistachio.", price: 450, img: IMG.dessert, popular: true },
];
const CATS = ["All", "Signature", "Mutton", "Handi", "Rice", "Dessert"];

const REVIEW = {
  text: "We ordered the Shahi Special Ribs, and it definitely lived up to expectations. The mutton was incredibly tender and cooked perfectly.",
  name: "Afaq Ahmed",
  meta: "Local Guide · Google review",
};

/* ---------- Small helpers ---------- */
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);
const I = {
  pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  bag: <><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  cal: <><rect x="4" y="5" width="16" height="15" rx="1" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  ext: <path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5" />,
  insta: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><circle cx="16.8" cy="7.2" r=".6" /></>,
  fb: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
};

/* Image jo load na ho to gradient fallback dikhaye */
function Img({ src, alt, className }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`img-fallback ${className || ""}`} role="img" aria-label={alt} />;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}

const money = (n) => `Rs. ${n.toLocaleString("en-PK")}`;

/* ---------- App ---------- */
export default function App() {
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState({});
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const items = cat === "All" ? MENU : MENU.filter((m) => m.cat === cat);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="wrap topbar-in">
          <span><i className="dot" /> Open today · Closes {SITE.closes}</span>
          <span className="tb-city"><Icon d={I.pin} size={14} /> {SITE.city}</span>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="wrap header-in">
          <a className="brand" href="#top">
            <span className="logo">SD</span>
            <span>
              <b>{SITE.name}</b>
              <small>{SITE.tagline}</small>
            </span>
          </a>
          <nav className="nav">
            <button onClick={() => go("menu")}>Menu</button>
            <button onClick={() => go("story")}>Our story</button>
            <button onClick={() => go("reviews")}>Reviews</button>
            <button onClick={() => go("visit")}>Visit us</button>
          </nav>
          <div className="header-r">
            <a className="hphone" href={`tel:${SITE.phoneLink}`}><Icon d={I.phone} /> {SITE.phone}</a>
            <button className="cart" onClick={() => go("menu")}>
              <Icon d={I.bag} /> Cart <span className="badge">{count}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="top">
        <Img className="hero-img" src={IMG.hero} alt="Grilled kababs and rice" />
        <div className="hero-shade" />
        <div className="wrap hero-in">
          <p className="eyebrow">A table worth gathering around</p>
          <h1>Where every <em>meal</em> becomes a memory.</h1>
          <p className="lead">Authentic Pakistani cuisine, cooked with the warmth of tradition and served with the grace of the royal table.</p>
          <div className="btns">
            <button className="btn gold" onClick={() => go("menu")}>Explore our menu <Icon d={I.arrow} /></button>
            <a className="btn ghost" href={`tel:${SITE.phoneLink}`}><Icon d={I.cal} /> Reserve a table</a>
          </div>
          <p className="rate"><span className="stars">★★★★★</span> <b>{SITE.rating}</b> from {SITE.guests} guests on Google</p>
        </div>
        <div className="seal"><span>Est.</span><b>SD</b><span>Multan · 2024</span></div>
      </section>

      {/* Story */}
      <section className="story" id="story">
        <div className="wrap story-in">
          <div className="story-img">
            <Img src={IMG.story} alt="Chicken biryani served in a black bowl" />
            <span className="cap">A feast for the senses</span>
          </div>
          <div>
            <p className="eyebrow dark">The Shahi Darbar experience</p>
            <h2>Food with a little <em>more soul.</em></h2>
            <p>From the first smoky bite of our Arabic Kabab to the last spoonful of warm Gulab Jamun, Shahi Darbar is a celebration of the flavors that bring us together.</p>
            <p>Our kitchen honors the recipes of generations while making room for the unexpected. Come as guests, leave as family.</p>
            <button className="link" onClick={() => go("menu")}>Discover the menu <Icon d={I.arrow} size={16} /></button>
            <p className="sign">Shahi Darbar <span>✦</span></p>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="menu" id="menu">
        <div className="wrap">
          <div className="menu-head">
            <div>
              <p className="eyebrow dark">From our kitchen</p>
              <h2>Made for the <em>occasion.</em></h2>
            </div>
            <p className="menu-note">A few favorites to begin your journey. Every dish is prepared fresh, with patience and pride.</p>
          </div>

          <div className="tabs" role="tablist">
            {CATS.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          <div className="grid">
            {items.map((m) => (
              <article className="card" key={m.id}>
                <div className="card-img">
                  <Img src={m.img} alt={m.name} />
                  {m.popular && <span className="tag">Popular</span>}
                </div>
                <div className="card-b">
                  <span className="cat">{m.cat}</span>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                  <div className="card-f">
                    <b>{money(m.price)}</b>
                    <button onClick={() => add(m.id)}>
                      Add to order <Icon d={I.plus} size={16} />
                      {cart[m.id] ? <span className="qty">{cart[m.id]}</span> : null}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="full">Want the full royal spread? <a href={SITE.foodpanda} target="_blank" rel="noreferrer">View full menu <Icon d={I.ext} size={15} /></a></p>
        </div>
      </section>

      {/* Review */}
      <section className="review" id="reviews">
        <div className="quote-mark">“</div>
        <blockquote>{REVIEW.text}</blockquote>
        <div className="who">
          <span className="av">AA</span>
          <span><b>{REVIEW.name}</b><small>{REVIEW.meta}</small></span>
        </div>
      </section>

      {/* Visit */}
      <section className="visit" id="visit">
        <div className="wrap visit-in">
          <div>
            <p className="eyebrow dark">Come find us</p>
            <h2>Your table is waiting <em>in Multan.</em></h2>
            <div className="info">
              <Icon d={I.pin} size={20} />
              <div><h4>Visit us</h4>{SITE.address.map((l) => <p key={l}>{l}</p>)}</div>
            </div>
            <div className="info">
              <Icon d={I.clock} size={20} />
              <div><h4>Opening hours</h4><p>Open daily · Closes {SITE.closes}</p></div>
            </div>
            <div className="btns">
              <a className="btn dark" href={SITE.mapsLink} target="_blank" rel="noreferrer">Get directions <Icon d={I.arrow} /></a>
              <a className="btn outline" href={`tel:${SITE.phoneLink}`}><Icon d={I.phone} /> Call us</a>
            </div>
          </div>
          <a className="map" href={SITE.mapsLink} target="_blank" rel="noreferrer" aria-label="Open location in Google Maps">
            <span className="road r1" /><span className="road r2" /><span className="road r3" />
            <span className="pin" />
            <span className="map-label"><b>Shahi Darbar</b><small>Ahmad Park Wapda Colony</small></span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap foot-top">
          <a className="brand light" href="#top"><span className="logo">SD</span><b>{SITE.name}</b></a>
          <p className="foot-tag">Royal flavors, timeless heritage.</p>
          <div className="foot-links">
            <a href={SITE.foodpanda} target="_blank" rel="noreferrer">Order on Foodpanda <Icon d={I.ext} size={13} /></a>
            <a href={SITE.website} target="_blank" rel="noreferrer">Visit shahidarbar.co <Icon d={I.ext} size={13} /></a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon d={I.insta} /></a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Icon d={I.fb} /></a>
          </div>
        </div>
        <div className="wrap foot-bot">© 2024 Shahi Darbar Restaurant · Multan, Pakistan</div>
      </footer>

      {/* Sticky bottom bar */}
      <div className="sticky">
        <button className="s-dark" onClick={() => go("menu")}><Icon d={I.bag} /> Start an order</button>
        <a className="s-gold" href={`tel:${SITE.phoneLink}`}>Reserve a table <Icon d={I.arrow} /></a>
      </div>
    </>
  );
}
