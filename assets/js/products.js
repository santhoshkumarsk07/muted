/*
 * MMI product catalogue — the single source of truth for product cards,
 * category filters, solution areas, the product dialog and the enquiry select.
 *
 * IMPORTANT: only add information that is verified by the company.
 * Product names, model numbers and feature lists below were taken from the
 * labels printed on the product panels in the supplied images. Specifications,
 * applications and datasheets are empty until real data is supplied — the UI
 * then shows "Contact us for specifications".
 *
 * Product fields:
 *   id             unique slug
 *   name           product name (as printed on the product panel)
 *   model          optional model number (as printed on the panel)
 *   category       one of the category ids below
 *   summary        one or two short sentences
 *   image          image base name in assets/img/products/ — the site loads
 *                  <name>-sm.webp (cards) and <name>-lg.webp (dialog);
 *                  null shows the branded placeholder
 *   imageAlt       descriptive alternative text for the image
 *   fit            'contain' (default; whole product visible) or 'cover'
 *                  (fill the frame — for photos with a studio background)
 *   gallery        optional extra images: [{ image, alt }]
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
      solution: 'AEM hydrogen generation, electrolyser and fuel-cell systems, fuel-cell test stations and industrial hydrogen training systems.'
    },
    {
      id: 'storage',
      name: 'Battery & Energy Storage Testing',
      icon: 'i-battery',
      solution: 'Battery testing systems and combined fuel cell, supercapacitor and battery performance testing.'
    },
    {
      id: 'engine',
      name: 'Engine Test Rigs',
      icon: 'i-engine',
      solution: 'Petrol and hybrid diesel engine test rigs with eddy current dynamometers for engine performance testing.'
    },
    {
      id: 'hvac',
      name: 'Air Conditioning Training',
      icon: 'i-lab',
      solution: 'Open-type and re-circulation-type air conditioning rigs for refrigeration and air conditioning laboratories.'
    },
    {
      id: 'automation',
      name: 'Automation & Process Control',
      icon: 'i-automation',
      solution: 'PLC trainer kits and PID process control loop kits for automation and instrumentation training.'
    },
    {
      id: 'energy',
      name: 'Solar & Thermal Energy',
      icon: 'i-renewable',
      solution: 'Solar concentrator training systems and pyrolysis reactors for renewable and thermal energy laboratories.'
    }
  ],

  products: [
    /* ---------- Hydrogen & Fuel Cells ---------- */
    {
      id: 'aem-hydrogen-generator',
      name: 'AEM Based Hydrogen Generator',
      model: 'MMI AEM-HG-01',
      category: 'hydrogen',
      summary: 'Hydrogen generator based on anion exchange membrane (AEM) technology, mounted on a training frame with an instrumented control panel.',
      image: 'aem-hydrogen-generator',
      imageAlt: 'MMI AEM Based Hydrogen Generator on an orange and aluminium frame, with control panel and hydrogen gas generator unit',
      features: ['H₂ generator power indicator', 'Hydrogen gas generator unit', 'Main switch and emergency stop']
    },
    {
      id: 'hydrogen-gas-generator-system',
      name: 'Hydrogen Gas Generator System',
      category: 'hydrogen',
      summary: 'Hydrogen gas generator system with an instrumented control panel and a gas cylinder rack.',
      image: 'hydrogen-gas-generator-system',
      imageAlt: 'MMI Hydrogen Gas Generator System with three red gas cylinders on a blue rack beside the generator cabinet',
      features: ['Temperature controller', 'Timer / process controller', 'Hydrogen generator unit', 'Gas cylinder rack']
    },
    {
      id: 'industrial-hydrogen-training-system',
      name: 'Industrial Hydrogen Training System',
      category: 'hydrogen',
      summary: 'Three-cabinet industrial training system covering water treatment, hydrogen generation, and automation and control.',
      image: 'industrial-hydrogen-training-system',
      imageAlt: 'MMI Industrial Hydrogen Training System: three mobile cabinets labelled Water Treatment System, Hydrogen Generation Unit and Automation & Controlling Unit',
      features: ['Water treatment system', 'Hydrogen generation unit with electrolyser stack', 'Automation & controlling unit', 'Distilled water tank']
    },
    {
      id: 'electrolyser-fuel-cell-system',
      name: 'Electrolyzer with Fuel Cell System',
      category: 'hydrogen',
      summary: 'Electrolyser and fuel cell system on a training frame, with fuel-cell voltage, current and cell temperature indication.',
      image: 'electrolyser-fuel-cell-system',
      imageAlt: 'MMI Electrolyzer with Fuel Cell System showing digital meters, DC power supply and fuel cell on a two-shelf frame',
      features: ['Fuel cell voltage indicator', 'Fuel cell current indicator', 'Cell temperature controller', 'DC regulated power supply']
    },
    {
      id: 'electrolyser-fuel-cell-test-setup',
      name: 'Electrolyzer with Fuel Cell System – Test Setup & Loading System',
      model: 'MMI-EC-FC-02',
      category: 'hydrogen',
      summary: 'Electrolyser and fuel-cell test setup with a loading system and deionised water plant, built into a cabinet workstation.',
      image: 'electrolyser-fuel-cell-test-setup',
      imageAlt: 'MMI Electrolyzer with Fuel Cell System test setup: cabinet workstation with deionized water plant, fuel cell and digital meters',
      features: ['DC power supply', 'Fuel cell voltage and electrolyser voltage indication', 'Water temperature indication', 'Deionized water plant']
    },
    {
      id: 'pem-fuel-cell-test-station',
      name: 'PEM Fuel Cell Test Station',
      model: 'MMI-PFCT-01',
      category: 'hydrogen',
      summary: 'Proton exchange membrane (PEM) fuel cell test station with instrumentation and an electronic load bank.',
      image: 'pem-fuel-cell-test-station',
      imageAlt: 'MMI PEM Fuel Cell Test Station with digital indicators, fuel cell stack and electronic load switches',
      features: ['Fuel cell voltage / current indication', 'Load voltage / current indication', 'DC power supply', 'Temperature indication', 'Electronic load with switchable load steps']
    },
    {
      id: 'fuel-cell-system-test-setup',
      name: 'Fuel Cell System Test Setup',
      model: 'MMI-FC-TS-01',
      category: 'hydrogen',
      summary: 'Fuel cell system test setup with a gas cylinder rack and an instrumented test bench.',
      image: 'fuel-cell-system-test-setup',
      imageAlt: 'MMI Fuel Cell System Test Setup with three gas cylinders and an instrumented test bench'
    },
    {
      id: 'hydrogen-fuel-cell-components',
      name: 'Fuel Cell Components & Educational Kits',
      category: 'hydrogen',
      summary: 'Fuel cell stacks, educational fuel-cell kits and catalyst materials. Contact us for current availability.',
      image: 'hydrogen-fuel-cell-components',
      imageAlt: 'Assorted fuel cell stacks, educational fuel cell kits and a catalyst container'
    },

    /* ---------- Battery & Energy Storage Testing ---------- */
    {
      id: 'battery-testing-system',
      name: 'Battery Testing System',
      category: 'storage',
      summary: 'Rack-mounted, multi-channel battery testing system with a control unit and channel connection panel.',
      image: 'battery-testing-system',
      imageAlt: 'Battery Testing System with eight cylindrical cells mounted in numbered test channels',
      fit: 'cover',
      gallery: [
        { image: 'battery-testing-system-exploded', alt: 'Exploded view of the Battery Testing System with labelled parts list' }
      ],
      features: ['Frame top cover', 'Control unit', 'Frame / rack structure', 'Main testing module', 'Wiring distribution unit', 'Channel connection panel', 'Frame base with adjustable feet']
    },
    {
      id: 'fuel-cell-supercapacitor-battery-tester',
      name: 'Fuel Cell, Super Capacitor & Battery Performance Tester',
      category: 'storage',
      summary: 'Performance tester for fuel cells, supercapacitors and batteries, with an electronic load and system connection panel.',
      image: 'fuel-cell-supercapacitor-battery-tester',
      imageAlt: 'MMI Fuel Cell, Super Capacitor and Battery Performance Tester with parameter meters and electronic load',
      features: ['DC power supply', 'Fuel cell, battery and supercapacitor parameter indication', 'H₂ mass flow meter', 'Electronic load', 'DC to DC converter']
    },

    /* ---------- Engine Test Rigs ---------- */
    {
      id: 'petrol-engine-morse-test-rig',
      name: 'Four Stroke Three Cylinder Petrol Engine with Eddy Current Dynamometer for Morse Test Rig',
      category: 'engine',
      summary: 'Four-stroke, three-cylinder petrol engine coupled to an eddy current dynamometer, set up for the Morse test.',
      image: 'petrol-engine-morse-test-rig',
      imageAlt: 'MMI four stroke three cylinder petrol engine test rig with eddy current dynamometer and instrument panel',
      fit: 'cover',
      gallery: [
        { image: 'petrol-engine-morse-test-rig-daq', alt: 'Morse test rig with a laptop-based data acquisition station' },
        { image: 'petrol-engine-morse-test-rig-installed', alt: 'Morse test rig installed in a laboratory' }
      ],
      features: ['Eddy current dynamometer', 'Load controller', 'Temperature indicators', 'Air intake indicator', 'Instrument cluster']
    },
    {
      id: 'hybrid-crdi-engine-test-rig',
      name: 'Computerized Hybrid CRDI Diesel Engine Test Rig',
      category: 'engine',
      summary: 'Computerised hybrid diesel engine with eddy current dynamometer and combustion analyser system.',
      image: 'hybrid-crdi-engine-test-rig',
      imageAlt: 'MMI computerized hybrid diesel engine test rig with eddy current dynamometer and control panels',
      fit: 'cover',
      features: ['Hybrid diesel engine', 'Eddy current dynamometer', 'Combustion analyzer system', 'Engine parameters panel']
    },

    /* ---------- Air Conditioning Training ---------- */
    {
      id: 'open-type-ac-test-rig',
      name: 'Open Type Air Conditioner Test Rig',
      category: 'hvac',
      summary: 'Open-type air conditioner test rig with an air duct, compressor, condenser and instrumented control panel.',
      image: 'open-type-ac-test-rig',
      imageAlt: 'MMI Open Type Air Conditioner Test Rig with orange air duct, air flow manometers, condenser and compressor',
      features: ['Supply air temperature indication', 'Return air temperature indication', 'Air flow manometers', 'Compressor and twin fan switches']
    },
    {
      id: 'recirculation-ac-system-kit',
      name: 'Re-Circulation Type Air Conditioning System Kit',
      category: 'hvac',
      summary: 'Re-circulation-type air conditioning system kit with an air duct, dry/wet bulb thermometers and control panel.',
      image: 'recirculation-ac-system-kit',
      imageAlt: 'MMI Re-Circulation Type Air Conditioning System Kit with orange duct, dry and wet bulb thermometers and control panel',
      features: ['Compressor power indicator', 'Temperature indicator', 'Dry / wet bulb thermometers', 'Heater, blower, compressor and fan switches']
    },

    /* ---------- Automation & Process Control ---------- */
    {
      id: 'plc-trainer-kit',
      name: 'Advanced Industrial PLC Trainer Kit',
      model: 'MMIPLC-02SC',
      category: 'automation',
      summary: 'Industrial PLC trainer with a Siemens S7-1200 PLC, HMI interface panel and a set of industrial simulation modules.',
      image: 'plc-trainer-kit',
      imageAlt: 'MMI Advanced Industrial PLC Trainer Kit panel with simulation modules and a Siemens PLC',
      fit: 'cover',
      features: [
        'PLC system – Siemens S7-1200 1214C',
        'PLC input & output module',
        'Industrial interface panel',
        'Filling station simulation module',
        'Star delta starter simulation module',
        'Industrial motor sequence simulation module',
        'Traffic signal control simulation module',
        'Logical control system simulation module',
        'Elevator application simulation module',
        'Combination lock simulation module',
        'Water tank level simulation module',
        'Industrial conveyor system simulation module'
      ]
    },
    {
      id: 'pid-pressure-control-loop-kit',
      name: 'PID Control Based Pressure Control Loop Kit',
      category: 'automation',
      summary: 'Pressure control loop kit using PID (proportional–integral–derivative) control, with an air tank and control valve.',
      image: 'pid-pressure-control-loop-kit',
      imageAlt: 'MMI PID Control Based Pressure Control Loop Kit with control panel, control valve and orange air receiver tank',
      features: ['Pressure controller', 'Pressure transmitter', 'Control valve', 'Air tank', 'Air filter regulator']
    },

    /* ---------- Solar & Thermal Energy ---------- */
    {
      id: 'solar-concentrator-training-system',
      name: 'Solar Concentrator Training System',
      category: 'energy',
      summary: 'Solar concentrator training system with a concentrating collector, storage tank and pipework panel on a mobile frame.',
      image: 'solar-concentrator-training-system',
      imageAlt: 'MMI Solar Concentrator Training System with curved reflector, storage tank and pipework panel'
    },
    {
      id: 'pyrolysis-reactor',
      name: 'Pyrolysis Reactor',
      model: 'MMIPR-01',
      category: 'energy',
      summary: 'Pyrolysis reactor on an aluminium frame with power indication and temperature control.',
      image: 'pyrolysis-reactor',
      imageAlt: 'MMI Pyrolysis Reactor with reactor vessel, control panel and pipework on an aluminium frame',
      features: ['Power indicator', 'Temperature controller', 'Reactor vessel with pressure gauge']
    }
  ]
};
