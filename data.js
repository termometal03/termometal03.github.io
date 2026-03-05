// Product data
const productsData = {
    kalaj: {
        title: "Kalaj",
        description: "Kalaj je srebrnasto-beli metal koji se koristi u mnogim industrijskim proizvodima. Poznat po svojoj otpornosti na koroziju, niskoj temperaturi topljenja i odličnim zaštitnim svojstvima. Naš kalaj je visoke čistoće i dolazi sa sertifikatom o kvalitetu.",
        types: [
            "Kalaj u bloku",
             "Kalaj u prahu"
        ],
        specs: [
            "Čistoća: 99.9% i više",
            "Temperatura topljenja: 231.9°C",
            "Gustina: 7.31 g/cm³",
            "Sertifikat o hemijskom sastavu",
            "Mogućnost izrade po meri"
        ]
    },
    olovo: {
        title: "Olovo",
        description: "Olovo je mek, teški metal plavičasto-sive boje. Koristi se kao zaštita od zračenja, u akumulatorima, za izolaciju zvuka i vibracija, kao i u građevinarstvu. Nudimo olovo u bloku sa kompletnom dokumentacijom o kvalitetu.",
        types: [
            "Olovo u blokovima",
        ],
        specs: [
            "Čistoća: 99.9% i više",
            "Temperatura topljenja: 327.5°C",
            "Gustina: 11.34 g/cm³",
            "Sertifikat o hemijskom sastavu",
        ]
    },
    cink: {
        title: "Cink",
        description: "Cink je plavičasto-beli metal koji se prvenstveno koristi za zaštitu čelika od korozije (pocinčavanje). Takođe se koristi u izradi legura, kao što su mesing i bronza. Nudimo cink visoke čistoće za različite industrijske primene.",
        types: [
            "Blok",
            "Anode 600mm x 100mm x 10mm",
            "Anode 800mm x 100mm x 10mm",
            "Anode 1200mm x 100mm x 10mm",
        ],
        specs: [
            "Čistoća: 98.5% - 99.9%",
            "Temperatura topljenja: 419.5°C",
            "Gustina: 7.14 g/cm³",
            "Sertifikat o hemijskom sastavu",
        ]
    },
    nikl: {
        title: "Nikl",
        description: "Nikl je srebrnasto-beli metal poznat po svojoj otpornosti na koroziju i oksidaciju pri visokim temperaturama. Koristi se u proizvodnji nerđajućeg čelika, legura, galvanizaciji i kao katalizator u hemijskoj industriji. Nudimo nikl vrhunskog kvaliteta sa kompletnom dokumentacijom.",
        types: [
            "Nikl u granulama",
        ],
        specs: [
            "Čistoća: 99.6% - 99.98%",
            "Temperatura topljenja: 1455°C",
            "Gustina: 8.91 g/cm³",
            "Sertifikat o hemijskom sastavu",
            "Otporan na koroziju"
        ]
    }
};

// Make it globally accessible
window.productsData = productsData;