import { useState } from 'react';
import Icon from '@/components/ui/icon';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  material: string;
  isNew?: boolean;
}

interface CartItem extends Product {
  qty: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const RINGS_IMG = 'https://cdn.poehali.dev/projects/09e42f5e-adf2-480a-b885-df5f7fb55ace/files/cba46756-cf43-41c5-909a-59e3cd57a0bb.jpg';
const EARRINGS_IMG = 'https://cdn.poehali.dev/projects/09e42f5e-adf2-480a-b885-df5f7fb55ace/files/2553f8c1-bb64-4a25-8ab8-371d9bf771d3.jpg';
const BRACELETS_IMG = 'https://cdn.poehali.dev/projects/09e42f5e-adf2-480a-b885-df5f7fb55ace/files/df0a2c6a-0d45-484e-b949-d31724527716.jpg';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Кольцо «Плетение»', price: 12800, category: 'rings', image: RINGS_IMG, material: 'Золото 585', isNew: true },
  { id: 2, name: 'Кольцо «Спираль»', price: 9600, category: 'rings', image: RINGS_IMG, material: 'Серебро 925' },
  { id: 3, name: 'Кольцо «Орнамент»', price: 15200, category: 'rings', image: RINGS_IMG, material: 'Золото 750' },
  { id: 4, name: 'Серьги «Каскад»', price: 8400, category: 'earrings', image: EARRINGS_IMG, material: 'Золото 585', isNew: true },
  { id: 5, name: 'Серьги «Луна»', price: 6200, category: 'earrings', image: EARRINGS_IMG, material: 'Серебро 925' },
  { id: 6, name: 'Браслет «Нить»', price: 11400, category: 'bracelets', image: BRACELETS_IMG, material: 'Золото 585' },
  { id: 7, name: 'Браслет «Витой»', price: 7800, category: 'bracelets', image: BRACELETS_IMG, material: 'Серебро 925', isNew: true },
  { id: 8, name: 'Кулон «Роса»', price: 5600, category: 'pendants', image: EARRINGS_IMG, material: 'Серебро 925' },
  { id: 9, name: 'Кулон «Звезда»', price: 9200, category: 'pendants', image: BRACELETS_IMG, material: 'Золото 585' },
];

const CATEGORIES = [
  { id: 'all',      label: 'Все изделия' },
  { id: 'rings',    label: 'Кольца' },
  { id: 'earrings', label: 'Серьги' },
  { id: 'bracelets',label: 'Браслеты' },
  { id: 'pendants', label: 'Кулоны' },
];

function fmt(n: number) {
  return n.toLocaleString('ru-RU') + ' ₽';
}

// ─── Copper Wire SVG ─────────────────────────────────────────────────────────
function CopperWire() {
  return (
    <svg
      className="copper-wire-svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cw1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b87333" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4956a" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b5a2b" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="cw2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b87333" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#d4956a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b87333" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Large sweeping curves */}
      <path d="M-50,200 C200,80 400,320 700,180 S1100,50 1500,200" stroke="url(#cw1)" strokeWidth="1.5" fill="none" />
      <path d="M-50,220 C200,100 400,340 700,200 S1100,70 1500,220" stroke="url(#cw1)" strokeWidth="0.6" fill="none" />
      <path d="M1500,600 C1200,480 900,720 600,560 S200,380 -50,540" stroke="url(#cw2)" strokeWidth="1.5" fill="none" />
      <path d="M1500,620 C1200,500 900,740 600,580 S200,400 -50,560" stroke="url(#cw2)" strokeWidth="0.6" fill="none" />
      {/* Side tendrils */}
      <path d="M0,0 C60,150 20,300 80,450 S60,650 0,900" stroke="#b87333" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M1440,0 C1380,200 1420,400 1360,600 S1380,800 1440,900" stroke="#b87333" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Small curls */}
      <path d="M300,0 C320,40 360,60 340,100 S290,140 310,180" stroke="#d4956a" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M900,700 C930,660 980,680 960,720 S910,760 940,800" stroke="#d4956a" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M1100,100 C1140,150 1180,120 1160,170 S1110,210 1150,250" stroke="#b87333" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M200,750 C230,710 270,730 250,770 S200,810 230,850" stroke="#d4956a" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* Dots / knots */}
      <circle cx="700" cy="180" r="2.5" fill="#d4956a" opacity="0.6" />
      <circle cx="340" cy="100" r="2" fill="#b87333" opacity="0.5" />
      <circle cx="1160" cy="170" r="2" fill="#b87333" opacity="0.5" />
      <circle cx="600" cy="560" r="2.5" fill="#d4956a" opacity="0.6" />
    </svg>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <div className="jewelry-card animate-fade-in-up flex flex-col">
      <div className="product-img aspect-square relative">
        <img src={product.image} alt={product.name} />
        {product.isNew && (
          <span className="copper-badge absolute top-3 left-3 px-2 py-1 rounded-sm">Новинка</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--copper-light)', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '0.62rem' }}>
          {product.material}
        </p>
        <h3 className="text-lg leading-snug" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400, color: 'hsl(35 20% 88%)' }}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(184,115,51,0.15)' }}>
          <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: 'var(--copper-light)', fontWeight: 500 }}>
            {fmt(product.price)}
          </span>
          <button
            className="btn-copper px-4 py-2 rounded-sm"
            onClick={() => onAdd(product)}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Panel ───────────────────────────────────────────────────────────────
