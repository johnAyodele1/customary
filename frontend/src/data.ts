import { Product, BespokeOrder } from './types';

export const CATEGORIES = [
  'All',
  'Jewelry',
  'Journals',
  'Water Bottles',
  'Gifts',
  'Wristwatches',
  'Accessories'
];

export const PRODUCTS: Product[] = [
  {
    id: 'ring-01',
    name: 'The Heritage Emerald Cut Ring',
    category: 'Jewelry',
    price: 1450000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2GZpUCXM4l6nTE5YRkezx6RUVuUUmpIM02MXyMIdFUW4tcsHDj7EaiADcbMWh9-9MFaB-UHzYY-Xj8Ly3a9a0SRFCNKiNexci1swnSM-a06bPygJAZwkbHvzKnKGm_ed9dReVdczFQE3R9k_L6oeBlG2Jw0PeuNcW6320vz1_B57rk6V6_9xNmIzV9o7cegaUH9Brp_YdjNmnt3f7K93LQ5DPd2DAvxMgItnI9PfWh0uqb4PzamrxRr56Tvzo8Sb9WwbnA35m51Ce',
    description: 'A bespoke gold ring featuring a large, flawless emerald cut diamond. 18k Solid Gold.',
    bespoke: true,
    material: '18k Solid Gold'
  },
  {
    id: 'watch-01',
    name: 'Nocturne Minimalist Timepiece',
    category: 'Wristwatches',
    price: 320000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfDidID4Zu2wUFd1mFQcZIv90mE8-Qk3UlMpkgjmt2qFvS25QES1P4h7GnSVILVH3PP6gvcPb0nQpShVq3OtpwEMPg9DXpAtVEJRYGWd0r4MrKBj6vXoADOzPJVCR2NphVZR29q_F2jUbIE53unGPtab8jzq2a8Mm_oJja371ht64oMdpZWrMxlGbxLOQoLAha0uF8gPKBdg4HtNuap038et_T5nb-QL-pZXFPOd_BDTov5fVJ5Z5bYwO-U88q5HyBCRZvKXyeQfN',
    description: 'A luxury minimalist wristwatch with a matte black dial and brushed gold mesh strap.',
    bespoke: false,
    material: 'Brushed Gold & Steel'
  },
  {
    id: 'journal-01',
    name: 'Artisan Leather Monogram Journal',
    category: 'Journals',
    price: 450000, // Wait, screen 1 says ₦45,000 for Artisan Leather Monogram Journal
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdnNHoZhNoKr0ueJ-BvoW7j4X5BiZefRbgPfcN0OykKcrpD00dLOYWY4HAZYqDyKJIonthMg_ymP88TtnLQ4HQmpzflPr_kcdhd7u3aQx0LlA4qVZvYbg9kQUMn9EZacoldZfF6Kc0RUh2zSqohyHZpC8L5bo0AHNnuLg9WWFehRZg-bUNiozaizTn7nrP2BnTyyfydYiF9BSFRxgpaFPvx4Pz44Rqu89ZveihnH7jPT-LX7ptSjp78h41ZUufwDVkyV95CBfrbWO',
    description: 'A handcrafted, leather-bound journal in rich espresso brown, featuring subtle gold foil monogramming.',
    bespoke: true,
    material: 'Espresso Brown Leather'
  },
  {
    id: 'bottle-01',
    name: 'Sculptural Brass Hydration Flask',
    category: 'Water Bottles',
    price: 85000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8rXwtP6vfiwhxi54CQei2WJfceg7o6yUaAf1JINNJJP9udNxTPKFGzHDYeawLXv8e2r2dZDKNFGO8B9KegVROFtJemE-KOnFRW-wp9tmat1pziruwFZVl9JDDH5QyZ5oSpJKjt6B2g2ON34QwpbHogePKQi12RhFIn06PfZ6wmschlhvEb4qh2xJcs_E1lfHvCasVNMOW9hzD6MfTmVWzRC5yqpaLN_PFw3wPtdDYYIe7-QAOFvzg01Mbd6uev1a2mQmPfMSDXzzS',
    description: 'A sleek, minimalist reusable water bottle constructed from polished brass and matte black ceramic.',
    bespoke: false,
    material: 'Polished Brass & Ceramic'
  },
  {
    id: 'cufflinks-01',
    name: 'Geometric Gold Cufflinks',
    category: 'Accessories',
    price: 180000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL548R2sjiI6spRV8csmuGjDYjQH01Jnkrk6IvTXmUt14YbiRbGKiRGNfV8_6SRO1KGpC4kBZjWfxPr7PxcYvSw998M0BlIoZA5rIHSO5Vink5RlToumiz4HQqyi9zSnd91lh--3wf3R8APLeFQ-bXhrfbswspL4EC0LZcyz_Q5s5kcahzQhUm-DOpWFWraEM0fiIW4ovkOfx0gpktO9zDJzoxhIBwJj0knd1Obm26awZpD6FJghuzezmaiZ7187Of1130yQejOgAa',
    description: 'An elegant pair of bespoke geometric 18k gold cufflinks resting on textured linen.',
    bespoke: true,
    material: '18k Solid Gold'
  },
  {
    id: 'pendant-01',
    name: 'Signature Gold Pendant',
    category: 'Jewelry',
    price: 12500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq6IQZIhqxJAXYGh-oF3EltaW6bvEgeLnjKHJyYI457ZQFJfjVEwBwjrBKpPavz8RTqmrzgdUpWgSgvH1s56zjch13ayTG8YhG6zThzaPFtNOBb3-xq4gLwMbWXHezmXU6Fo2hLIK2EIKy3yGGihR8ZB8MzSTpngIcroYCozsQM9plQssG34yjjCqyHmXvliPYb1t7zZsWPuyHVWNsnuU3CFgq4nvSIIIJxqgij7t0V2I6h9hkCZfF2CMpgJfhVOjCwrkttDDTxWt0',
    description: 'Close up photography of a luxury minimalist gold necklace resting on a smooth marble surface.',
    bespoke: true,
    material: 'Gold Plated / Solid Options',
    variants: [
      {
        name: 'Gold Chain',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDie3nkRKyBODeyjVVfr5zMaH3crB5LYZG07G3ES_LsqjMRV2QRIN90bHflZX6ejMnpa1gxtdz4D366DTR4wThSGt3YeuHNaraXxh3dZDlzQbI9c2pn8iCCrCGuLyg_prd7yZeF7pPsZkYaqPKOfHeiz8Usi2GBa3shbGbI0OP6AWPk4sbbF-hfimzuF3Ankjcq04hC_zyn6rT1usSr2P1svXwqyo1FHfvYuY7qFCleuEIx9fzl4c_t1qe6f0RniBMWp1wSnj6zPeL'
      },
      {
        name: 'Silver Chain',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jYgcU-ty1XbBeZIiOSzwkJdZSBmGRp5LOnxnI9RWZz2nUDstYsAO3TdzGdS2ju2skSsryorQDamGTsmU3GdB4Cuae7wxA-ILZK-XsC27FbTvC9qlh5T6tFI7Nb0RFRhGYe5nfP8ytEJSPOvk-K7TE5_nZxcnj3yb96ZWHGIfXXDdswexprKRSUGbNHjiY5MARTcuaenUs1GjMrrUZ71PKRxa1_8bcHKL_AhoXttbhRqg0VX8VRPsDr0Bz-iPSxEZQmfVAfoLx-Sc'
      }
    ],
    finishes: ['Gold', 'Platinum', 'Rose Gold']
  },
  {
    id: 'journal-02',
    name: 'Artisan Leather Journal',
    category: 'Journals',
    price: 12500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3RAL-UkMvSjtzW3ni2YmzhxnPZSN4T1fHWk1dZBnJhvxsFxwpfi6y8hWzxCNQatsFkKbykw9vjeQPLXcuvpIhcHLal8LzYU1HCuqbpJj80ux8SB0OX4EVSViP9oVHe80f9HmFbFfyaOcWwrkWXoJpbvdww8byK-3fwtpURgBkCHyzVsr0I_l4j5qUMKcNAMwMiTjWYET1dzlUsgN5_aWJzW3-2oQl_HM9vZhsbaobA1hvcy3lKXo_ATUjtB09jL4WejE2lpb4fLKZ',
    description: 'A premium leather-bound journal resting on a stark white architectural pedestal.',
    bespoke: true,
    material: 'Genuine Full-grain Leather'
  }
];

