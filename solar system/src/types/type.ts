export interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;         // орбітальна швидкість супутника навколо планети
  rotationSpeed: number; // швидкість обертання супутника навколо своєї осі
  axisTilt: number;      // нахил осі супутника (градуси)
  color: string;
  texture: string;
}

export interface Ring {
  innerRadius: number;
  outerRadius: number;
  texture: string;
}

export interface Planet {
  name: string;
  radius: number;
  distance: number;
  speed: number;         // орбітальна швидкість планети навколо Сонця
  rotationSpeed: number; // швидкість обертання планети навколо своєї осі
  axisTilt: number;      // нахил осі планети (градуси)
  color: string;
  texture: string;
  moons?: Moon[]; // необов'язково, якщо у планети є супутники
  rings?: Ring[]; // необов'язково, якщо у планети є кільця
}
