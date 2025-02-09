import { Planet } from "@/types/type";

export const planets: Planet[] = [
  {
    name: 'Mercury',
    radius: 4,          // Збільшено радіус
    distance: 150,      // Збільшено відстань
    speed: 0.021,       
    color: 'grey',
    texture: '/images/planets/mercury.jpg'
  },
  {
    name: 'Venus',
    radius: 10,         // Збільшено радіус
    distance: 250,      // Збільшено відстань
    speed: 0.0081,      
    color: 'orange',
    texture: '/images/planets/venus.jpg'
  },
  {
    name: 'Earth',
    radius: 10,         // Збільшено радіус
    distance: 350,      // Збільшено відстань
    speed: 0.005,       
    color: 'blue',
    texture: '/images/planets/earth.jpg',
    moons: [
      {
        name: 'Moon',
        radius: 2,      // Збільшено радіус
        distance: 15,    // Збільшено відстань
        speed: 0.0675,
        color: 'grey',
        texture: '/images/satellites/moon.jpg'
      }
    ]
  },
  {
    name: 'Mars',
    radius: 6,          // Збільшено радіус
    distance: 500,      // Збільшено відстань
    speed: 0.0027,      
    color: 'red',
    texture: '/images/planets/mars.jpg',
    moons: [
      {
        name: 'Phobos',
        radius: 1,      // Збільшено радіус
        distance: 10,    // Збільшено відстань
        speed: 0.05,
        color: 'grey',
        texture: '/images/satellites/phobos.jpg'
      },
      {
        name: 'Deimos',
        radius: 0.5,    // Збільшено радіус
        distance: 12,    // Збільшено відстань
        speed: 0.02,
        color: 'lightgrey',
        texture: '/images/satellites/deimos.jpg'
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 50,         // Збільшено радіус
    distance: 1200,     // Збільшено відстань
    speed: 0.0005,      // Зменшено швидкість
    color: 'brown',
    texture: '/images/planets/jupiter.jpg',
    moons: [
      {
        name: 'Io',
        radius: 3,      // Збільшено радіус
        distance: 70,    // Збільшено відстань
        speed: 0.01,
        color: 'yellow',
        texture: '/images/satellites/io.jpg'
      }
    ]
  },
  {
    name: 'Saturn',
    radius: 40,         // Збільшено радіус
    distance: 1800,     // Збільшено відстань
    speed: 0.0001,      // Зменшено швидкість
    color: 'yellow',
    texture: '/images/planets/saturn.jpg',
    rings: {
      innerRadius: 60,
      outerRadius: 70,
      texture: '/images/satellites/saturn_ring.png'
    },
    moons: [
      {
        name: 'Titan',
        radius: 4,      // Збільшено радіус
        distance: 100,   // Збільшено відстань
        speed: 0.005,
        color: 'orange',
        texture: '/images/satellites/titan.jpg'
      }
    ]
  },
  {
    name: 'Uranus',
    radius: 25,         // Збільшено радіус
    distance: 2500,     // Збільшено відстань
    speed: 0.00005,     // Зменшено швидкість
    color: 'lightblue',
    texture: '/images/planets/uranus.jpg',
    rings: {
      innerRadius: 20,
      outerRadius: 30,
      texture: '/images/satellites/saturn_ring.png'
    }
  },
  {
    name: 'Neptune',
    radius: 25,         // Збільшено радіус
    distance: 3500,     // Збільшено відстань
    speed: 0.00003,     // Зменшено швидкість
    color: 'blue',
    texture: '/images/planets/neptune.jpg',
    moons: [
      {
        name: 'Triton',
        radius: 3,      // Збільшено радіус
        distance: 50,    // Збільшено відстань
        speed: 0.0001,
        color: 'grey',
        texture: '/images/satellites/triton.jpg'
      }
    ]
  }
];