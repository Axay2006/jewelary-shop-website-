import { JewelleryProduct, BullionRates } from '../types/jewelry';

export const INITIAL_BULLION_RATES: BullionRates = {
  gold24k: 7240,
  gold24kChange: 0.4,
  gold22k: 6640,
  gold22kChange: 0.35,
  silver925: 94,
  silver925Change: -0.1,
  lastUpdated: 'Live Spot MCX',
};

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1XbGIG6D3tNQ0HXKGQVXIVWVNXpHsI8K8l3oLyiZag_Cb4RWV4u6YN0owQYtx3y8Lt9RigKVJuu2FdoU4T_eZ2js-zAx2h4O4fbldaxPz587w6UG3NbC3iQDI1EEDPF4o-Dlcwfiw4WR_CmVw2TGGA6qyuwelKdIKLVyo0NvKHiMaBoAfoAx4lRdfnU8pbd-7zR6Z8cQJKVWnMMxJTF8MMFzLQdxO4nWgIArMN_E_IiiquhXTd2YYJqPw';

export const PROFILE_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkGAR18d1RYNjIuIqf4FPIiYBUe7wVsjkPKuco2dFh8E_u8zdW0DwruEsoYX0VIxwIcLXJmuA33lQa83c1wXCWg8qzVK7J7czNznC6yAB7MLLsNJcgfnaMGYmA41F0Y1Qs-zFzrG6yzwY4iHhCUKRyeRQA21e-B0cl7ndb5P7TH1e7MKGuVZ9hPcxUj00yf4KRWWSZMnwOB7Q4RBU1S6NGRmtA8ihDRlccZR42N0Y8t16f_1zn3AM';

export const HERO_BANNER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-q1auoX1brDM6C_ZRJaZiX9ZE-EDyRpiz5u8De46eSUXRBqJioo77KtXZvdcWZh66kdbS0Ic7JdR8hk7b5cZB4CAlMLeW17dTzxj4hYdUs7aL_Q64xwJnINXE1eeJh6JGjPC9Pf2gPDtf8LwRmu7RXCJYPzUkx-n4B7mnlog9IOKqwUjC2266SWukUeqp26f2ZExWd40e44TAbd66TTxarUlQG7ly_wyiMC1bpH3GWOZQBZQK6uE';

export const CATEGORIES = [
  {
    id: 'rings',
    label: 'Rings',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6R0X4Y04ERhEZdm7LmsrJ2XYAeI50TJGdbBV4AgaF_tG3WWsyFsVTvC9YgBlEx3e0FpaAA4scveiIM0pEmMKwgSZQkkReWvNa5DDnxLcpRqM13zMen3tKgzsNC7rGST7R_fg3R6gnFlLfO76iYW28JwkRVaMoWp3291XxOq5FID8sbPvoKk5zTLx-nJbswYvJeXvNANlbnKzMkRwEhi40HhOd58-7fU1KudUpR21B3dCJT9PqXAM',
    count: 24,
  },
  {
    id: 'necklaces',
    label: 'Necklaces',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrA_Y3m_J6Z1Q1jFOtC419UaOX4aGY9XkjtfK7jHYcHybWKbmKW42KWlf4L1PkgywADb1MebSGAVa1Mqf-7kTqxI3r9JYwgi_RLWVuFquWZOLGuvNZHrpsM6NeqmnjNZEPtGZc2n8k-n4cQ9FlBsidXNETHNlyd8WvV9tnLJfubq-GNfKmpLQBV-tXJeRoxw3ReNv5AmToWPRKkRca3B8_IdwAk3aVZX4n0jiGA4S08Kk5JcV4BFE',
    count: 18,
  },
  {
    id: 'earrings',
    label: 'Earrings',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_WvTLaQ8YBuN5HqUu3kJSX6zPc1888QG_Y5Xv8Wkn1kUHKKf8ATiObNBMTd2byTuRaT6-AsIHGEtNPRrH7m8skZgeI9p1KIWDNV6ywiGR8E8okSsgleqowG9yx4kNfGU-aRFZMqV1Jk-uM5GHMakavo7gnos1LHUOmfB6b6pc8D8J2v2J6MV3xN94pFExXu3TNFKvaCHrCkKo0Pj-OWS_N_0WUvCNpFvVhSUSkqtQcxuPLCoNnOU',
    count: 16,
  },
  {
    id: 'bangles',
    label: 'Bangles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXmDyO0nqnomS1Mk4Z2e-OIO4JpjRN-BILBeo78MBmg_oa4Px23aPE8giCGQylU-sPWNppsaqH8v3D29ka44w-iO7CaNhIbDAJVAG5BjKXFaLwQkqNyvAhsBQgM4n9HJuCgya5gSaNH5lbcN34KUQ4LUz622Wdew1BNHPfh4i79CnNZiOLoSiyJz6VTGXXqf6Cl61IsZsJlfOxIpNcb4VjVfCD5PifC7otJ_Vz50eHkjbc4ci0yQk',
    count: 12,
  },
  {
    id: 'mangalsutra',
    label: 'Mangalsutra',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIz4HplrJvRh6MbhDCr9q6EghP-IRSZQKuhHKTjZdh9fHP2k2dWN3EaAYFrOYIcSIuhVGXfpdKVlchdkLHMKXLp00lK_njCM6CuwjroY2E1J5ZGHB4xbyGHnJRr0dXMz8Tkl45T8o4lv6iARK5Y17dVJkOT1746f1gbTxGuOj613-TM6oFSJzXH_jDnOQnMYhAYDNanqKa-9ewbGCBd3jX264Se2e19rrbKyn4AFUJ_yYVjqdYamY',
    count: 9,
  },
  {
    id: 'mens',
    label: "Men's Jewels",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAH-PMLT8jpZIW5WihhUeejDOLCgaDv0veyQPT7es5jvL05cJX8LXam2H3wy87byC1Rwh1QKhQw75dEBMPT0yIBfETE25jvwIqapJx29nA45TtNjqeAa0qg5tSrhs-uSpGWgqEXhDkP0N9MkjmFzpWIpccHF9zrr_f7vy0MUZgUeMpHnD2H6gMaHFhVNZEIo5_rnCrZuB0o1a-jeZyts1zMwt604MdrgkFEjcwRslSCu-IeSy4H8Qw',
    count: 14,
  },
];

