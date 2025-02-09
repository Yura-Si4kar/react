// types/type.ts
export interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;
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
  speed: number; // орбітальна швидкість планети навколо Сонця
  color: string;
  texture: string;
  moons?: Moon[]; // необов'язково, якщо у планети є супутники
  rings?: Ring;   // необов'язково, якщо у планети є кільця
}
