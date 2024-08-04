import { expect, test } from "vitest";
import { Plant } from "../../plants";

test("plant-combine", () => {
  const plant1 = new Plant({
    name: "PeaShooter",
    attriabute: { attackSpeed: 10 },
  });
  const plant2 = new Plant({
    name: "SunFlower",
    attriabute: { coolDown: 3 },
  });
  const plant3 = new Plant({ name: "WallNut", attriabute: { attackSpeed: 2 } });
  console.log(plant1.combine(plant2).combine(plant3));
});