function CartPanel({
  items,
  onClose,
  onRemove,
  onQty,
  onOrder,
}: {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onQty: (id: number, d: number) => void;
  onOrder: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div className="backdrop fixed inset-0 z-40" onClick={onClose} />
      {/* Panel */}
      <div className="cart-panel fixed right-0 top-0 h-full w-full max-w-md z-50 animate-slide-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(184,115,51,0.2)' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.6rem', fontWeight: 400 }}>Корзина</h2>
            <p style={{ fontSize: '0.72rem', color: 'var(--copper)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
              {items.length} {items.length === 1 ? 'изделие' : items.length < 5 ? 'изделия' : 'изделий'}
            </p>
          </div>
          <button className="btn-outline-copper p-2 rounded-sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: 'rgba(212,149,106,0.4)' }}>
              <Icon name="ShoppingBag" size={40} />
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem' }}>Корзина пуста</p>
            </div>
          )}
          {items.map(item => (
            <div key={item.id} className="flex gap-3 p-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,115,51,0.12)' }}>
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', fontWeight: 400 }}>{item.name}</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--copper)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.material}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button className="btn-outline-copper w-6 h-6 flex items-center justify-center rounded-sm text-xs" onClick={() => onQty(item.id, -1)}>−</button>
                    <span style={{ fontSize: '0.85rem', minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                    <button className="btn-outline-copper w-6 h-6 flex items-center justify-center rounded-sm text-xs" onClick={() => onQty(item.id, 1)}>+</button>
                  </div>
                  <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.05rem', color: 'var(--copper-light)' }}>{fmt(item.price * item.qty)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} style={{ color: 'rgba(184,115,51,0.4)', alignSelf: 'flex-start' }} className="hover:text-red-400 transition-colors">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6" style={{ borderTop: '1px solid rgba(184,115,51,0.2)' }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,149,106,0.6)' }}>Итого</span>
              <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: 'var(--copper-light)' }}>{fmt(total)}</span>
            </div>
            <button className="btn-copper w-full py-3 rounded-sm" onClick={onOrder}>
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ total, onClose, onSubmit }: { total: number; onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { onSubmit(); }, 2200);
  }

  return (
    <>
      <div className="backdrop fixed inset-0 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-sm animate-fade-in-up" style={{ background: 'var(--stone-mid)', border: '1px solid rgba(184,115,51,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}>
          {sent ? (
            <div className="p-10 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(184,115,51,0.15)', border: '1px solid rgba(184,115,51,0.4)' }}>
                <Icon name="Check" size={24} style={{ color: 'var(--copper-light)' }} />
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', fontWeight: 400, marginBottom: 8 }}>Заказ принят</h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(212,149,106,0.6)', letterSpacing: '0.05em' }}>Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-6" style={{ borderBottom: '1px solid rgba(184,115,51,0.15)' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', fontWeight: 400 }}>Оформление заказа</h2>
                <p style={{ fontSize: '0.72rem', color: 'var(--copper)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
                  Сумма: {fmt(total)}
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,149,106,0.5)', display: 'block', marginBottom: 6 }}>Имя *</label>
                    <input
                      className="input-dark w-full px-3 py-2.5 rounded-sm"
                      placeholder="Ваше имя"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,149,106,0.5)', display: 'block', marginBottom: 6 }}>Телефон *</label>
                    <input
                      className="input-dark w-full px-3 py-2.5 rounded-sm"
                      placeholder="+7 (___) ___-__-__"
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,149,106,0.5)', display: 'block', marginBottom: 6 }}>Email</label>
                  <input
                    className="input-dark w-full px-3 py-2.5 rounded-sm"
                    placeholder="email@example.com"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,149,106,0.5)', display: 'block', marginBottom: 6 }}>Комментарий</label>
                  <textarea
                    className="input-dark w-full px-3 py-2.5 rounded-sm resize-none"
                    placeholder="Пожелания, размер кольца..."
                    rows={3}
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" className="btn-outline-copper flex-1 py-3 rounded-sm" onClick={onClose}>Назад</button>
                  <button type="submit" className="btn-copper flex-1 py-3 rounded-sm">Подтвердить заказ</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  function addToCart(product: Product) {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function changeQty(id: number, delta: number) {
    setCart(prev =>
      prev.flatMap(i => {
        if (i.id !== id) return [i];
        const q = i.qty + delta;
        return q > 0 ? [{ ...i, qty: q }] : [];
      })
    );
  }

  function handleOrderDone() {
    setCart([]);
    setOrderOpen(false);
    setCartOpen(false);
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--stone-dark)' }}>
      {/* Background decorations */}
      <CopperWire />
      <div className="texture-overlay" />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5" style={{ borderBottom: '1px solid rgba(184,115,51,0.18)' }}>
        {/* Logo area */}
        <div className="flex items-center gap-4">
          <img
            src="https://cdn.poehali.dev/projects/09e42f5e-adf2-480a-b885-df5f7fb55ace/bucket/50d7d50c-e5fa-42ad-b22f-0e926100c357.png"
            alt="Мастерская Ратибория"
            style={{ height: 144, width: 'auto', objectFit: 'contain' }}
          />
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.2rem', fontWeight: 500, letterSpacing: '0.06em', color: 'hsl(35 20% 88%)', lineHeight: 1.15 }}>
              Мастерская Ратибория
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--copper-light)', marginTop: 4, letterSpacing: '0.04em' }}>       Вселенная авторского искусства</p>
          </div>
        </div>

        {/* Nav + contacts */}
        <nav className="hidden md:flex items-center gap-8">
          {CATEGORIES.slice(1).map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCategory(c.id); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ fontFamily: 'Montserrat', fontSize: '1.36rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: activeCategory === c.id ? 'var(--copper-light)' : 'rgba(212,149,106,0.5)', transition: 'color 0.3s' }}
              className="hover:text-copper-light"
            >
              {c.label}
            </button>
          ))}
        </nav>

        {/* Cart button */}
        <button
          className="relative flex items-center gap-2 btn-outline-copper px-4 py-2 rounded-sm"
          onClick={() => setCartOpen(true)}
        >
          <Icon name="ShoppingBag" size={16} />
          <span className="hidden sm:inline">Корзина</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--copper)', color: '#0d0b09', fontSize: '0.65rem' }}>
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="animate-fade-in-up stagger-1" style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 16 }}>
            Авторская коллекция
          </p>
          <h2 className="animate-fade-in-up stagger-2" style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.1, color: 'hsl(35 20% 90%)', marginBottom: 20 }}>
            Украшения, созданные<br />
            <em style={{ fontFamily: '"Monotype Corsiva", "Cormorant Garamond", cursive', fontStyle: 'italic', color: 'var(--copper-light)' }}>с душой и мастерством</em>
          </h2>
          <p className="animate-fade-in-up stagger-3" style={{ fontSize: '0.88rem', color: 'rgba(212,149,106,0.6)', lineHeight: 1.8, maxWidth: 480, marginBottom: 32 }}>
            Каждое изделие — уникальная история, воплощённая в металле. Ручная работа, благородные материалы, вечная красота.
          </p>
          <div className="animate-fade-in-up stagger-4 flex items-center gap-4">
            <button
              className="btn-copper px-8 py-3.5 rounded-sm"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Смотреть каталог
            </button>
            <div className="flex items-center gap-2" style={{ color: 'rgba(184,115,51,0.5)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              <div style={{ width: 30, height: 1, background: 'var(--copper)', opacity: 0.4 }} />
              Более 50 изделий
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOG ────────────────────────────────────────────────────── */}
      <section id="catalog" className="relative z-10 px-6 md:px-12 pb-20">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.2rem', fontWeight: 400, color: 'hsl(35 20% 88%)' }}>
              Каталог
            </h2>
            <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, var(--copper), transparent)', marginTop: 10 }} />
          </div>
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`cat-pill px-4 py-1.5 rounded-sm border ${activeCategory === c.id ? 'active' : ''}`}
                style={activeCategory !== c.id ? { border: '1px solid rgba(184,115,51,0.25)', color: 'rgba(212,149,106,0.55)' } : {}}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <div key={p.id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}>
              <ProductCard product={p} onAdd={addToCart} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACTS ───────────────────────────────────────────────────── */}
      <footer className="relative z-10 px-6 md:px-12 py-12" style={{ borderTop: '1px solid rgba(184,115,51,0.18)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://cdn.poehali.dev/projects/09e42f5e-adf2-480a-b885-df5f7fb55ace/bucket/bc20080b-511a-4881-881a-982a527fcab0.png"
                alt="Мастерская Ратибория"
                style={{ height: 120, width: 120, objectFit: 'cover', borderRadius: '50%', border: '1px solid rgba(184,115,51,0.35)' }}
              />
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(212,149,106,0.4)', maxWidth: 260, lineHeight: 1.7 }}>
              Авторские ювелирные украшения ручной работы. Создаём красоту, которая живёт вечно.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 16 }}>Контакты</p>
            <div className="space-y-3">
              <a href="tel:+70000000000" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(184,115,51,0.25)', background: 'rgba(184,115,51,0.05)' }}>
                  <Icon name="Phone" size={13} style={{ color: 'var(--copper)' }} />
                </div>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.88rem', color: 'rgba(212,149,106,0.75)', transition: 'color 0.3s' }}>+7 (913) 562-03-73</span>
              </a>
              <a href="mailto:info@aurum.ru" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(184,115,51,0.25)', background: 'rgba(184,115,51,0.05)' }}>
                  <Icon name="Mail" size={13} style={{ color: 'var(--copper)' }} />
                </div>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.88rem', color: 'rgba(212,149,106,0.75)' }}>salynkv@mail.ru</span>
              </a>
            </div>
          </div>

          {/* Work hours */}
          <div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 16 }}>Режим работы</p>
            <div className="space-y-2" style={{ fontSize: '0.82rem', color: 'rgba(212,149,106,0.5)' }}>
              <p>Пн–Вс: 09:00 – 20:00
(вселенная не дремлет)</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center" style={{ borderTop: '1px solid rgba(184,115,51,0.1)', fontSize: '0.65rem', color: 'rgba(184,115,51,0.3)', letterSpacing: '0.1em' }}>
          © 2024 AURUM — Все права защищены
        </div>
      </footer>

      {/* ── CART PANEL ─────────────────────────────────────────────────── */}
      {cartOpen && (
        <CartPanel
          items={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQty={changeQty}
          onOrder={() => { setCartOpen(false); setOrderOpen(true); }}
        />
      )}

      {/* ── ORDER MODAL ─────────────────────────────────────────────────── */}
      {orderOpen && (
        <OrderModal
          total={cartTotal}
          onClose={() => { setOrderOpen(false); setCartOpen(true); }}
          onSubmit={handleOrderDone}
        />
      )}
    </div>
  );
}