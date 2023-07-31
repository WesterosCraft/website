// import { getImageAsset } from '@sanity/asset-utils'

// export const getFileOrImage = (fileName: string) => {
//   return getImageAsset(fileName, { projectId: '1as7cn02', dataset: 'production' })
// }

// async function fetchBlob(url: string) {
//   const response = await fetch(url)

//   return response.blob()
// }

// export const uploadImage = async (ref: string, fileName: string) => {
//   const newF = getFileOrImage(ref)

//   const formData = new FormData()
//   const blob = await fetchBlob(newF.url)
//   formData.append('file', blob, `${fileName || newF.assetId}.${newF.extension}`)

//   const options = {
//     method: 'POST',
//     body: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   }

//   // @ts-ignore
//   delete options.headers['Content-Type']

//   const res = await fetch('http://localhost:3000/api/media', options)
//   const data = await res.json()

//   return data?.doc
// }

// export const childrenMap = (children: any[]) => {
//   const newChild = [] as any[]

//   children?.map((child, i) => {
//     if (child.marks.includes('strong')) {
//       newChild.push({
//         bold: true,
//         text: child?.text,
//       })
//     } else if (child.marks.includes('underline')) {
//       newChild.push({
//         underline: true,
//         text: child?.text,
//       })
//     } else if (child.marks.includes('em')) {
//       newChild.push({
//         italic: true,
//         text: child?.text,
//       })
//     } else {
//       newChild.push({
//         text: child?.text,
//       })
//     }
//   })

//   return newChild
// }

// export const sanityRichTextToPayloadRichText = async (sRichText: any, id: string) => {
//   const newRT = [] as any[]

//   if (!sRichText) {
//     return
//   }

//   for (let [i, rt] of sRichText.entries()) {
//     if (rt._type === 'block') {
//       // HEADINGS
//       if (
//         (rt.style === 'normal' ||
//           rt.style === 'h3' ||
//           rt.style === 'h2' ||
//           rt.style === 'h1' ||
//           rt.style === 'h4' ||
//           rt.style === 'h5' ||
//           rt.style === 'h6') &&
//         rt?.listItem === undefined
//       ) {
//         newRT.push({
//           children: childrenMap(rt.children),
//           type: rt.style,
//         })
//       }
//     }
//     //  LISTS
//     // @ts-ignore
//     if (rt.type === 'ul') {
//       newRT.push(rt)
//     }

//     // IMAGES
//     if (rt._type === 'figure') {
//       const fig = await uploadImage(rt.image.asset._ref, `${id}-richtext-${i + 1}`)

//       newRT.push({
//         children: [
//           {
//             text: '',
//           },
//         ],
//         type: 'upload',
//         value: {
//           ...fig,
//         },
//         relationTo: 'media',
//       })
//     }

//     if (rt._type === 'video') {
//       newRT.push({
//         type: 'video',
//         id: rt?.url?.split('/')?.pop(),
//         source: 'youtube',
//         children: [
//           {
//             text: ' ',
//           },
//         ],
//       })
//     }
//   }

//   return newRT
// }

// export function mergeListItems(arr: any[] | undefined) {
//   if (!arr) {
//     return []
//   }
//   const mergedArray = []
//   let currentGroup = null

//   for (let i = 0; i < arr.length; i++) {
//     const currentItem = arr[i]

//     if (currentItem.listItem) {
//       if (!currentGroup) {
//         currentGroup = { type: 'ul', children: [] }
//       }
//       currentGroup.children.push({ type: 'li', children: childrenMap(currentItem.children) })
//     } else {
//       if (currentGroup) {
//         mergedArray.push(currentGroup)
//         currentGroup = null
//       }
//       mergedArray.push(currentItem)
//     }
//   }

//   if (currentGroup) {
//     mergedArray.push(currentGroup)
//   }

//   return mergedArray
// }