export const INITIAL_CART_ITEMS = [
  {
    id: 'cart-item-1',
    product: {
      id: 'suit-charcoal',
      name: 'The Charcoal Solstice Suit',
      category: 'Bespoke Suits',
      price: 450000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzwNwCZIicHWSzOGL_LGQvyTln0z_hkdvANucejO1v6HYXsdvzfr8m0f1ko-n92oLdSBSqFaSGtzwYPCxDHJrSdBQLnvtvQn2hGb0PACf5VNF2zz5zayJZ3xj8TUdEhQx33sYG5A1386oZyNKbaCYqEEuKLqGXNK4bMGSLUd1vmON6TmxdCgCGhNjwlTNX-nb5SBuGmcn_hFBHhy0rJl8pczB6S-k-j2XpcevwUskTpMh2FCOfxQDkMfD5aRS1IMQOYiOiWelOFKqD',
      description: 'Meticulously tailored charcoal suit featuring high-end peak lapels and structured wool-silk blend.',
      bespoke: true
    },
    quantity: 1,
    customization: 'Fit: Tailored Slim, Lapel: Peak 3.5", Lining: Bordeaux Silk, Monogram: "A.R" (Inside Left Pocket, Gold Thread)'
  },
  {
    id: 'cart-item-2',
    product: {
      id: 'pocketsquare-burgundy',
      name: 'Burgundy Geo Pocket Square',
      category: 'Accessories',
      price: 35000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrV7xKSUfoGHlIuU58hX-GIBcBtcL9PSPwSpULtiGZ9PTy8PsnrHxEdP2Rt_97R5F1B-i7ryybLpdZjR_SkFi4Hi8-DOTkC47YQ1TX1uiDghEqijFakcOAzHUPdgNuWA6mnksbJzMUnZ_OvPcD6xZSb-4IDKu2RCFto2LeQYwE0eyCE3bBQIIjraCJUffWZlpi-uqgXTupQZrmtN4Tu2eGVHg2VdFyFB6a158IJPOYBKwHu2X6y3bkXdsYVRSoHSuLtSdhrI_y8Yq6',
      description: 'Burgundy pocket square folded on dark marble, crafted from 100% Mulberry silk with hand-rolled edges.',
      bespoke: false
    },
    quantity: 2,
    customization: 'Finish: Hand-rolled edges, Packaging: Signature Gift Box'
  }
];

