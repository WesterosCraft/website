import React, { ElementType, Fragment } from "react";

import type { Props } from "./types";
import { Image } from "./image";
import { Video } from "./video";

export const Media: React.FC<Props> = (props) => {
  const { className, resource, htmlElement = "div" } = props;

  const isVideo =
    typeof resource !== "string" && resource?.mimeType?.includes("video");
  const Tag = (htmlElement as ElementType) || Fragment;

  return (
    <Tag {...(htmlElement !== null ? { className } : {})}>
      {isVideo ? (
        <Video {...props} />
      ) : (
        <Image {...props} /> // eslint-disable-line
      )}
    </Tag>
  );
};
