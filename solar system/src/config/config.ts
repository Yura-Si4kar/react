import { Planet } from "@/types/type";

export const planets: Planet[] = [
  {
    name: 'Mercury',
    radius: 4,          // Збільшено радіус
    distance: 150,      // Збільшено відстань
    speed: 0.021,       // орбітальна швидкість
    rotationSpeed: 0.0003,  // дуже повільне обертання навколо своєї осі
    axisTilt: 0.03,         // нахил осі ~0.03° (майже вертикальний)
    color: 'grey',
    texture: '/images/planets/mercury.jpg'
  },
  {
    name: 'Venus',
    radius: 10,
    distance: 250,
    speed: 0.0081,
    rotationSpeed: 0.00005, // дуже повільне обертання (ретроградне)
    axisTilt: 177,         // нахил осі ~177° (ретроградне обертання)
    color: 'orange',
    texture: '/images/planets/venus.jpg'
  },
  {
    name: 'Earth',
    radius: 10,
    distance: 350,
    speed: 0.005,
    rotationSpeed: 0.02,  // швидке обертання (24-годинний день)
    axisTilt: 23.5,       // нахил осі Землі ~23.5°
    color: 'blue',
    texture: '/images/planets/earth.jpg',
    moons: [
      {
        name: 'Moon',
        radius: 2,
        distance: 15,
        speed: 0.0675,     // орбітальна швидкість супутника
        rotationSpeed: 0.005, // майже синхронне обертання
        axisTilt: 1.5,     // нахил осі Місяця ~1.5°
        color: 'grey',
        texture: '/images/satellites/moon.jpg'
      }
    ]
  },
  {
    name: 'Mars',
    radius: 6,
    distance: 500,
    speed: 0.0027,
    rotationSpeed: 0.018,  // трохи повільніше обертання, ніж Земля
    axisTilt: 25,         // нахил осі Марсу ~25°
    color: 'red',
    texture: '/images/planets/mars.jpg',
    moons: [
      {
        name: 'Phobos',
        radius: 1,
        distance: 10,
        speed: 0.05,
        rotationSpeed: 0.005,
        axisTilt: 1,      // невеликий нахил
        color: 'grey',
        texture: '/images/satellites/phobos.jpg'
      },
      {
        name: 'Deimos',
        radius: 0.5,
        distance: 12,
        speed: 0.02,
        rotationSpeed: 0.003,
        axisTilt: 1,      // невеликий нахил
        color: 'lightgrey',
        texture: '/images/satellites/deimos.jpg'
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 50,
    distance: 1200,
    speed: 0.0005,
    rotationSpeed: 0.05,   // дуже швидке обертання (10-годинний день)
    axisTilt: 3.1,         // нахил осі Юпітера ~3.1°
    color: 'brown',
    texture: '/images/planets/jupiter.jpg',
    moons: [
      {
        name: 'Io',
        radius: 3,
        distance: 70,
        speed: 0.01,
        rotationSpeed: 0.005,
        axisTilt: 0.1,    // дуже малий нахил
        color: 'yellow',
        texture: '/images/satellites/Io.jpg'
      }
    ]
  },
  {
    name: 'Saturn',
    radius: 40,
    distance: 1800,
    speed: 0.0001,
    rotationSpeed: 0.05,   // приблизно 10.7-годинний оберт
    axisTilt: 26.7,        // нахил осі Сатурна ~26.7°
    color: 'yellow',
    texture: '/images/planets/saturn.jpg',
    rings: [
      {
        innerRadius: 50,
        outerRadius: 80,
        texture: '/images/satellites/ice.jpg'
      }
    ],
    moons: [
      {
        name: 'Titan',
        radius: 4,
        distance: 100,
        speed: 0.005,
        rotationSpeed: 0.005,
        axisTilt: 1,      // невеликий нахил
        color: 'orange',
        texture: '/images/satellites/titan.jpg'
      }
    ]
  },
  {
    name: 'Uranus',
    radius: 25,
    distance: 2500,
    speed: 0.00005,
    rotationSpeed: 0.03,   // приблизно 17-годинний оберт
    axisTilt: 97.8,        // нахил осі Урану ~98° (майже на боці)
    color: 'lightblue',
    texture: '/images/planets/uranus.jpg',
    rings: [
      {
        innerRadius: 60,
        outerRadius: 70,
        texture: '/images/satellites/ice.jpg'
      }
    ],
  },
  {
    name: 'Neptune',
    radius: 25,
    distance: 3500,
    speed: 0.00003,
    rotationSpeed: 0.032,  // приблизно 16-годинний оберт
    axisTilt: 28.3,        // нахил осі Нептуна ~28.3°
    color: 'blue',
    texture: '/images/planets/neptune.jpg',
    moons: [
      {
        name: 'Triton',
        radius: 3,
        distance: 50,
        speed: 0.0001,
        rotationSpeed: 0.005,
        axisTilt: 0.5,    // невеликий нахил
        color: 'grey',
        texture: '/images/satellites/triton.jpg'
      }
    ]
  }
];
