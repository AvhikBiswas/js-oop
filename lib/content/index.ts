import type { Topic } from "../types";
import { curriculum, flattenTopics } from "../curriculum";
import { objectsClasses } from "./objects-classes";
import { prototypesTopics } from "./prototypes";
import { inheritanceTopics } from "./inheritance";
import { polymorphismTopics } from "./polymorphism";
import { encapsulationTopics } from "./encapsulation";
import { abstractionTopics } from "./abstraction";
import { superParentTopics } from "./super-parent";
import { objectUtilitiesTopics } from "./object-utilities";
import { functionOopTopics } from "./function-oop";
import { compositionTopics } from "./composition";
import { solidTopics } from "./solid";
import { creationalTopics } from "./patterns-creational";
import { structuralTopics } from "./patterns-structural";
import { behavioralTopics } from "./patterns-behavioral";
import { advancedTopics } from "./advanced";

export const allTopics: Topic[] = [
  ...objectsClasses,
  ...prototypesTopics,
  ...inheritanceTopics,
  ...polymorphismTopics,
  ...encapsulationTopics,
  ...abstractionTopics,
  ...superParentTopics,
  ...objectUtilitiesTopics,
  ...functionOopTopics,
  ...compositionTopics,
  ...solidTopics,
  ...creationalTopics,
  ...structuralTopics,
  ...behavioralTopics,
  ...advancedTopics,
];

export function getTopic(slug: string) {
  return allTopics.find((t) => t.slug === slug);
}

export function topicsForSection(sectionId: string) {
  const slugs = flattenTopics()
    .filter((t) => t.sectionId === sectionId)
    .map((t) => t.slug);
  return allTopics.filter((t) => slugs.includes(t.slug));
}

export function sectionById(id: string) {
  return curriculum.find((s) => s.id === id);
}
