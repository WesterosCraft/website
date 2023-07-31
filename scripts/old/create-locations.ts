// import { Location, Media } from "../src/payload-types";
// import payload from "payload";
// import path from "path";
// import dotenv from "dotenv";
// import {
//   uploadImage,
//   mergeListItems,
//   sanityRichTextToPayloadRichText,
// } from "./shared";

// dotenv.config({
//   path: path.resolve(__dirname, "../.env"),
// });

// const { PAYLOAD_SECRET, MONGODB_URI } = process.env;

// const test = [{}];

// const regionMap = (region: string) => {
//   switch (region) {
//     case "333b1884-bdae-43e2-8a96-b2c89ea89c79":
//       return "dorne";
//     case "bef10f36-8ac8-4780-894e-bbc1978884d3":
//       return "riverlands";
//     case "94dceb06-f437-481e-b8f7-eac882e6d9c3":
//       return "theWall";
//     case "a5b3b817-c80d-4621-967c-f13b619ae235":
//       return "north";
//     case "a6b0523a-c2a7-48cd-9132-86a92cd8ba9f":
//       return "vale";
//     case "4a1046e1-af4c-4e58-8beb-1db82b0562c7":
//       return "ironIslands";
//     case "fa9b1818-54dc-4799-a10b-9e25b8f0c547":
//       return "westerlands";
//     case "cf2197be-be99-4d62-95f6-ff452b07f0ec":
//       return "crownlands";
//     case "fb625d70-c2f1-4625-91b5-68b9f89064a4":
//       return "stormlands";
//     case "12692247-e688-4d81-838a-083b12548ece":
//       return "reach";
//     case "d077ff2b-0ba9-48f0-b018-72dccda16187":
//       return "beyondTheWall";
//   }
// };

// const buildCategoryMap = (buildType: string) => {
//   switch (buildType) {
//     case "3c75eaa9-3405-48d6-9aa1-82a7e49ff08a":
//       return "city";
//     case "aa78e9be-b3ce-4112-9ab3-7a052ac5b020":
//       return "castle";
//     case "f47f7fe4-7684-46cc-86aa-9b7275f4e0de":
//       return "town";
//     case "2a760f6a-022e-4f0c-9cff-9a9d9e613f6c":
//       return "village";
//     case "0532d707-dcfa-455c-847a-c3c6121ab875":
//       return "holdfast";
//     case "d2532a38-7ecc-43d9-9769-ddd442d0d831":
//       return "keep";
//     case "932860c4-afd3-4ddf-8f7e-24706a24c8f1":
//       return "tower";
//     case "f7e66aa6-0612-4c05-a4cf-9a29b113b855":
//       return "clan";
//     case "b27697c2-ffc7-4339-aa55-b9d248c4d015":
//       return "crannog";
//     case "925faa14-5220-4bda-9d69-024f6366019d":
//       return "landmark";
//     case "eea65049-09b1-4a2d-b340-cfa23c676618":
//       return "ruin";
//     case "666e74f4-1fd4-4c1d-a829-53ba176ba8cb":
//       return "miscellaneous";
//     default:
//       return buildType;
//   }
// };

// const uploadLocationData = async (data: any) => {
//   let bannerData: Media | undefined = undefined;
//   let locationImages: Media[] | undefined = undefined;

//   try {
//     if (data?.bannerImage && Object.keys(data?.bannerImage).length) {
//       bannerData = await uploadImage(
//         data.bannerImage.asset._ref,
//         `${data._id}-banner`
//       );
//     }

//     if (
//       data?.additionalImages?.images &&
//       data.additionalImages.images?.length
//     ) {
//       const arr = [];

//       for (const [i, image] of data?.additionalImages.images.entries()) {
//         const result = await uploadImage(
//           image.asset._ref,
//           `${data._id}-${i + 1}`
//         );
//         arr.push({ media: result?.id });
//       }

//       locationImages = arr;
//     }

//     const richText = await sanityRichTextToPayloadRichText(
//       data.body,
//       data?._id || data?.slug?.current
//     );

//     if (richText) {
//       const body: Location = {
//         locationName: data?.title || "",
//         slug: data?.slug?.current || undefined,
//         projectDetails: {
//           information: {
//             region: regionMap(
//               data?.region._ref
//             ) as Location["projectDetails"]["information"]["region"],
//             status:
//               data?.projectStatus as Location["projectDetails"]["information"]["status"],
//             type: buildCategoryMap(
//               data?.buildCategory[0]._ref
//             ) as Location["projectDetails"]["information"]["type"],
//             warp: data?.warp || undefined,
//             house: data?.house || undefined,
//             application: data?.application || undefined,
//             projectLeads: data?.projectLead || undefined,
//             dateStarted: data?.dateStarted || undefined,
//             dateCompleted: data?.dateCompleted || undefined,
//             redoAvailable: data?.redoAvailable || false,
//             serverProject: data?.serverProject || false,
//             difficultyLevel:
//               data?.difficulty as Location["projectDetails"]["information"]["difficultyLevel"],
//           },
//           dynmapLocation: {
//             dynmapZoom: data?.dynmapZoom,
//             dynmapXcoord: data?.dynmapXcoord,
//             dynmapYcoord: data?.dynmapYcoord,
//           },
//         },
//         layout: !data.body
//           ? []
//           : [
//               {
//                 blockType: "content",
//                 columns: [
//                   {
//                     // @ts-ignore
//                     links: [],
//                     width: "full",
//                     alignment: "left",
//                     richText,
//                   },
//                 ],
//               },
//             ],
//         bannerImage: bannerData?.id || undefined,
//         locationImages: locationImages || undefined,
//       };

//       await payload.create({
//         collection: "locations",
//         data: body,
//       });
//     }
//   } catch (error) {
//     console.dir(error, { depth: null });
//   }
// };

// (async () => {
//   await payload.init({
//     secret: PAYLOAD_SECRET || "",
//     mongoURL: MONGODB_URI || "",
//     local: true,
//   });

//   console.log("🫵 ---------PAYLOAD STARTED--------🫵");

//   try {
//     test.forEach(async (x) => {
//       // @ts-ignore
//       const t = mergeListItems(x.body);

//       await uploadLocationData({ ...x, body: t });
//     });
//   } catch (err) {
//     console.log("🫵 -----------------🫵");
//     console.log("🫵 : ; : err", err);
//     console.log("🫵 -----------------🫵");
//   } finally {
//     console.log("🫵 -----------------🫵");
//     console.log("DONE");
//     console.log("🫵 -----------------🫵");
//   }
// })();
