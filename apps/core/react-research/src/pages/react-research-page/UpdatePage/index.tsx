import { useEffect, useState } from "react";
import { sleep } from "@marvin/shared";

const text = `
Once upon a time, in a small village nestled in the mountains, there lived a young shepherd named Jack. He spent his days tending to his flock of sheep, wandering through meadows and valleys.

One sunny morning, as Jack guided his sheep to a new grazing spot, he stumbled upon a hidden cave. Curiosity sparked within him, and he cautiously entered the dark depths of the cave.

To his amazement, the cave was filled with glittering crystals of all colors. Jack's eyes widened in awe as he touched the smooth surfaces and watched them shimmer in the faint light.

Excitedly, Jack collected some crystals in a small pouch and rushed back to the village. He showed the villagers his discovery, and soon news spread like wildfire.

Merchants and traders from far and wide flocked to the village, eager to buy these rare and precious crystals from Jack. The village flourished with newfound wealth, and Jack became known as the Crystal Shepherd.

With his newfound riches, Jack helped improve the village's infrastructure, built schools, and ensured that everyone had access to clean water and healthcare.`

const UpdatePage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    let i = 1;
    text.split(' ').forEach((word) => {
      i += 1;
      sleep(10 * i).then(() => {
        setContent((prev) => prev.concat(' ' + word))
      })
    })

    return () => {
      setContent('')
    }

  }, []);

  return <>
    <div className={"text-wrap"}>
      {
        content
      }
    </div>
  </>;
};

export default UpdatePage;