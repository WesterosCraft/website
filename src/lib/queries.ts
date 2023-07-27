export const LocationQuery = (slug: string) => `{
    Locations(where: { slug: { equals: "${slug}" } }) {
      docs {
        id
        locationName
        projectDetails {
          information {
            region
            status
            type
            warp
            house
            application
            projectLeads
            dateStarted
            dateCompleted
            difficultyLevel
            redoAvailable
            serverProject
          }
          dynmapLocation {
            dynmapZoom
            dynmapXcoord
            dynmapYcoord
          }
        }
        bannerImage {
          url
          width
          height
          filename
        }
        locationImages {
          media {
            url
            width
            height
            filename
          }
        }
        layout {
          __typename
          ... on Content {
            __typename
            columns {
              width
              alignment
              richText
              id
            }
            id
            blockName
            blockType
          }
          ... on MediaContent {
            __typename
            alignment
            richText
            media {
              url
              filename
              width
              height
            }
            embeddedVideo {
              embed
              videoID
              aspectRatio
            }
            links {
              link {
                appearance
                type
                label
                reference {
                  relationTo
                  value {
                    __typename
                  }
                }
                url
                newTab
              }
              id
            }
            id
            blockName
            blockType
          }
          ... on MediaBlock {
            media {
              url
              filename
              width
              height
            }
            aspectRatio
            size
            caption
            blockName
            blockType
          }
          ... on MediaSlider {
            introContent
            slides {
              media {
                url
                filename
                width
                height
              }
            }
            blockName
            blockType
          }
        }
        slug
      }
    }
  }`;

export const RookeryQuery = () => `{
  Page(id: "648607d0fce0f425bccc54ca") {
    title
    hero {
      basic {
        richText
      }
    }
    layout {
      ... on RookeryEditions {
        blockType
        editions {
          name
          description
          link
          thumbnail {
            url
            width
            height
          }
        }
      }
    }
    fullTitle
  }
}`;
