"use server";

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

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
