/*
 * MMI product catalogue — the single source of truth for product cards,
 * category filters, solution areas, the product dialog and the enquiry select.
 *
 * IMPORTANT: only add information that is verified by the company.
 * Every product below currently carries its name only (from the supplied
 * asset list) plus a plain-language expansion of that name. Specifications,
 * features, applications and datasheets are intentionally empty until real
 * data is supplied — the UI then shows "Contact us for specifications".
 *
 * Product fields:
 *   id             unique slug
 *   name           product name
 *   category       one of the category ids below
 *   summary        one or two short sentences
 *   image          path to the main image, e.g. "assets/img/products/aem-electrolyser.webp",
 *                  or null to show the branded placeholder
 *   imageAlt       descriptive alternative text for the image
 *   gallery        optional extra images: [{ src, alt }]
 *   features       optional list of strings
 *   applications   optional list of strings
 *   specs          optional list of [label, value] pairs
 *   configurations optional list of strings
 *   datasheet      optional URL to a real PDF; omit / null if none exists
 */
window.MMI_CATALOGUE = {
  categories: [
    {
      id: 'hydrogen',
      name: 'Hydrogen & Fuel Cells',
      icon: 'i-hydrogen',
      solution: 'AEM and PEM electrolysers, hydrogen training systems and fuel-cell training kits for hydrogen research and education.'
    },
    {
      id: 'battery',
      name: 'Battery Testing',
      icon: 'i-battery',
      solution: 'Battery testing systems for laboratories working on battery performance and behaviour.'
    },
    {
      id: 'engine',
      name: 'Engine & Automotive',
      icon: 'i-engine',
      solution: 'Engine testing equipment, petrol engine set-ups, hybrid CRDI systems and eddy current dynamometer test rigs.'
    },
    {
      id: 'lab',
      name: 'Air, Pressure & Lab Equipment',
      icon: 'i-lab',
      solution: 'Open-type and recirculation-type air systems, PID-control-based pressure equipment and MF-series equipment.'
    },
    {
      id: 'renewable',
      name: 'Renewable Energy Training',
      icon: 'i-renewable',
      solution: 'Solar concentrator training systems for renewable-energy teaching laboratories.'
    }
  ],

  products: [
    {
      id: 'aem-electrolyser',
      name: 'AEM Electrolyser',
      category: 'hydrogen',
      summary: 'Electrolyser based on anion exchange membrane (AEM) technology for hydrogen generation.',
      image: null, // suggested file: assets/img/products/aem-electrolyser.webp
      imageAlt: 'AEM electrolyser'
    },
    {
      id: 'pem-electrolyser',
      name: 'PEM Electrolyser',
      category: 'hydrogen',
      summary: 'Electrolyser based on proton exchange membrane (PEM) technology for hydrogen generation.',
      image: null, // suggested file: assets/img/products/pem-electrolyser.webp
      imageAlt: 'PEM electrolyser'
    },
    {
      id: 'hydrogen-training-system',
      name: 'Hydrogen Training System',
      category: 'hydrogen',
      summary: 'Training system for hands-on learning in hydrogen technology.',
      image: null, // suggested file: assets/img/products/hydrogen-training-system.webp
      imageAlt: 'Hydrogen training system'
    },
    {
      id: 'industrial-hydrogen-training-rack',
      name: 'Industrial Hydrogen Training System',
      category: 'hydrogen',
      summary: 'Rack-mounted hydrogen training system in an industrial format.',
      image: null, // suggested file: assets/img/products/industrial-hydrogen-training-rack.webp
      imageAlt: 'Rack-mounted industrial hydrogen training system'
    },
    {
      id: 'fuel-cell-training-kit',
      name: 'Fuel Cell Training Kit',
      category: 'hydrogen',
      summary: 'Training kit for learning the principles and operation of fuel cells.',
      image: null, // suggested file: assets/img/products/fuel-cell-training-kit.webp
      imageAlt: 'Fuel cell training kit'
    },
    {
      id: 'battery-testing-system',
      name: 'Battery Testing System',
      category: 'battery',
      summary: 'System for testing batteries in a laboratory setting.',
      image: null, // suggested file: assets/img/products/battery-testing-system.webp
      imageAlt: 'Battery testing system',
      gallery: [
        // { src: 'assets/img/products/battery-testing-system-exploded.webp', alt: 'Exploded view of the battery testing system' }
      ]
    },
    {
      id: 'engine-testing-equipment',
      name: 'Engine Testing Equipment',
      category: 'engine',
      summary: 'Equipment for engine testing.',
      image: null, // suggested file: assets/img/products/engine-testing-equipment.webp
      imageAlt: 'Engine testing equipment'
    },
    {
      id: 'petrol-engine-4s-3cyl',
      name: 'Four-Stroke, Three-Cylinder Petrol Engine',
      category: 'engine',
      summary: 'Four-stroke, three-cylinder petrol engine set-up.',
      image: null, // suggested file: assets/img/products/petrol-engine-4s-3cyl.webp
      imageAlt: 'Four-stroke, three-cylinder petrol engine'
    },
    {
      id: 'hybrid-crdi-system',
      name: 'Hybrid CRDI System',
      category: 'engine',
      summary: 'Hybrid common rail direct injection (CRDI) system.',
      image: null, // suggested file: assets/img/products/hybrid-crdi-system.webp
      imageAlt: 'Hybrid CRDI system'
    },
    {
      id: 'eddy-current-dynamometer-rig',
      name: 'Eddy Current Dynamometer Test Rig',
      category: 'engine',
      summary: 'Test rig built around an eddy current dynamometer.',
      image: null, // suggested file: assets/img/products/eddy-current-dynamometer-rig.webp
      imageAlt: 'Eddy current dynamometer test rig'
    },
    {
      id: 'open-type-air-rig',
      name: 'Open-Type Air Rig',
      category: 'lab',
      summary: 'Open-type air rig.',
      image: null, // suggested file: assets/img/products/open-type-air-rig.webp
      imageAlt: 'Open-type air rig'
    },
    {
      id: 'recirculation-air-system',
      name: 'Recirculation-Type Air System',
      category: 'lab',
      summary: 'Recirculation-type air system.',
      image: null, // suggested file: assets/img/products/recirculation-air-system.webp
      imageAlt: 'Recirculation-type air system'
    },
    {
      id: 'pid-pressure-control',
      name: 'PID-Control-Based Pressure Equipment',
      category: 'lab',
      summary: 'Pressure equipment with PID (proportional–integral–derivative) control.',
      image: null, // suggested file: assets/img/products/pid-pressure-control.webp
      imageAlt: 'PID-control-based pressure equipment'
    },
    {
      id: 'mf-series',
      name: 'MF-100 & MF-400',
      category: 'lab',
      summary: 'MF-100 and MF-400 equipment. Contact us for details of each model.',
      image: null, // suggested files: assets/img/products/mf-100.webp, mf-400.webp
      imageAlt: 'MF-100 and MF-400 equipment',
      configurations: ['MF-100', 'MF-400']
    },
    {
      id: 'solar-concentrator-training-system',
      name: 'Solar Concentrator Training System',
      category: 'renewable',
      summary: 'Training system for studying solar concentrator technology.',
      image: null, // suggested file: assets/img/products/solar-concentrator-training-system.webp
      imageAlt: 'Solar concentrator training system'
    }
  ]
};
