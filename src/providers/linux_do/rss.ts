export interface LinuxDoFeedMeta {
  title: string | null;
  link: string | null;
  description: string | null;
}

export interface LinuxDoTopicSummary {
  id: number | null;
  title: string | null;
  url: string | null;
  author: string | null;
  category: string | null;
  excerpt: string | null;
  descriptionHtml: string | null;
  pubDate: string | null;
  pinned: boolean | null;
  closed: boolean | null;
  archived: boolean | null;
  raw: Record<string, unknown>;
}

export interface LinuxDoPostSummary {
  id: number | null;
  topicId: number | null;
  postNumber: number | null;
  title: string | null;
  url: string | null;
  author: string | null;
  excerpt: string | null;
  contentHtml: string | null;
  pubDate: string | null;
  raw: Record<string, unknown>;
}

export interface LinuxDoBadgeGrant {
  grantee: string | null;
  username: string | null;
  grantedAt: string | null;
  grantedBy: string | null;
  url: string | null;
  raw: Record<string, unknown>;
}

export interface LinuxDoTopicFeed {
  feed: LinuxDoFeedMeta;
  topics: LinuxDoTopicSummary[];
  count: number;
}

export interface LinuxDoPostFeed {
  feed: LinuxDoFeedMeta;
  posts: LinuxDoPostSummary[];
  count: number;
}

export interface LinuxDoBadgeFeed {
  feed: LinuxDoFeedMeta;
  grants: LinuxDoBadgeGrant[];
  count: number;
}

interface LinuxDoRssItem {
  title: string | null;
  link: string | null;
  guid: string | null;
  creator: string | null;
  categories: string[];
  content: string | null;
  contentSnippet: string | null;
  isoDate: string | null;
  topicPinned: string | null;
  topicClosed: string | null;
  topicArchived: string | null;
  grantedAt: string | null;
  grantedBy: string | null;
}

export function parseTopicFeed(xml: string, limit?: number): LinuxDoTopicFeed {
  const feed = parseRssFeed(xml);
  const topics = applyLimit(feed.items, limit).map(normalizeTopic);
  return { feed: feed.feed, topics, count: topics.length };
}

export function parsePostFeed(xml: string, limit?: number): LinuxDoPostFeed {
  const feed = parseRssFeed(xml);
  const posts = applyLimit(feed.items, limit).map(normalizePost);
  return { feed: feed.feed, posts, count: posts.length };
}

export function parseBadgeFeed(xml: string, limit?: number): LinuxDoBadgeFeed {
  const feed = parseRssFeed(xml);
  const grants = applyLimit(feed.items, limit).map(normalizeBadgeGrant);
  return { feed: feed.feed, grants, count: grants.length };
}

function parseRssFeed(xml: string): { feed: LinuxDoFeedMeta; items: LinuxDoRssItem[] } {
  const channelXml = collectElements(xml, "channel")[0] ?? xml;
  const items = collectElements(channelXml, "item").map(parseItem);
  return {
    feed: {
      title: readTextTag(channelXml, "title"),
      link: readTextTag(channelXml, "link"),
      description: readTextTag(channelXml, "description"),
    },
    items,
  };
}

function parseItem(itemXml: string): LinuxDoRssItem {
  const content = readTextTag(itemXml, "content:encoded") ?? readTextTag(itemXml, "description");
  return {
    title: readTextTag(itemXml, "title"),
    link: readTextTag(itemXml, "link"),
    guid: readTextTag(itemXml, "guid"),
    creator: readTextTag(itemXml, "dc:creator"),
    categories: collectTextTags(itemXml, "category"),
    content,
    contentSnippet: content ? htmlToText(content) : null,
    isoDate: normalizeDate(readTextTag(itemXml, "pubDate")),
    topicPinned: readTextTag(itemXml, "discourse:topicPinned"),
    topicClosed: readTextTag(itemXml, "discourse:topicClosed"),
    topicArchived: readTextTag(itemXml, "discourse:topicArchived"),
    grantedAt: readTextTag(itemXml, "discourse:grantedAt"),
    grantedBy: readTextTag(itemXml, "discourse:grantedBy"),
  };
}

function normalizeTopic(item: LinuxDoRssItem): LinuxDoTopicSummary {
  return {
    id: extractTopicId(item.link, item.guid),
    title: item.title,
    url: item.link,
    author: item.creator,
    category: item.categories[0] ?? null,
    excerpt: item.contentSnippet,
    descriptionHtml: item.content,
    pubDate: item.isoDate,
    pinned: yesNoToBool(item.topicPinned),
    closed: yesNoToBool(item.topicClosed),
    archived: yesNoToBool(item.topicArchived),
    raw: toRawItem(item),
  };
}

function normalizePost(item: LinuxDoRssItem): LinuxDoPostSummary {
  const ref = extractPostRef(item.link, item.guid);
  return {
    id: ref.postId,
    topicId: ref.topicId,
    postNumber: ref.postNumber,
    title: item.title,
    url: item.link,
    author: item.creator,
    excerpt: item.contentSnippet,
    contentHtml: item.content,
    pubDate: item.isoDate,
    raw: toRawItem(item),
  };
}

