export interface PlantAttriabute {
  attack: number;
  defense: number;
  speed: number;
  cost: number;
  range: number;
  coolDown: number;
  attackType: string;
  attackEffect: string;
  attackRange: number;
  attackSpeed: number;
  attackPower: number;
  attackRate: number;
  attackArea: number;
  attackCount: number;
}

export interface BasePlant {
  name: string;

  attriabute: Partial<PlantAttriabute>;

  combine(plant: BasePlant): BasePlant;
}

export class Plant implements BasePlant {
  name: string;
  attriabute: Partial<PlantAttriabute>;

  static initAttriabute: PlantAttriabute = {
    attack: 0,
    defense: 0,
    speed: 0,
    cost: 0,
    range: 0,
    coolDown: 0,
    attackType: "",
    attackEffect: "",
    attackRange: 0,
    attackSpeed: 0,
    attackPower: 0,
    attackRate: 0,
    attackArea: 0,
    attackCount: 0,
  };

  combine(plant: BasePlant): BasePlant {
    this.name += plant.name;
    this.__combine__attriabute(plant);
    return this;
  }

  private __combine__attriabute(plant: BasePlant): BasePlant {
    Object.keys(this.attriabute).forEach((attributeKey) => {
      this.attriabute[attributeKey] += plant.attriabute[attributeKey];
    });

    return this;
  }

  constructor({
    name = "Plant",
    attriabute = {},
  }: {
    name?: string;
    attriabute?: Partial<PlantAttriabute>;
  }) {
    this.name = name;
    this.attriabute = Object.assign({}, Plant.initAttriabute, attriabute);
  }
}
