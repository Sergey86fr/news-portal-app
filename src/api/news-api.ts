import axios from "axios";

const BASE_URL = `/nytimes`;

export interface INewsItem {
  abstract: string;
  web_url: string;
  multimedia?: Array<{
    url: string;
    subtype: string;
  }>;
  pub_date: string;
  source: string;
  _id: string;
}

const isValidDate = (year: number, month: number): boolean => {
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, 1);
  return inputDate <= currentDate;
};

export const fetchNews = async (
  year: number,
  month: number
): Promise<INewsItem[]> => {
  try {
    if (!isValidDate(year, month)) {
      console.log(`Attempted to fetch future date: ${year}-${month}`);
      return [];
    }

    const response = await axios.get(`${BASE_URL}/${year}/${month - 1}.json`, {
      params: { "api-key": import.meta.env.VITE_API_KEY },
    });

    if (!response.data.response) {
      console.log("No news found for", year, month);
      return [];
    }

    return response.data.response.docs.reverse().map((doc: INewsItem) => ({
      abstract: doc.abstract,
      web_url: doc.web_url,
      multimedia:
        doc.multimedia?.filter(
          (m: { url: string; subtype: string }) => m.subtype === "thumbnail"
        ) || [],
      pub_date: doc.pub_date,
      source: doc.source,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