function normalizeBadgeGrant(item: LinuxDoRssItem): LinuxDoBadgeGrant {
  return {
    grantee: item.title,
    username: extractUsernameFromGuid(item.guid),
    grantedAt: item.grantedAt,
    grantedBy: item.grantedBy,
    url: item.guid,
    raw: toRawItem(item),
  };
}

export function extractTopicId(link?: string | null, guid?: string | null): number | null {
  const fromGuid = guid?.match(/topic-(\d+)/);
  if (fromGuid) {
    return Number(fromGuid[1]);
  }
  const fromLink = link?.match(/\/t\/[^/]+\/(\d+)/);
  return fromLink ? Number(fromLink[1]) : null;
}

interface LinuxDoPostRef {
  topicId: number | null;
  postNumber: number | null;
  postId: number | null;
}

export function extractPostRef(link?: string | null, guid?: string | null): LinuxDoPostRef {
  const topicMatch = link?.match(/\/t\/[^/]+\/(\d+)/);
  const hashMatch = link?.match(/#post[_-](\d+)/);
  const pathMatch = link?.match(/\/t\/[^/]+\/\d+\/(\d+)/);
  const guidMatch = guid?.match(/post-(\d+)(?:-(\d+))?$/);

  let postNumber: number | null = null;
  if (hashMatch) {
    postNumber = Number(hashMatch[1]);
  } else if (pathMatch) {
    postNumber = Number(pathMatch[1]);
  } else if (guidMatch?.[2] !== undefined) {
    postNumber = Number(guidMatch[2]);
  }

  return {
    topicId: topicMatch ? Number(topicMatch[1]) : null,
    postNumber,
    postId: guidMatch && guidMatch[2] === undefined ? Number(guidMatch[1]) : null,
  };
}

export function extractUsernameFromGuid(guid?: string | null): string | null {
  const match = guid?.match(/[?&]username=([^&]+)/);
  if (!match?.[1]) {
    return null;
  }
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function yesNoToBool(value?: string | null): boolean | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim().toLowerCase();
  if (normalized === "yes" || normalized === "true") {
    return true;
  }
  if (normalized === "no" || normalized === "false") {
    return false;
  }
  return null;
}

function collectElements(xml: string, tagName: string): string[] {
  const elements: string[] = [];
  const openingTag = `<${tagName}`;
  const closingTag = `</${tagName}>`;
  let searchFrom = 0;

  while (searchFrom < xml.length) {
    const openingStart = xml.indexOf(openingTag, searchFrom);
    if (openingStart < 0) {
      break;
    }
    const openingEnd = xml.indexOf(">", openingStart);
    if (openingEnd < 0) {
      break;
    }
    const closingStart = xml.indexOf(closingTag, openingEnd + 1);
    if (closingStart < 0) {
      break;
    }
    const closingEnd = closingStart + closingTag.length;
    elements.push(xml.slice(openingStart, closingEnd));
    searchFrom = closingEnd;
  }

  return elements;
}

function collectTextTags(xml: string, tagName: string): string[] {
  return collectElements(xml, tagName).flatMap((element) => {
    const text = readElementText(element, tagName);
    return text ? [text] : [];
  });
}

function readTextTag(xml: string, tagName: string): string | null {
  const element = collectElements(xml, tagName)[0];
  return element ? readElementText(element, tagName) : null;
}

function readElementText(element: string, tagName: string): string | null {
  const openingEnd = element.indexOf(">");
  const closingStart = element.lastIndexOf(`</${tagName}>`);
  if (openingEnd < 0 || closingStart < 0 || closingStart <= openingEnd) {
    return null;
  }
  return nonEmpty(decodeXmlText(element.slice(openingEnd + 1, closingStart)));
}

function decodeXmlText(value: string): string {
  const trimmed = value.trim();
  const cdata = trimmed.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return decodeXmlEntities(cdata ? cdata[1] : trimmed);
}

function decodeXmlEntities(value: string): string {
  return value.replaceAll(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code: string) => {
    const normalized = code.toLowerCase();
    if (normalized === "amp") return "&";
    if (normalized === "lt") return "<";
    if (normalized === "gt") return ">";
    if (normalized === "quot") return '"';
    if (normalized === "apos") return "'";
    const charCode = normalized.startsWith("#x")
      ? Number.parseInt(normalized.slice(2), 16)
      : Number(normalized.slice(1));
    return Number.isFinite(charCode) ? String.fromCodePoint(charCode) : entity;
  });
}

function htmlToText(html: string): string | null {
  return nonEmpty(decodeXmlEntities(html.replaceAll(/<[^>]*>/g, " ").replaceAll(/\s+/g, " ")));
}

function normalizeDate(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : value;
}

function applyLimit<T>(items: T[], limit?: number): T[] {
  if (limit == null || !Number.isFinite(limit) || limit < 0) {
    return items;
  }
  return items.slice(0, limit);
}

function nonEmpty(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toRawItem(item: LinuxDoRssItem): Record<string, unknown> {
  return {
    title: item.title,
    link: item.link,
    guid: item.guid,
    creator: item.creator,
    categories: item.categories,
    content: item.content,
    contentSnippet: item.contentSnippet,
    isoDate: item.isoDate,
    topicPinned: item.topicPinned,
    topicClosed: item.topicClosed,
    topicArchived: item.topicArchived,
    grantedAt: item.grantedAt,
    grantedBy: item.grantedBy,
  };
}