export const PRODUCTS: JewelleryProduct[] = [
  {
    id: 'astral-solitaire-crown',
    name: 'Astral Diamond Solitaire Crown Ring in 18K Yellow Gold',
    atelier: 'The Celestial Solitaire Atelier',
    category: 'rings',
    categoryLabel: 'Solitaires & Rings',
    curatedPrice: 94800,
    originalPrice: 104200,
    rating: 4.96,
    reviewsCount: 48,
    goldPurity: '18K Yellow Gold',
    goldWeightGrams: 3.82,
    diamondCarats: 0.85,
    diamondSpecs: '0.85 Ct • VVS1 Clarity • E Colorless',
    images: {
      main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy6SmA2yEGGBZQCX-wv8TSfpoVBvfJOeIlyRgxV_l5WFx0br2xYTzJHQSEcUpAL_oKiBykN-XttRuwzICfKBenaghPOglVqbz1HbqvMmtGRHW7Nvl1-qPCRv0m93OwfInGjZeDlWGwGuyB4cF5s_y1icp5e6t2qp07mHTlNd0YrdgFYepk3G5lWrzKAdCJJbqwN2XHogdmZLGBp9gPAxoRTcP1cDg_qhX_TM2-zDA19qrLSTadEvA',
      angles: [
        {
          id: 'top',
          label: 'Top Angle',
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7kOQPJbE9qtgUOmNK1idbpfzNlrdvbDrZMcurpl9bzfaFU3GT5o3B0XBrNT1b09Ljt-f0ewgZhTn_uEItXQf1QmFWtV3HHH04xU_XvUOh7bxYQ_7YeooDNz7-6qsnuC9-z-q6WsjsiEJPuI0Az15Q95H9oCJtmptoLSuSmCto8eBF4AFWQ70dmSJOihayuI7ymuhwxxkMBNfk_WNXrFlEmwcd2eaKXIUVtZaF1xwjw2YM-QTEUYE',
          description: 'Overhead angle top view of the Astral Diamond solitaire showing the brilliant cut pattern and 6-prong gold claw setting against dark charcoal velvet.',
        },
        {
          id: 'side',
          label: 'Side Profile',
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIDlNhUiXF2OjCc_qBRxI_n8q9IKzuS1zmRgh0LB9lgLRS42CWPH_9018vhiG2jsK-Pg5bycZNxHnwnXFittHGZR25TtPI208F0Ks5SaErtI10a5JAiU7etdSYqGFzIsdF8gqkfr6NjbiZ7eDM1Y-z7d0SZ19xyRq5YyQlGZa6QHLp44doeB_cVHz7RGhnS4FBM490PGAVwuIZRDan30tLgMRPWb8GlutX7SNtx31n88gsRSUm1r8',
          description: 'Side profile view showing delicate tiara filigree cathedral band of Astral diamond ring in polished warm yellow gold.',
        },
        {
          id: 'macro',
          label: 'Macro Setting',
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuxTabriaAvx2Tyzp4k5KR9S5ROYklvfOjXRByMas9yn9V36y7ECPZ12OtH6D6WTDLpxmGRRIZ8eqg2tHT1IogjIxnng2wft1wiv-Sky52UDFRhEho6pEgegInS8_QJhpsRa7IznWpo7HOMc-oeaPZd5rx3UZ6_kwizwHuRocDsUD-fWF1XxVuuNemnFoZFZEVOZwc0oeAstHPh25_LlX0ROV0uvCPP4zeLGPj_6O18qypK8ysRdM',
          description: 'Close-up detail of the 18K gold hallmark stamp and laser micro-inscribed diamond pavilion under dramatic spotlight.',
        },
        {
          id: 'hand',
          label: 'On Hand Studio',
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0gol_OAA3Dt9zhuMnQRI56pgR_Ni_Fkt2zLcOzyLKvih3CdTELnQKb13cwz3jp8aKA3qD2axgFUssOMKWsdQdw-noDcZ1UU-Q-AYEQF-TIMHRxJjkThnCNwymS6ftECgCQLwJzX5569m-TNAp2Qs1ZLqIve-5I3bqBHgQCIbOH-qWL1j5-qkZNpfsCiiMrg1l9iyt1myGDmsxafD47mXrlRgOCLlippFUaLNcNiyAuegYmMFi4y8',
          description: 'Editorial lifestyle shot of an elegant hand wearing the gold solitaire diamond ring holding a champagne flute in an evening gala ambiance.',
        },
      ],
      tryOnOverlay:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAhjKcBeYsf7KvpZFIbuzPE-xTH-7WPsAc25kXB-hxVg4GVHAEi70oQKMuGf0kNq8tvCoyXYPcsKYZraYUUxZjVHFMAFknbUPxDZtTjud6WBdHpX4t5ZgddZumkrFt1POCUPk1C_0G2lKY-yIHQxtxWHngUH3810Hgddi0l9RLOu2sXsq-qW-bpyD6GmIvD2BnRVEf5_AXVye6K6J41tvTC9cONXZoKk9vK3go3db7oWjVYS3lAT4g',
    },
    metals: [
      { type: 'yellow', name: '18K Yellow Gold', surcharge: 0, colorHex: '#E5C378' },
      { type: 'rose', name: '18K Rose Gold', surcharge: 0, colorHex: '#E8A598' },
      { type: 'platinum', name: '950 Pure Platinum', surcharge: 12000, colorHex: '#E0E2EC' },
    ],
    sizes: [10, 12, 14, 16, 18],
    popularSize: 14,
    description:
      'Handcrafted in Place Vendôme atelier with an exceptional 0.85ct round brilliant solitaire diamond. Crown filigree setting allows maximum light transmission for unrivaled scintillation and fire.',
    hallmark: 'BIS Hallmark 750 (Guaranteed 18K purity gold with official assay emblem)',
    certificate: {
      number: 'IGI-984210',
      laboratory: 'International Gemological Institute (IGI Antwerp)',
      shape: 'Round Brilliant',
      weight: '0.85 Carat',
      color: 'E (Exceptional Colorless)',
      clarity: 'VVS1 (Eye Clean Under 10x Magnification)',
      cut: 'Hearts & Arrows Ideal Cut',
      fluorescence: 'None (Zero Hazing)',
    },
    priceBreakup: {
      goldSpotRate: 5430,
      goldAmount: 20742,
      diamondAmount: 62400,
      makingChargesPercent: 8.5,
      makingChargesAmount: 6800,
      gstPercent: 3,
      gstAmount: 2844,
    },
    inStock: true,
    dispatchDays: 3,
    tags: ['Solitaire', '18K Gold', 'IGI Certified', 'AR Ready'],
  },
  {
    id: 'eternal-bloom-solitaire',
    name: 'Eternal Bloom Solitaire Diamond Ring',
    atelier: 'Signature Vault Atelier',
    category: 'rings',
    categoryLabel: 'Solitaires & Rings',
    curatedPrice: 84500,
    originalPrice: 92000,
    rating: 4.94,
    reviewsCount: 32,
    goldPurity: '18K Rose & Yellow Gold',
    goldWeightGrams: 4.2,
    diamondCarats: 0.52,
    diamondSpecs: '0.52 Ct • VVS1 Clarity • E Colorless',
    images: {
      main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQUkRtwY5k2pKz855o2WgT7vvieiVwG6N7nD8HLQrQ457DncJYZ2OmMf9DbXDD49xW0BQe1IfF7ZCEFd3Z1GzYYquIFm1Sn26K7Azz5EXWvzOlEUP-tXMSRFUg6GBD1XHGwJUiJwtVkYrpCtlAnj_ogSZHy9PG1MUHDT3aCQJC8roo-_mbco_YO9eosg4e2BWJmpOi74oxh0eu3hVh0BtAN8I7W_BfYMVK3s2fIU8V9QtKYBOK5gE',
      angles: [
        {
          id: 'main',
          label: 'Front View',
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQUkRtwY5k2pKz855o2WgT7vvieiVwG6N7nD8HLQrQ457DncJYZ2OmMf9DbXDD49xW0BQe1IfF7ZCEFd3Z1GzYYquIFm1Sn26K7Azz5EXWvzOlEUP-tXMSRFUg6GBD1XHGwJUiJwtVkYrpCtlAnj_ogSZHy9PG1MUHDT3aCQJC8roo-_mbco_YO9eosg4e2BWJmpOi74oxh0eu3hVh0BtAN8I7W_BfYMVK3s2fIU8V9QtKYBOK5gE',
          description: 'Radiant cut diamond held by delicate rose gold claws.',
        },
      ],
      tryOnOverlay:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAhjKcBeYsf7KvpZFIbuzPE-xTH-7WPsAc25kXB-hxVg4GVHAEi70oQKMuGf0kNq8tvCoyXYPcsKYZraYUUxZjVHFMAFknbUPxDZtTjud6WBdHpX4t5ZgddZumkrFt1POCUPk1C_0G2lKY-yIHQxtxWHngUH3810Hgddi0l9RLOu2sXsq-qW-bpyD6GmIvD2BnRVEf5_AXVye6K6J41tvTC9cONXZoKk9vK3go3db7oWjVYS3lAT4g',
    },
    metals: [
      { type: 'rose', name: '18K Rose Gold', surcharge: 0, colorHex: '#E8A598' },
      { type: 'yellow', name: '18K Yellow Gold', surcharge: 0, colorHex: '#E5C378' },
      { type: 'platinum', name: '950 Pure Platinum', surcharge: 11500, colorHex: '#E0E2EC' },
    ],
    sizes: [10, 12, 14, 16, 18],
    popularSize: 14,
    description:
      'Radiant cut solitaire diamond paired with an architectural knife-edge 18K rose gold shank. Perfectly calibrated for romantic milestones.',
    hallmark: 'BIS Hallmark 750',
    certificate: {
      number: 'IGI-891044',
      laboratory: 'IGI Worldwide',
      shape: 'Radiant Cut',
      weight: '0.52 Carat',
      color: 'E Colorless',
      clarity: 'VVS1',
      cut: 'Superb Polish & Symmetry',
      fluorescence: 'None',
    },
    priceBreakup: {
      goldSpotRate: 5430,
      goldAmount: 22806,
      diamondAmount: 51200,
      makingChargesPercent: 9,
      makingChargesAmount: 7600,
      gstPercent: 3,
      gstAmount: 2894,
    },
    inStock: true,
    dispatchDays: 2,
    tags: ['VVS1', 'E Color', 'Rose Gold', 'Instant Try-On'],
  },
  {
    id: 'royal-mughal-polki-choker',
    name: 'Royal Mughal Heritage Polki Choker',
    atelier: 'Imperial Heritage Vault',
    category: 'necklaces',
    categoryLabel: 'Heritage Polki',
    curatedPrice: 215000,
    originalPrice: 240000,
    rating: 4.98,
    reviewsCount: 19,
    goldPurity: '22K Yellow Gold (38.4g)',
    goldWeightGrams: 38.4,
    diamondCarats: 3.4,
    diamondSpecs: 'Raw Uncut Bikaner Polki Diamonds • Zambian Emerald Drops',
    images: {
      main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr042CtWZNzGDLYrWDS6LtkZZZTvksN_CspO_KGz_acbHMU-V5Tt0hJhLLgPNFo2stAOkJCjXtUqDFrkDqg6bJNLXX_dnCYjDTYhcBJ3BHpAU-DifxzGk_Fqjbx6BviWs9v36VVFiHmlCvv0jySP4TT1M3s7w8xBhWTjoidIyGNVUZqsIWxKR_ECWcVDAnGcghN08v0fXLEKAzcWTDyLBzHGoz1UHFNE_Zti0Fr-cepLLr5mV4auM',
      angles: [],
      tryOnOverlay: '',
    },
    metals: [{ type: 'yellow', name: '22K Heritage Yellow Gold', surcharge: 0, colorHex: '#F0C35B' }],
    sizes: [14, 16],
    popularSize: 14,
    description:
      'A museum-worthy bridal centerpiece crafted in 22K yellow gold with closed back foil setting, syndicate polki diamonds, and genuine tumbled emerald teardrops.',
    hallmark: '22K BIS Hallmark 916',
    certificate: {
      number: 'GIA-POLKI-7721',
      laboratory: 'GIA Syndicate Gemological Report',
      shape: 'Uncut Flat Polki',
      weight: '3.40 Carats Total Uncut',
      color: 'Natural Champagne Luster',
      clarity: 'Natural Heritage Gem Matrix',
      cut: 'Traditional Mughal Jadau',
      fluorescence: 'None',
    },
    priceBreakup: {
      goldSpotRate: 6640,
      goldAmount: 142000,
      diamondAmount: 52000,
      makingChargesPercent: 10,
      makingChargesAmount: 14500,
      gstPercent: 3,
      gstAmount: 6500,
    },
    inStock: true,
    dispatchDays: 5,
    tags: ['Heritage', '22K BIS', 'Bespoke Commission', 'Emeralds'],
  },
  {
    id: 'elysian-diamond-drop-earrings',
    name: 'Elysian Diamond Drop Earrings',
    atelier: 'Haute Joaillerie Atelier',
    category: 'earrings',
    categoryLabel: 'Earrings & Drops',
    curatedPrice: 58200,
    originalPrice: 65000,
    rating: 4.92,
    reviewsCount: 27,
    goldPurity: '18K White & Yellow Gold',
    goldWeightGrams: 3.1,
    diamondCarats: 0.38,
    diamondSpecs: '0.38 ct Total • Dual Pear & Round Brilliant Cuts',
    images: {
      main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvqTlUzQXv3JlCWdDU-D89-zJ8JToe4EyieZxICUZ3AEy9gcAHkmJHSLGrJL4sX_jkFCktC2hE2AInYJTN2PoY1-g1-lr5zgazNFz8y6oPdPLyq5wH0tO1Lw-48mwvKIFXYaoj6YlC8nhjaqDSAMS5HvnbEZAFsZmXPW2UekxIVmBzWN6Yc9zpf4ExGjtpdpVE5LL7BBM5JSCKyh9yvsx6Ok3gLHcJWQwShRsQyEzGiOrLLHWI-Xw',
      angles: [],
      tryOnOverlay: '',
    },
    metals: [
      { type: 'yellow', name: '18K Two-Tone Gold', surcharge: 0, colorHex: '#E5C378' },
      { type: 'platinum', name: 'Platinum 950', surcharge: 8000, colorHex: '#E0E2EC' },
    ],
    sizes: [1],
    popularSize: 1,
    description:
      'Cascading chandelier diamond drops suspended on high-tension micro-hinges that sway with every movement to reflect surrounding light into brilliant halos.',
    hallmark: 'BIS Hallmark 750',
    certificate: {
      number: 'IGI-552910',
      laboratory: 'IGI International',
      shape: 'Pear & Brilliant Hybrid',
      weight: '0.38 Carats',
      color: 'F Colorless',
      clarity: 'VS1',
      cut: 'Triple Excellent',
      fluorescence: 'None',
    },
    priceBreakup: {
      goldSpotRate: 5430,
      goldAmount: 16833,
      diamondAmount: 32500,
      makingChargesPercent: 12,
      makingChargesAmount: 7120,
      gstPercent: 3,
      gstAmount: 1747,
    },
    inStock: true,
    dispatchDays: 1,
    tags: ['IGI Certified', 'Ready to Ship', 'Two-Tone Gold'],
  },
];
