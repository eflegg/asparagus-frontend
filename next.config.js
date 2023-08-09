/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // apiUrl: "https://stage.asparagusmagazine.com",
  apiUrl: `${process.env.API_URL}`,
  images: {
    // enter the domain or subdomain where you have WordPress installed

    domains: [`${process.env.WP_DOMAIN}`],
    // domains: ["stage.asparagusmagazine.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    REVALIDATION_TOKEN: process.env.REVALIDATION_TOKEN,
    REVALIDATE_SECRET_KEY: process.env.REVALIDATE_SECRET_KEY,
    API_URL: process.env.API_URL,
    // apiUrl: "https://stage.asparagusmagazine.com",
  },

  staticPageGenerationTimeout: 600,
  async redirects() {
    return [
      {
        source:
          "/cartoonist-bios-satire-environmental-humor-illustration-a9da460990e1",
        destination: "/cartoonist-bios",
        permanent: true,
      },
      {
        source: "/the-climate-disaster-project-1b993cb92da9",
        destination: "/the-climate-disaster-project",
        permanent: true,
      },
      {
        source: "/asparagus-supporters-ad38f05f2e70",
        destination: "/our-supporters",
        permanent: true,
      },
      {
        source: "/fund-our-future-f78a2bb0e403",
        destination: "/fund-our-future",
        permanent: true,
      },
      {
        source: "/whos-who-84f47f248bab",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/about-asparagus-cbe0c9cdeafd",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/submission-guidelines-3e0eb7a4b5d7",
        destination: "/submission-guidelines",
        permanent: true,
      },
      {
        source: "/how-to-support-asparagus-5d89712c2710",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/the-asparagus-manifesto-c60fa7bdaed7",
        destination: "/asparagus-manifesto",
        permanent: true,
      },
      {
        source: "/about-asparagus/home",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/west-coast/home",
        destination: "/categories/vancouver-area",
        permanent: true,
      },
      {
        source: "/culture/home",
        destination: "/categories/art-design",
        permanent: true,
      },
      {
        source: "/food-home/home",
        destination: "/categories/food",
        permanent: true,
      },
      {
        source: "/voices/home",
        destination: "/categories/voices",
        permanent: true,
      },
      {
        source: "/society/home",
        destination: "/categories/human-rights",
        permanent: true,
      },
      {
        source: "/planet/home",
        destination: "/categories/climate-change",
        permanent: true,
      },
      {
        source: "/raising-kids-who-are-ready-for-climate-change-43e2d6faeb48",
        destination:
          "/articles/i-am-teaching-my-kids-about-climate-change-so-they-are-ready",
        permanent: true,
      },
      {
        source:
          "/actual-self-care-for-the-actual-end-of-the-world-145ebe0bd10c",
        destination:
          "/articles/environmentalist-from-hells-self-care-advice-for-anxiety-at-the-actual-end-of-the-world",
        permanent: true,
      },
      {
        source:
          "/childs-organic-mattress-flame-retardant-foam-toxins-environment-health-228f292ca842",
        destination:
          "/articles/organic-non-toxic-mattresses-protect-kids-health-and-environment",
        permanent: true,
      },
      {
        source:
          "/wool-fashion-is-expensive-but-it-is-a-long-lasting-sustainable-wonder-fibre-bebb5b0780b6",
        destination: "/articles/wool-fashion-is-long-lasting-and-sustainable",
        permanent: true,
      },
      {
        source:
          "/fixing-food-waste-starts-at-home-compost-environment-greenhouse-gas-water-community-pantry-bf6fbc43ea5d",
        destination:
          "/articles/reducing-food-waste-at-home-with-compost-and-community-pantry-donations",
        permanent: true,
      },
      {
        source: "/a-long-road-to-action-b70d14b4b26c",
        destination:
          "/articles/xena-szkotak-walking-across-canada-for-awarenss-of-murdered-and-missing-indigenous-women",
        permanent: true,
      },
      {
        source:
          "/clothes-repair-environment-parenting-care-visible-mending-pandemic-4631b903b4e9",
        destination:
          "/articles/repairing-kids-clothes-with-visible-mending-to-reduce-waste",
        permanent: true,
      },
      {
        source:
          "/permaculture-pandemic-parenting-anxiety-ecosystems-interconnection-76bb66742fa9",
        destination:
          "/articles/permacultures-ecosystem-lessons-for-pandemic-parenting",
        permanent: true,
      },
      {
        source:
          "/parenting-anti-consumerism-environment-secondhand-holidays-d04f0a3c193e",
        destination:
          "/articles/parents-buy-nothing-or-secondhand-for-eco-friendly-holidays",
        permanent: true,
      },
      {
        source:
          "/five-ways-to-support-our-kids-through-climate-disasters-d39c9d87b4e4",
        destination:
          "/articles/five-ways-to-support-kids-through-climate-disasters",
        permanent: true,
      },
      {
        source:
          "/environment-nature-childrens-books-recommendation-87fe099769cb",
        destination:
          "/articles/five-books-to-inspire-environmentalist-nature-loving-kids",
        permanent: true,
      },
      {
        source:
          "/experiential-advantage-christmas-holiday-gifts-sustainable-environment-awe-wonder-caf6f1423096",
        destination:
          "/articles/gifts-of-experiences-make-holidays-environmentally-friendly",
        permanent: true,
      },
      {
        source:
          "/the-black-sheep-parents-guide-to-greener-more-joyful-holidays-3afffd911a04",
        destination: "/articles/zero-waste-holiday-guide",
        permanent: true,
      },
      {
        source: "/thinking-outside-the-planetbox-5af00fe626d6",
        destination:
          "/articles/eco-friendly-parenting-tips-for-back-to-school-season",
        permanent: true,
      },
      {
        source: "/more-pinecones-less-paw-patrol-2ce2436c4b7c",
        destination:
          "/articles/helping-children-build-a-relationship-with-nature-and-the-environment",
        permanent: true,
      },
      {
        source: "/black-sheep-parenting-for-a-greener-future-9eceed65aa1b",
        destination: "/articles/embracing-the-paradox-of-sustainable-parenting",
        permanent: true,
      },
      {
        source:
          "/19-love-notes-to-planet-earth-new-year-environment-sustainable-living-ba0ad1c56bfb",
        destination:
          "/articles/19-love-notes-to-planet-earth-for-new-year-2019",
        permanent: true,
      },
      {
        source:
          "/regenerative-agriculture-livestock-cows-combat-climate-change-99d381caa196",
        destination:
          "/articles/regenerative-agriculture-cows-could-combat-climate-change",
        permanent: true,
      },
      {
        source:
          "/decolonize-food-indigenous-agriculture-farm-hunt-gather-harvest-robin-wall-kimmerer-2353ab5f47dd",
        destination:
          "/articles/indigenous-farmers-and-hunters-discuss-decolonizing-food-and-agriculture-systems",
        permanent: true,
      },
      {
        source: "/vegan-leather-should-we-fake-it-til-we-make-it-356c03159981",
        destination: "/articles/vegan-leather-is-plastic",
        permanent: true,
      },
      {
        source:
          "/is-there-hope-for-the-film-industry-to-become-reel-green-3fbf5ba11578",
        destination:
          "/articles/environmentalist-from-hell-asks-if-film-industry-can-become-eco-friendly",
        permanent: true,
      },
      {
        source: "/beyond-the-hype-803ff984219",
        destination:
          "/articles/vegetarian-environmentalist-from-hell-tries-meat-substitute-beyond-burger",
        permanent: true,
      },
      {
        source:
          "/a-renters-guide-to-affordably-surviving-severe-weather-caused-by-climate-change-4ae1e0d1fc70",
        destination:
          "/articles/environmentalist-from-hells-advice-for-renters-living-through-climate-emergencies",
        permanent: true,
      },
      {
        source:
          "/climate-crisis-artist-activism-social-change-eco-anxiety-equality-artist-brigade-dcb487c36ae9",
        destination:
          "/articles/environmentalist-from-hell-learns-about-artist-brigade-using-creativity-to-fight-climate-crisis",
        permanent: true,
      },
      {
        source:
          "/2021-supercharged-my-climate-emergency-anxiety-heat-dome-forest-wildfire-mental-health-2a0fa6211efd-2a0fa6211efd",
        destination:
          "/articles/extreme-bc-weather-in-2021-increased-environmentalist-from-hells-climate-anxiety",
        permanent: true,
      },
      {
        source:
          "/covid-19-pandemic-environment-endangered-animal-poaching-amazon-logging-public-transit-disaster-capitalism-8b96ccf39568",
        destination:
          "/articles/environmentalist-from-hell-reveals-environmental-impacts-of-covid-19-pandemic",
        permanent: true,
      },
      {
        source:
          "/hotel-towels-travel-industry-tourism-greenwashing-sustainability-environment-initiatives-housekeeping-61b197df5445",
        destination:
          "/articles/environmentalist-from-hell-looks-into-hotel-housekeeping-greenwashing",
        permanent: true,
      },
      {
        source:
          "/zero-waste-possible-covid-19-pandemic-single-use-reusable-items-virus-2a47913755f3",
        destination:
          "/articles/environmentalist-from-hell-fights-the-rise-in-single-use-items-during-covid-19-pandemic",
        permanent: true,
      },
      {
        source:
          "/garbage-crisis-big-business-disposable-consumer-culture-4ceded18f5d1",
        destination:
          "/articles/environmentalist-from-hell-blames-big-business-for-the-garbage-crisis",
        permanent: true,
      },
      {
        source:
          "/bottled-water-environment-plastic-pollution-microplastics-health-marketing-e11a61953609",
        destination:
          "/articles/environmentalist-from-hell-takes-aim-at-bottled-water",
        permanent: true,
      },
      {
        source:
          "/secondhand-clothing-shopping-thrifting-consignment-environment-fast-fashion-fbed46831b15",
        destination:
          "/articles/environmentalist-from-hell-goes-thrift-shopping-for-secondhand-clothes-to-help-the-planet",
        permanent: true,
      },
      {
        source: "/straw-bans-suck-440f991f7c8b",
        destination:
          "/articles/environmentalist-from-hell-has-concerns-about-straw-bans",
        permanent: true,
      },
      {
        source: "/self-care-for-the-end-of-the-world-e4bf969fc469",
        destination:
          "/articles/environmentalist-from-hell-offers-self-care-tips-for-the-end-of-the-world",
        permanent: true,
      },
      {
        source: "/your-coffee-cup-makes-me-hate-you-c80beb7f9f47",
        destination:
          "/articles/environmentalist-from-hell-hates-people-who-use-disposable-coffee-cups",
        permanent: true,
      },
      {
        source: "/how-a-punk-rap-turned-me-veg-91def6019ce6",
        destination:
          "/articles/environmentalist-from-hell-recalls-the-punk-rap-song-that-mad-her-a-teenage-vegetarian",
        permanent: true,
      },
      {
        source:
          "/environmental-movement-diversity-problem-inclusion-racial-justice-activism-93caeb539766",
        destination:
          "/articles/activists-say-major-environmental-groups-must-be-more-racially-diverse-to-solve-the-climate-crisis",
        permanent: true,
      },
      {
        source:
          "/apocalypse-climate-change-clifi-movies-television-hollywood-science-environment-devastation-solutions-future-db6c878700b",
        destination:
          "/articles/activists-explain-how-hollywood-could-make-climate-fiction-movies-that-help-us-see-solutions",
        permanent: true,
      },
      {
        source:
          "/a-feminist-climate-renaissance-green-movement-leadership-women-of-colour-inclusion-b68b3c207ceb",
        destination:
          "/articles/women-are-leading-a-feminist-renaissance-in-climate-movement-leadership",
        permanent: true,
      },
      {
        source: "/artists-are-the-architects-of-activism-we-need-6c07719ecb27",
        destination:
          "/articles/artists-help-activists-imagine-climate-solutions",
        permanent: true,
      },
      {
        source:
          "/activism-without-assembly-making-change-when-getting-together-is-off-limits-9c2b5341f44f",
        destination:
          "/articles/what-does-activism-look-like-when-you-cant-gather",
        permanent: true,
      },
      {
        source: "/eco-anxiety-climate-change-coping-treatment-cbt-72625b481f54",
        destination:
          "/articles/counselling-therapy-treatment-for-climate-change-eco-anxiety",
        permanent: true,
      },
      {
        source:
          "/cora-ball-laundry-clothing-microfibre-filter-marine-life-plastic-pollution-effective-b39cd2fc2e4a",
        destination:
          "/articles/review-of-cora-ball-protecting-marine-life-from-plastic-microfibres-in-laundry",
        permanent: true,
      },
      {
        source: "/all-that-glitters-23f73136c913",
        destination: "/articles/glitter-is-a-polluting-microplastic",
        permanent: true,
      },
      {
        source:
          "/sustainable-eco-friendly-lip-balm-ingredients-packaging-51e4c32f8c65",
        destination: "/articles/the-decider-finds-eco-friendly-lip-balm",
        permanent: true,
      },
      {
        source:
          "/story-of-solar-panels-renewable-energy-lifecycle-manufacture-recycle-environment-silicon-thinfilm-39f0bc6a9b25",
        destination:
          "/articles/environmental-impact-of-solar-panels-lifecycle-from-mining-to-disposal",
        permanent: true,
      },
      {
        source:
          "/eco-friendly-sustainable-coral-reef-safe-sunscreen-environment-marine-life-spray-nano-zinc-titanium-7760ddb24a11",
        destination:
          "/articles/the-decider-finds-mineral-sunscreens-that-protect-coral-reefs-and-your-health",
        permanent: true,
      },
      {
        source:
          "/5-ways-to-choose-sustainable-ethical-chocolate-cocoa-certification-e301e79726bb",
        destination:
          "/articles/the-decider-suggests-ways-to-choose-ethical-sustainable-chocolate-brands-and-certifications",
        permanent: true,
      },
      {
        source:
          "/how-to-do-sustainable-laundry-detergent-eco-friendly-packaging-waste-f92f0860b5d2",
        destination:
          "/articles/the-decider-helps-make-sustainable-laundry-and-detergent-choices",
        permanent: true,
      },
      {
        source:
          "/can-recycling-clothes-help-major-fashion-brands-reduce-the-industrys-environmental-footprint-a89416333bb9",
        destination:
          "/articles/can-recycling-clothes-help-major-fashion-brands-reduce-the-industrys-environmental-footprint",
        permanent: true,
      },
      {
        source:
          "/wrapping-paper-forestry-energy-water-intensive-pollution-recycle-9f71b92e0a15",
        destination:
          "/articles/environmental-impact-of-wrapping-papers-life-cycle-from-the-forest-to-recycling",
        permanent: true,
      },
      {
        source:
          "/building-the-circular-economy-a-q-a-with-kate-daly-d6a61e1eff4",
        destination: "/articles/kate-daly-explains-the-circular-economy",
        permanent: true,
      },
      {
        source: "/the-decider-toilet-paper-and-other-tissues-65df4fd69979",
        destination:
          "/articles/the-decider-finds-eco-friendly-toilet-paper-and-household-tissue-options",
        permanent: true,
      },
      {
        source:
          "/plastic-free-christmas-decorations-toys-wrapping-packaging-pollution-climate-change-743148a041ff",
        destination: "/articles/how-to-plan-a-plastic-free-christmas",
        permanent: true,
      },
      {
        source:
          "/seth-klein-and-christine-boyles-vancouver-home-renovated-with-energy-efficient-heat-pump-induction-solar-61801ae5ffea",
        destination:
          "/articles/seth-klein-christine-boyle-replaced-gas-appliances-in-vancouver-home-with-heat-pump-and-induction",
        permanent: true,
      },
      {
        source:
          "/nature-canadas-bird-friendly-city-certification-makes-urban-environments-safer-for-birds-3ac6840eb2e5",
        destination:
          "/articles/nature-canadas-bird-friendly-city-program-makes-urban-environments-safer-for-birds",
        permanent: true,
      },
      {
        source:
          "/lessons-from-covid-19-pandemic-lockdown-philippines-new-york-downtown-east-side-vancouver-a191bebe3ed7",
        destination:
          "/articles/lessons-from-covid-19-pandemic-lockdown-in-philippines-new-york-downtown-east-side-vancouver",
        permanent: true,
      },
      {
        source:
          "/beer-soda-pop-aluminum-can-glass-bottle-environment-recycling-refillable-growler-2d2c7299b820",
        destination:
          "/articles/the-decider-finds-out-if-cans-or-glass-bottles-are-more-environmentally-friendly",
        permanent: true,
      },
      {
        source:
          "/msc-marine-stewardship-council-eco-certification-label-sustainable-seafood-d57ef3348a65",
        destination:
          "/articles/know-logo-examines-if-msc-certified-seafood-is-sustainable",
        permanent: true,
      },
      {
        source:
          "/canada-cannabis-marijuana-environmental-footprint-5b356acedb5",
        destination:
          "/articles/environmental-impact-of-energy-used-by-canada-cannabis-boom",
        permanent: true,
      },
      {
        source:
          "/sustainable-palm-oil-environment-deforestation-orangutan-climate-change-labor-conditions-2c5699d541b1",
        destination:
          "/articles/palm-oil-farming-causes-deforestation-human-rights-abuses-and-hurts-orangutans",
        permanent: true,
      },
      {
        source:
          "/the-decider-is-reading-print-or-e-books-better-for-the-environment-3e16e977a1a5",
        destination:
          "/articles/the-decider-explores-if-reading-print-or-e-books-is-better-for-the-environment",
        permanent: true,
      },
      {
        source: "/californias-lying-fields-of-gold-f8c6f0a348d5",
        destination:
          "/articles/californias-golden-rolling-hills-are-covered-in-non-native-invasive-grass-species",
        permanent: true,
      },
      {
        source: "/does-climate-change-mean-i-cant-have-kids-69dc65ace779",
        destination: "/articles/does-climate-change-mean-i-cant-have-kids",
        permanent: true,
      },
      {
        source:
          "/responsible-whale-watching-endangered-southern-resident-orcas-salish-sea-j-pod-69d924f11c5c",
        destination:
          "/articles/responsible-whale-watching-near-seattle-vancouver-protects-southern-resident-orca-killer-whales",
        permanent: true,
      },
      {
        source:
          "/cloth-disposable-diapers-baby-environment-carbon-emissions-garbage-laundry-water-use-dafb8aa98300",
        destination:
          "/articles/the-decider-finds-out-if-cloth-or-disposable-diapers-are-better-for-the-environment",
        permanent: true,
      },
      {
        source:
          "/the-story-of-avocado-deforestation-irrigation-pesticides-cancer-farmer-health-mexico-organic-3b392256850e",
        destination:
          "/articles/avocado-agriculture-causes-deforestation-and-pesticides-hurt-farmer-health-in-mexico",
        permanent: true,
      },
      {
        source:
          "/citizen-scientists-saving-bats-bc-white-nose-syndrome-fungal-infection-endangered-species-4369920e7b64",
        destination:
          "/articles/meet-the-citizen-scientists-saving-bcs-bats-from-white-nose-syndrome",
        permanent: true,
      },
      {
        source:
          "/indigenous-communities-on-vancouver-island-are-healing-forests-for-the-future-4db32f70c7b5",
        destination:
          "/articles/indigenous-communities-on-vancouver-island-are-healing-forests-for-the-future",
        permanent: true,
      },
      {
        source:
          "/zero-waste-grocers-take-shopping-back-to-the-future-526dc9c06ace",
        destination:
          "/articles/vancouvers-zero-waste-grocery-nada-uses-technology-to-reduce-waste",
        permanent: true,
      },
      {
        source: "/tayybehs-kind-and-ambitious-cuisine-aa76dc41bf3c",
        destination:
          "/articles/syrian-refugee-women-bring-their-cuisine-to-vancouver-with-tayybeh-caterin",
        permanent: true,
      },
      {
        source:
          "/race-to-replace-fossil-fuels-with-synthetic-biofuels-efuels-transportation-climate-change-ee03d26d75b6",
        destination:
          "/articles/scientists-race-to-replace-fossil-fuels-for-transportation-with-synthetic-biofuels-and-efuels",
        permanent: true,
      },
      {
        source:
          "/ai-artificial-intelligence-bias-art-equality-racism-facial-recognition-algorithmic-justice-league-ajl-cbb76b1c0383",
        destination:
          "/articles/algorithmic-justice-league-and-other-artists-fight-racial-bias-in-artificial-intelligence",
        permanent: true,
      },
      {
        source:
          "/dirty-fast-fashion-industry-pollution-sustainable-innovation-textile-recycling-circular-economy-bd2150e9b7dd",
        destination:
          "/articles/the-fast-fashion-industry-is-hurting-the-planet-we-need-sustainable-alternatives",
        permanent: true,
      },
      {
        source:
          "/class-of-2020-graduates-covid-19-universal-basic-income-environmental-economic-justice-905c6f0c84ac",
        destination:
          "/articles/class-of-2020-graduates-need-a-universal-basic-income-for-environmental-and-economic-justice",
        permanent: true,
      },
      {
        source:
          "/lentils-peas-beans-pulses-agriculture-farming-plant-based-food-canada-covid-pandemic-green-recovery-c2b5a69fda85",
        destination:
          "/articles/lentils-peas-beans-pulses-agriculture-could-be-part-of-canadas-covid-pandemic-green-recovery",
        permanent: true,
      },
      {
        source:
          "/science-stem-diversity-equality-gender-representation-b0e80a818228",
        destination:
          "/articles/science-and-stem-fields-still-fall-short-ondiversity-equality-gender-representation",
        permanent: true,
      },
      {
        source:
          "/haedyn-khris-beaumann-trans-woman-bc-prison-human-rights-complaint-3f2a983c21b1",
        destination:
          "/articles/haedyn-khris-beaumann-filed-human-rights-complaint-about-experience-as-trans-woman-in-bc-prison",
        permanent: true,
      },
      {
        source:
          "/whale-orcas-songs-show-vancouver-leah-abramson-environment-grief-climate-change-oceans-parenting-e221737dbd7d",
        destination:
          "/articles/leah-abramson-explores-grief-about-climate-crisis-in-performance-built-around-orca-song",
        permanent: true,
      },
      {
        source:
          "/wetsuweten-gidimten-unistoten-pipeline-land-defenders-protectors-protest-arrest-4c5613f809c5",
        destination:
          "/articles/wetsuweten-gidimten-unistoten-land-defenders-fighting-pipelin-protect-more-than-the-environment",
        permanent: true,
      },
      {
        source:
          "/this-unceded-indigenous-land-doesnt-need-an-environmentalist-white-saviour-complex-to-protect-it-87b091b5dd8a",
        destination:
          "/articles/this-unceded-indigenous-land-doesnt-need-an-environmentalist-white-saviour-complex-to-protect-it",
        permanent: true,
      },
      {
        source:
          "/refugee-children-integrate-school-picture-book-kindergarten-teacher-4a431f6164e0",
        destination:
          "/articles/this-kindergarten-teacher-wrote-a-picture-book-to-help-refugee-kids-integrate-at-school",
        permanent: true,
      },
      {
        source:
          "/athabasca-glacier-columbia-icefield-melting-alberta-politics-climate-change-25cd84e0d50",
        destination:
          "/articles/once-climate-change-melts-the-receding-athabasca-glacier-and-columbia-ice-field-they-are-gone",
        permanent: true,
      },
      {
        source:
          "/chaga-mushroom-fungus-health-food-foraging-sustainable-forest-wildcrafting-9c371594b193",
        destination:
          "/articles/can-canadas-booming-forest-harvest-of-chaga-mushroom-health-food-become-sustainable",
        permanent: true,
      },
      {
        source:
          "/behrs-hairstreak-butterfly-endangered-antelope-bush-ecosystem-extinct-a93246a450d9",
        destination:
          "/articles/the-behrs-hairstreak-butterflys-antelope-bush-ecosystem-is-endangered",
        permanent: true,
      },
      {
        source:
          "/mountain-pine-bark-beetle-outbreak-elk-forestry-management-climate-change-caeae4c0a4e1",
        destination:
          "/articles/climate-change-increases-mountain-pine-bark-beetle-damage-to-trees-forests-and-wildlife",
        permanent: true,
      },
      {
        source:
          "/travel-bottled-water-portable-purifier-health-environment-bad86294d089",
        destination:
          "/articles/portable-filter-bottles-like-larq-lifestraw-grayl-let-travelers-drink-water-anywhere-without-extra-plastic",
        permanent: true,
      },
      {
        source:
          "/protect-the-amazon-rainforest-by-eating-these-5-foods-f5ac6995332d",
        destination:
          "/articles/protect-the-amazon-rainforest-by-eating-acai-chocolate-brazil-nuts-guarana-and-baniwa-chili",
        permanent: true,
      },
      {
        source:
          "/recycling-feels-so-right-but-were-doing-it-wrong-71284fa67ec2",
        destination:
          "/articles/recycling-feels-so-right-but-were-doing-it-wrong",
        permanent: true,
      },
      {
        source: "/the-true-price-of-bread-555863aeb016",
        destination:
          "/articles/a-universal-basic-income-could-repair-our-unjust-food-system",
        permanent: true,
      },
      {
        source:
          "/land-art-from-nature-indigenous-gitxsan-formline-skeena-river-michelle-alex-stoney-be185ac74aa1",
        destination:
          "/articles/michelle-alex-stoney-make-gitxsan-formline-land-art-from-nature-on-the-banks-of-the-skeena-river",
        permanent: true,
      },
      {
        source:
          "/reduce-concretes-environmental-impact-green-building-material-cities-construction-carbon-alternative-3225af98815",
        destination: "/articles/can-we-reduce-concretes-environmental-impact",
        permanent: true,
      },
      {
        source:
          "/b-corp-benefit-corporation-certification-environment-greenwashing-triple-bottom-line-a587a83df008",
        destination:
          "/articles/know-logo-asks-if-the-b-corp-certification-process-greenwashing",
        permanent: true,
      },
      {
        source:
          "/story-of-plastic-pollution-q-a-von-hernandez-philippines-global-south-activism-e8e3048c0a5d",
        destination:
          "/articles/filipino-activist-von-hernandez-discusses-pollution-and-story-of-plastic-documentary",
        permanent: true,
      },
      {
        source:
          "/push-festival-2020-environment-theatre-david-suzuki-tara-cullis-performance-puppetry-high-water-d3612bdd6e65",
        destination:
          "/articles/environmental-performances-at-2020-push-festival-include-david-suzuki-tara-cullis-and-puppetry",
        permanent: true,
      },
      {
        source:
          "/sustainable-local-organic-biodynamic-wine-box-bottle-cork-carbon-footprint-c765e2c71ee3",
        destination:
          "/articles/six-ways-to-buy-environmentally-sustainable-wine-that-is-organic-or-certified",
        permanent: true,
      },
      {
        source:
          "/car-free-parenting-cargo-bike-advice-mathew-bond-north-vancouver-5e7b498d4d69",
        destination:
          "/articles/mathew-bond-gives-advice-on-parenting-without-a-car-using-a-cargo-bike",
        permanent: true,
      },
      {
        source:
          "/leed-green-building-certification-criticism-home-apartment-condo-office-construction-56b2448a4fd8",
        destination:
          "/articles/know-logo-looks-at-criticism-of-leed-green-building-certification-for-construction-projects",
        permanent: true,
      },
      {
        source:
          "/pandemic-toilet-paper-shortages-bidet-environment-a1e994031b9e",
        destination:
          "/articles/pandemic-shortages-inspired-this-couple-to-trade-forest-harming-toilet-paper-for-a-bidet",
        permanent: true,
      },
      {
        source:
          "/north-vancouver-mountain-biking-sustainable-trail-building-nsmba-75ad75e75ede",
        destination:
          "/articles/north-vancouver-mountain-bikers-build-sustainable-trails",
        permanent: true,
      },
      {
        source:
          "/can-inclusive-cycling-culture-be-brewed-in-a-coffee-pot-as-alternative-to-competition-elitism-ca20dcee81bd",
        destination:
          "/articles/inclusive-non-competitive-cycling-culture-is-nurtured-at-coffee-outside-and-group-rides",
        permanent: true,
      },
      {
        source:
          "/in-the-territory-documentary-indigenous-uru-eu-wau-wau-protect-amazon-rainforest-from-brazilian-settlers-cb56fadf1b2a",
        destination:
          "/articles/the-territory-documentary-shows-indigenous-uru-eu-wau-wau-people-protecting-amazon-rainforest",
        permanent: true,
      },
      {
        source:
          "/therapists-owe-solidarity-to-marginalized-clients-who-face-racism-oppression-and-violence-not-just-empathy-7234afc39ede",
        destination:
          "/articles/therapists-owe-solidarity-to-marginalized-clients-who-face-racism-oppression-and-violence",
        permanent: true,
      },
      {
        source:
          "/journalist-alanna-mitchells-climate-change-play-sea-sick-shares-ocean-science-stories-ef3cec3d1e4a",
        destination:
          "/articles/journalist-alanna-mitchells-climate-change-play-sea-sick-shares-ocean-science-stories",
        permanent: true,
      },
      {
        source:
          "/interview-with-afghan-canadian-textile-artist-hangama-amiri-taliban-pandemic-isolation-quilt-exhibit-cdfbcfbff55b",
        destination:
          "/articles/afghan-canadian-textile-artist-hangama-amiri-talks-about-taliban-pandemic-isolation-and-quilt-exhibit",
        permanent: true,
      },
      {
        source:
          "/know-logo-examines-environmental-working-groups-clean-beauty-certification-ewg-verified-ee50ef9514c6",
        destination:
          "/articles/know-logo-examines-environmental-working-groups-clean-beauty-certification-ewg-verified",
        permanent: true,
      },
      {
        source:
          "/documentary-films-by-luke-gleeson-and-ali-kazimi-tell-stories-of-indigenous-nations-fighting-erasure-5109c915b46",
        destination:
          "/articles/documentary-films-by-luke-gleeson-and-ali-kazimi-tell-stories-of-indigenous-nations-fighting-erasure",
        permanent: true,
      },
      {
        source:
          "/crypto-is-a-gamble-for-your-wallet-and-the-planet-237c225f101e",
        destination:
          "/articles/cryptocurrency-is-a-risky-investment-that-has-a-large-environmental-impact",
        permanent: true,
      },
      {
        source: "/soys-rise-is-causing-ecological-downfall-a6a37f63de16",
        destination:
          "/articles/soy-agriculture-for-animal-feed-has-major-environmental-impacts",
        permanent: true,
      },
      {
        source:
          "/controversial-forest-certification-wood-timber-lumber-logging-fsc-sfi-deforestation-green-paper-3b1f28ea2f12",
        destination:
          "/articles/know-logo-looks-into-controversies-around-forest-wood-paper-certification-programs-fsc-and-sfi",
        permanent: true,
      },
      {
        source:
          "/lab-grown-cultured-meat-pet-cat-dog-food-environment-animal-agriculture-b00c83812bf8",
        destination:
          "/articles/lab-grown-cultured-pet-food-offers-an-alternative-to-environmentally-harmfulmeat-agriculture",
        permanent: true,
      },
      {
        source:
          "/the-decider-plant-based-milks-almond-oat-organic-soy-pea-coconut-environment-health-bees-bae42c35dc7b",
        destination:
          "/articles/the-decider-looks-at-environmental-impact-of-plant-based-milks-like-almond-oat-soy-pea-coconut",
        permanent: true,
      },
      {
        source:
          "/the-decider-artificial-real-christmas-tree-environment-carbon-emissions-plastic-pollution-5e93da9cb4e2",
        destination:
          "/articles/the-decider-asks-if-artificial-real-christmas-trees-are-better-for-the-environment",
        permanent: true,
      },
      {
        source:
          "/eco-certification-label-ecologo-avoid-greenwashing-products-65332adefcfd",
        destination:
          "/articles/know-logo-asks-whether-ecologo-certification-is-trustworthy",
        permanent: true,
      },
      {
        source:
          "/eco-documentary-films-climate-change-environmental-justice-anthropocene-inuk-coral-urban-farming-radicals-c4e6191963f5",
        destination:
          "/articles/documentaries-spotlight-coral-reefs-seal-hunt-anthropocene-urban-farming-women-climate-leaders",
        permanent: true,
      },
      {
        source:
          "/fairtrade-usa-certification-clothes-cotton-factories-workers-environment-supply-chain-c0bf1f987ef3",
        destination:
          "/articles/know-logo-looks-at-fairtrade-usa-certified-clothing",
        permanent: true,
      },
      {
        source:
          "/sustainable-period-reusable-menstrual-pads-cups-leak-proof-underwear-environment-disposable-plastic-waste-3d3946697e27",
        destination:
          "/articles/sustainable-reusable-menstrual-period-pads-cups-underwear-reduce-disposable-plastic-waste",
        permanent: true,
      },
      {
        source: "/indigenous-women-deserve-better-health-care-bc7983cc349a",
        destination:
          "/articles/indigenous-women-deserve-better-treatment-in-the-discriminatory-health-care-system",
        permanent: true,
      },
      {
        source:
          "/parenting-through-climate-crisis-events-in-bc-heat-dome-flooding-atmospheric-river-wildfires-polar-vortex-73ed233cb846",
        destination:
          "/articles/parenting-through-climate-crisis-events-in-bc-heat-dome-flooding-wildfires-polar-vortex",
        permanent: true,
      },
      {
        source:
          "/gardening-for-the-climate-crisis-homegrown-food-family-children-survival-c3f654b1f003",
        destination:
          "/articles/growing-food-in-our-home-garden-helps-my-family-prepare-for-surviving-the-climate-crisis",
        permanent: true,
      },
      {
        source:
          "/santas-truckers-tasuleasa-social-protects-romanian-forests-promotes-volunteering-aa0bbe35000c",
        destination:
          "/articles/tasuleasa-social-protects-romanian-forests-promotes-volunteering-with-santas-truckers",
        permanent: true,
      },
      {
        source:
          "/hey-imaginable-guidelines-role-playing-card-game-citizens-urban-planning-istanbul-28ba6e66377f",
        destination:
          "/articles/role-playing-card-game-involves-citizens-in-urban-city-planning",
        permanent: true,
      },
      {
        source:
          "/ukrainian-youth-will-not-be-the-same-after-russian-invasion-ukraine-bila-tserkva-kyiv-social-worker-3ef542626167",
        destination:
          "/articles/social-worker-says-youth-in-ukraine-will-not-be-the-same-after-russian-invasion",
        permanent: true,
      },
      {
        source:
          "/anti-oppressive-therapy-racialized-communities-mental-health-toronto-wellnest-clinic-counselling-d6612a4b46af",
        destination:
          "/articles/toronto-wellnest-mental-health-clinic-offers-anti-oppressive-counselling-for-racialized-communities",
        permanent: true,
      },
      {
        source:
          "/articles/fighting-the-cycle-of-environmental-abuse-and-fossil-fuel-dependence-during-bc-climate-disasters",
        destination:
          "/articles/climate-disasater-project-fighting-the-cycle-of-environmental-abuse-and-fossil-fuel-dependence",
        permanent: true,
      },
      {
        source:
          "/fighting-the-cycle-of-environmental-abuse-fossil-fuel-dependence-climate-crisis-bc-wildfire-evacuations-8abe076e6828",
        destination:
          "/articles/climate-disasater-project-fighting-the-cycle-of-environmental-abuse-and-fossil-fuel-dependence",
        permanent: true,
      },
      {
        source:
          "/neighbourhood-buy-nothing-groups-could-create-networks-ready-to-weather-the-climate-crisis-2c889e10a891",
        destination:
          "/articles/neighbourhood-buy-nothing-groups-could-create-networks-ready-to-weather-the-climate-crisis",
        permanent: true,
      },
      {
        source:
          "/rethink-indigenous-artifact-trading-posts-in-the-american-southwest-true-impacts-83f24dc6d5a8",
        destination:
          "/articles/reimagining-indigenous-artifact-trading-posts-in-the-american-southwest",
        permanent: true,
      },
      {
        source:
          "/hailzaqv-first-nation-community-energy-plan-fights-climate-change-with-electric-heat-pumps-d307a33c8c39",
        destination:
          "/articles/hailzaqv-first-nation-community-energy-plan-fights-climate-change-with-electric-heat-pumps",
        permanent: true,
      },
      {
        source:
          "/feeding-wildlife-like-squirrels-coyotes-and-bears-feels-good-but-its-better-to-protect-their-habitat-8065d65067ca",
        destination:
          "/articles/feeding-wildlife-like-squirrels-coyotes-and-bears-feels-good-but-its-better-to-protect-their-habitat",
        permanent: true,
      },
      {
        source:
          "/new-hydro-dams-in-indian-controlled-kashmir-will-hurt-ecosystems-and-indigenous-communities-c910b58c3645",
        destination:
          "/articles/new-hydro-dams-in-indian-controlled-kashmir-will-hurt-ecosystems-and-indigenous-communities",
        permanent: true,
      },
      {
        source:
          "/make-gorgeous-hot-compost-for-gardening-in-just-6-weeks-with-paper-food-scraps-yard-waste-bf25380af6a",
        destination:
          "/articles/make-gorgeous-hot-compost-for-gardening-in-just-6-weeks-from-paper-food-scraps-yard-waste",
        permanent: true,
      },
      {
        source:
          "/sustainable-music-guitars-illegal-logging-save-trees-environment-forestry-5c740d339e6b",
        destination:
          "/articles/instead-of-endangered-woods-some-luthiers-explore-making-guitars-from-more-sustainable-materials",
        permanent: true,
      },
      {
        source:
          "/goats-eat-invasive-species-in-pittsburgh-parks-to-clear-honeysuckle-for-bird-habitats6c5e0838ea47-6c5e0838ea47",
        destination:
          "/articles/goats-eat-invasive-species-in-pittsburgh-parks-to-clear-honeysuckle-for-bird-habitats",
        permanent: true,
      },
      {
        source:
          "/black-lives-matter-activism-protest-disability-chronic-pain-resistance-ableism-1cc32ed24441",
        destination:
          "/articles/i-have-to-overcome-chronic-pain-to-engage-in-activism-like-black-lives-matter-protests",
        permanent: true,
      },
      {
        source:
          "/worry-fluoride-dental-health-toothpaste-environment-pollution-f87c2fb0f742",
        destination:
          "/articles/fluoride-in-water-toothpaste-strengthens-teeth-but-causes-worry-about-health-and-environment",
        permanent: true,
      },
      {
        source:
          "/kombucha-scoby-reflection-on-treaty-relationships-indigenous-land-708a0b7cf0ab",
        destination:
          "/articles/brewing-kombucha-prompts-reflection-about-treaty-relationships-on-indigenous-land",
        permanent: true,
      },
      {
        source:
          "/cruelty-free-ethical-vegan-investing-climate-racial-justice-anti-racism-stock-market-d0118e8dc22a",
        destination:
          "/articles/is-this-vegan-ethical-stock-market-investment-fund-truly-cruelty-free",
        permanent: true,
      },
      {
        source:
          "/covid-19-pandemic-care-economy-undervalued-unpaid-childcare-eldercare-gender-equality-26923637cea",
        destination:
          "/articles/the-covid-19-pandemic-is-a-chance-to-rethink-the-gendered-and-undervalued-care-economy",
        permanent: true,
      },
      {
        source:
          "/netukulimk-mikmaq-nature-indigenous-lobster-fishing-hunting-nova-scotia-quechua-sumak-kawsay-eaf944c8ef11",
        destination:
          "/articles/netukulimk-is-the-mikmaq-way-of-living-in-harmony-with-nature",
        permanent: true,
      },
      {
        source:
          "/coral-reef-restoration-scuba-diving-koh-tao-thailand-bleaching-climate-change-plastic-pollution-eeeb006b64a1",
        destination:
          "/articles/scuba-divers-in-thailand-restore-coral-reefs-threatened-by-bleaching-climate-change-plastic-pollution",
        permanent: true,
      },
      {
        source: "/when-the-amazon-burns-we-all-lose-889c99dfb273",
        destination:
          "/articles/amazon-rainforest-fires-hurt-biodiversity-speed-climate-change-threaten-indigenous-communities",
        permanent: true,
      },
      {
        source:
          "/closing-digital-divide-technology-internet-access-indigenous-self-determination-rights-nation-building-1822fa917eea",
        destination:
          "/articles/closing-the-digital-divide-in-indigenous-communities-leads-to-self-determination-and-nation-building",
        permanent: true,
      },
      {
        source:
          "/urban-nature-conservation-center-immigrants-indigenous-elders-audubon-debs-park-los-angeles-b5a3668b810",
        destination:
          "/articles/los-angeles-audubon-center-links-immigrant-indigenous-communities-with-urban-nature-conservation",
        permanent: true,
      },
      {
        source:
          "/social-justice-children-kids-books-for-budding-activists-kindness-empathy-reading-a0a0f8c5f4e3",
        destination:
          "/articles/social-justice-kids-books-for-budding-activists-kindness-build-empathy",
        permanent: true,
      },
      {
        source:
          "/new-documentary-belle-river-spotlights-a-flooded-louisiana-community-in-denial-about-climate-change-c414dfe07642",
        destination:
          "/articles/documentary-belle-river-spotlights-flooded-louisiana-community-in-denial-about-climate-change",
        permanent: true,
      },
      {
        source:
          "/in-wochiigii-lo-end-of-the-peace-west-moberly-first-nations-protect-their-territory-from-the-site-c-dam-c5dde9e67de0",
        destination:
          "/articles/in-wochiigii-lo-end-of-the-peace-west-moberly-first-nation-protects-their-territory-from-the-site-c-dam",
        permanent: true,
      },
      {
        source:
          "/climate-change-sustainable-farmers-agriculture-kisumu-kenya-food-poultry-livestock-forestry-africa-fde1e56120b8",
        destination:
          "/articles/farmers-in-kenyas-kisumu-region-adopt-climate-smart-sustainable-agricultural-practices",
        permanent: true,
      },
      {
        source:
          "/textilandia-gentrification-bushwick-brooklyn-new-york-history-taxilandia-interactive-theatre-experience-90bb9cb30280",
        destination:
          "/articles/textilandia-immerses-participants-in-the-history-of-gentrification-in-bushwick-brooklyn-new-york",
        permanent: true,
      },
      {
        source:
          "/forest-school-environmentalism-ecological-identity-children-play-nature-climate-change-resilience-b2b559a481f6",
        destination:
          "/articles/kids-in-forest-schools-build-ecological-identity-and-resilience-playing-in-nature",
        permanent: true,
      },
      {
        source:
          "/gmo-cereal-crops-synthetic-fertilizer-carbon-emissions-climate-change-sustainable-organic-agriculture-40f026971651",
        destination:
          "/articles/could-gmo-crops-help-solve-climate-crisis-by-reducing-agricultures-synthetic-fertilizer-emissions",
        permanent: true,
      },
      {
        source:
          "/artist-sharon-kallis-is-reclaiming-a-tradition-of-weaving-and-making-local-clothing-from-stinging-nettle-149bc167b9a4",
        destination:
          "/articles/artist-sharon-kallis-is-reclaiming-a-tradition-of-weaving-and-making-clothing-from-local-stinging-nettle",
        permanent: true,
      },
      {
        source:
          "/vancouver-affordability-crisis-comedy-real-estate-arts-gentrification-housing-community-eviction-feda08b5456c",
        destination:
          "/articles/affordability-crisis-affects-housing-arts-venues-like-comedy-community-centre-little-mountain-gallery",
        permanent: true,
      },
      {
        source:
          "/we-need-to-rethink-disaster-relief-hurricane-dorian-bahamas-humanitarian-aid-food-donation-climate-crisis-d2a5542d8788",
        destination:
          "/articles/we-need-to-rethink-relief-and-humanitarian-food-aid-provided-after-climate-disasters-like-hurricanes",
        permanent: true,
      },
      {
        source:
          "/california-2020-wildfire-season-forest-smoke-climate-change-health-effects-covid-19-6f3a9804277f",
        destination:
          "/articles/during-californias-2020-wildfires-i-researched-long-term-health-effects-of-living-with-smoke",
        permanent: true,
      },
      {
        source:
          "/covid-19-climate-finance-article-9-paris-accord-cop21-adaptation-mitigation-81b83749457d",
        destination:
          "/articles/covid-19-could-kill-paris-accord-commitments-to-fund-climate-adaptation-mitigation-in-poor-countries",
        permanent: true,
      },
      {
        source: "/covid-19-is-a-chance-to-rethink-venice-f8321cd890ce",
        destination:
          "/articles/covid-19-pandemic-is-a-chance-to-rethink-travel-tourism-environment-in-venice",
        permanent: true,
      },
      {
        source:
          "/urban-apartment-composting-worms-vermicompost-castings-476fdb9053b8",
        destination:
          "/articles/apartment-sized-worm-bin-bokashi-composter-vermicomposting-options",
        permanent: true,
      },
      {
        source:
          "/when-it-comes-to-tiny-gardens-we-need-to-think-big-balcony-patio-apartment-container-gardening-511647492c7b",
        destination:
          "/articles/balcony-patio-apartment-container-gardeners-need-support-from-cities-like-community-gardens",
        permanent: true,
      },
      {
        source:
          "/canada-cannabis-industrial-hemp-clothing-textiles-fashion-sustainable-environment-ccd55cbabc0b",
        destination:
          "/articles/could-canadas-green-rush-include-environmentally-sustainable-hemp-clothing-textiles-and-fashion",
        permanent: true,
      },
      {
        source:
          "/swapping-her-suits-for-boots-a-q-a-with-tzeporah-berman-5602d5f82f70",
        destination:
          "/articles/tzeporah-berman-interview-on-trans-mountain-pipeline-fashion-pollution-going-to-jail",
        permanent: true,
      },
      {
        source: "/in-ecolabels-we-trust-88c2e7ab982d",
        destination:
          "/articles/investigations-cast-doubt-on-sustainability-certification-by-fsc-oceanwise-and-other-ecolabels",
        permanent: true,
      },
      {
        source: "/skip-the-romance-save-the-world-ffc500dfaff7",
        destination:
          "/articles/take-inspiration-from-crazy-ex-girlfriend-on-valentines-day-and-skip-the-romance-save-the-world",
        permanent: true,
      },
      {
        source: "/the-bus-rider-and-cyclist-should-be-friends-49ebacbafa0e",
        destination:
          "/articles/a-semi-satirical-plea-for-allyship-between-bus-riders-cyclists-and-other-non-drivers",
        permanent: true,
      },
      {
        source: "/crossing-the-technology-environment-divide-33e7bc2bbb02",
        destination:
          "/articles/beyond-cryptocurrency-blockchain-has-environmental-potential-to-green-supply-chain-prevent-waste",
        permanent: true,
      },
      {
        source:
          "/dugongs-seadragons-dungeons-dragons-podcast-marine-ecology-biology-ocean-conservation-606f7a809a17",
        destination:
          "/articles/dugongs-and-seadragons-is-a-dungeons-dragons-podcast-about-marine-ecology-biology-ocean-conservation",
        permanent: true,
      },
      {
        source:
          "/cattle-farmer-vegan-climate-change-environment-animal-welfare-6ea25bbedbc4",
        destination:
          "/articles/former-cattle-farmer-turned-vegan-because-of-climate-change-the-environment-and-animal-welfare",
        permanent: true,
      },
      {
        source:
          "/decolonizing-city-ginger-gosnell-myers-urban-indigenous-reconciliation-5c6d8cdc28ce-5c6d8cdc28ce",
        destination:
          "/articles/interview-with-ginger-gosnell-myers-about-decolonizing-cities-and-urban-indigenous-reconciliation",
        permanent: true,
      },
      {
        source:
          "/housesitting-financial-environmental-savings-community-building-460e5537e413",
        destination:
          "/articles/housesitting-can-bring-financial-environmental-savings-and-community-building",
        permanent: true,
      },
      {
        source:
          "/global-diet-trends-keep-changing-my-local-food-culture-south-asian-pakistani-food-diet-culture-71159479c00c",
        destination:
          "/articles/global-diet-trends-keep-changing-my-local-pakistani-south-asian-food-culture",
        permanent: true,
      },
      {
        source: "/in-this-game-bangalores-lakes-are-at-stake-d4682f3bd61c",
        destination:
          "/articles/chanakya-vyas-theatre-game-once-there-was-a-lake-promotes-conservation-in-bangalore",
        permanent: true,
      },
      {
        source: "/another-hard-summer-for-special-needs-kids-c46a240b3c53",
        destination:
          "/articles/covid-19-impacts-summer-programs-for-children-with-special-needs-autism-cancer",
        permanent: true,
      },
      {
        source:
          "/community-fridges-support-neighbours-and-fight-food-insecurity-waste-toronto-cfto-covid-19-pandemic-4b2b2d2e22ce",
        destination:
          "/articles/community-fridges-support-neighbours-fight-food-insecurity-waste-in-toronto-during-covid-19-pandemic",
        permanent: true,
      },
      {
        source:
          "/hives-for-humanity-vancouver-downtown-eastside-beekeeping-honey-community-43baa2ff9380",
        destination:
          "/articles/hives-for-humanity-builds-community-in-vancouver-downtown-eastside-with-beekeeping",
        permanent: true,
      },
      {
        source:
          "/san-diego-area-chef-works-to-turn-the-tide-for-local-seafood-69b4ecf0d0b9",
        destination:
          "/articles/san-diego-area-hospital-chef-promotes-local-seafood-in-health-care-schools-and-food-service-industry",
        permanent: true,
      },
      {
        source: "/dignity-healths-environmental-evangelist-3d158104d0d1",
        destination:
          "/articles/dignity-health-environmental-leader-mary-ellen-leciejewski-reduced-waste-greened-supply-chain",
        permanent: true,
      },
      {
        source:
          "/a-greener-bill-of-health-ucsfs-dr-seema-gandhi-tackles-sleeper-pollutants-in-the-operating-room-651d7089f621",
        destination:
          "/articles/ucsf-doctor-seema-gandhi-reducing-anaesthetic-gas-carbon-footprint",
        permanent: true,
      },
      {
        source:
          "/growing-the-vines-festival-a-q-a-with-heather-lamoureux-63475034d9e0",
        destination:
          "/articles/question-and-answers-with-vines-eco-land-based-arts-festival-founder-heather-lamoureux",
        permanent: true,
      },
      {
        source:
          "/vancouver-island-morningstar-farm-little-qualicum-cheeseworks-ecofriendly-dairy-ecosystem-cec759ce91ed",
        destination:
          "/articles/vancouver-islands-ecofriendly-dairy-morningstar-farm-and-little-qualicum-cheeseworks",
        permanent: true,
      },
      {
        source:
          "/seacology-island-forest-ecosystem-conservation-infrastructure-international-development-microloans-f6eebfefaeb8",
        destination:
          "/articles/nonprofit-seacology-promotes-forest-ecosystem-conservation-by-funding-infrastructure-and-microloans",
        permanent: true,
      },
      {
        source:
          "/farmers-market-guide-questions-answers-organic-biodynamic-free-range-grass-fed-local-food-cost-fc44704f17fa",
        destination:
          "/articles/farmers-market-guide-with-answers-about-organic-biodynamic-free-range-grass-fed-local-food-cost",
        permanent: true,
      },
      {
        source: "/flaming-out-in-the-kitchen-a9a63d256814",
        destination:
          "/articles/time-to-stop-cooking-with-gas-fire-flame-and-move-to-energy-efficient-methods-like-induction",
        permanent: true,
      },
      {
        source: "/overt-co-operations-139c3c796314",
        destination:
          "/articles/could-a-co-op-future-proof-your-favourite-food-business",
        permanent: true,
      },
      {
        source: "/musical-revolution-a-q-a-with-rebecca-foon-6ec9572705ef",
        destination:
          "/articles/q-a-with-musician-rebecca-foon-about-pathway-to-paris-concerts-with-flea-stipe-baez-patti-smith-mckibben",
        permanent: true,
      },
      {
        source: "/sustainable-by-design-a-q-a-with-todd-barsanti-753767a3c8a2",
        destination:
          "/articles/graphic-designer-todd-barsanti-discusses-al-gore-climate-reality-corps-art-and-activism",
        permanent: true,
      },
      {
        source: "/sharing-her-gifts-a-q-a-with-ocean-hyland-7aab9891bba7",
        destination:
          "/articles/tsleil-waututh-artist-activist-ocean-hyland-on-earth-day-pipeline-protests-indigenous-language-reconciliation",
        permanent: true,
      },
      {
        source: "/when-school-is-on-the-farm-7f069c2f80fa",
        destination:
          "/articles/farm-roots-mini-school-in-delta-connects-youth-to-the-food-system",
        permanent: true,
      },
      {
        source:
          "/seattle-restaurant-archipelago-filipino-food-local-ingredients-sustainability-b5aad84ac278",
        destination:
          "/articles/seattle-restaurant-archipelago-makes-sustainable-filipino-food-from-local-ingredients",
        permanent: true,
      },
      {
        source:
          "/line-drying-bedding-sheets-laundry-better-environment-45ecb2808078",
        destination:
          "/articles/why-line-drying-sheets-and-other-laundry-is-better-for-you-and-the-environment",
        permanent: true,
      },
      {
        source:
          "/china-recycling-ban-national-sword-north-america-waste-disposal-system-contamination-wishcycling-19e945eda2f9",
        destination:
          "/articles/china-national-sword-ban-shows-issues-in-north-america-garbage-waste-disposal",
        permanent: true,
      },
      {
        source:
          "/open-source-seed-initiative-home-garden-intellectual-property-rights-patent-corporation-7c30e62ac773",
        destination:
          "/articles/open-source-seed-initiative-protects-home-gardens-from-corporate-intellectual-property-rights-and-patents",
        permanent: true,
      },
      {
        source: "/the-sacred-fire-of-standing-rock-still-burns-66e8a279f84a",
        destination:
          "/articles/sacred-fire-of-oceti-sakowin-nodapl-water-protector-camp-at-standing-rock-still-burns",
        permanent: true,
      },
      {
        source: "/paradise-has-many-gates-3b7f79ad94a0",
        destination:
          "/articles/ajlan-gharem-public-art-mosque-in-vanier-park-paradise-has-many-gates-spurs-conversation",
        permanent: true,
      },
      {
        source:
          "/food-desert-residents-find-relief-at-mobile-markets-1611f3d4a771",
        destination:
          "/articles/food-desert-residents-in-ottawa-toronto-halifax-find-relief-at-mobile-markets",
        permanent: true,
      },
      {
        source:
          "/five-questions-farmers-market-local-food-spray-organic-fair-trade-dd7a54683a35",
        destination:
          "/articles/five-questions-for-farmers-market-vendors-about-spraying-and-local-organic-fair-trade-food",
        permanent: true,
      },
      {
        source: "/@AliciaWallace",
        destination: "/contributors/alicia-wallace",
        permanent: true,
      },
      {
        source: "/@alliespins",
        destination: "/contributors/alison-tedford-seaweed",
        permanent: true,
      },
      {
        source: "/@amir.ahmc",
        destination: "/contributors/amir-aziz",
        permanent: true,
      },
      {
        source: "/@anne.spice",
        destination: "/contributors/anne-spice",
        permanent: true,
      },
      {
        source: "/andre-lariviere/home",
        destination: "/contributors/andre-lariviere",
        permanent: true,
      },
      {
        source: "/@canoecanoa",
        destination: "/contributors/larissa-nez",
        permanent: true,
      },
      {
        source: "/@crudelykevin",
        destination: "/contributors/kevin-jiang",
        permanent: true,
      },
      {
        source: "/@danapoblete",
        destination: "/contributors/dana-poblete",
        permanent: true,
      },
      {
        source: "/@ericaeller",
        destination: "/contributors/erica-eller",
        permanent: true,
      },
      {
        source: "/@excinit",
        destination: "/contributors/nithin-coca",
        permanent: true,
      },
      {
        source: "/@glynisratcliffe",
        destination: "/contributors/glynis-ratcliffe",
        permanent: true,
      },
      {
        source: "/@imari-scarbrough",
        destination: "/contributors/imari-scarbrough",
        permanent: true,
      },
      {
        source: "/@katyanne",
        destination: "/contributors/katy-severson",
        permanent: true,
      },
      {
        source: "/lindsay-anderson/home",
        destination: "/contributors/lindsay-anderson",
        permanent: true,
      },
      {
        source: "/@lindsay.kneteman",
        destination: "/contributors/lindsay-kneteman",
        permanent: true,
      },
      {
        source: "/@lolaannmendez",
        destination: "/contributors/lola-mendez",
        permanent: true,
      },
      {
        source: "/@mariana.zapatah1",
        destination: "/contributors/mariana-zapata",
        permanent: true,
      },
      {
        source: "/@rebecca.gao13",
        destination: "/contributors/rebecca-gao",
        permanent: true,
      },
      {
        source: "/@ruth-terry",
        destination: "/contributors/ruth-terry",
        permanent: true,
      },
      {
        source: "/@sana_kapadia",
        destination: "/contributors/sana-kapadia",
        permanent: true,
      },
      {
        source: "/@sarabynoe",
        destination: "/contributors/sara-bynoe",
        permanent: true,
      },
      {
        source: "/@sharpe.brianna",
        destination: "/contributors/brianna-sharpe",
        permanent: true,
      },
      {
        source: "/@shreyakalra_87650",
        destination: "/contributors/shreya-kalra",
        permanent: true,
      },
      {
        source: "/@anianadominguez",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/@avvai.kethees",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/@zeahaarehman",
        destination: "/team/zeahaa-rehman",
        permanent: true,
      },
      {
        source: "/@makennaroneill",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/2021-could-be-our-best-year-or-our-last-year-9f6ec71edf01",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/30-days-hath-asparagus-b9ff2bce2b67",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/4-yays-and-an-oops-59b0ce391653",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/a-pandemic-reading-list-c3b2ad3239e6",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/a-peek-behind-the-asparagus-curtain-eeeef629ff30",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/a-very-belated-fundraising-update-a68cd8aa619b",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/and-the-silver-goes-to-64ec1576da24",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/asparagus-last-medium-newsletter-34ff0ea25c7c",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/back-to-school-with-gus-aa92fb837b00",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/birthdays-and-parties-and-maps-oh-my-a0c8152fd5c8",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/choose-your-own-adventure-395e6d19a7c0",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/countdown-to-crowdfunding-a5005ec83dfc",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/counting-down-to-asparagus-season-abe4cfa1960e",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/dont-miss-asparagus-season-a6a63424c127",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/food-for-thought-e9b1a3fa02d4",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/give-the-gift-of-gus-and-save-2604fc5a797b",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/gus-is-on-the-gram-94b160f700e",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/help-fund-our-future-bfc937acceb7",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/how-time-flies-4aa7e352c0bc",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/how-to-wipe-your-tush-sustainably-3c849e3db493",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/its-time-to-help-asparagus-grow-13a61df8b284",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/join-team-gus-f551ba2206b8",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/looking-back-and-moving-forward-304aed33e0b6",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/lucky-friday-the-13th-552452fd5e9a",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/making-room-for-issue-2-acbc28875d34",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/movie-nights-on-gus-a62f8f6a6eae",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/moving-sale-save-on-sustainable-swag-and-win-4c22b6dbdd6c",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/neither-new-nor-normal-16117c112d46",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/new-a5e6c387d824",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/new-beginnings-902a402a276e",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/our-fall-winter-issue-puts-art-in-the-spotlight-ff7153470b8a",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/party-party-party-8267020dfde5",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/seed-planting-time-633920e23185",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/staying-home-wont-cut-it-ba42c25c80f4",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/the-perfect-day-to-read-your-greens-8334cb54dcc7",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/the-summer-of-gus-a73cb0ff9391",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/this-award-winning-eco-mag-is-hiring-334998d9d5c8",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/this-emotional-roller-coaster-were-on-8cd8773aab1c",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source:
          "/this-giving-tuesday-support-independent-journalism-93603d88c314",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source:
          "/this-newsletter-is-late-for-so-many-great-reasons-448bf061b975",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/three-cheers-for-issue-3-729216b1d70f",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/three-whole-years-8e0ac096062a",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/time-to-say-hello-and-à-bientôt-451768e1efbe",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/top-tips-for-sustainable-sips-d09d3e187ddb",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/wont-you-be-my-pen-pal-️-a9ff4125bd39",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/you-can-take-gus-over-the-top-3ff9f34d304d",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/youre-invited-to-our-first-virtual-event-4984215cba38",
        destination: "/sign-up",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
