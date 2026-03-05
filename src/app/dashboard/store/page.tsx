'use client';

import React, { useState } from 'react';
import {
    ShoppingBag, Search, Star, ShoppingCart, X, CheckCircle2,
    Truck, Shield, RotateCcw, Tag, ChevronRight, Minus, Plus,
    Smartphone, Banknote, CreditCard, MapPin, Package, Zap,
    Heart, Eye, TrendingUp, Clock, Award, SlidersHorizontal
} from 'lucide-react';
import styles from './Store.module.css';
import { Button } from '@/components/Button';
import { useLanguage } from '@/lib/language-context';

type Category = 'All' | 'Nutrition' | 'Apparel' | 'Equipment' | 'Accessories' | 'Supplements';
type PaymentMethod = 'upi' | 'cod' | 'card';
type SortOption = 'best' | 'price_asc' | 'price_desc' | 'rating' | 'newest';

const PRODUCTS = [
    // ── NUTRITION (18) ──
    { id: 1,   name: 'HP Isolate Whey',        category: 'Nutrition',   price: 3499, mrp: 4299,  rating: 4.9, reviews: 1284, image: 'https://dms.mydukaan.io/original/jpeg/media/a107a886-abc6-4347-ba08-6afe76ef38ff.webp', tag: 'BEST SELLER', badge: 'bestseller', inStock: true,  deliveryDays: 2, desc: 'Ultra-pure whey isolate for rapid muscle recovery. 27g protein per serving, zero sugar, zero fat. Mixes instantly.' },
    { id: 2,   name: 'HP Creatine Monohydrate',      category: 'Nutrition',   price: 1099, mrp: 1499,  rating: 4.9, reviews: 654,  image: 'https://m.media-amazon.com/images/I/61kotip5wIL._AC_UF1000,1000_QL80_.jpg', tag: 'STRENGTH',   badge: 'bestseller', inStock: true,  deliveryDays: 2, desc: '100% pure micronized creatine monohydrate. 5g per serving, unflavored, mixes clear. Third-party tested.' },
    { id: 3,   name: 'HP Mass Gainer Pro',            category: 'Nutrition',   price: 2799, mrp: 3599,  rating: 4.6, reviews: 312,  image: 'https://img8.hkrtcdn.com/10129/prd_1012877_o.jpg', tag: 'BULKING',    badge: null,         inStock: true,  deliveryDays: 3, desc: '1250 kcal per serving, 50g protein, complex carbs blend for serious bulking phases.' },
    { id: 4,   name: 'HP Casein Night Protein',       category: 'Nutrition',   price: 2999, mrp: 3799,  rating: 4.7, reviews: 198,  image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=600', tag: 'NIGHT FUEL', badge: null,         inStock: true,  deliveryDays: 2, desc: 'Slow-release micellar casein for overnight muscle repair. 24g protein, rich chocolate flavour.' },
    { id: 5,   name: 'HP Peanut Butter Smooth',       category: 'Nutrition',   price: 699,  mrp: 999,   rating: 4.8, reviews: 876,  image: 'https://images.unsplash.com/photo-1585409677983-0f6c47d9d600?auto=format&fit=crop&q=80&w=600', tag: 'POPULAR',    badge: null,         inStock: true,  deliveryDays: 1, desc: 'No added sugar, no palm oil. Just pure roasted peanuts. 28g protein per 100g.' },
    { id: 6,   name: 'HP Omega-3 Fish Oil',           category: 'Nutrition',   price: 799,  mrp: 1099,  rating: 4.7, reviews: 421,  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=600', tag: 'ESSENTIAL',  badge: null,         inStock: true,  deliveryDays: 2, desc: '1000mg EPA+DHA per capsule, enteric coated, no fishy burps. 90 softgels per pack.' },
    { id: 7,   name: 'HP Pre-Workout Ignition',       category: 'Nutrition',   price: 1599, mrp: 2199,  rating: 4.8, reviews: 532,  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600', tag: 'ENERGY',     badge: 'new',        inStock: true,  deliveryDays: 2, desc: '200mg caffeine, beta-alanine, citrulline malate. No crash, sustained energy formula.' },
    { id: 8,   name: 'HP Collagen Peptides',          category: 'Nutrition',   price: 1299, mrp: 1799,  rating: 4.6, reviews: 267,  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600', tag: 'JOINTS',     badge: null,         inStock: true,  deliveryDays: 3, desc: 'Type I & III collagen, 10g per serving, unflavored. Mix in any drink or food.' },
    { id: 9,   name: 'HP Vegan Protein Blend',        category: 'Nutrition',   price: 2499, mrp: 3199,  rating: 4.5, reviews: 189,  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', tag: 'VEGAN',      badge: null,         inStock: true,  deliveryDays: 2, desc: 'Pea + rice protein blend, 22g protein, all essential amino acids. 100% dairy-free.' },
    { id: 10,  name: 'HP Multivitamin Elite',         category: 'Nutrition',   price: 599,  mrp: 899,   rating: 4.7, reviews: 1100, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600', tag: 'DAILY',      badge: null,         inStock: true,  deliveryDays: 1, desc: '23 vitamins & minerals, iron-free formula, easy-to-swallow tablets. 60-day supply.' },
    { id: 11,  name: 'HP ZMA Sleep Formula',          category: 'Nutrition',   price: 749,  mrp: 999,   rating: 4.5, reviews: 223,  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600', tag: 'SLEEP',      badge: null,         inStock: true,  deliveryDays: 2, desc: 'Zinc, magnesium & B6 to enhance deep sleep and overnight recovery quality.' },
    { id: 12,  name: 'HP Electrolyte Mix',            category: 'Nutrition',   price: 499,  mrp: 699,   rating: 4.8, reviews: 671,  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=600', tag: 'HYDRATION',  badge: null,         inStock: true,  deliveryDays: 1, desc: '5 key electrolytes, zero sugar, zero calories. Mango & lemon flavors available.' },
    { id: 13,  name: 'HP Ashwagandha KSM-66',         category: 'Nutrition',   price: 999,  mrp: 1399,  rating: 4.7, reviews: 445,  image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600', tag: 'STRESS',     badge: null,         inStock: true,  deliveryDays: 2, desc: '600mg KSM-66 ashwagandha extract. Reduces cortisol, boosts testosterone naturally.' },
    { id: 14,  name: 'HP Vitamin D3 + K2',            category: 'Nutrition',   price: 449,  mrp: 649,   rating: 4.8, reviews: 892,  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600', tag: 'IMMUNITY',   badge: null,         inStock: true,  deliveryDays: 1, desc: '2000 IU D3 + 100mcg K2 MK-7, olive oil base for superior absorption.' },
    { id: 15,  name: 'HP Protein Bars Box (12)',      category: 'Nutrition',   price: 1199, mrp: 1699,  rating: 4.6, reviews: 567,  image: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?auto=format&fit=crop&q=80&w=600', tag: 'SNACK',      badge: null,         inStock: true,  deliveryDays: 2, desc: '20g protein per bar, only 5g sugar, 5 flavors. No artificial sweeteners used.' },
    { id: 16,  name: 'HP Magnesium Glycinate',        category: 'Nutrition',   price: 649,  mrp: 899,   rating: 4.7, reviews: 312,  image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600', tag: 'MINERAL',    badge: null,         inStock: true,  deliveryDays: 2, desc: '400mg elemental magnesium in highly bioavailable glycinate form. Non-laxative.' },
    { id: 17,  name: 'HP Egg White Protein',          category: 'Nutrition',   price: 1899, mrp: 2499,  rating: 4.5, reviews: 143,  image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&q=80&w=600', tag: 'DAIRY FREE', badge: null,         inStock: true,  deliveryDays: 3, desc: 'Pure egg white protein, 100% lactose-free, 24g protein per scoop. Chocolate & vanilla.' },
    { id: 18,  name: 'HP Protein Cookie Box (8)',     category: 'Nutrition',   price: 799,  mrp: 1099,  rating: 4.6, reviews: 445,  image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600', tag: 'SNACK',      badge: null,         inStock: true,  deliveryDays: 2, desc: '15g protein per cookie. Choco chip, peanut butter & oats raisin flavors.' },

    // ── SUPPLEMENTS (16) ──
    { id: 19,  name: 'HP Metabolic Ignite',           category: 'Supplements', price: 1899, mrp: 2499,  rating: 4.7, reviews: 210,  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600', tag: 'AI PICK',    badge: 'ai',         inStock: true,  deliveryDays: 2, desc: 'Caffeine-free thermogenic formula for sustained fat oxidation. 8 active ingredients, clinically dosed.' },
    { id: 20,  name: 'HP BCAA Recovery',              category: 'Supplements', price: 1299, mrp: 1699,  rating: 4.6, reviews: 89,   image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=600', tag: 'RECOVERY',   badge: null,         inStock: true,  deliveryDays: 2, desc: '2:1:1 BCAA ratio with electrolytes and glutamine. Zero calories, available in 4 flavors. Ideal intra-workout.' },
    { id: 21,  name: 'HP Fat Burner Advanced',        category: 'Supplements', price: 1499, mrp: 1999,  rating: 4.5, reviews: 178,  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', tag: 'FAT BURN',   badge: null,         inStock: true,  deliveryDays: 3, desc: 'L-carnitine + green tea extract + CLA thermogenic complex. Stimulant-free option.' },
    { id: 22,  name: 'HP Testosterone Booster',       category: 'Supplements', price: 1699, mrp: 2299,  rating: 4.6, reviews: 267,  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600', tag: 'STRENGTH',   badge: null,         inStock: true,  deliveryDays: 2, desc: 'D-Aspartic acid, zinc, fenugreek & shilajit. Natural testosterone support formula.' },
    { id: 23,  name: 'HP Nitric Oxide Pump',          category: 'Supplements', price: 1399, mrp: 1899,  rating: 4.7, reviews: 198,  image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600', tag: 'PUMP',       badge: 'new',        inStock: true,  deliveryDays: 2, desc: 'L-citrulline malate 6g + agmatine sulfate for maximum vascularity and muscle pump.' },
    { id: 24,  name: 'HP Joint Support Complex',      category: 'Supplements', price: 1099, mrp: 1499,  rating: 4.6, reviews: 289,  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600', tag: 'JOINTS',     badge: null,         inStock: true,  deliveryDays: 2, desc: 'Glucosamine + chondroitin + MSM + collagen. Complete 90-day joint support supply.' },
    { id: 25,  name: 'HP Probiotics 50 Billion',      category: 'Supplements', price: 1199, mrp: 1699,  rating: 4.7, reviews: 334,  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600', tag: 'GUT HEALTH', badge: null,         inStock: true,  deliveryDays: 2, desc: '10 probiotic strains, 50 billion CFU, delayed-release capsule for gut survival.' },
    { id: 26,  name: 'HP Spirulina Tablets',          category: 'Supplements', price: 549,  mrp: 799,   rating: 4.5, reviews: 223,  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', tag: 'GREENS',     badge: null,         inStock: true,  deliveryDays: 2, desc: 'Organic spirulina, 500mg per tablet, 120 tablets per pack. Complete superfood profile.' },
    { id: 27,  name: 'HP Biotin 10000mcg',            category: 'Supplements', price: 399,  mrp: 599,   rating: 4.6, reviews: 678,  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600', tag: 'HAIR & SKIN',badge: null,         inStock: true,  deliveryDays: 1, desc: 'High-potency biotin 10000mcg for accelerated hair growth, strong nails, glowing skin.' },
    { id: 28,  name: 'HP Turmeric Curcumin',          category: 'Supplements', price: 699,  mrp: 999,   rating: 4.7, reviews: 445,  image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600', tag: 'ANTI-INFLAM',badge: null,         inStock: true,  deliveryDays: 2, desc: '95% curcuminoids with BioPerine for 20x absorption. 1500mg per serving, anti-inflammatory.' },
    { id: 29,  name: 'HP CoQ10 200mg',                category: 'Supplements', price: 1299, mrp: 1799,  rating: 4.6, reviews: 198,  image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600', tag: 'HEART',      badge: null,         inStock: true,  deliveryDays: 2, desc: 'Ubiquinol CoQ10 for mitochondrial energy production and cardiovascular health.' },
    { id: 30,  name: 'HP Detox Green Powder',         category: 'Supplements', price: 1199, mrp: 1699,  rating: 4.5, reviews: 189,  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', tag: 'GREENS',     badge: null,         inStock: true,  deliveryDays: 2, desc: '40 superfoods, probiotics, digestive enzymes and adaptogens. One scoop daily is enough.' },
    { id: 31,  name: 'HP Alpha GPC 300mg',            category: 'Supplements', price: 1499, mrp: 1999,  rating: 4.7, reviews: 134,  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600', tag: 'FOCUS',      badge: null,         inStock: true,  deliveryDays: 3, desc: 'Premium choline source for cognitive focus, memory retention and mind-muscle connection.' },
    { id: 32,  name: 'HP CLA 1000mg',                 category: 'Supplements', price: 899,  mrp: 1299,  rating: 4.4, reviews: 134,  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=600', tag: 'LEAN',       badge: null,         inStock: true,  deliveryDays: 2, desc: 'Conjugated linoleic acid 1000mg softgels, supports lean muscle retention during fat loss.' },
    { id: 33,  name: 'HP Intra-Workout Complex',      category: 'Supplements', price: 1599, mrp: 2099,  rating: 4.5, reviews: 145,  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600', tag: 'ENDURANCE',  badge: null,         inStock: true,  deliveryDays: 3, desc: 'EAAs + fast carbs + electrolytes. The perfect mid-workout anti-fatigue formula.' },
    { id: 34,  name: 'HP Liver Detox Formula',        category: 'Supplements', price: 799,  mrp: 1099,  rating: 4.4, reviews: 112,  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600', tag: 'DETOX',      badge: null,         inStock: true,  deliveryDays: 3, desc: 'Milk thistle 500mg + NAC + dandelion root. Comprehensive liver protection and repair support.' },

    // ── APPAREL (18) ──
    { id: 35,  name: 'HP V2 Cyber Shorts',            category: 'Apparel',     price: 1299, mrp: 1799,  rating: 4.8, reviews: 85,   image: 'https://images.unsplash.com/photo-1591197172023-c15c4de50ae4?auto=format&fit=crop&q=80&w=600', tag: 'NEW DROP',   badge: 'new',        inStock: true,  deliveryDays: 3, desc: 'High-performance tech fabric with 4-way stretch. Deep storage pockets, anti-odor treatment, sweat-wicking liner.' },
    { id: 36,  name: 'HP Compression Top',            category: 'Apparel',     price: 1599, mrp: 1999,  rating: 4.9, reviews: 64,   image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600', tag: 'ELITE GEAR', badge: 'elite',      inStock: true,  deliveryDays: 3, desc: 'Pro-grade graduated compression for maximum blood circulation. Flatlock seams prevent chafing during intense workouts.' },
    { id: 37,  name: 'HP Performance Joggers',        category: 'Apparel',     price: 1799, mrp: 2399,  rating: 4.7, reviews: 234,  image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=600', tag: 'COMFORT',    badge: null,         inStock: true,  deliveryDays: 3, desc: 'Tapered fit, zip side pockets, moisture-wicking inner lining. Available XS to 3XL.' },
    { id: 38,  name: 'HP DryFit Training Tee',        category: 'Apparel',     price: 799,  mrp: 1199,  rating: 4.6, reviews: 512,  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', tag: 'ESSENTIAL',  badge: null,         inStock: true,  deliveryDays: 2, desc: 'Lightweight 140gsm fabric, anti-microbial treatment, unisex regular fit. 6 colors available.' },
    { id: 39,  name: 'HP Muscle Fit Tank',            category: 'Apparel',     price: 699,  mrp: 999,   rating: 4.5, reviews: 389,  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600', tag: 'GYM READY',  badge: null,         inStock: true,  deliveryDays: 2, desc: 'Open back Y-design, cotton-modal blend, relaxed fit perfect for heavy lifting sessions.' },
    { id: 40,  name: 'HP Pro Hoodie',                 category: 'Apparel',     price: 2499, mrp: 3299,  rating: 4.8, reviews: 167,  image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&q=80&w=600', tag: 'PREMIUM',    badge: null,         inStock: true,  deliveryDays: 3, desc: '400gsm French terry cotton, kangaroo pocket, ribbed cuffs. Premium oversized fit.' },
    { id: 41,  name: 'HP Seamless Sports Bra',        category: 'Apparel',     price: 999,  mrp: 1399,  rating: 4.7, reviews: 298,  image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&q=80&w=600', tag: 'WOMEN',      badge: null,         inStock: true,  deliveryDays: 2, desc: 'Medium support, removable padding, 360° seamless stretch fabric. Sizes XS-XL.' },
    { id: 42,  name: 'HP High-Waist Leggings',        category: 'Apparel',     price: 1499, mrp: 1999,  rating: 4.9, reviews: 445,  image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=600', tag: 'WOMEN',      badge: 'bestseller', inStock: true,  deliveryDays: 2, desc: 'Squat-proof 4-way stretch, compression fit, hidden waistband pocket. Available in 8 colors.' },
    { id: 43,  name: 'HP Quarter Zip Pullover',       category: 'Apparel',     price: 1899, mrp: 2499,  rating: 4.6, reviews: 123,  image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600', tag: 'WINTER',     badge: null,         inStock: true,  deliveryDays: 3, desc: 'Brushed fleece interior, thumb holes at cuffs, subtle reflective HP logo detail.' },
    { id: 44,  name: 'HP Windbreaker Jacket',         category: 'Apparel',     price: 2999, mrp: 3999,  rating: 4.7, reviews: 78,   image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600', tag: 'OUTDOOR',    badge: null,         inStock: true,  deliveryDays: 4, desc: 'Packable windbreaker, water-resistant DWR coating, reflective details, underarm zip vents.' },
    { id: 45,  name: 'HP Compression Shorts',         category: 'Apparel',     price: 899,  mrp: 1299,  rating: 4.7, reviews: 267,  image: 'https://images.unsplash.com/photo-1591197172023-c15c4de50ae4?auto=format&fit=crop&q=80&w=600', tag: 'BASE LAYER', badge: null,         inStock: true,  deliveryDays: 2, desc: '7-inch inseam compression shorts, flat seams, moisture-wicking. Ideal base layer under shorts.' },
    { id: 46,  name: 'HP Training Gloves',            category: 'Apparel',     price: 599,  mrp: 899,   rating: 4.6, reviews: 412,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'GRIP',       badge: null,         inStock: true,  deliveryDays: 2, desc: 'Full palm padding, built-in wrist wrap, open-back ventilation panel. Sizes S to XXL.' },
    { id: 47,  name: 'HP Compression Socks 3-pack',   category: 'Apparel',     price: 449,  mrp: 649,   rating: 4.5, reviews: 567,  image: 'https://images.unsplash.com/photo-1556906781-9a414e2a2c6c?auto=format&fit=crop&q=80&w=600', tag: 'RECOVERY',   badge: null,         inStock: true,  deliveryDays: 1, desc: '15-20mmHg graduated compression, anti-blister toe seams. Pack of 3 pairs included.' },
    { id: 48,  name: 'HP Oversized Drop Tee',         category: 'Apparel',     price: 899,  mrp: 1299,  rating: 4.6, reviews: 334,  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', tag: 'STREETWEAR', badge: null,         inStock: true,  deliveryDays: 2, desc: 'Drop shoulder silhouette, boxy cut, 200gsm heavyweight cotton. 5 fresh colorways.' },
    { id: 49,  name: 'HP Camo Print Joggers',         category: 'Apparel',     price: 1599, mrp: 2199,  rating: 4.5, reviews: 89,   image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=600', tag: 'LIMITED',    badge: 'new',        inStock: true,  deliveryDays: 3, desc: 'Military camo print, elasticated drawstring waist, tapered ankle fit. Limited run.' },
    { id: 50,  name: 'HP Tie-Dye Training Set',       category: 'Apparel',     price: 1999, mrp: 2699,  rating: 4.6, reviews: 134,  image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&q=80&w=600', tag: 'WOMEN SET',  badge: 'new',        inStock: true,  deliveryDays: 3, desc: 'Matching sports bra + leggings set in vibrant tie-dye. Available in 4 color options.' },
    { id: 51,  name: 'HP Gym Snapback Cap',           category: 'Apparel',     price: 599,  mrp: 799,   rating: 4.4, reviews: 223,  image: 'https://images.unsplash.com/photo-1521369909029-2afed882baaa?auto=format&fit=crop&q=80&w=600', tag: 'HEADWEAR',   badge: null,         inStock: true,  deliveryDays: 2, desc: '5-panel structured snapback, embroidered HP logo, adjustable back closure. One size fits all.' },
    { id: 52,  name: 'HP Dry Fit Polo',               category: 'Apparel',     price: 1099, mrp: 1499,  rating: 4.5, reviews: 178,  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', tag: 'SMART CASUAL',badge: null,        inStock: true,  deliveryDays: 2, desc: 'Pique knit polyester polo, moisture-wicking, 3-button placket. Gym to street versatility.' },

    // ── EQUIPMENT (18) ──
    { id: 53,  name: 'HP Impact Yoga Mat',            category: 'Equipment',   price: 1499, mrp: 1999,  rating: 4.7, reviews: 156,  image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=600', tag: 'PREMIUM',    badge: null,         inStock: true,  deliveryDays: 3, desc: '6mm thick eco-friendly TPE mat with alignment guides. Superior grip, easy to clean, carry strap included.' },
    { id: 54,  name: 'HP Resistance Bands Set',       category: 'Equipment',   price: 999,  mrp: 1499,  rating: 4.8, reviews: 420,  image: 'https://images.unsplash.com/photo-1598266663412-7bb3d09a066b?auto=format&fit=crop&q=80&w=600', tag: 'HOME GYM',   badge: null,         inStock: true,  deliveryDays: 2, desc: 'Set of 5 premium latex bands (5–40kg resistance). Includes door anchor, handles, ankle straps, and carry bag.' },
    { id: 55,  name: 'HP Weightlifting Belt',         category: 'Equipment',   price: 1899, mrp: 2699,  rating: 4.7, reviews: 112,  image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600', tag: 'PRO GEAR',   badge: 'elite',      inStock: false, deliveryDays: 5, desc: 'Genuine full-grain leather belt, 10cm wide. Double prong buckle for maximum support during heavy lifts.' },
    { id: 56,  name: 'HP Foam Roller Pro',            category: 'Equipment',   price: 1199, mrp: 1699,  rating: 4.8, reviews: 334,  image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600', tag: 'RECOVERY',   badge: null,         inStock: true,  deliveryDays: 2, desc: 'High-density EVA foam, 45cm length, 3 texture zones for targeted myofascial release.' },
    { id: 57,  name: 'HP Pull-Up Bar',                category: 'Equipment',   price: 1599, mrp: 2199,  rating: 4.7, reviews: 267,  image: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?auto=format&fit=crop&q=80&w=600', tag: 'HOME GYM',   badge: null,         inStock: true,  deliveryDays: 3, desc: 'Door-mounted, no screws required, 12 grip positions, 150kg weight capacity guaranteed.' },
    { id: 58,  name: 'HP Adjustable Dumbbells',       category: 'Equipment',   price: 8999, mrp: 11999, rating: 4.9, reviews: 89,   image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?auto=format&fit=crop&q=80&w=600', tag: 'PREMIUM',    badge: 'elite',      inStock: true,  deliveryDays: 5, desc: '5–25kg per dumbbell, tool-free quick adjustment system, compact storage rack included.' },
    { id: 59,  name: 'HP Ab Roller Wheel',            category: 'Equipment',   price: 599,  mrp: 899,   rating: 4.6, reviews: 678,  image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600', tag: 'CORE',       badge: null,         inStock: true,  deliveryDays: 2, desc: 'Extra-wide dual wheel for stability, ergonomic foam handles, thick knee pad included.' },
    { id: 60,  name: 'HP Jump Rope Speed',            category: 'Equipment',   price: 699,  mrp: 999,   rating: 4.7, reviews: 445,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'CARDIO',     badge: null,         inStock: true,  deliveryDays: 1, desc: '4mm steel cable, sealed ball bearings, adjustable length, 3m/s capable. Carry case included.' },
    { id: 61,  name: 'HP Kettlebell 16kg',            category: 'Equipment',   price: 1799, mrp: 2299,  rating: 4.8, reviews: 134,  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600', tag: 'STRENGTH',   badge: null,         inStock: true,  deliveryDays: 4, desc: 'Cast iron with vinyl coating, flat base for push-up use. Available in 8/12/16/20/24kg.' },
    { id: 62,  name: 'HP Battle Rope 9m',             category: 'Equipment',   price: 2999, mrp: 3999,  rating: 4.7, reviews: 56,   image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600', tag: 'HIIT',       badge: null,         inStock: true,  deliveryDays: 5, desc: '38mm manila rope, heat-shrunk ends, wall anchor plate and carry bag included.' },
    { id: 63,  name: 'HP Suspension Trainer',         category: 'Equipment',   price: 2199, mrp: 2999,  rating: 4.8, reviews: 167,  image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=600', tag: 'BODYWEIGHT', badge: null,         inStock: true,  deliveryDays: 3, desc: 'Door anchor + ceiling mount, adjustable straps, 200+ exercises, compact carry bag.' },
    { id: 64,  name: 'HP Massage Gun Lite',           category: 'Equipment',   price: 3999, mrp: 5499,  rating: 4.8, reviews: 234,  image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600', tag: 'RECOVERY',   badge: 'new',        inStock: true,  deliveryDays: 3, desc: '6 attachment heads, 5 speed levels, 2400rpm, 6-hour battery life, whisper-quiet motor.' },
    { id: 65,  name: 'HP Speed Agility Ladder',       category: 'Equipment',   price: 799,  mrp: 1099,  rating: 4.6, reviews: 223,  image: 'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?auto=format&fit=crop&q=80&w=600', tag: 'SPEED',      badge: null,         inStock: true,  deliveryDays: 2, desc: '10-rung adjustable nylon agility ladder, 8 cones, 4 hurdles, carry bag included.' },
    { id: 66,  name: 'HP Wrist Wraps 18-inch',        category: 'Equipment',   price: 499,  mrp: 699,   rating: 4.7, reviews: 567,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'SUPPORT',    badge: null,         inStock: true,  deliveryDays: 1, desc: '18-inch stiff cotton wraps, thumb loop, hook-and-loop closure. IPF approved style.' },
    { id: 67,  name: 'HP Recovery Boots',             category: 'Equipment',   price: 6999, mrp: 8999,  rating: 4.9, reviews: 45,   image: 'https://images.unsplash.com/photo-1598266663412-7bb3d09a066b?auto=format&fit=crop&q=80&w=600', tag: 'ELITE REC',  badge: 'elite',      inStock: true,  deliveryDays: 5, desc: 'Sequential air compression, 4 chambers, 4 pressure levels. Full leg recovery system.' },
    { id: 68,  name: 'HP Push-Up Board 12-in-1',      category: 'Equipment',   price: 899,  mrp: 1299,  rating: 4.5, reviews: 312,  image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600', tag: 'CHEST',      badge: null,         inStock: true,  deliveryDays: 2, desc: '12 position color-coded push-up board with resistance band attachment. Non-slip base.' },
    { id: 69,  name: 'HP Parallettes Steel Set',      category: 'Equipment',   price: 2499, mrp: 3299,  rating: 4.6, reviews: 78,   image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=600', tag: 'CALISTHENICS',badge: null,        inStock: true,  deliveryDays: 4, desc: 'Heavy-gauge steel frame, non-slip rubber feet, 120kg capacity per bar, low profile design.' },
    { id: 70,  name: 'HP Full Body Roller Kit',       category: 'Equipment',   price: 1799, mrp: 2499,  rating: 4.8, reviews: 234,  image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600', tag: 'RECOVERY',   badge: null,         inStock: true,  deliveryDays: 3, desc: 'Foam roller + spiky massage ball + peanut roller. Complete 3-piece recovery kit.' },

    // ── ACCESSORIES (20) ──
    { id: 71,  name: 'HP Pro Gym Bag 40L',            category: 'Accessories', price: 2199, mrp: 2999,  rating: 4.8, reviews: 340,  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', tag: 'ESSENTIAL',  badge: null,         inStock: true,  deliveryDays: 2, desc: 'Waterproof 40L duffel with ventilated shoe compartment, wet pocket, and padded laptop sleeve.' },
    { id: 72,  name: 'HP Hydro Steel Bottle 1L',      category: 'Accessories', price: 899,  mrp: 1299,  rating: 4.9, reviews: 512,  image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600', tag: 'POPULAR',    badge: null,         inStock: true,  deliveryDays: 1, desc: 'Double-wall vacuum insulated 1L bottle. Keeps water cold 24h, hot 12h. BPA-free, leak-proof cap.' },
    { id: 73,  name: 'HP Power Shaker 600ml',         category: 'Accessories', price: 499,  mrp: 699,   rating: 4.5, reviews: 890,  image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&q=80&w=600', tag: 'ESSENTIAL',  badge: null,         inStock: true,  deliveryDays: 1, desc: 'Leak-proof BlenderBall shaker with 600ml capacity. Dishwasher safe, measurement markings, secure flip cap.' },
    { id: 74,  name: 'HP Gym Towel Microfibre',       category: 'Accessories', price: 399,  mrp: 599,   rating: 4.6, reviews: 678,  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=600', tag: 'GYM MUST',   badge: null,         inStock: true,  deliveryDays: 1, desc: 'Ultra-absorbent 400gsm microfibre, quick-dry technology, 60x120cm size, 4 color options.' },
    { id: 75,  name: 'HP Stainless Steel Shaker',     category: 'Accessories', price: 799,  mrp: 1099,  rating: 4.7, reviews: 334,  image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&q=80&w=600', tag: 'PREMIUM',    badge: null,         inStock: true,  deliveryDays: 2, desc: '700ml steel shaker, separate powder compartment, ergonomic handle, leak-proof lid.' },
    { id: 76,  name: 'HP Fitness Journal',            category: 'Accessories', price: 549,  mrp: 799,   rating: 4.7, reviews: 223,  image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600', tag: 'TRACK',      badge: null,         inStock: true,  deliveryDays: 2, desc: '13-week workout planner with nutrition tracking pages and progress photo sections.' },
    { id: 77,  name: 'HP Gym Earbuds IPX5',           category: 'Accessories', price: 1999, mrp: 2799,  rating: 4.6, reviews: 312,  image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600', tag: 'AUDIO',      badge: 'new',        inStock: true,  deliveryDays: 3, desc: 'IPX5 waterproof, 30h total battery, ear hook design, secure fit during any workout.' },
    { id: 78,  name: 'HP Knee Sleeves Pair',          category: 'Accessories', price: 899,  mrp: 1299,  rating: 4.8, reviews: 445,  image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=600', tag: 'SUPPORT',    badge: null,         inStock: true,  deliveryDays: 2, desc: '5mm neoprene compression sleeves, reinforced stitching, patella support ring. Sizes S-XXL.' },
    { id: 79,  name: 'HP Elbow Sleeves Pair',         category: 'Accessories', price: 699,  mrp: 999,   rating: 4.6, reviews: 267,  image: 'https://images.unsplash.com/photo-1598266663412-7bb3d09a066b?auto=format&fit=crop&q=80&w=600', tag: 'SUPPORT',    badge: null,         inStock: true,  deliveryDays: 2, desc: '3mm neoprene, joint warmth and compression, ideal for heavy bench and overhead pressing.' },
    { id: 80,  name: 'HP Grip Chalk 8-pack',          category: 'Accessories', price: 249,  mrp: 349,   rating: 4.8, reviews: 567,  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600', tag: 'GRIP',       badge: null,         inStock: true,  deliveryDays: 1, desc: '8 chalk blocks, 2oz each. Odorless magnesium carbonate formula for maximum grip performance.' },
    { id: 81,  name: 'HP Resistance Loop Bands',      category: 'Accessories', price: 449,  mrp: 649,   rating: 4.7, reviews: 789,  image: 'https://images.unsplash.com/photo-1598266663412-7bb3d09a066b?auto=format&fit=crop&q=80&w=600', tag: 'MOBILITY',   badge: null,         inStock: true,  deliveryDays: 1, desc: 'Set of 5 flat loop resistance bands. Perfect for glute activation, mobility and rehab work.' },
    { id: 82,  name: 'HP Posture Corrector',          category: 'Accessories', price: 899,  mrp: 1299,  rating: 4.5, reviews: 412,  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600', tag: 'POSTURE',    badge: null,         inStock: true,  deliveryDays: 2, desc: 'Adjustable back brace, breathable mesh fabric, figure-8 design. Unisex sizes S-XL.' },
    { id: 83,  name: 'HP Cooling Towel',              category: 'Accessories', price: 349,  mrp: 499,   rating: 4.6, reviews: 289,  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=600', tag: 'HEAT RELIEF',badge: null,         inStock: true,  deliveryDays: 1, desc: 'Instant cooling on activation, reusable up to 100 times, 30x90cm, comes with carry case.' },
    { id: 84,  name: 'HP Liquid Chalk 250ml',         category: 'Accessories', price: 399,  mrp: 599,   rating: 4.7, reviews: 445,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'GRIP',       badge: null,         inStock: true,  deliveryDays: 1, desc: 'No-mess liquid chalk, dries in 30 seconds, lasts 3x longer than block chalk.' },
    { id: 85,  name: 'HP Insulated Meal Prep Bag',    category: 'Accessories', price: 1399, mrp: 1899,  rating: 4.8, reviews: 312,  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', tag: 'MEAL PREP',  badge: null,         inStock: true,  deliveryDays: 2, desc: '6 BPA-free containers, reusable ice pack, 15L insulated capacity. Structured design.' },
    { id: 86,  name: 'HP Pill Organizer 7-Day',       category: 'Accessories', price: 299,  mrp: 449,   rating: 4.5, reviews: 445,  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=600', tag: 'ORGANIZE',   badge: null,         inStock: true,  deliveryDays: 1, desc: 'Airtight snap compartments, portable compact design, 7-day AM/PM medication setup.' },
    { id: 87,  name: 'HP Gym Lock Combo',             category: 'Accessories', price: 299,  mrp: 449,   rating: 4.4, reviews: 223,  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', tag: 'SECURITY',   badge: null,         inStock: true,  deliveryDays: 1, desc: '4-digit resettable combination lock, hardened steel shackle. Gym locker specification.' },
    { id: 88,  name: 'HP Combat Sports Bag 60L',      category: 'Accessories', price: 2799, mrp: 3799,  rating: 4.8, reviews: 167,  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', tag: 'SPORT',      badge: null,         inStock: true,  deliveryDays: 3, desc: '60L tactical duffel, multiple compartments, ventilated base, shoulder + hand carry straps.' },
    { id: 89,  name: 'HP Dry Bag 10L',                category: 'Accessories', price: 799,  mrp: 1099,  rating: 4.7, reviews: 178,  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', tag: 'WATERPROOF', badge: null,         inStock: true,  deliveryDays: 2, desc: 'PVC roll-top waterproof bag, 10L capacity, perfect for swimming and outdoor sports.' },
    { id: 90,  name: 'HP Gym First Aid Kit',          category: 'Accessories', price: 699,  mrp: 999,   rating: 4.6, reviews: 178,  image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600', tag: 'SAFETY',     badge: null,         inStock: true,  deliveryDays: 2, desc: 'Sports tape, instant ice pack, bandages, antiseptic wipes. Complete gym-specific first aid.' },

    // ── EXTRAS (10) ──
    { id: 91,  name: 'HP Berberine HCl 500mg',        category: 'Supplements', price: 999,  mrp: 1399,  rating: 4.5, reviews: 145,  image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600', tag: 'METABOLIC',  badge: null,         inStock: true,  deliveryDays: 2, desc: 'Berberine HCl for blood sugar regulation, metabolic health and cholesterol support.' },
    { id: 92,  name: 'HP Collagen Beauty Blend',      category: 'Supplements', price: 1399, mrp: 1899,  rating: 4.6, reviews: 223,  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600', tag: 'BEAUTY',     badge: null,         inStock: true,  deliveryDays: 2, desc: 'Marine collagen + hyaluronic acid + vitamin C. Skin elasticity and deep hydration formula.' },
    { id: 93,  name: 'HP Sandbag 20kg',               category: 'Equipment',   price: 1699, mrp: 2299,  rating: 4.5, reviews: 67,   image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600', tag: 'FUNCTIONAL', badge: null,         inStock: true,  deliveryDays: 4, desc: 'Durable canvas outer shell, 4 inner filler bags, reinforced carry handles and straps.' },
    { id: 94,  name: 'HP Plyo Box 3-in-1',            category: 'Equipment',   price: 3499, mrp: 4699,  rating: 4.7, reviews: 45,   image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=600', tag: 'POWER',      badge: null,         inStock: true,  deliveryDays: 6, desc: 'Solid wood plyo box, 3 heights: 20/24/30 inches. Anti-slip surface, 160kg rated capacity.' },
    { id: 95,  name: 'HP Gym Chalk Bag',              category: 'Equipment',   price: 649,  mrp: 899,   rating: 4.7, reviews: 178,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'CLIMBING',   badge: null,         inStock: true,  deliveryDays: 2, desc: 'Canvas chalk bag with drawstring, belt loop, brush holder. Works for gym and climbing.' },
    { id: 96,  name: 'HP Protein Funnel 6-pack',      category: 'Accessories', price: 199,  mrp: 299,   rating: 4.5, reviews: 334,  image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&q=80&w=600', tag: 'CARRY',      badge: null,         inStock: true,  deliveryDays: 1, desc: 'Pack of 6 powder funnels, fits all standard shaker mouths. Travel-friendly design.' },
    { id: 97,  name: 'HP Skipping Counter Digital',   category: 'Accessories', price: 349,  mrp: 499,   rating: 4.4, reviews: 134,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'CARDIO',     badge: null,         inStock: true,  deliveryDays: 1, desc: 'Digital rep + calorie counter, clip-on design fits any jump rope handle. Battery included.' },
    { id: 98,  name: 'HP Smartwatch Sport Band',      category: 'Accessories', price: 599,  mrp: 899,   rating: 4.4, reviews: 189,  image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&q=80&w=600', tag: 'TECH',       badge: null,         inStock: true,  deliveryDays: 2, desc: 'Breathable silicone sport band, compatible with Apple Watch 38/40/41/42/44/45mm.' },
    { id: 99,  name: 'HP Speed Ladder Pro Set',       category: 'Equipment',   price: 1299, mrp: 1799,  rating: 4.6, reviews: 134,  image: 'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?auto=format&fit=crop&q=80&w=600', tag: 'SPORT',      badge: null,         inStock: true,  deliveryDays: 3, desc: '6m agility ladder + 12 cones + 4 mini hurdles + carry bag. Complete speed training kit.' },
    { id: 100, name: 'HP Glutamine Recovery 500g',    category: 'Supplements', price: 899,  mrp: 1299,  rating: 4.6, reviews: 334,  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=600', tag: 'RECOVERY',   badge: null,         inStock: true,  deliveryDays: 2, desc: 'Pure L-glutamine 5g per serving. Supports muscle recovery and gut health. Unflavored.' },
];

const CATEGORIES: Category[] = ['All', 'Nutrition', 'Apparel', 'Equipment', 'Accessories', 'Supplements'];

interface CartItem { id: number; qty: number; }

export default function WellnessStorePage() {
    const { t } = useLanguage();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<Category>('All');
    const [sortBy, setSortBy] = useState<SortOption>('best');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
    const [upiId, setUpiId] = useState('');
    const [address, setAddress] = useState({ name: '', phone: '', pincode: '', city: '', line: '' });
    const [processing, setProcessing] = useState(false);
    const [justAdded, setJustAdded] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(20);

    const addToCart = (id: number) => {
        setCart(prev => {
            const ex = prev.find(i => i.id === id);
            return ex ? prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { id, qty: 1 }];
        });
        setJustAdded(id);
        setTimeout(() => setJustAdded(null), 2000);
    };

    const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
    const updateQty = (id: number, delta: number) => {
        setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
    };
    const toggleWishlist = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const totalItems = cart.reduce((a, i) => a + i.qty, 0);
    const subtotal = cart.reduce((a, i) => a + (PRODUCTS.find(p => p.id === i.id)?.price || 0) * i.qty, 0);
    const savings = cart.reduce((a, i) => a + ((PRODUCTS.find(p => p.id === i.id)?.mrp || 0) - (PRODUCTS.find(p => p.id === i.id)?.price || 0)) * i.qty, 0);
    const shipping = subtotal >= 999 ? 0 : 79;
    const total = subtotal + shipping;

    const SORT_LABELS: Record<SortOption, string> = {
        best: 'Best Match', price_asc: 'Price: Low to High',
        price_desc: 'Price: High to Low', rating: 'Top Rated', newest: 'Newest First'
    };

    const sortedFiltered = PRODUCTS
        .filter(p => {
            const matchCat = activeFilter === 'All' || p.category === activeFilter;
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'newest') return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0);
            return b.reviews - a.reviews;
        });

    const visibleProducts = sortedFiltered.slice(0, visibleCount);

    const handlePlaceOrder = async () => {
        setProcessing(true);
        await new Promise(r => setTimeout(r, 2000));
        setProcessing(false);
        setCheckoutStep('success');
        setTimeout(() => {
            setCart([]);
            setCheckoutStep('cart');
            setIsCartOpen(false);
        }, 4000);
    };

    const discount = Math.round(((PRODUCTS.find(p => p.id === selectedProduct?.id)?.mrp || 0) - (selectedProduct?.price || 0)) / (PRODUCTS.find(p => p.id === selectedProduct?.id)?.mrp || 1) * 100);

    return (
        <div className={styles.container}>

            {/* ── Header ── */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Wellness <span className={styles.grad}>Store</span></h1>
                    <p className={styles.subtitle}>Premium health & fitness gear, delivered to your door</p>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.trustRow}>
                        <span className={styles.trustPill}><Truck size={13} /> Free delivery ₹999+</span>
                        <span className={styles.trustPill}><RotateCcw size={13} /> 7-day returns</span>
                    </div>
                    <button className={styles.cartBtn} onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}>
                        <ShoppingCart size={22} />
                        <span>Bag</span>
                        {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                    </button>
                </div>
            </header>

            {/* ── Promo Banner ── */}
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <p className={styles.bannerEyebrow}><Tag size={13} /> MEMBER EXCLUSIVE OFFER</p>
                    <h2 className={styles.bannerTitle}>Flat 15% OFF<br /><span>on all supplements</span></h2>
                    <p className={styles.bannerCode}>Use code <strong>HPELITE15</strong> at checkout</p>
                    <div className={styles.bannerCtas}>
                        <button className={styles.bannerBtn} onClick={() => { setActiveFilter('Supplements'); setVisibleCount(20); }}>Shop Supplements <ChevronRight size={16} /></button>
                        <div className={styles.bannerTimer}><Clock size={14} /> Ends in 23:47:12</div>
                    </div>
                </div>
                <div className={styles.bannerVisual}>
                    <div className={styles.bannerOrb} />
                    <ShoppingBag size={140} strokeWidth={0.8} />
                </div>
            </div>

            {/* ── Controls ── */}
            <div className={styles.controls}>
                <div className={styles.searchWrap}>
                    <Search size={18} className={styles.searchIcon} />
                    <input className={styles.searchInput} placeholder="Search 100 products..." value={search} onChange={e => { setSearch(e.target.value); setVisibleCount(20); }} />
                    {search && <button className={styles.clearSearch} onClick={() => setSearch('')}><X size={16} /></button>}
                </div>
                <div className={styles.chips}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => { setActiveFilter(cat); setVisibleCount(20); }}
                            className={`${styles.chip} ${activeFilter === cat ? styles.activeChip : ''}`}>
                            {cat}
                            <span className={styles.chipCount}>{cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Results row + Sort ── */}
            <div className={styles.resultsRow}>
                <span className={styles.resultsCount}>{sortedFiltered.length} products {activeFilter !== 'All' && `in ${activeFilter}`}</span>
                <div className={styles.sortWrap}>
                    <button className={styles.sortBtn} onClick={() => setShowSortMenu(v => !v)}>
                        <SlidersHorizontal size={15} /> {SORT_LABELS[sortBy]}
                    </button>
                    {showSortMenu && (
                        <div className={styles.sortMenu}>
                            {(Object.keys(SORT_LABELS) as SortOption[]).map(opt => (
                                <button key={opt}
                                    className={`${styles.sortOption} ${sortBy === opt ? styles.sortOptionActive : ''}`}
                                    onClick={() => { setSortBy(opt); setShowSortMenu(false); }}>
                                    {SORT_LABELS[opt]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Product Grid ── */}
            <div className={styles.grid}>
                {visibleProducts.map(prod => {
                    const inCart = cart.find(c => c.id === prod.id);
                    const discPct = Math.round((prod.mrp - prod.price) / prod.mrp * 100);
                    const isWished = wishlist.includes(prod.id);
                    return (
                        <div key={prod.id} className={styles.card}>
                            <div className={styles.imgWrap} onClick={() => setSelectedProduct(prod)}>
                                <img src={prod.image} alt={prod.name} className={styles.img} loading="lazy" />
                                <div className={styles.discPill}>-{discPct}%</div>
                                {prod.tag && <div className={`${styles.tag} ${styles[`tag_${prod.badge || 'default'}`]}`}>{prod.tag}</div>}
                                {!prod.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
                                <button className={`${styles.wishBtn} ${isWished ? styles.wished : ''}`} onClick={e => { e.stopPropagation(); toggleWishlist(prod.id); }}>
                                    <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
                                </button>
                                <button className={styles.quickView} onClick={e => { e.stopPropagation(); setSelectedProduct(prod); }}>
                                    <Eye size={14} /> Quick View
                                </button>
                            </div>

                            <div className={styles.cardBody}>
                                <span className={styles.cardCat}>{prod.category}</span>
                                <h3 className={styles.cardName}>{prod.name}</h3>
                                <p className={styles.cardDesc}>{prod.desc}</p>

                                <div className={styles.ratingRow}>
                                    <div className={styles.stars}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < Math.floor(prod.rating) ? '#F59E0B' : 'none'} stroke={i < Math.floor(prod.rating) ? '#F59E0B' : '#D1D5DB'} />
                                        ))}
                                    </div>
                                    <span className={styles.ratingText}>{prod.rating} <span className={styles.reviewCount}>({prod.reviews})</span></span>
                                </div>

                                <div className={styles.priceRow}>
                                    <div className={styles.prices}>
                                        <span className={styles.price}>₹{prod.price.toLocaleString()}</span>
                                        <span className={styles.mrp}>₹{prod.mrp.toLocaleString()}</span>
                                    </div>
                                    <span className={styles.saved}>Save ₹{(prod.mrp - prod.price).toLocaleString()}</span>
                                </div>

                                <div className={styles.deliveryInfo}>
                                    <Truck size={12} />
                                    {prod.inStock
                                        ? <span>Delivery in <strong>{prod.deliveryDays} days</strong></span>
                                        : <span className={styles.oos}>Currently out of stock</span>}
                                </div>

                                <button
                                    disabled={!prod.inStock}
                                    onClick={() => addToCart(prod.id)}
                                    className={`${styles.addBtn} ${inCart ? styles.addBtnActive : ''} ${!prod.inStock ? styles.addBtnDisabled : ''}`}
                                >
                                    {justAdded === prod.id ? (
                                        <><CheckCircle2 size={16} /> Added!</>
                                    ) : inCart ? (
                                        <><ShoppingCart size={16} /> {inCart.qty} in Bag</>
                                    ) : prod.inStock ? (
                                        <><ShoppingCart size={16} /> Add to Bag</>
                                    ) : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Load More ── */}
            {visibleCount < sortedFiltered.length && (
                <div className={styles.loadMoreWrap}>
                    <button className={styles.loadMoreBtn} onClick={() => setVisibleCount(v => v + 20)}>
                        Load More — {sortedFiltered.length - visibleCount} more products
                    </button>
                </div>
            )}

            {sortedFiltered.length === 0 && (
                <div className={styles.empty}>
                    <ShoppingBag size={48} />
                    <p>No products match your search.</p>
                    <button onClick={() => { setSearch(''); setActiveFilter('All'); }}>Clear filters</button>
                </div>
            )}

            {/* ── Trust Strip ── */}
            <div className={styles.trustStrip}>
                {[
                    { icon: <Truck size={22} />, title: 'Free Delivery', sub: 'On orders above ₹999' },
                    { icon: <RotateCcw size={22} />, title: '7-Day Returns', sub: 'No questions asked' },
                    { icon: <Shield size={22} />, title: '100% Authentic', sub: 'Verified & quality tested' },
                    { icon: <Award size={22} />, title: 'Member Rewards', sub: '1 point per ₹10 spent' },
                ].map((item, i) => (
                    <div key={i} className={styles.trustItem}>
                        <div className={styles.trustIcon}>{item.icon}</div>
                        <div>
                            <p className={styles.trustTitle}>{item.title}</p>
                            <p className={styles.trustSub}>{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Product Detail Modal ── */}
            {selectedProduct && (
                <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={() => setSelectedProduct(null)}><X size={20} /></button>
                        <div className={styles.modalGrid}>
                            <div className={styles.modalImgWrap}>
                                <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.modalImg} />
                                <div className={styles.modalDiscPill}>-{discount}% OFF</div>
                            </div>
                            <div className={styles.modalInfo}>
                                <span className={styles.modalCat}>{selectedProduct.category}</span>
                                <h2 className={styles.modalName}>{selectedProduct.name}</h2>
                                <div className={styles.modalRating}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < Math.floor(selectedProduct.rating) ? '#F59E0B' : 'none'} stroke={i < Math.floor(selectedProduct.rating) ? '#F59E0B' : '#D1D5DB'} />
                                    ))}
                                    <span>{selectedProduct.rating} · {selectedProduct.reviews} reviews</span>
                                </div>
                                <p className={styles.modalDesc}>{selectedProduct.desc}</p>

                                <div className={styles.modalPriceRow}>
                                    <span className={styles.modalPrice}>₹{selectedProduct.price.toLocaleString()}</span>
                                    <span className={styles.modalMrp}>MRP ₹{selectedProduct.mrp.toLocaleString()}</span>
                                    <span className={styles.modalSaved}>You save ₹{(selectedProduct.mrp - selectedProduct.price).toLocaleString()}</span>
                                </div>

                                <div className={styles.modalMeta}>
                                    <div className={styles.metaRow}><Truck size={15} /> <span>Delivery in <strong>{selectedProduct.deliveryDays} business days</strong></span></div>
                                    <div className={styles.metaRow}><RotateCcw size={15} /> <span>7-day easy returns</span></div>
                                    <div className={styles.metaRow}><Shield size={15} /> <span>100% authentic & quality tested</span></div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button className={styles.modalAddBtn} disabled={!selectedProduct.inStock} onClick={() => { addToCart(selectedProduct.id); setSelectedProduct(null); }}>
                                        <ShoppingCart size={18} />
                                        {selectedProduct.inStock ? 'Add to Bag' : 'Out of Stock'}
                                    </button>
                                    <button className={`${styles.modalWishBtn} ${wishlist.includes(selectedProduct.id) ? styles.wished : ''}`} onClick={() => toggleWishlist(selectedProduct.id)}>
                                        <Heart size={18} fill={wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'} />
                                    </button>
                                </div>

                                <div className={styles.payIcons}>
                                    <Smartphone size={16} /> UPI &nbsp;·&nbsp;
                                    <Banknote size={16} /> COD &nbsp;·&nbsp;
                                    <CreditCard size={16} /> Cards accepted
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Cart / Checkout Drawer ── */}
            {isCartOpen && (
                <div className={styles.drawerOverlay} onClick={() => setIsCartOpen(false)}>
                    <div className={styles.drawer} onClick={e => e.stopPropagation()}>

                        {/* Drawer Header */}
                        <div className={styles.drawerHeader}>
                            <div className={styles.drawerHeaderLeft}>
                                {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
                                    <button className={styles.backBtn} onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'address' : 'cart')}>←</button>
                                )}
                                <h2 className={styles.drawerTitle}>
                                    {checkoutStep === 'cart' && `Your Bag ${totalItems > 0 ? `(${totalItems})` : ''}`}
                                    {checkoutStep === 'address' && 'Delivery Address'}
                                    {checkoutStep === 'payment' && 'Payment'}
                                    {checkoutStep === 'success' && 'Order Placed!'}
                                </h2>
                            </div>
                            <button className={styles.drawerClose} onClick={() => setIsCartOpen(false)}><X size={22} /></button>
                        </div>

                        {/* Step: Cart */}
                        {checkoutStep === 'cart' && (
                            <>
                                {cart.length === 0 ? (
                                    <div className={styles.emptyCart}>
                                        <ShoppingBag size={56} />
                                        <p>Your bag is empty</p>
                                        <button onClick={() => setIsCartOpen(false)}>Start Shopping</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.cartItems}>
                                            {cart.map(item => {
                                                const p = PRODUCTS.find(x => x.id === item.id)!;
                                                return (
                                                    <div key={item.id} className={styles.cartItem}>
                                                        <img src={p.image} alt={p.name} className={styles.cartImg} />
                                                        <div className={styles.cartItemInfo}>
                                                            <p className={styles.cartItemName}>{p.name}</p>
                                                            <p className={styles.cartItemCat}>{p.category}</p>
                                                            <div className={styles.cartPriceRow}>
                                                                <span className={styles.cartItemPrice}>₹{(p.price * item.qty).toLocaleString()}</span>
                                                                <span className={styles.cartItemMrp}>₹{(p.mrp * item.qty).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.qtyControls}>
                                                            <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, -1)}><Minus size={14} /></button>
                                                            <span>{item.qty}</span>
                                                            <button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className={styles.cartFooter}>
                                            {savings > 0 && (
                                                <div className={styles.savingsBanner}>
                                                    <Tag size={14} /> You're saving <strong>₹{savings.toLocaleString()}</strong> on this order!
                                                </div>
                                            )}
                                            <div className={styles.summaryRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                            <div className={styles.summaryRow}>
                                                <span>Shipping</span>
                                                <span className={shipping === 0 ? styles.free : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                            </div>
                                            {shipping > 0 && <p className={styles.freeHint}>Add ₹{999 - subtotal} more for free shipping</p>}
                                            <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                                            <button className={styles.checkoutBtn} onClick={() => setCheckoutStep('address')}>
                                                Proceed to Checkout <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {/* Step: Address */}
                        {checkoutStep === 'address' && (
                            <div className={styles.checkoutForm}>
                                <div className={styles.formSection}>
                                    <div className={styles.formIcon}><MapPin size={20} /></div>
                                    <h3>Delivery Address</h3>
                                </div>
                                <div className={styles.fields}>
                                    <input className={styles.field} placeholder="Full Name" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                                    <input className={styles.field} placeholder="Phone Number" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                                    <div className={styles.fieldRow}>
                                        <input className={styles.field} placeholder="Pincode" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                                        <input className={styles.field} placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                                    </div>
                                    <textarea className={`${styles.field} ${styles.textarea}`} placeholder="House / Flat / Street address" value={address.line} onChange={e => setAddress({ ...address, line: e.target.value })} />
                                </div>
                                <button
                                    className={styles.checkoutBtn}
                                    disabled={!address.name || !address.phone || !address.pincode}
                                    onClick={() => setCheckoutStep('payment')}
                                >
                                    Continue to Payment <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {/* Step: Payment */}
                        {checkoutStep === 'payment' && (
                            <div className={styles.checkoutForm}>
                                <div className={styles.orderSummaryMini}>
                                    <Package size={16} /> {totalItems} items &nbsp;·&nbsp; <strong>₹{total.toLocaleString()}</strong>
                                </div>

                                <h3 className={styles.payTitle}>Choose Payment Method</h3>

                                <div className={styles.payMethods}>
                                    <label className={`${styles.payOption} ${paymentMethod === 'upi' ? styles.paySelected : ''}`}>
                                        <input type="radio" name="pay" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                                        <div className={styles.payLabel}>
                                            <Smartphone size={20} />
                                            <div><p>UPI / GPay / PhonePe</p><span>Instant payment</span></div>
                                            <span className={styles.payBadge}>RECOMMENDED</span>
                                        </div>
                                    </label>
                                    {paymentMethod === 'upi' && (
                                        <input className={`${styles.field} ${styles.upiInput}`} placeholder="Enter UPI ID (e.g. name@upi)" value={upiId} onChange={e => setUpiId(e.target.value)} />
                                    )}

                                    <label className={`${styles.payOption} ${paymentMethod === 'cod' ? styles.paySelected : ''}`}>
                                        <input type="radio" name="pay" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                        <div className={styles.payLabel}>
                                            <Banknote size={20} />
                                            <div><p>Cash on Delivery</p><span>Pay when you receive</span></div>
                                        </div>
                                    </label>

                                    <label className={`${styles.payOption} ${paymentMethod === 'card' ? styles.paySelected : ''}`}>
                                        <input type="radio" name="pay" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                        <div className={styles.payLabel}>
                                            <CreditCard size={20} />
                                            <div><p>Credit / Debit Card</p><span>Visa, Mastercard, RuPay</span></div>
                                        </div>
                                    </label>
                                    {paymentMethod === 'card' && (
                                        <div className={styles.cardFields}>
                                            <input className={styles.field} placeholder="Card Number" />
                                            <div className={styles.fieldRow}>
                                                <input className={styles.field} placeholder="MM/YY" />
                                                <input className={styles.field} placeholder="CVV" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.finalSummary}>
                                    <div className={styles.summaryRow}><span>Order Total</span><span>₹{total.toLocaleString()}</span></div>
                                    {savings > 0 && <div className={`${styles.summaryRow} ${styles.savingsRow}`}><span>Total Savings</span><span>-₹{savings.toLocaleString()}</span></div>}
                                </div>

                                <button className={styles.placeOrderBtn} onClick={handlePlaceOrder} disabled={processing}>
                                    {processing ? (
                                        <span className={styles.processingDots}>Processing<span>.</span><span>.</span><span>.</span></span>
                                    ) : (
                                        <>Place Order · ₹{total.toLocaleString()} <ChevronRight size={18} /></>
                                    )}
                                </button>
                                <p className={styles.secureNote}><Shield size={13} /> 100% secure & encrypted payment</p>
                            </div>
                        )}

                        {/* Step: Success */}
                        {checkoutStep === 'success' && (
                            <div className={styles.successScreen}>
                                <div className={styles.successIcon}><CheckCircle2 size={64} /></div>
                                <h3>Order Placed! 🎉</h3>
                                <p>Your health.pro gear is confirmed and on its way!</p>
                                <div className={styles.orderDetails}>
                                    <div className={styles.orderDetailRow}><Truck size={16} /> Estimated delivery: <strong>3–5 business days</strong></div>
                                    <div className={styles.orderDetailRow}><Package size={16} /> You'll receive a tracking link on your phone.</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}