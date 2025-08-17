/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Cs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const U = {}, Ze = [], we = () => {
}, Fi = () => !1, Ut = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ws = (e) => e.startsWith("onUpdate:"), Y = Object.assign, Ts = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ni = Object.prototype.hasOwnProperty, N = (e, t) => Ni.call(e, t), O = Array.isArray, Qe = (e) => Wt(e) === "[object Map]", Pn = (e) => Wt(e) === "[object Set]", R = (e) => typeof e == "function", G = (e) => typeof e == "string", $e = (e) => typeof e == "symbol", q = (e) => e !== null && typeof e == "object", On = (e) => (q(e) || R(e)) && R(e.then) && R(e.catch), Rn = Object.prototype.toString, Wt = (e) => Rn.call(e), Di = (e) => Wt(e).slice(8, -1), Bt = (e) => Wt(e) === "[object Object]", Es = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ut = /* @__PURE__ */ Cs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Kt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, Hi = /-(\w)/g, ae = Kt(
  (e) => e.replace(Hi, (t, s) => s ? s.toUpperCase() : "")
), ji = /\B([A-Z])/g, ue = Kt(
  (e) => e.replace(ji, "-$1").toLowerCase()
), In = Kt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Qt = Kt(
  (e) => e ? `on${In(e)}` : ""
), je = (e, t) => !Object.is(e, t), kt = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, us = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Li = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Zs = (e) => {
  const t = G(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Qs;
const qt = () => Qs || (Qs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function As(e) {
  if (O(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = G(n) ? Wi(n) : As(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (G(e) || q(e))
    return e;
}
const $i = /;(?![^(]*\))/g, Vi = /:([^]+)/, Ui = /\/\*[^]*?\*\//g;
function Wi(e) {
  const t = {};
  return e.replace(Ui, "").split($i).forEach((s) => {
    if (s) {
      const n = s.split(Vi);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Ps(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (O(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ps(e[s]);
      n && (t += n + " ");
    }
  else if (q(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Bi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ki = /* @__PURE__ */ Cs(Bi);
function Mn(e) {
  return !!e || e === "";
}
const Fn = (e) => !!(e && e.__v_isRef === !0), as = (e) => G(e) ? e : e == null ? "" : O(e) || q(e) && (e.toString === Rn || !R(e.toString)) ? Fn(e) ? as(e.value) : JSON.stringify(e, Nn, 2) : String(e), Nn = (e, t) => Fn(t) ? Nn(e, t.value) : Qe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[es(n, r) + " =>"] = i, s),
    {}
  )
} : Pn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => es(s))
} : $e(t) ? es(t) : q(t) && !O(t) && !Bt(t) ? String(t) : t, es = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    $e(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let re;
class qi {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = re, !t && re && (this.index = (re.scopes || (re.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = re;
      try {
        return re = this, t();
      } finally {
        re = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = re, re = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (re = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Gi() {
  return re;
}
let V;
const ts = /* @__PURE__ */ new WeakSet();
class Dn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, re && re.active && re.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ts.has(this) && (ts.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || jn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ks(this), Ln(this);
    const t = V, s = he;
    V = this, he = !0;
    try {
      return this.fn();
    } finally {
      $n(this), V = t, he = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Is(t);
      this.deps = this.depsTail = void 0, ks(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ts.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    hs(this) && this.run();
  }
  get dirty() {
    return hs(this);
  }
}
let Hn = 0, at, ht;
function jn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ht, ht = e;
    return;
  }
  e.next = at, at = e;
}
function Os() {
  Hn++;
}
function Rs() {
  if (--Hn > 0)
    return;
  if (ht) {
    let t = ht;
    for (ht = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; at; ) {
    let t = at;
    for (at = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function Ln(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function $n(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), Is(n), Ji(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function hs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Vn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === bt) || (e.globalVersion = bt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !hs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = V, n = he;
  V = e, he = !0;
  try {
    Ln(e);
    const i = e.fn(e._value);
    (t.version === 0 || je(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    V = s, he = n, $n(e), e.flags &= -3;
  }
}
function Is(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      Is(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Ji(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let he = !0;
const Un = [];
function Oe() {
  Un.push(he), he = !1;
}
function Re() {
  const e = Un.pop();
  he = e === void 0 ? !0 : e;
}
function ks(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = V;
    V = void 0;
    try {
      t();
    } finally {
      V = s;
    }
  }
}
let bt = 0;
class Yi {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ms {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!V || !he || V === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== V)
      s = this.activeLink = new Yi(V, this), V.deps ? (s.prevDep = V.depsTail, V.depsTail.nextDep = s, V.depsTail = s) : V.deps = V.depsTail = s, Wn(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = V.depsTail, s.nextDep = void 0, V.depsTail.nextDep = s, V.depsTail = s, V.deps === s && (V.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, bt++, this.notify(t);
  }
  notify(t) {
    Os();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Rs();
    }
  }
}
function Wn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Wn(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const ds = /* @__PURE__ */ new WeakMap(), Je = Symbol(
  ""
), ps = Symbol(
  ""
), yt = Symbol(
  ""
);
function X(e, t, s) {
  if (he && V) {
    let n = ds.get(e);
    n || ds.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new Ms()), i.map = n, i.key = s), i.track();
  }
}
function Pe(e, t, s, n, i, r) {
  const o = ds.get(e);
  if (!o) {
    bt++;
    return;
  }
  const f = (u) => {
    u && u.trigger();
  };
  if (Os(), t === "clear")
    o.forEach(f);
  else {
    const u = O(e), d = u && Es(s);
    if (u && s === "length") {
      const a = Number(n);
      o.forEach((p, C) => {
        (C === "length" || C === yt || !$e(C) && C >= a) && f(p);
      });
    } else
      switch ((s !== void 0 || o.has(void 0)) && f(o.get(s)), d && f(o.get(yt)), t) {
        case "add":
          u ? d && f(o.get("length")) : (f(o.get(Je)), Qe(e) && f(o.get(ps)));
          break;
        case "delete":
          u || (f(o.get(Je)), Qe(e) && f(o.get(ps)));
          break;
        case "set":
          Qe(e) && f(o.get(Je));
          break;
      }
  }
  Rs();
}
function ze(e) {
  const t = D(e);
  return t === e ? t : (X(t, "iterate", yt), de(e) ? t : t.map(ee));
}
function Fs(e) {
  return X(e = D(e), "iterate", yt), e;
}
const zi = {
  __proto__: null,
  [Symbol.iterator]() {
    return ss(this, Symbol.iterator, ee);
  },
  concat(...e) {
    return ze(this).concat(
      ...e.map((t) => O(t) ? ze(t) : t)
    );
  },
  entries() {
    return ss(this, "entries", (e) => (e[1] = ee(e[1]), e));
  },
  every(e, t) {
    return Ee(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ee(this, "filter", e, t, (s) => s.map(ee), arguments);
  },
  find(e, t) {
    return Ee(this, "find", e, t, ee, arguments);
  },
  findIndex(e, t) {
    return Ee(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ee(this, "findLast", e, t, ee, arguments);
  },
  findLastIndex(e, t) {
    return Ee(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ee(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ns(this, "includes", e);
  },
  indexOf(...e) {
    return ns(this, "indexOf", e);
  },
  join(e) {
    return ze(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return ns(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ee(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return lt(this, "pop");
  },
  push(...e) {
    return lt(this, "push", e);
  },
  reduce(e, ...t) {
    return en(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return en(this, "reduceRight", e, t);
  },
  shift() {
    return lt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ee(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return lt(this, "splice", e);
  },
  toReversed() {
    return ze(this).toReversed();
  },
  toSorted(e) {
    return ze(this).toSorted(e);
  },
  toSpliced(...e) {
    return ze(this).toSpliced(...e);
  },
  unshift(...e) {
    return lt(this, "unshift", e);
  },
  values() {
    return ss(this, "values", ee);
  }
};
function ss(e, t, s) {
  const n = Fs(e), i = n[t]();
  return n !== e && !de(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.value && (r.value = s(r.value)), r;
  }), i;
}
const Xi = Array.prototype;
function Ee(e, t, s, n, i, r) {
  const o = Fs(e), f = o !== e && !de(e), u = o[t];
  if (u !== Xi[t]) {
    const p = u.apply(e, r);
    return f ? ee(p) : p;
  }
  let d = s;
  o !== e && (f ? d = function(p, C) {
    return s.call(this, ee(p), C, e);
  } : s.length > 2 && (d = function(p, C) {
    return s.call(this, p, C, e);
  }));
  const a = u.call(o, d, n);
  return f && i ? i(a) : a;
}
function en(e, t, s, n) {
  const i = Fs(e);
  let r = s;
  return i !== e && (de(e) ? s.length > 3 && (r = function(o, f, u) {
    return s.call(this, o, f, u, e);
  }) : r = function(o, f, u) {
    return s.call(this, o, ee(f), u, e);
  }), i[t](r, ...n);
}
function ns(e, t, s) {
  const n = D(e);
  X(n, "iterate", yt);
  const i = n[t](...s);
  return (i === -1 || i === !1) && js(s[0]) ? (s[0] = D(s[0]), n[t](...s)) : i;
}
function lt(e, t, s = []) {
  Oe(), Os();
  const n = D(e)[t].apply(e, s);
  return Rs(), Re(), n;
}
const Zi = /* @__PURE__ */ Cs("__proto__,__v_isRef,__isVue"), Bn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter($e)
);
function Qi(e) {
  $e(e) || (e = String(e));
  const t = D(this);
  return X(t, "has", e), t.hasOwnProperty(e);
}
class Kn {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (i ? r ? fr : Yn : r ? Jn : Gn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = O(t);
    if (!i) {
      let u;
      if (o && (u = zi[s]))
        return u;
      if (s === "hasOwnProperty")
        return Qi;
    }
    const f = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Z(t) ? t : n
    );
    return ($e(s) ? Bn.has(s) : Zi(s)) || (i || X(t, "get", s), r) ? f : Z(f) ? o && Es(s) ? f : f.value : q(f) ? i ? zn(f) : Ds(f) : f;
  }
}
class qn extends Kn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    if (!this._isShallow) {
      const u = Ye(r);
      if (!de(n) && !Ye(n) && (r = D(r), n = D(n)), !O(t) && Z(r) && !Z(n))
        return u ? !1 : (r.value = n, !0);
    }
    const o = O(t) && Es(s) ? Number(s) < t.length : N(t, s), f = Reflect.set(
      t,
      s,
      n,
      Z(t) ? t : i
    );
    return t === D(i) && (o ? je(n, r) && Pe(t, "set", s, n) : Pe(t, "add", s, n)), f;
  }
  deleteProperty(t, s) {
    const n = N(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && Pe(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!$e(s) || !Bn.has(s)) && X(t, "has", s), n;
  }
  ownKeys(t) {
    return X(
      t,
      "iterate",
      O(t) ? "length" : Je
    ), Reflect.ownKeys(t);
  }
}
class ki extends Kn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const er = /* @__PURE__ */ new qn(), tr = /* @__PURE__ */ new ki(), sr = /* @__PURE__ */ new qn(!0);
const gs = (e) => e, Rt = (e) => Reflect.getPrototypeOf(e);
function nr(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = D(i), o = Qe(r), f = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, d = i[e](...n), a = s ? gs : t ? _s : ee;
    return !t && X(
      r,
      "iterate",
      u ? ps : Je
    ), {
      // iterator protocol
      next() {
        const { value: p, done: C } = d.next();
        return C ? { value: p, done: C } : {
          value: f ? [a(p[0]), a(p[1])] : a(p),
          done: C
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function It(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ir(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, o = D(r), f = D(i);
      e || (je(i, f) && X(o, "get", i), X(o, "get", f));
      const { has: u } = Rt(o), d = t ? gs : e ? _s : ee;
      if (u.call(o, i))
        return d(r.get(i));
      if (u.call(o, f))
        return d(r.get(f));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && X(D(i), "iterate", Je), Reflect.get(i, "size", i);
    },
    has(i) {
      const r = this.__v_raw, o = D(r), f = D(i);
      return e || (je(i, f) && X(o, "has", i), X(o, "has", f)), i === f ? r.has(i) : r.has(i) || r.has(f);
    },
    forEach(i, r) {
      const o = this, f = o.__v_raw, u = D(f), d = t ? gs : e ? _s : ee;
      return !e && X(u, "iterate", Je), f.forEach((a, p) => i.call(r, d(a), d(p), o));
    }
  };
  return Y(
    s,
    e ? {
      add: It("add"),
      set: It("set"),
      delete: It("delete"),
      clear: It("clear")
    } : {
      add(i) {
        !t && !de(i) && !Ye(i) && (i = D(i));
        const r = D(this);
        return Rt(r).has.call(r, i) || (r.add(i), Pe(r, "add", i, i)), this;
      },
      set(i, r) {
        !t && !de(r) && !Ye(r) && (r = D(r));
        const o = D(this), { has: f, get: u } = Rt(o);
        let d = f.call(o, i);
        d || (i = D(i), d = f.call(o, i));
        const a = u.call(o, i);
        return o.set(i, r), d ? je(r, a) && Pe(o, "set", i, r) : Pe(o, "add", i, r), this;
      },
      delete(i) {
        const r = D(this), { has: o, get: f } = Rt(r);
        let u = o.call(r, i);
        u || (i = D(i), u = o.call(r, i)), f && f.call(r, i);
        const d = r.delete(i);
        return u && Pe(r, "delete", i, void 0), d;
      },
      clear() {
        const i = D(this), r = i.size !== 0, o = i.clear();
        return r && Pe(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    s[i] = nr(i, e, t);
  }), s;
}
function Ns(e, t) {
  const s = ir(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    N(s, i) && i in n ? s : n,
    i,
    r
  );
}
const rr = {
  get: /* @__PURE__ */ Ns(!1, !1)
}, or = {
  get: /* @__PURE__ */ Ns(!1, !0)
}, lr = {
  get: /* @__PURE__ */ Ns(!0, !1)
};
const Gn = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap();
function cr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ur(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : cr(Di(e));
}
function Ds(e) {
  return Ye(e) ? e : Hs(
    e,
    !1,
    er,
    rr,
    Gn
  );
}
function ar(e) {
  return Hs(
    e,
    !1,
    sr,
    or,
    Jn
  );
}
function zn(e) {
  return Hs(
    e,
    !0,
    tr,
    lr,
    Yn
  );
}
function Hs(e, t, s, n, i) {
  if (!q(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = ur(e);
  if (r === 0)
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const f = new Proxy(
    e,
    r === 2 ? n : s
  );
  return i.set(e, f), f;
}
function dt(e) {
  return Ye(e) ? dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ye(e) {
  return !!(e && e.__v_isReadonly);
}
function de(e) {
  return !!(e && e.__v_isShallow);
}
function js(e) {
  return e ? !!e.__v_raw : !1;
}
function D(e) {
  const t = e && e.__v_raw;
  return t ? D(t) : e;
}
function hr(e) {
  return !N(e, "__v_skip") && Object.isExtensible(e) && us(e, "__v_skip", !0), e;
}
const ee = (e) => q(e) ? Ds(e) : e, _s = (e) => q(e) ? zn(e) : e;
function Z(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function dr(e) {
  return pr(e, !1);
}
function pr(e, t) {
  return Z(e) ? e : new gr(e, t);
}
class gr {
  constructor(t, s) {
    this.dep = new Ms(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : D(t), this._value = s ? t : ee(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || de(t) || Ye(t);
    t = n ? t : D(t), je(t, s) && (this._rawValue = t, this._value = n ? t : ee(t), this.dep.trigger());
  }
}
function Xn(e) {
  return Z(e) ? e.value : e;
}
const _r = {
  get: (e, t, s) => t === "__v_raw" ? e : Xn(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return Z(i) && !Z(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Zn(e) {
  return dt(e) ? e : new Proxy(e, _r);
}
class mr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Ms(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = bt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    V !== this)
      return jn(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Vn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function br(e, t, s = !1) {
  let n, i;
  return R(e) ? n = e : (n = e.get, i = e.set), new mr(n, i, s);
}
const Mt = {}, Ht = /* @__PURE__ */ new WeakMap();
let qe;
function yr(e, t = !1, s = qe) {
  if (s) {
    let n = Ht.get(s);
    n || Ht.set(s, n = []), n.push(e);
  }
}
function xr(e, t, s = U) {
  const { immediate: n, deep: i, once: r, scheduler: o, augmentJob: f, call: u } = s, d = (A) => i ? A : de(A) || i === !1 || i === 0 ? He(A, 1) : He(A);
  let a, p, C, w, F = !1, M = !1;
  if (Z(e) ? (p = () => e.value, F = de(e)) : dt(e) ? (p = () => d(e), F = !0) : O(e) ? (M = !0, F = e.some((A) => dt(A) || de(A)), p = () => e.map((A) => {
    if (Z(A))
      return A.value;
    if (dt(A))
      return d(A);
    if (R(A))
      return u ? u(A, 2) : A();
  })) : R(e) ? t ? p = u ? () => u(e, 2) : e : p = () => {
    if (C) {
      Oe();
      try {
        C();
      } finally {
        Re();
      }
    }
    const A = qe;
    qe = a;
    try {
      return u ? u(e, 3, [w]) : e(w);
    } finally {
      qe = A;
    }
  } : p = we, t && i) {
    const A = p, J = i === !0 ? 1 / 0 : i;
    p = () => He(A(), J);
  }
  const z = Gi(), j = () => {
    a.stop(), z && z.active && Ts(z.effects, a);
  };
  if (r && t) {
    const A = t;
    t = (...J) => {
      A(...J), j();
    };
  }
  let B = M ? new Array(e.length).fill(Mt) : Mt;
  const K = (A) => {
    if (!(!(a.flags & 1) || !a.dirty && !A))
      if (t) {
        const J = a.run();
        if (i || F || (M ? J.some((Me, pe) => je(Me, B[pe])) : je(J, B))) {
          C && C();
          const Me = qe;
          qe = a;
          try {
            const pe = [
              J,
              // pass undefined as the old value when it's changed for the first time
              B === Mt ? void 0 : M && B[0] === Mt ? [] : B,
              w
            ];
            B = J, u ? u(t, 3, pe) : (
              // @ts-expect-error
              t(...pe)
            );
          } finally {
            qe = Me;
          }
        }
      } else
        a.run();
  };
  return f && f(K), a = new Dn(p), a.scheduler = o ? () => o(K, !1) : K, w = (A) => yr(A, !1, a), C = a.onStop = () => {
    const A = Ht.get(a);
    if (A) {
      if (u)
        u(A, 4);
      else
        for (const J of A) J();
      Ht.delete(a);
    }
  }, t ? n ? K(!0) : B = a.run() : o ? o(K.bind(null, !0), !0) : a.run(), j.pause = a.pause.bind(a), j.resume = a.resume.bind(a), j.stop = j, j;
}
function He(e, t = 1 / 0, s) {
  if (t <= 0 || !q(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Set(), s.has(e)))
    return e;
  if (s.add(e), t--, Z(e))
    He(e.value, t, s);
  else if (O(e))
    for (let n = 0; n < e.length; n++)
      He(e[n], t, s);
  else if (Pn(e) || Qe(e))
    e.forEach((n) => {
      He(n, t, s);
    });
  else if (Bt(e)) {
    for (const n in e)
      He(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && He(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ct(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Gt(i, t, s);
  }
}
function Te(e, t, s, n) {
  if (R(e)) {
    const i = Ct(e, t, s, n);
    return i && On(i) && i.catch((r) => {
      Gt(r, t, s);
    }), i;
  }
  if (O(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Te(e[r], t, s, n));
    return i;
  }
}
function Gt(e, t, s, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || U;
  if (t) {
    let f = t.parent;
    const u = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; f; ) {
      const a = f.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, u, d) === !1)
            return;
      }
      f = f.parent;
    }
    if (r) {
      Oe(), Ct(r, null, 10, [
        e,
        u,
        d
      ]), Re();
      return;
    }
  }
  vr(e, s, i, n, o);
}
function vr(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const te = [];
let xe = -1;
const ke = [];
let Ne = null, Xe = 0;
const Qn = /* @__PURE__ */ Promise.resolve();
let jt = null;
function kn(e) {
  const t = jt || Qn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sr(e) {
  let t = xe + 1, s = te.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = te[n], r = xt(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Ls(e) {
  if (!(e.flags & 1)) {
    const t = xt(e), s = te[te.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= xt(s) ? te.push(e) : te.splice(Sr(t), 0, e), e.flags |= 1, ei();
  }
}
function ei() {
  jt || (jt = Qn.then(si));
}
function Cr(e) {
  O(e) ? ke.push(...e) : Ne && e.id === -1 ? Ne.splice(Xe + 1, 0, e) : e.flags & 1 || (ke.push(e), e.flags |= 1), ei();
}
function tn(e, t, s = xe + 1) {
  for (; s < te.length; s++) {
    const n = te[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      te.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function ti(e) {
  if (ke.length) {
    const t = [...new Set(ke)].sort(
      (s, n) => xt(s) - xt(n)
    );
    if (ke.length = 0, Ne) {
      Ne.push(...t);
      return;
    }
    for (Ne = t, Xe = 0; Xe < Ne.length; Xe++) {
      const s = Ne[Xe];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    Ne = null, Xe = 0;
  }
}
const xt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function si(e) {
  try {
    for (xe = 0; xe < te.length; xe++) {
      const t = te[xe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ct(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; xe < te.length; xe++) {
      const t = te[xe];
      t && (t.flags &= -2);
    }
    xe = -1, te.length = 0, ti(), jt = null, (te.length || ke.length) && si();
  }
}
let Ce = null, ni = null;
function Lt(e) {
  const t = Ce;
  return Ce = e, ni = e && e.type.__scopeId || null, t;
}
function wr(e, t = Ce, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && an(-1);
    const r = Lt(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Lt(r), n._d && an(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Be(e, t, s, n) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const f = i[o];
    r && (f.oldValue = r[o].value);
    let u = f.dir[n];
    u && (Oe(), Te(u, s, 8, [
      e.el,
      f,
      e,
      t
    ]), Re());
  }
}
const Tr = Symbol("_vte"), Er = (e) => e.__isTeleport;
function $s(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, $s(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
  return R(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
function ii(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function pt(e, t, s, n, i = !1) {
  if (O(e)) {
    e.forEach(
      (F, M) => pt(
        F,
        t && (O(t) ? t[M] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (gt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && pt(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? Bs(n.component) : n.el, o = i ? null : r, { i: f, r: u } = e, d = t && t.r, a = f.refs === U ? f.refs = {} : f.refs, p = f.setupState, C = D(p), w = p === U ? () => !1 : (F) => N(C, F);
  if (d != null && d !== u && (G(d) ? (a[d] = null, w(d) && (p[d] = null)) : Z(d) && (d.value = null)), R(u))
    Ct(u, f, 12, [o, a]);
  else {
    const F = G(u), M = Z(u);
    if (F || M) {
      const z = () => {
        if (e.f) {
          const j = F ? w(u) ? p[u] : a[u] : u.value;
          i ? O(j) && Ts(j, r) : O(j) ? j.includes(r) || j.push(r) : F ? (a[u] = [r], w(u) && (p[u] = a[u])) : (u.value = [r], e.k && (a[e.k] = u.value));
        } else F ? (a[u] = o, w(u) && (p[u] = o)) : M && (u.value = o, e.k && (a[e.k] = o));
      };
      o ? (z.id = -1, le(z, s)) : z();
    }
  }
}
qt().requestIdleCallback;
qt().cancelIdleCallback;
const gt = (e) => !!e.type.__asyncLoader, ri = (e) => e.type.__isKeepAlive;
function Pr(e, t) {
  oi(e, "a", t);
}
function Or(e, t) {
  oi(e, "da", t);
}
function oi(e, t, s = se) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Jt(t, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      ri(i.parent.vnode) && Rr(n, t, s, i), i = i.parent;
  }
}
function Rr(e, t, s, n) {
  const i = Jt(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  li(() => {
    Ts(n[t], i);
  }, s);
}
function Jt(e, t, s = se, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...o) => {
      Oe();
      const f = wt(s), u = Te(t, s, e, o);
      return f(), Re(), u;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const Ie = (e) => (t, s = se) => {
  (!St || e === "sp") && Jt(e, (...n) => t(...n), s);
}, Ir = Ie("bm"), Mr = Ie("m"), Fr = Ie(
  "bu"
), Nr = Ie("u"), Dr = Ie(
  "bum"
), li = Ie("um"), Hr = Ie(
  "sp"
), jr = Ie("rtg"), Lr = Ie("rtc");
function $r(e, t = se) {
  Jt("ec", e, t);
}
const Vr = Symbol.for("v-ndc"), ms = (e) => e ? Ai(e) ? Bs(e) : ms(e.parent) : null, _t = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ms(e.parent),
    $root: (e) => ms(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ci(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ls(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => fo.bind(e)
  })
), is = (e, t) => e !== U && !e.__isScriptSetup && N(e, t), Ur = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: i, props: r, accessCache: o, type: f, appContext: u } = e;
    let d;
    if (t[0] !== "$") {
      const w = o[t];
      if (w !== void 0)
        switch (w) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (is(n, t))
          return o[t] = 1, n[t];
        if (i !== U && N(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && N(d, t)
        )
          return o[t] = 3, r[t];
        if (s !== U && N(s, t))
          return o[t] = 4, s[t];
        bs && (o[t] = 0);
      }
    }
    const a = _t[t];
    let p, C;
    if (a)
      return t === "$attrs" && X(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (p = f.__cssModules) && (p = p[t])
    )
      return p;
    if (s !== U && N(s, t))
      return o[t] = 4, s[t];
    if (
      // global properties
      C = u.config.globalProperties, N(C, t)
    )
      return C[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return is(i, t) ? (i[t] = s, !0) : n !== U && N(n, t) ? (n[t] = s, !0) : N(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, propsOptions: r }
  }, o) {
    let f;
    return !!s[o] || e !== U && N(e, o) || is(t, o) || (f = r[0]) && N(f, o) || N(n, o) || N(_t, o) || N(i.config.globalProperties, o);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : N(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function sn(e) {
  return O(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let bs = !0;
function Wr(e) {
  const t = ci(e), s = e.proxy, n = e.ctx;
  bs = !1, t.beforeCreate && nn(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: f,
    provide: u,
    inject: d,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: C,
    beforeUpdate: w,
    updated: F,
    activated: M,
    deactivated: z,
    beforeDestroy: j,
    beforeUnmount: B,
    destroyed: K,
    unmounted: A,
    render: J,
    renderTracked: Me,
    renderTriggered: pe,
    errorCaptured: Fe,
    serverPrefetch: Tt,
    // public API
    expose: Ve,
    inheritAttrs: nt,
    // assets
    components: Et,
    directives: At,
    filters: Xt
  } = t;
  if (d && Br(d, n, null), o)
    for (const W in o) {
      const L = o[W];
      R(L) && (n[W] = L.bind(s));
    }
  if (i) {
    const W = i.call(s, s);
    q(W) && (e.data = Ds(W));
  }
  if (bs = !0, r)
    for (const W in r) {
      const L = r[W], Ue = R(L) ? L.bind(s, s) : R(L.get) ? L.get.bind(s, s) : we, Pt = !R(L) && R(L.set) ? L.set.bind(s) : we, We = Fo({
        get: Ue,
        set: Pt
      });
      Object.defineProperty(n, W, {
        enumerable: !0,
        configurable: !0,
        get: () => We.value,
        set: (ge) => We.value = ge
      });
    }
  if (f)
    for (const W in f)
      fi(f[W], n, s, W);
  if (u) {
    const W = R(u) ? u.call(s) : u;
    Reflect.ownKeys(W).forEach((L) => {
      zr(L, W[L]);
    });
  }
  a && nn(a, e, "c");
  function Q(W, L) {
    O(L) ? L.forEach((Ue) => W(Ue.bind(s))) : L && W(L.bind(s));
  }
  if (Q(Ir, p), Q(Mr, C), Q(Fr, w), Q(Nr, F), Q(Pr, M), Q(Or, z), Q($r, Fe), Q(Lr, Me), Q(jr, pe), Q(Dr, B), Q(li, A), Q(Hr, Tt), O(Ve))
    if (Ve.length) {
      const W = e.exposed || (e.exposed = {});
      Ve.forEach((L) => {
        Object.defineProperty(W, L, {
          get: () => s[L],
          set: (Ue) => s[L] = Ue,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  J && e.render === we && (e.render = J), nt != null && (e.inheritAttrs = nt), Et && (e.components = Et), At && (e.directives = At), Tt && ii(e);
}
function Br(e, t, s = we) {
  O(e) && (e = ys(e));
  for (const n in e) {
    const i = e[n];
    let r;
    q(i) ? "default" in i ? r = Ft(
      i.from || n,
      i.default,
      !0
    ) : r = Ft(i.from || n) : r = Ft(i), Z(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[n] = r;
  }
}
function nn(e, t, s) {
  Te(
    O(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function fi(e, t, s, n) {
  let i = n.includes(".") ? Si(s, n) : () => s[n];
  if (G(e)) {
    const r = t[e];
    R(r) && os(i, r);
  } else if (R(e))
    os(i, e.bind(s));
  else if (q(e))
    if (O(e))
      e.forEach((r) => fi(r, t, s, n));
    else {
      const r = R(e.handler) ? e.handler.bind(s) : t[e.handler];
      R(r) && os(i, r, e);
    }
}
function ci(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, f = r.get(t);
  let u;
  return f ? u = f : !i.length && !s && !n ? u = t : (u = {}, i.length && i.forEach(
    (d) => $t(u, d, o, !0)
  ), $t(u, t, o)), q(t) && r.set(t, u), u;
}
function $t(e, t, s, n = !1) {
  const { mixins: i, extends: r } = t;
  r && $t(e, r, s, !0), i && i.forEach(
    (o) => $t(e, o, s, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const f = Kr[o] || s && s[o];
      e[o] = f ? f(e[o], t[o]) : t[o];
    }
  return e;
}
const Kr = {
  data: rn,
  props: on,
  emits: on,
  // objects
  methods: ct,
  computed: ct,
  // lifecycle
  beforeCreate: k,
  created: k,
  beforeMount: k,
  mounted: k,
  beforeUpdate: k,
  updated: k,
  beforeDestroy: k,
  beforeUnmount: k,
  destroyed: k,
  unmounted: k,
  activated: k,
  deactivated: k,
  errorCaptured: k,
  serverPrefetch: k,
  // assets
  components: ct,
  directives: ct,
  // watch
  watch: Gr,
  // provide / inject
  provide: rn,
  inject: qr
};
function rn(e, t) {
  return t ? e ? function() {
    return Y(
      R(e) ? e.call(this, this) : e,
      R(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function qr(e, t) {
  return ct(ys(e), ys(t));
}
function ys(e) {
  if (O(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function k(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ct(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function on(e, t) {
  return e ? O(e) && O(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    sn(e),
    sn(t ?? {})
  ) : t;
}
function Gr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Y(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = k(e[n], t[n]);
  return s;
}
function ui() {
  return {
    app: null,
    config: {
      isNativeTag: Fi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Jr = 0;
function Yr(e, t) {
  return function(n, i = null) {
    R(n) || (n = Y({}, n)), i != null && !q(i) && (i = null);
    const r = ui(), o = /* @__PURE__ */ new WeakSet(), f = [];
    let u = !1;
    const d = r.app = {
      _uid: Jr++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: No,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && R(a.install) ? (o.add(a), a.install(d, ...p)) : R(a) && (o.add(a), a(d, ...p))), d;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), d;
      },
      component(a, p) {
        return p ? (r.components[a] = p, d) : r.components[a];
      },
      directive(a, p) {
        return p ? (r.directives[a] = p, d) : r.directives[a];
      },
      mount(a, p, C) {
        if (!u) {
          const w = d._ceVNode || Le(n, i);
          return w.appContext = r, C === !0 ? C = "svg" : C === !1 && (C = void 0), e(w, a, C), u = !0, d._container = a, a.__vue_app__ = d, Bs(w.component);
        }
      },
      onUnmount(a) {
        f.push(a);
      },
      unmount() {
        u && (Te(
          f,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(a, p) {
        return r.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = et;
        et = d;
        try {
          return a();
        } finally {
          et = p;
        }
      }
    };
    return d;
  };
}
let et = null;
function zr(e, t) {
  if (se) {
    let s = se.provides;
    const n = se.parent && se.parent.provides;
    n === s && (s = se.provides = Object.create(n)), s[e] = t;
  }
}
function Ft(e, t, s = !1) {
  const n = Ao();
  if (n || et) {
    let i = et ? et._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && R(t) ? t.call(n && n.proxy) : t;
  }
}
const ai = {}, hi = () => Object.create(ai), di = (e) => Object.getPrototypeOf(e) === ai;
function Xr(e, t, s, n = !1) {
  const i = {}, r = hi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), pi(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  s ? e.props = n ? i : ar(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Zr(e, t, s, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, f = D(i), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let C = a[p];
        if (Yt(e.emitsOptions, C))
          continue;
        const w = t[C];
        if (u)
          if (N(r, C))
            w !== r[C] && (r[C] = w, d = !0);
          else {
            const F = ae(C);
            i[F] = xs(
              u,
              f,
              F,
              w,
              e,
              !1
            );
          }
        else
          w !== r[C] && (r[C] = w, d = !0);
      }
    }
  } else {
    pi(e, t, i, r) && (d = !0);
    let a;
    for (const p in f)
      (!t || // for camelCase
      !N(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = ue(p)) === p || !N(t, a))) && (u ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[a] !== void 0) && (i[p] = xs(
        u,
        f,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (r !== f)
      for (const p in r)
        (!t || !N(t, p)) && (delete r[p], d = !0);
  }
  d && Pe(e.attrs, "set", "");
}
function pi(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let o = !1, f;
  if (t)
    for (let u in t) {
      if (ut(u))
        continue;
      const d = t[u];
      let a;
      i && N(i, a = ae(u)) ? !r || !r.includes(a) ? s[a] = d : (f || (f = {}))[a] = d : Yt(e.emitsOptions, u) || (!(u in n) || d !== n[u]) && (n[u] = d, o = !0);
    }
  if (r) {
    const u = D(s), d = f || U;
    for (let a = 0; a < r.length; a++) {
      const p = r[a];
      s[p] = xs(
        i,
        u,
        p,
        d[p],
        e,
        !N(d, p)
      );
    }
  }
  return o;
}
function xs(e, t, s, n, i, r) {
  const o = e[s];
  if (o != null) {
    const f = N(o, "default");
    if (f && n === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && R(u)) {
        const { propsDefaults: d } = i;
        if (s in d)
          n = d[s];
        else {
          const a = wt(i);
          n = d[s] = u.call(
            null,
            t
          ), a();
        }
      } else
        n = u;
      i.ce && i.ce._setProp(s, n);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !f ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === ue(s)) && (n = !0));
  }
  return n;
}
const Qr = /* @__PURE__ */ new WeakMap();
function gi(e, t, s = !1) {
  const n = s ? Qr : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, f = [];
  let u = !1;
  if (!R(e)) {
    const a = (p) => {
      u = !0;
      const [C, w] = gi(p, t, !0);
      Y(o, C), w && f.push(...w);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!r && !u)
    return q(e) && n.set(e, Ze), Ze;
  if (O(r))
    for (let a = 0; a < r.length; a++) {
      const p = ae(r[a]);
      ln(p) && (o[p] = U);
    }
  else if (r)
    for (const a in r) {
      const p = ae(a);
      if (ln(p)) {
        const C = r[a], w = o[p] = O(C) || R(C) ? { type: C } : Y({}, C), F = w.type;
        let M = !1, z = !0;
        if (O(F))
          for (let j = 0; j < F.length; ++j) {
            const B = F[j], K = R(B) && B.name;
            if (K === "Boolean") {
              M = !0;
              break;
            } else K === "String" && (z = !1);
          }
        else
          M = R(F) && F.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = M, w[
          1
          /* shouldCastTrue */
        ] = z, (M || N(w, "default")) && f.push(p);
      }
    }
  const d = [o, f];
  return q(e) && n.set(e, d), d;
}
function ln(e) {
  return e[0] !== "$" && !ut(e);
}
const Vs = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", Us = (e) => O(e) ? e.map(Se) : [Se(e)], kr = (e, t, s) => {
  if (t._n)
    return t;
  const n = wr((...i) => Us(t(...i)), s);
  return n._c = !1, n;
}, _i = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (Vs(i)) continue;
    const r = e[i];
    if (R(r))
      t[i] = kr(i, r, n);
    else if (r != null) {
      const o = Us(r);
      t[i] = () => o;
    }
  }
}, mi = (e, t) => {
  const s = Us(t);
  e.slots.default = () => s;
}, bi = (e, t, s) => {
  for (const n in t)
    (s || !Vs(n)) && (e[n] = t[n]);
}, eo = (e, t, s) => {
  const n = e.slots = hi();
  if (e.vnode.shapeFlag & 32) {
    const i = t.__;
    i && us(n, "__", i, !0);
    const r = t._;
    r ? (bi(n, t, s), s && us(n, "_", r, !0)) : _i(t, n);
  } else t && mi(e, t);
}, to = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, o = U;
  if (n.shapeFlag & 32) {
    const f = t._;
    f ? s && f === 1 ? r = !1 : bi(i, t, s) : (r = !t.$stable, _i(t, i)), o = t;
  } else t && (mi(e, t), o = { default: 1 });
  if (r)
    for (const f in i)
      !Vs(f) && o[f] == null && delete i[f];
}, le = _o;
function so(e) {
  return no(e);
}
function no(e, t) {
  const s = qt();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: f,
    createComment: u,
    setText: d,
    setElementText: a,
    parentNode: p,
    nextSibling: C,
    setScopeId: w = we,
    insertStaticContent: F
  } = e, M = (l, c, h, m = null, g = null, _ = null, v = void 0, x = null, y = !!c.dynamicChildren) => {
    if (l === c)
      return;
    l && !ft(l, c) && (m = Ot(l), ge(l, g, _, !0), l = null), c.patchFlag === -2 && (y = !1, c.dynamicChildren = null);
    const { type: b, ref: E, shapeFlag: S } = c;
    switch (b) {
      case zt:
        z(l, c, h, m);
        break;
      case tt:
        j(l, c, h, m);
        break;
      case ls:
        l == null && B(c, h, m, v);
        break;
      case ve:
        Et(
          l,
          c,
          h,
          m,
          g,
          _,
          v,
          x,
          y
        );
        break;
      default:
        S & 1 ? J(
          l,
          c,
          h,
          m,
          g,
          _,
          v,
          x,
          y
        ) : S & 6 ? At(
          l,
          c,
          h,
          m,
          g,
          _,
          v,
          x,
          y
        ) : (S & 64 || S & 128) && b.process(
          l,
          c,
          h,
          m,
          g,
          _,
          v,
          x,
          y,
          rt
        );
    }
    E != null && g ? pt(E, l && l.ref, _, c || l, !c) : E == null && l && l.ref != null && pt(l.ref, null, _, l, !0);
  }, z = (l, c, h, m) => {
    if (l == null)
      n(
        c.el = f(c.children),
        h,
        m
      );
    else {
      const g = c.el = l.el;
      c.children !== l.children && d(g, c.children);
    }
  }, j = (l, c, h, m) => {
    l == null ? n(
      c.el = u(c.children || ""),
      h,
      m
    ) : c.el = l.el;
  }, B = (l, c, h, m) => {
    [l.el, l.anchor] = F(
      l.children,
      c,
      h,
      m,
      l.el,
      l.anchor
    );
  }, K = ({ el: l, anchor: c }, h, m) => {
    let g;
    for (; l && l !== c; )
      g = C(l), n(l, h, m), l = g;
    n(c, h, m);
  }, A = ({ el: l, anchor: c }) => {
    let h;
    for (; l && l !== c; )
      h = C(l), i(l), l = h;
    i(c);
  }, J = (l, c, h, m, g, _, v, x, y) => {
    c.type === "svg" ? v = "svg" : c.type === "math" && (v = "mathml"), l == null ? Me(
      c,
      h,
      m,
      g,
      _,
      v,
      x,
      y
    ) : Tt(
      l,
      c,
      g,
      _,
      v,
      x,
      y
    );
  }, Me = (l, c, h, m, g, _, v, x) => {
    let y, b;
    const { props: E, shapeFlag: S, transition: T, dirs: P } = l;
    if (y = l.el = o(
      l.type,
      _,
      E && E.is,
      E
    ), S & 8 ? a(y, l.children) : S & 16 && Fe(
      l.children,
      y,
      null,
      m,
      g,
      rs(l, _),
      v,
      x
    ), P && Be(l, null, m, "created"), pe(y, l, l.scopeId, v, m), E) {
      for (const $ in E)
        $ !== "value" && !ut($) && r(y, $, null, E[$], _, m);
      "value" in E && r(y, "value", null, E.value, _), (b = E.onVnodeBeforeMount) && ye(b, m, l);
    }
    P && Be(l, null, m, "beforeMount");
    const I = io(g, T);
    I && T.beforeEnter(y), n(y, c, h), ((b = E && E.onVnodeMounted) || I || P) && le(() => {
      b && ye(b, m, l), I && T.enter(y), P && Be(l, null, m, "mounted");
    }, g);
  }, pe = (l, c, h, m, g) => {
    if (h && w(l, h), m)
      for (let _ = 0; _ < m.length; _++)
        w(l, m[_]);
    if (g) {
      let _ = g.subTree;
      if (c === _ || wi(_.type) && (_.ssContent === c || _.ssFallback === c)) {
        const v = g.vnode;
        pe(
          l,
          v,
          v.scopeId,
          v.slotScopeIds,
          g.parent
        );
      }
    }
  }, Fe = (l, c, h, m, g, _, v, x, y = 0) => {
    for (let b = y; b < l.length; b++) {
      const E = l[b] = x ? De(l[b]) : Se(l[b]);
      M(
        null,
        E,
        c,
        h,
        m,
        g,
        _,
        v,
        x
      );
    }
  }, Tt = (l, c, h, m, g, _, v) => {
    const x = c.el = l.el;
    let { patchFlag: y, dynamicChildren: b, dirs: E } = c;
    y |= l.patchFlag & 16;
    const S = l.props || U, T = c.props || U;
    let P;
    if (h && Ke(h, !1), (P = T.onVnodeBeforeUpdate) && ye(P, h, c, l), E && Be(c, l, h, "beforeUpdate"), h && Ke(h, !0), (S.innerHTML && T.innerHTML == null || S.textContent && T.textContent == null) && a(x, ""), b ? Ve(
      l.dynamicChildren,
      b,
      x,
      h,
      m,
      rs(c, g),
      _
    ) : v || L(
      l,
      c,
      x,
      null,
      h,
      m,
      rs(c, g),
      _,
      !1
    ), y > 0) {
      if (y & 16)
        nt(x, S, T, h, g);
      else if (y & 2 && S.class !== T.class && r(x, "class", null, T.class, g), y & 4 && r(x, "style", S.style, T.style, g), y & 8) {
        const I = c.dynamicProps;
        for (let $ = 0; $ < I.length; $++) {
          const H = I[$], ne = S[H], ie = T[H];
          (ie !== ne || H === "value") && r(x, H, ne, ie, g, h);
        }
      }
      y & 1 && l.children !== c.children && a(x, c.children);
    } else !v && b == null && nt(x, S, T, h, g);
    ((P = T.onVnodeUpdated) || E) && le(() => {
      P && ye(P, h, c, l), E && Be(c, l, h, "updated");
    }, m);
  }, Ve = (l, c, h, m, g, _, v) => {
    for (let x = 0; x < c.length; x++) {
      const y = l[x], b = c[x], E = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ft(y, b) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 198) ? p(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      M(
        y,
        b,
        E,
        null,
        m,
        g,
        _,
        v,
        !0
      );
    }
  }, nt = (l, c, h, m, g) => {
    if (c !== h) {
      if (c !== U)
        for (const _ in c)
          !ut(_) && !(_ in h) && r(
            l,
            _,
            c[_],
            null,
            g,
            m
          );
      for (const _ in h) {
        if (ut(_)) continue;
        const v = h[_], x = c[_];
        v !== x && _ !== "value" && r(l, _, x, v, g, m);
      }
      "value" in h && r(l, "value", c.value, h.value, g);
    }
  }, Et = (l, c, h, m, g, _, v, x, y) => {
    const b = c.el = l ? l.el : f(""), E = c.anchor = l ? l.anchor : f("");
    let { patchFlag: S, dynamicChildren: T, slotScopeIds: P } = c;
    P && (x = x ? x.concat(P) : P), l == null ? (n(b, h, m), n(E, h, m), Fe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      c.children || [],
      h,
      E,
      g,
      _,
      v,
      x,
      y
    )) : S > 0 && S & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Ve(
      l.dynamicChildren,
      T,
      h,
      g,
      _,
      v,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || g && c === g.subTree) && yi(
      l,
      c,
      !0
      /* shallow */
    )) : L(
      l,
      c,
      h,
      E,
      g,
      _,
      v,
      x,
      y
    );
  }, At = (l, c, h, m, g, _, v, x, y) => {
    c.slotScopeIds = x, l == null ? c.shapeFlag & 512 ? g.ctx.activate(
      c,
      h,
      m,
      v,
      y
    ) : Xt(
      c,
      h,
      m,
      g,
      _,
      v,
      y
    ) : qs(l, c, y);
  }, Xt = (l, c, h, m, g, _, v) => {
    const x = l.component = Eo(
      l,
      m,
      g
    );
    if (ri(l) && (x.ctx.renderer = rt), Po(x, !1, v), x.asyncDep) {
      if (g && g.registerDep(x, Q, v), !l.el) {
        const y = x.subTree = Le(tt);
        j(null, y, c, h), l.placeholder = y.el;
      }
    } else
      Q(
        x,
        l,
        c,
        h,
        g,
        _,
        v
      );
  }, qs = (l, c, h) => {
    const m = c.component = l.component;
    if (po(l, c, h))
      if (m.asyncDep && !m.asyncResolved) {
        W(m, c, h);
        return;
      } else
        m.next = c, m.update();
    else
      c.el = l.el, m.vnode = c;
  }, Q = (l, c, h, m, g, _, v) => {
    const x = () => {
      if (l.isMounted) {
        let { next: S, bu: T, u: P, parent: I, vnode: $ } = l;
        {
          const me = xi(l);
          if (me) {
            S && (S.el = $.el, W(l, S, v)), me.asyncDep.then(() => {
              l.isUnmounted || x();
            });
            return;
          }
        }
        let H = S, ne;
        Ke(l, !1), S ? (S.el = $.el, W(l, S, v)) : S = $, T && kt(T), (ne = S.props && S.props.onVnodeBeforeUpdate) && ye(ne, I, S, $), Ke(l, !0);
        const ie = cn(l), _e = l.subTree;
        l.subTree = ie, M(
          _e,
          ie,
          // parent may have changed if it's in a teleport
          p(_e.el),
          // anchor may have changed if it's in a fragment
          Ot(_e),
          l,
          g,
          _
        ), S.el = ie.el, H === null && go(l, ie.el), P && le(P, g), (ne = S.props && S.props.onVnodeUpdated) && le(
          () => ye(ne, I, S, $),
          g
        );
      } else {
        let S;
        const { el: T, props: P } = c, { bm: I, m: $, parent: H, root: ne, type: ie } = l, _e = gt(c);
        Ke(l, !1), I && kt(I), !_e && (S = P && P.onVnodeBeforeMount) && ye(S, H, c), Ke(l, !0);
        {
          ne.ce && // @ts-expect-error _def is private
          ne.ce._def.shadowRoot !== !1 && ne.ce._injectChildStyle(ie);
          const me = l.subTree = cn(l);
          M(
            null,
            me,
            h,
            m,
            l,
            g,
            _
          ), c.el = me.el;
        }
        if ($ && le($, g), !_e && (S = P && P.onVnodeMounted)) {
          const me = c;
          le(
            () => ye(S, H, me),
            g
          );
        }
        (c.shapeFlag & 256 || H && gt(H.vnode) && H.vnode.shapeFlag & 256) && l.a && le(l.a, g), l.isMounted = !0, c = h = m = null;
      }
    };
    l.scope.on();
    const y = l.effect = new Dn(x);
    l.scope.off();
    const b = l.update = y.run.bind(y), E = l.job = y.runIfDirty.bind(y);
    E.i = l, E.id = l.uid, y.scheduler = () => Ls(E), Ke(l, !0), b();
  }, W = (l, c, h) => {
    c.component = l;
    const m = l.vnode.props;
    l.vnode = c, l.next = null, Zr(l, c.props, m, h), to(l, c.children, h), Oe(), tn(l), Re();
  }, L = (l, c, h, m, g, _, v, x, y = !1) => {
    const b = l && l.children, E = l ? l.shapeFlag : 0, S = c.children, { patchFlag: T, shapeFlag: P } = c;
    if (T > 0) {
      if (T & 128) {
        Pt(
          b,
          S,
          h,
          m,
          g,
          _,
          v,
          x,
          y
        );
        return;
      } else if (T & 256) {
        Ue(
          b,
          S,
          h,
          m,
          g,
          _,
          v,
          x,
          y
        );
        return;
      }
    }
    P & 8 ? (E & 16 && it(b, g, _), S !== b && a(h, S)) : E & 16 ? P & 16 ? Pt(
      b,
      S,
      h,
      m,
      g,
      _,
      v,
      x,
      y
    ) : it(b, g, _, !0) : (E & 8 && a(h, ""), P & 16 && Fe(
      S,
      h,
      m,
      g,
      _,
      v,
      x,
      y
    ));
  }, Ue = (l, c, h, m, g, _, v, x, y) => {
    l = l || Ze, c = c || Ze;
    const b = l.length, E = c.length, S = Math.min(b, E);
    let T;
    for (T = 0; T < S; T++) {
      const P = c[T] = y ? De(c[T]) : Se(c[T]);
      M(
        l[T],
        P,
        h,
        null,
        g,
        _,
        v,
        x,
        y
      );
    }
    b > E ? it(
      l,
      g,
      _,
      !0,
      !1,
      S
    ) : Fe(
      c,
      h,
      m,
      g,
      _,
      v,
      x,
      y,
      S
    );
  }, Pt = (l, c, h, m, g, _, v, x, y) => {
    let b = 0;
    const E = c.length;
    let S = l.length - 1, T = E - 1;
    for (; b <= S && b <= T; ) {
      const P = l[b], I = c[b] = y ? De(c[b]) : Se(c[b]);
      if (ft(P, I))
        M(
          P,
          I,
          h,
          null,
          g,
          _,
          v,
          x,
          y
        );
      else
        break;
      b++;
    }
    for (; b <= S && b <= T; ) {
      const P = l[S], I = c[T] = y ? De(c[T]) : Se(c[T]);
      if (ft(P, I))
        M(
          P,
          I,
          h,
          null,
          g,
          _,
          v,
          x,
          y
        );
      else
        break;
      S--, T--;
    }
    if (b > S) {
      if (b <= T) {
        const P = T + 1, I = P < E ? c[P].el : m;
        for (; b <= T; )
          M(
            null,
            c[b] = y ? De(c[b]) : Se(c[b]),
            h,
            I,
            g,
            _,
            v,
            x,
            y
          ), b++;
      }
    } else if (b > T)
      for (; b <= S; )
        ge(l[b], g, _, !0), b++;
    else {
      const P = b, I = b, $ = /* @__PURE__ */ new Map();
      for (b = I; b <= T; b++) {
        const oe = c[b] = y ? De(c[b]) : Se(c[b]);
        oe.key != null && $.set(oe.key, b);
      }
      let H, ne = 0;
      const ie = T - I + 1;
      let _e = !1, me = 0;
      const ot = new Array(ie);
      for (b = 0; b < ie; b++) ot[b] = 0;
      for (b = P; b <= S; b++) {
        const oe = l[b];
        if (ne >= ie) {
          ge(oe, g, _, !0);
          continue;
        }
        let be;
        if (oe.key != null)
          be = $.get(oe.key);
        else
          for (H = I; H <= T; H++)
            if (ot[H - I] === 0 && ft(oe, c[H])) {
              be = H;
              break;
            }
        be === void 0 ? ge(oe, g, _, !0) : (ot[be - I] = b + 1, be >= me ? me = be : _e = !0, M(
          oe,
          c[be],
          h,
          null,
          g,
          _,
          v,
          x,
          y
        ), ne++);
      }
      const Ys = _e ? ro(ot) : Ze;
      for (H = Ys.length - 1, b = ie - 1; b >= 0; b--) {
        const oe = I + b, be = c[oe], zs = c[oe + 1], Xs = oe + 1 < E ? (
          // #13559, fallback to el placeholder for unresolved async component
          zs.el || zs.placeholder
        ) : m;
        ot[b] === 0 ? M(
          null,
          be,
          h,
          Xs,
          g,
          _,
          v,
          x,
          y
        ) : _e && (H < 0 || b !== Ys[H] ? We(be, h, Xs, 2) : H--);
      }
    }
  }, We = (l, c, h, m, g = null) => {
    const { el: _, type: v, transition: x, children: y, shapeFlag: b } = l;
    if (b & 6) {
      We(l.component.subTree, c, h, m);
      return;
    }
    if (b & 128) {
      l.suspense.move(c, h, m);
      return;
    }
    if (b & 64) {
      v.move(l, c, h, rt);
      return;
    }
    if (v === ve) {
      n(_, c, h);
      for (let S = 0; S < y.length; S++)
        We(y[S], c, h, m);
      n(l.anchor, c, h);
      return;
    }
    if (v === ls) {
      K(l, c, h);
      return;
    }
    if (m !== 2 && b & 1 && x)
      if (m === 0)
        x.beforeEnter(_), n(_, c, h), le(() => x.enter(_), g);
      else {
        const { leave: S, delayLeave: T, afterLeave: P } = x, I = () => {
          l.ctx.isUnmounted ? i(_) : n(_, c, h);
        }, $ = () => {
          S(_, () => {
            I(), P && P();
          });
        };
        T ? T(_, I, $) : $();
      }
    else
      n(_, c, h);
  }, ge = (l, c, h, m = !1, g = !1) => {
    const {
      type: _,
      props: v,
      ref: x,
      children: y,
      dynamicChildren: b,
      shapeFlag: E,
      patchFlag: S,
      dirs: T,
      cacheIndex: P
    } = l;
    if (S === -2 && (g = !1), x != null && (Oe(), pt(x, null, h, l, !0), Re()), P != null && (c.renderCache[P] = void 0), E & 256) {
      c.ctx.deactivate(l);
      return;
    }
    const I = E & 1 && T, $ = !gt(l);
    let H;
    if ($ && (H = v && v.onVnodeBeforeUnmount) && ye(H, c, l), E & 6)
      Mi(l.component, h, m);
    else {
      if (E & 128) {
        l.suspense.unmount(h, m);
        return;
      }
      I && Be(l, null, c, "beforeUnmount"), E & 64 ? l.type.remove(
        l,
        c,
        h,
        rt,
        m
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ve || S > 0 && S & 64) ? it(
        b,
        c,
        h,
        !1,
        !0
      ) : (_ === ve && S & 384 || !g && E & 16) && it(y, c, h), m && Gs(l);
    }
    ($ && (H = v && v.onVnodeUnmounted) || I) && le(() => {
      H && ye(H, c, l), I && Be(l, null, c, "unmounted");
    }, h);
  }, Gs = (l) => {
    const { type: c, el: h, anchor: m, transition: g } = l;
    if (c === ve) {
      Ii(h, m);
      return;
    }
    if (c === ls) {
      A(l);
      return;
    }
    const _ = () => {
      i(h), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (l.shapeFlag & 1 && g && !g.persisted) {
      const { leave: v, delayLeave: x } = g, y = () => v(h, _);
      x ? x(l.el, _, y) : y();
    } else
      _();
  }, Ii = (l, c) => {
    let h;
    for (; l !== c; )
      h = C(l), i(l), l = h;
    i(c);
  }, Mi = (l, c, h) => {
    const {
      bum: m,
      scope: g,
      job: _,
      subTree: v,
      um: x,
      m: y,
      a: b,
      parent: E,
      slots: { __: S }
    } = l;
    fn(y), fn(b), m && kt(m), E && O(S) && S.forEach((T) => {
      E.renderCache[T] = void 0;
    }), g.stop(), _ && (_.flags |= 8, ge(v, l, c, h)), x && le(x, c), le(() => {
      l.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, it = (l, c, h, m = !1, g = !1, _ = 0) => {
    for (let v = _; v < l.length; v++)
      ge(l[v], c, h, m, g);
  }, Ot = (l) => {
    if (l.shapeFlag & 6)
      return Ot(l.component.subTree);
    if (l.shapeFlag & 128)
      return l.suspense.next();
    const c = C(l.anchor || l.el), h = c && c[Tr];
    return h ? C(h) : c;
  };
  let Zt = !1;
  const Js = (l, c, h) => {
    l == null ? c._vnode && ge(c._vnode, null, null, !0) : M(
      c._vnode || null,
      l,
      c,
      null,
      null,
      null,
      h
    ), c._vnode = l, Zt || (Zt = !0, tn(), ti(), Zt = !1);
  }, rt = {
    p: M,
    um: ge,
    m: We,
    r: Gs,
    mt: Xt,
    mc: Fe,
    pc: L,
    pbc: Ve,
    n: Ot,
    o: e
  };
  return {
    render: Js,
    hydrate: void 0,
    createApp: Yr(Js)
  };
}
function rs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Ke({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function io(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function yi(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (O(n) && O(i))
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      let f = i[r];
      f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = i[r] = De(i[r]), f.el = o.el), !s && f.patchFlag !== -2 && yi(o, f)), f.type === zt && (f.el = o.el), f.type === tt && !f.el && (f.el = o.el);
    }
}
function ro(e) {
  const t = e.slice(), s = [0];
  let n, i, r, o, f;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const d = e[n];
    if (d !== 0) {
      if (i = s[s.length - 1], e[i] < d) {
        t[n] = i, s.push(n);
        continue;
      }
      for (r = 0, o = s.length - 1; r < o; )
        f = r + o >> 1, e[s[f]] < d ? r = f + 1 : o = f;
      d < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, o = s[r - 1]; r-- > 0; )
    s[r] = o, o = t[o];
  return s;
}
function xi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xi(t);
}
function fn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const oo = Symbol.for("v-scx"), lo = () => Ft(oo);
function os(e, t, s) {
  return vi(e, t, s);
}
function vi(e, t, s = U) {
  const { immediate: n, deep: i, flush: r, once: o } = s, f = Y({}, s), u = t && n || !t && r !== "post";
  let d;
  if (St) {
    if (r === "sync") {
      const w = lo();
      d = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!u) {
      const w = () => {
      };
      return w.stop = we, w.resume = we, w.pause = we, w;
    }
  }
  const a = se;
  f.call = (w, F, M) => Te(w, a, F, M);
  let p = !1;
  r === "post" ? f.scheduler = (w) => {
    le(w, a && a.suspense);
  } : r !== "sync" && (p = !0, f.scheduler = (w, F) => {
    F ? w() : Ls(w);
  }), f.augmentJob = (w) => {
    t && (w.flags |= 4), p && (w.flags |= 2, a && (w.id = a.uid, w.i = a));
  };
  const C = xr(e, t, f);
  return St && (d ? d.push(C) : u && C()), C;
}
function fo(e, t, s) {
  const n = this.proxy, i = G(e) ? e.includes(".") ? Si(n, e) : () => n[e] : e.bind(n, n);
  let r;
  R(t) ? r = t : (r = t.handler, s = t);
  const o = wt(this), f = vi(i, r.bind(n), s);
  return o(), f;
}
function Si(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < s.length && n; i++)
      n = n[s[i]];
    return n;
  };
}
const co = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ae(t)}Modifiers`] || e[`${ue(t)}Modifiers`];
function uo(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || U;
  let i = s;
  const r = t.startsWith("update:"), o = r && co(n, t.slice(7));
  o && (o.trim && (i = s.map((a) => G(a) ? a.trim() : a)), o.number && (i = s.map(Li)));
  let f, u = n[f = Qt(t)] || // also try camelCase event handler (#2249)
  n[f = Qt(ae(t))];
  !u && r && (u = n[f = Qt(ue(t))]), u && Te(
    u,
    e,
    6,
    i
  );
  const d = n[f + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[f])
      return;
    e.emitted[f] = !0, Te(
      d,
      e,
      6,
      i
    );
  }
}
function Ci(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, f = !1;
  if (!R(e)) {
    const u = (d) => {
      const a = Ci(d, t, !0);
      a && (f = !0, Y(o, a));
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !f ? (q(e) && n.set(e, null), null) : (O(r) ? r.forEach((u) => o[u] = null) : Y(o, r), q(e) && n.set(e, o), o);
}
function Yt(e, t) {
  return !e || !Ut(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), N(e, t[0].toLowerCase() + t.slice(1)) || N(e, ue(t)) || N(e, t));
}
function cn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: f,
    emit: u,
    render: d,
    renderCache: a,
    props: p,
    data: C,
    setupState: w,
    ctx: F,
    inheritAttrs: M
  } = e, z = Lt(e);
  let j, B;
  try {
    if (s.shapeFlag & 4) {
      const A = i || n, J = A;
      j = Se(
        d.call(
          J,
          A,
          a,
          p,
          w,
          C,
          F
        )
      ), B = f;
    } else {
      const A = t;
      j = Se(
        A.length > 1 ? A(
          p,
          { attrs: f, slots: o, emit: u }
        ) : A(
          p,
          null
        )
      ), B = t.props ? f : ao(f);
    }
  } catch (A) {
    mt.length = 0, Gt(A, e, 1), j = Le(tt);
  }
  let K = j;
  if (B && M !== !1) {
    const A = Object.keys(B), { shapeFlag: J } = K;
    A.length && J & 7 && (r && A.some(ws) && (B = ho(
      B,
      r
    )), K = st(K, B, !1, !0));
  }
  return s.dirs && (K = st(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(s.dirs) : s.dirs), s.transition && $s(K, s.transition), j = K, Lt(z), j;
}
const ao = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ut(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, ho = (e, t) => {
  const s = {};
  for (const n in e)
    (!ws(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function po(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: o, children: f, patchFlag: u } = t, d = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return n ? un(n, o, d) : !!o;
    if (u & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const C = a[p];
        if (o[C] !== n[C] && !Yt(d, C))
          return !0;
      }
    }
  } else
    return (i || f) && (!f || !f.$stable) ? !0 : n === o ? !1 : n ? o ? un(n, o, d) : !0 : !!o;
  return !1;
}
function un(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (t[r] !== e[r] && !Yt(s, r))
      return !0;
  }
  return !1;
}
function go({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const wi = (e) => e.__isSuspense;
function _o(e, t) {
  t && t.pendingBranch ? O(e) ? t.effects.push(...e) : t.effects.push(e) : Cr(e);
}
const ve = Symbol.for("v-fgt"), zt = Symbol.for("v-txt"), tt = Symbol.for("v-cmt"), ls = Symbol.for("v-stc"), mt = [];
let fe = null;
function mo(e = !1) {
  mt.push(fe = e ? null : []);
}
function bo() {
  mt.pop(), fe = mt[mt.length - 1] || null;
}
let vt = 1;
function an(e, t = !1) {
  vt += e, e < 0 && fe && t && (fe.hasOnce = !0);
}
function yo(e) {
  return e.dynamicChildren = vt > 0 ? fe || Ze : null, bo(), vt > 0 && fe && fe.push(e), e;
}
function xo(e, t, s, n, i, r) {
  return yo(
    ce(
      e,
      t,
      s,
      n,
      i,
      r,
      !0
    )
  );
}
function Ti(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ei = ({ key: e }) => e ?? null, Nt = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || Z(e) || R(e) ? { i: Ce, r: e, k: t, f: !!s } : e : null);
function ce(e, t = null, s = null, n = 0, i = null, r = e === ve ? 0 : 1, o = !1, f = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ei(t),
    ref: t && Nt(t),
    scopeId: ni,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce
  };
  return f ? (Ws(u, s), r & 128 && e.normalize(u)) : s && (u.shapeFlag |= G(s) ? 8 : 16), vt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const Le = vo;
function vo(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === Vr) && (e = tt), Ti(e)) {
    const f = st(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Ws(f, s), vt > 0 && !r && fe && (f.shapeFlag & 6 ? fe[fe.indexOf(e)] = f : fe.push(f)), f.patchFlag = -2, f;
  }
  if (Mo(e) && (e = e.__vccOpts), t) {
    t = So(t);
    let { class: f, style: u } = t;
    f && !G(f) && (t.class = Ps(f)), q(u) && (js(u) && !O(u) && (u = Y({}, u)), t.style = As(u));
  }
  const o = G(e) ? 1 : wi(e) ? 128 : Er(e) ? 64 : q(e) ? 4 : R(e) ? 2 : 0;
  return ce(
    e,
    t,
    s,
    n,
    i,
    o,
    r,
    !0
  );
}
function So(e) {
  return e ? js(e) || di(e) ? Y({}, e) : e : null;
}
function st(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: f, transition: u } = e, d = t ? Co(i || {}, t) : i, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Ei(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? O(r) ? r.concat(Nt(t)) : [r, Nt(t)] : Nt(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: f,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ve ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && n && $s(
    a,
    u.clone(a)
  ), a;
}
function Ge(e = " ", t = 0) {
  return Le(zt, null, e, t);
}
function Se(e) {
  return e == null || typeof e == "boolean" ? Le(tt) : O(e) ? Le(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ti(e) ? De(e) : Le(zt, null, String(e));
}
function De(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e);
}
function Ws(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (O(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Ws(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !di(t) ? t._ctx = Ce : i === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else R(t) ? (t = { default: t, _ctx: Ce }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ge(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Co(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Ps([t.class, n.class]));
      else if (i === "style")
        t.style = As([t.style, n.style]);
      else if (Ut(i)) {
        const r = t[i], o = n[i];
        o && r !== o && !(O(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function ye(e, t, s, n = null) {
  Te(e, t, 7, [
    s,
    n
  ]);
}
const wo = ui();
let To = 0;
function Eo(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || wo, r = {
    uid: To++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new qi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: gi(n, i),
    emitsOptions: Ci(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: U,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = uo.bind(null, r), e.ce && e.ce(r), r;
}
let se = null;
const Ao = () => se || Ce;
let Vt, vs;
{
  const e = qt(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  Vt = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => se = s
  ), vs = t(
    "__VUE_SSR_SETTERS__",
    (s) => St = s
  );
}
const wt = (e) => {
  const t = se;
  return Vt(e), e.scope.on(), () => {
    e.scope.off(), Vt(t);
  };
}, hn = () => {
  se && se.scope.off(), Vt(null);
};
function Ai(e) {
  return e.vnode.shapeFlag & 4;
}
let St = !1;
function Po(e, t = !1, s = !1) {
  t && vs(t);
  const { props: n, children: i } = e.vnode, r = Ai(e);
  Xr(e, n, r, t), eo(e, i, s || t);
  const o = r ? Oo(e, t) : void 0;
  return t && vs(!1), o;
}
function Oo(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ur);
  const { setup: n } = s;
  if (n) {
    Oe();
    const i = e.setupContext = n.length > 1 ? Io(e) : null, r = wt(e), o = Ct(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), f = On(o);
    if (Re(), r(), (f || e.sp) && !gt(e) && ii(e), f) {
      if (o.then(hn, hn), t)
        return o.then((u) => {
          dn(e, u);
        }).catch((u) => {
          Gt(u, e, 0);
        });
      e.asyncDep = o;
    } else
      dn(e, o);
  } else
    Pi(e);
}
function dn(e, t, s) {
  R(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : q(t) && (e.setupState = Zn(t)), Pi(e);
}
function Pi(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || we);
  {
    const i = wt(e);
    Oe();
    try {
      Wr(e);
    } finally {
      Re(), i();
    }
  }
}
const Ro = {
  get(e, t) {
    return X(e, "get", ""), e[t];
  }
};
function Io(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ro),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Bs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Zn(hr(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in _t)
        return _t[s](e);
    },
    has(t, s) {
      return s in t || s in _t;
    }
  })) : e.proxy;
}
function Mo(e) {
  return R(e) && "__vccOpts" in e;
}
const Fo = (e, t) => br(e, t, St), No = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ss;
const pn = typeof window < "u" && window.trustedTypes;
if (pn)
  try {
    Ss = /* @__PURE__ */ pn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Oi = Ss ? (e) => Ss.createHTML(e) : (e) => e, Do = "http://www.w3.org/2000/svg", Ho = "http://www.w3.org/1998/Math/MathML", Ae = typeof document < "u" ? document : null, gn = Ae && /* @__PURE__ */ Ae.createElement("template"), jo = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? Ae.createElementNS(Do, e) : t === "mathml" ? Ae.createElementNS(Ho, e) : s ? Ae.createElement(e, { is: s }) : Ae.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Ae.createTextNode(e),
  createComment: (e) => Ae.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ae.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, r) {
    const o = s ? s.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      gn.innerHTML = Oi(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const f = gn.content;
      if (n === "svg" || n === "mathml") {
        const u = f.firstChild;
        for (; u.firstChild; )
          f.appendChild(u.firstChild);
        f.removeChild(u);
      }
      t.insertBefore(f, s);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, Lo = Symbol("_vtc");
function $o(e, t, s) {
  const n = e[Lo];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const _n = Symbol("_vod"), Vo = Symbol("_vsh"), Uo = Symbol(""), Wo = /(^|;)\s*display\s*:/;
function Bo(e, t, s) {
  const n = e.style, i = G(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (G(t))
        for (const o of t.split(";")) {
          const f = o.slice(0, o.indexOf(":")).trim();
          s[f] == null && Dt(n, f, "");
        }
      else
        for (const o in t)
          s[o] == null && Dt(n, o, "");
    for (const o in s)
      o === "display" && (r = !0), Dt(n, o, s[o]);
  } else if (i) {
    if (t !== s) {
      const o = n[Uo];
      o && (s += ";" + o), n.cssText = s, r = Wo.test(s);
    }
  } else t && e.removeAttribute("style");
  _n in e && (e[_n] = r ? n.display : "", e[Vo] && (n.display = "none"));
}
const mn = /\s*!important$/;
function Dt(e, t, s) {
  if (O(s))
    s.forEach((n) => Dt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Ko(e, t);
    mn.test(s) ? e.setProperty(
      ue(n),
      s.replace(mn, ""),
      "important"
    ) : e[n] = s;
  }
}
const bn = ["Webkit", "Moz", "ms"], fs = {};
function Ko(e, t) {
  const s = fs[t];
  if (s)
    return s;
  let n = ae(t);
  if (n !== "filter" && n in e)
    return fs[t] = n;
  n = In(n);
  for (let i = 0; i < bn.length; i++) {
    const r = bn[i] + n;
    if (r in e)
      return fs[t] = r;
  }
  return t;
}
const yn = "http://www.w3.org/1999/xlink";
function xn(e, t, s, n, i, r = Ki(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(yn, t.slice(6, t.length)) : e.setAttributeNS(yn, t, s) : s == null || r && !Mn(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : $e(s) ? String(s) : s
  );
}
function vn(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Oi(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const f = r === "OPTION" ? e.getAttribute("value") || "" : e.value, u = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (f !== u || !("_value" in e)) && (e.value = u), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let o = !1;
  if (s === "" || s == null) {
    const f = typeof e[t];
    f === "boolean" ? s = Mn(s) : s == null && f === "string" ? (s = "", o = !0) : f === "number" && (s = 0, o = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function qo(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Go(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Sn = Symbol("_vei");
function Jo(e, t, s, n, i = null) {
  const r = e[Sn] || (e[Sn] = {}), o = r[t];
  if (n && o)
    o.value = n;
  else {
    const [f, u] = Yo(t);
    if (n) {
      const d = r[t] = Zo(
        n,
        i
      );
      qo(e, f, d, u);
    } else o && (Go(e, f, o, u), r[t] = void 0);
  }
}
const Cn = /(?:Once|Passive|Capture)$/;
function Yo(e) {
  let t;
  if (Cn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Cn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ue(e.slice(2)), t];
}
let cs = 0;
const zo = /* @__PURE__ */ Promise.resolve(), Xo = () => cs || (zo.then(() => cs = 0), cs = Date.now());
function Zo(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Te(
      Qo(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Xo(), s;
}
function Qo(e, t) {
  if (O(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (i) => !i._stopped && n && n(i)
    );
  } else
    return t;
}
const wn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ko = (e, t, s, n, i, r) => {
  const o = i === "svg";
  t === "class" ? $o(e, n, o) : t === "style" ? Bo(e, s, n) : Ut(t) ? ws(t) || Jo(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : el(e, t, n, o)) ? (vn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xn(e, t, n, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !G(n)) ? vn(e, ae(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), xn(e, t, n, o));
};
function el(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && wn(t) && R(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return wn(t) && G(s) ? !1 : t in e;
}
const Tn = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function tl(e, t, s) {
  const n = /* @__PURE__ */ Ar(e, t);
  Bt(n) && Y(n, t);
  class i extends Ks {
    constructor(o) {
      super(n, o, s);
    }
  }
  return i.def = n, i;
}
const sl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Ks extends sl {
  constructor(t, s = {}, n = An) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== An ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Ks) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, kn(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver((n) => {
      for (const i of n)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (n, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: r, styles: o } = n;
      let f;
      if (r && !O(r))
        for (const u in r) {
          const d = r[u];
          (d === Number || d && d.type === Number) && (u in this._props && (this._props[u] = Zs(this._props[u])), (f || (f = /* @__PURE__ */ Object.create(null)))[ae(u)] = !0);
        }
      this._numberProps = f, this._resolveProps(n), this.shadowRoot && this._applyStyles(o), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, t(this._def = n, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const s = this._instance && this._instance.exposed;
    if (s)
      for (const n in s)
        N(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => Xn(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = O(s) ? s : Object.keys(s || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (const i of n.map(ae))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : Tn;
    const i = ae(t);
    s && this._numberProps && this._numberProps[i] && (n = Zs(n)), this._setProp(i, n, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, i = !1) {
    if (s !== this._props[t] && (s === Tn ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), i && this._instance && this._update(), n)) {
      const r = this._ob;
      r && r.disconnect(), s === !0 ? this.setAttribute(ue(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(ue(t), s + "") : s || this.removeAttribute(ue(t)), r && r.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), il(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = Le(this._def, Y(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const i = (r, o) => {
        this.dispatchEvent(
          new CustomEvent(
            r,
            Bt(o[0]) ? Y({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      n.emit = (r, ...o) => {
        i(r, o), ue(r) !== r && i(ue(r), o);
      }, this._setParent();
    }), s;
  }
  _applyStyles(t, s) {
    if (!t) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s))
        return;
      this._styleChildren.add(s);
    }
    const n = this._nonce;
    for (let i = t.length - 1; i >= 0; i--) {
      const r = document.createElement("style");
      n && r.setAttribute("nonce", n), r.textContent = t[i], this.shadowRoot.prepend(r);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let s;
    for (; s = this.firstChild; ) {
      const n = s.nodeType === 1 && s.getAttribute("slot") || "default";
      (t[n] || (t[n] = [])).push(s), this.removeChild(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = (this._teleportTarget || this).querySelectorAll("slot"), s = this._instance.type.__scopeId;
    for (let n = 0; n < t.length; n++) {
      const i = t[n], r = i.getAttribute("name") || "default", o = this._slots[r], f = i.parentNode;
      if (o)
        for (const u of o) {
          if (s && u.nodeType === 1) {
            const d = s + "-s", a = document.createTreeWalker(u, 1);
            u.setAttribute(d, "");
            let p;
            for (; p = a.nextNode(); )
              p.setAttribute(d, "");
          }
          f.insertBefore(u, i);
        }
      else
        for (; i.firstChild; ) f.insertBefore(i.firstChild, i);
      f.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const nl = /* @__PURE__ */ Y({ patchProp: ko }, jo);
let En;
function Ri() {
  return En || (En = so(nl));
}
const il = (...e) => {
  Ri().render(...e);
}, An = (...e) => {
  const t = Ri().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = ol(n);
    if (!i) return;
    const r = t._component;
    !R(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = s(i, !1, rl(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
};
function rl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ol(e) {
  return G(e) ? document.querySelector(e) : e;
}
const ll = ".read-the-docs[data-v-3e00ee66]{color:#888}", fl = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, cl = { class: "card" }, ul = {
  __name: "HelloWorld",
  props: {
    msg: String
  },
  setup(e) {
    const t = dr(0);
    return (s, n) => (mo(), xo(ve, null, [
      ce("h1", null, as(e.msg), 1),
      ce("div", cl, [
        ce("button", {
          type: "button",
          onClick: n[0] || (n[0] = (i) => t.value++)
        }, "count is " + as(t.value), 1),
        n[1] || (n[1] = ce("p", null, [
          Ge(" Edit "),
          ce("code", null, "components/HelloWorld.vue"),
          Ge(" to test HMR ")
        ], -1))
      ]),
      n[2] || (n[2] = ce("p", null, [
        Ge(" Check out "),
        ce("a", {
          href: "https://vuejs.org/guide/quick-start.html#local",
          target: "_blank"
        }, "create-vue"),
        Ge(", the official Vue + Vite starter ")
      ], -1)),
      n[3] || (n[3] = ce("p", null, [
        Ge(" Learn more about IDE Support for Vue in the "),
        ce("a", {
          href: "https://vuejs.org/guide/scaling-up/tooling.html#ide-support",
          target: "_blank"
        }, "Vue Docs Scaling up Guide"),
        Ge(". ")
      ], -1)),
      n[4] || (n[4] = ce("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
    ], 64));
  }
}, al = /* @__PURE__ */ fl(ul, [["styles", [ll]], ["__scopeId", "data-v-3e00ee66"]]), hl = /* @__PURE__ */ tl(al);
customElements.define("hello-world", hl);
export {
  hl as default
};