export const INITIAL_ORDERS: BespokeOrder[] = [
  {
    id: 'CUS-8921-A',
    customerName: 'Chidi',
    phone: '+234 803 123 4567',
    address: 'Bespoke Manor, Victoria Island, Lagos',
    items: [
      {
        productName: 'The Cashmere Overcoat',
        quantity: 1,
        price: 580000,
        customization: 'Sleeve adjustments +2cm, Initials "C.O" hand stitched in silk thread.'
      }
    ],
    total: 580000,
    status: 'In Production',
    date: 'Oct 12, 2023',
    estimatedCompletion: 'Oct 28',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClebrbpwEW3kJIxDq2zKhj_zRxb5oEPgOC5ivIIfURkJ_MqVg0meTwXl7V-Pz4MNW9k-G0RIQE7Zc8SGjq50fg25ufRMEH6Bk4RubxJEazFhgtEZwqnxSMrmn4vbjdqeKFt1pEFyNanK1b5Xh-n6HNvvI-ci3NjIU2uhDOBgSBuvJpXigsXlLTkc3zD9u4Wnq100XbW7fPkM-sjpvywvq6QwuOJGtWduo_wcVdA_0h5h3zhmiP97Hip9LRTO1v4KEq9MKq92aSqvrA'
  },
  {
    id: 'CUS-7102-B',
    customerName: 'Chidi',
    phone: '+234 803 123 4567',
    address: 'Bespoke Manor, Victoria Island, Lagos',
    items: [
      {
        productName: 'Monogrammed Silk Pocket Square',
        quantity: 1,
        price: 18500
      }
    ],
    total: 18500,
    status: 'Delivered',
    date: 'Aug 14, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7kJoUYr5YXp6uRIOdi2bcnC8kDxMrsJovDDrywl1ZmDzzdl3-NXsQUiNhe0vVeQOiDUBl_JMOeFncn044VAgwZKutkCemyR-EYYf1UH8dL2Kw_9cK-FRzUTjk1xS2efA0U_-Gw48WMd6ra8pSQJ83KpxaVowbj7A70K8L66Ra8uf0vRmIkzGBvJs04KWxrwc0cBzyPdtP5LMkF3y-VArtXy_qp8RZvK8Nn6dIB2_BHuACgQVbYZlJvOG2zF0Nf3-5zB4skl0HaMyz'
  },
  {
    id: 'CUS-5590-T',
    customerName: 'Chidi',
    phone: '+234 803 123 4567',
    address: 'Bespoke Manor, Victoria Island, Lagos',
    items: [
      {
        productName: 'Charcoal Wool Trousers',
        quantity: 1,
        price: 145000
      }
    ],
    total: 145000,
    status: 'Delivered',
    date: 'May 02, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv4-FkZK7JMAACVdHaSO7IhUio3QYRVy9BwFxtKiPZz-pigiGU5tBSdilLhB4wi_hTvSnAVto0WBezuj3E4XYQZLVtvOs1C_WBIl-esHTLkZhj6nORi8HhacY2XhAAS-orFyiNwHq9m_kOwDVgGH7ztPRUAxDgqWU7nl2zNCQGCO_ULTZVlmdq79IHejQBOQs5kqcsl3bX_gxp-7csEx7c966f0nsS1V21GOTZQjrDpIyBAZNNauH82F3O20Jo_o3YlgrrSN7V2KLO'
  }
];
