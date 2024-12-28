// import type { Processor, Transformer } from "unified";
// import type { Node } from "unist";

// export default function rehypeSection(this: Processor): Transformer {
//   return (root: Node): Node => {
//     console.log(root);

//     for (const child of root.children) {
//       if (child.type === "element" && child.tagName === "h2") {
//         console.log(child);

//         const section = {
//           type: "element",
//           tagName: "section",
//           properties: {},
//           children: [],
//         };

//         child.children.push(section);
//       }
//     }

//     return root;
//   };
// }

// function createSection() {}
