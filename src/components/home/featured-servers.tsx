import * as React from "react";
import { motion } from "framer-motion";
import { TypographyH2, TypographyP } from "@components/typography";
import { container, child } from "@constants/index";

const FeaturedServers = () => {
  const servers = [
    {
      heading: "Play",
      description:
        "Get started exploring Westeros and see the building process happen for yourself!",
      imgLink:
        "https://cdn.sanity.io/images/1as7cn02/production/2f444d5364e4bc161e2fea0320823f450e6faa20-50x50.png",
      buttons: [
        {
          buttonText: "Get The Modpack",
          buttonLink: "/modpack",
        },
        {
          buttonText: "Apply To Build",
          buttonLink: "/apply",
        },
      ],
    },
    {
      heading: "Hang Out",
      description:
        "Come join our Discord, where our community gathers to plan builds and hang out.",
      imgLink:
        "https://cdn.sanity.io/images/1as7cn02/production/8599815d0f874feb616d9e2a6ca4f9585ae4f7e7-49x50.png",
      buttons: [
        {
          buttonText: "Join Discord",
          buttonLink: "https://discord.com/invite/pBS5TH4",
        },
      ],
    },
  ];

  return (
    <>
      <div className="ml-0 2xl:-ml-32 min-w-auto xl:min-w-[750px]">
        <div className="flex justify-center items-center">
          <motion.div
            className="self-end mb-14"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 1 }}
          >
            <img
              width={312}
              height={386}
              src="https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2Fbe2616e3bb4785ebff463dd2dc8fb8e75457901a-729x903.png&w=384&q=75"
              // placeholder='blur'
              // blurDataURL={leftImage.asset.metadata.lqip}
              // src={urlForImage(leftImage.asset).url()}
              alt="Baratheon"
            />
          </motion.div>

          <motion.div
            className="self-end"
            // alignSelf='flex-end'
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5 }}
          >
            <img
              width={312}
              height={386}
              // placeholder='blur'
              src="https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2Fca01c457c68322a5fc995104251999caecddfeca-890x908.png&w=640&q=75"
              // blurDataURL={rightImage.asset.metadata.lqip}
              // src={urlForImage(rightImage.asset).url()}
              alt="Targaryen"
            />
          </motion.div>
        </div>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
        >
          <TypographyH2 className="text-center lg:text-left text-primaryGold">
            Join The Community
          </TypographyH2>
        </motion.div>
        <motion.div
          className="flex flex-col max-w-xl justify-center items-center mt-2 mx-auto text-white divide-y"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
        >
          {servers.map((server, index) => (
            <motion.div
              className="w-full py-4"
              variants={child}
              viewport={{ once: true, margin: "-100px" }}
              key={index}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img src={server.imgLink} />
                <div className="flex items-center sm:items-start gap-6">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                    <TypographyP className="font-medium text-2xl">
                      {server.heading}
                    </TypographyP>

                    <p className="leading-7 mt-2">{server.description}</p>
                    <div className="flex flex-row justify-center sm:justify-start w-full gap-4 pt-6 mb-4">
                      {server.buttons.map((button, idx) => (
                        <a
                          key={idx}
                          href={button.buttonLink}
                          className="underline decoration-primaryRed underline-offset-4 hover:decoration-white"
                        >
                          {button.buttonText}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default FeaturedServers;
