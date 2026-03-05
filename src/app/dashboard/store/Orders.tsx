'use client';

import React, { useState } from 'react';
import {
    Package, ChevronRight, Truck, CheckCircle2, Clock, X,
    MapPin, CreditCard, Banknote, Smartphone, RotateCcw,
    Star, ShoppingBag, Search, Filter, ChevronDown
} from 'lucide-react';
import styles from './Orders.module.css';

type OrderStatus = 'delivered' | 'shipped' | 'processing' | 'cancelled';

const ORDERS = [
    {
        id: 'HPO-2026-0048',
        date: 'Mar 3, 2026',
        status: 'delivered' as OrderStatus,
        items: [
            { name: 'HP Pulse Isolate Whey', qty: 1, price: 3499, image: 'https://images.unsplash.com/photo-1593094478221-917379638b0d?auto=format&fit=crop&q=80&w=200' },
            { name: 'HP Power Shaker', qty: 2, price: 499, image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&q=80&w=200' },
        ],
        total: 4497,
        payment: 'upi',
        address: '14B, Green Park, New Delhi - 110016',
        deliveredOn: 'Mar 5, 2026',
        tracking: 'DTDC7829104381',
    },
    {
        id: 'HPO-2026-0031',
        date: 'Feb 18, 2026',
        status: 'delivered' as OrderStatus,
        items: [
            { name: 'HP Pro Gym Bag', qty: 1, price: 2199, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200' },
            { name: 'HP Hydro Steel Bottle', qty: 1, price: 899, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=200' },
        ],
        total: 3098,
        payment: 'cod',
        address: '14B, Green Park, New Delhi - 110016',
        deliveredOn: 'Feb 21, 2026',
        tracking: 'BLUEDART9021847',
    },
    {
        id: 'HPO-2026-0019',
        date: 'Feb 2, 2026',
        status: 'shipped' as OrderStatus,
        items: [
            { name: 'HP BCAA Recovery', qty: 2, price: 1299, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=200' },
        ],
        total: 2598,
        payment: 'card',
        address: '14B, Green Park, New Delhi - 110016',
        deliveredOn: null,
        tracking: 'ECOM783920182',
    },
    {
        id: 'HPO-2026-0007',
        date: 'Jan 15, 2026',
        status: 'cancelled' as OrderStatus,
        items: [
            { name: 'HP Weightlifting Belt', qty: 1, price: 1899, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=200' },
        ],
        total: 1899,
        payment: 'upi',
        address: '14B, Green Park, New Delhi - 110016',
        deliveredOn: null,
        tracking: null,
    },
    {
        id: 'HPO-2025-0194',
        date: 'Dec 28, 2025',
        status: 'delivered' as OrderStatus,
        items: [
            { name: 'HP Creatine Monohydrate', qty: 1, price: 1099, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=200' },
            { name: 'HP Resistance Bands Set', qty: 1, price: 999, image: 'https://images.unsplash.com/photo-1598266663412-7bb3d09a066b?auto=format&fit=crop&q=80&w=200' },
            { name: 'HP Impact Yoga Mat', qty: 1, price: 1499, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=200' },
        ],
        total: 3597,
        payment: 'card',
        address: '14B, Green Park, New Delhi - 110016',
        deliveredOn: 'Dec 31, 2025',
        tracking: 'DTDC6610293847',
    },
];

const STATUS_CONFIG = {
    delivered: { label: 'Delivered', color: '#10B981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={14} /> },
    shipped: { label: 'Shipped', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', icon: <Truck size={14} /> },
    processing: { label: 'Processing', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', icon: <Clock size={14} /> },
    cancelled: { label: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', icon: <X size={14} /> },
};

const PAYMENT_ICONS: Record<string, React.ReactNode> = {
    upi: <Smartphone size={14} />,
    cod: <Banknote size={14} />,
    card: <CreditCard size={14} />,
};

const PAYMENT_LABELS: Record<string, string> = {
    upi: 'UPI',
    cod: 'Cash on Delivery',
    card: 'Card',
};

export default function OrdersPage() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | OrderStatus>('all');

    const filtered = ORDERS.filter(o => {
        const matchFilter = filter === 'all' || o.status === filter;
        const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
        return matchFilter && matchSearch;
    });

    const totalSpent = ORDERS.filter(o => o.status !== 'cancelled').reduce((a, o) => a + o.total, 0);
    const totalOrders = ORDERS.length;
    const delivered = ORDERS.filter(o => o.status === 'delivered').length;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>My <span className={styles.grad}>Orders</span></h1>
                    <p className={styles.subtitle}>Track and manage all your health.pro purchases</p>
                </div>
            </header>

            {/* Stats row */}
            <div className={styles.statsRow}>
                {[
                    { label: 'Total Orders', value: totalOrders, icon: <ShoppingBag size={20} /> },
                    { label: 'Delivered', value: delivered, icon: <CheckCircle2 size={20} /> },
                    { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: <CreditCard size={20} /> },
                    { label: 'Active Orders', value: ORDERS.filter(o => o.status === 'shipped' || o.status === 'processing').length, icon: <Truck size={20} /> },
                ].map((s, i) => (
                    <div key={i} className={styles.statCard}>
                        <div className={styles.statIcon}>{s.icon}</div>
                        <div>
                            <p className={styles.statValue}>{s.value}</p>
                            <p className={styles.statLabel}>{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.searchWrap}>
                    <Search size={16} className={styles.searchIcon} />
                    <input className={styles.searchInput} placeholder="Search by order ID or product..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className={styles.filterTabs}>
                    {(['all', 'delivered', 'shipped', 'processing', 'cancelled'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`${styles.tab} ${filter === f ? styles.activeTab : ''}`}>
                            {f === 'all' ? 'All' : STATUS_CONFIG[f]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders list */}
            <div className={styles.ordersList}>
                {filtered.length === 0 && (
                    <div className={styles.empty}>
                        <Package size={48} />
                        <p>No orders found</p>
                    </div>
                )}

                {filtered.map(order => {
                    const st = STATUS_CONFIG[order.status];
                    const isOpen = expanded === order.id;

                    return (
                        <div key={order.id} className={`${styles.orderCard} ${isOpen ? styles.orderCardOpen : ''}`}>
                            {/* Order summary row */}
                            <div className={styles.orderRow} onClick={() => setExpanded(isOpen ? null : order.id)}>
                                {/* Product thumbnails */}
                                <div className={styles.thumbStack}>
                                    {order.items.slice(0, 3).map((item, i) => (
                                        <img key={i} src={item.image} alt={item.name}
                                            className={styles.thumb}
                                            style={{ zIndex: 3 - i, marginLeft: i > 0 ? '-12px' : 0 }} />
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className={styles.moreThumb}>+{order.items.length - 3}</div>
                                    )}
                                </div>

                                {/* Order meta */}
                                <div className={styles.orderMeta}>
                                    <div className={styles.orderTopRow}>
                                        <span className={styles.orderId}>{order.id}</span>
                                        <span className={styles.orderDate}>{order.date}</span>
                                    </div>
                                    <p className={styles.orderItems}>
                                        {order.items.map(i => i.name).join(', ')}
                                    </p>
                                    <div className={styles.orderBottomRow}>
                                        <span className={styles.orderTotal}>₹{order.total.toLocaleString()}</span>
                                        <span className={styles.payBadge}>
                                            {PAYMENT_ICONS[order.payment]} {PAYMENT_LABELS[order.payment]}
                                        </span>
                                    </div>
                                </div>

                                {/* Status + expand */}
                                <div className={styles.orderRight}>
                                    <span className={styles.statusBadge} style={{ color: st.color, background: st.bg }}>
                                        {st.icon} {st.label}
                                    </span>
                                    <ChevronDown size={18} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
                                </div>
                            </div>

                            {/* Expanded detail */}
                            {isOpen && (
                                <div className={styles.orderDetail}>
                                    {/* Items list */}
                                    <div className={styles.detailSection}>
                                        <h4 className={styles.detailHeading}>Items Ordered</h4>
                                        <div className={styles.itemsList}>
                                            {order.items.map((item, i) => (
                                                <div key={i} className={styles.itemRow}>
                                                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                                                    <div className={styles.itemInfo}>
                                                        <p className={styles.itemName}>{item.name}</p>
                                                        <p className={styles.itemQty}>Qty: {item.qty}</p>
                                                    </div>
                                                    <span className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className={styles.detailSection}>
                                        <h4 className={styles.detailHeading}>Order Timeline</h4>
                                        <div className={styles.timeline}>
                                            {[
                                                { label: 'Order Placed', date: order.date, done: true },
                                                { label: 'Payment Confirmed', date: order.date, done: order.status !== 'cancelled' },
                                                { label: 'Shipped', date: order.status === 'shipped' || order.status === 'delivered' ? order.date : null, done: order.status === 'shipped' || order.status === 'delivered' },
                                                { label: 'Delivered', date: order.deliveredOn, done: order.status === 'delivered' },
                                            ].map((step, i) => (
                                                <div key={i} className={styles.timelineStep}>
                                                    <div className={`${styles.timelineDot} ${step.done ? styles.dotDone : ''} ${order.status === 'cancelled' && i > 0 ? styles.dotCancelled : ''}`} />
                                                    <div className={styles.timelineContent}>
                                                        <span className={`${styles.timelineLabel} ${step.done ? styles.labelDone : ''}`}>{step.label}</span>
                                                        {step.date && <span className={styles.timelineDate}>{step.date}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Address + Tracking */}
                                    <div className={styles.detailGrid}>
                                        <div className={styles.detailSection}>
                                            <h4 className={styles.detailHeading}>Delivery Address</h4>
                                            <div className={styles.addressBox}>
                                                <MapPin size={15} />
                                                <p>{order.address}</p>
                                            </div>
                                        </div>
                                        {order.tracking && (
                                            <div className={styles.detailSection}>
                                                <h4 className={styles.detailHeading}>Tracking ID</h4>
                                                <div className={styles.trackingBox}>
                                                    <Truck size={15} />
                                                    <code>{order.tracking}</code>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price breakdown */}
                                    <div className={styles.detailSection}>
                                        <h4 className={styles.detailHeading}>Price Breakdown</h4>
                                        <div className={styles.breakdown}>
                                            <div className={styles.bRow}><span>Subtotal</span><span>₹{order.total.toLocaleString()}</span></div>
                                            <div className={styles.bRow}><span>Shipping</span><span className={styles.free}>FREE</span></div>
                                            <div className={`${styles.bRow} ${styles.bTotal}`}><span>Total Paid</span><span>₹{order.total.toLocaleString()}</span></div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className={styles.detailActions}>
                                        {order.status === 'delivered' && (
                                            <>
                                                <button className={styles.actionBtn}>
                                                    <Star size={15} /> Rate & Review
                                                </button>
                                                <button className={styles.actionBtn}>
                                                    <RotateCcw size={15} /> Return / Exchange
                                                </button>
                                                <button className={`${styles.actionBtn} ${styles.reorderBtn}`}>
                                                    <ShoppingBag size={15} /> Reorder
                                                </button>
                                            </>
                                        )}
                                        {order.status === 'shipped' && (
                                            <button className={`${styles.actionBtn} ${styles.reorderBtn}`}>
                                                <Truck size={15} /> Track Package
                                            </button>
                                        )}
                                        {order.status === 'cancelled' && (
                                            <button className={`${styles.actionBtn} ${styles.reorderBtn}`}>
                                                <ShoppingBag size={15} /> Reorder Items
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}