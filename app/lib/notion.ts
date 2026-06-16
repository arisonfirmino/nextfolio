"use server";

import { BlockObjectResponse, Client } from "@notionhq/client";
import { NotionRenderer } from "@notion-render/client";

import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

import { QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getPageBlocks = async (pageId: string) => {
  const { results } = await notion.blocks.children.list({ block_id: pageId });

  const renderer = new NotionRenderer({ client: notion });
  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  return await renderer.render(...(results as BlockObjectResponse[]));
};

export const getProjects = async () => {
  const database_id = process.env.NOTION_PAGE_ID_PROJECTS!;
  const response = await notion.dataSources.query({
    data_source_id: database_id,
    filter: {
      property: "status",
      status: { equals: "finished" },
    },
  });

  return response.results;
};

export const getExperiences = async () => {
  const database_id = process.env.NOTION_PAGE_ID_EXPERIENCES!;
  const response = await notion.dataSources.query({
    data_source_id: database_id,
  });

  return response.results;
};

export const getAboutMe = async () => {
  const database_id = process.env.NOTION_PAGE_ID_ABOUT!;
  const response = await notion.dataSources.query({
    data_source_id: database_id,
  });

  const blocks = await getPageBlocks(response.results[0].id);

  return blocks;
};

export const getSkills = async (category: string) => {
  const database_id = process.env.NOTION_PAGE_ID_SKILLS!;
  const response = await notion.dataSources.query({
    data_source_id: database_id,
    filter: {
      property: "category",
      select: { equals: category },
    },
  });

  return response.results;
};

export const getSocials = async (
  filter?: QueryDataSourceParameters["filter"],
) => {
  const database_id = process.env.NOTION_PAGE_ID_SOCIALS!;
  const response = await notion.dataSources.query({
    data_source_id: database_id,
    ...(filter && { filter }),
  });

  return response.results;
};
