import type { ProviderActionDefinition } from "../../core/provider-definition.ts";

import { s } from "../../core/json-schema.ts";
import { defineProviderAction } from "../../core/provider-definition.ts";

const service = "youtube";
const readScope = ["youtube.read"];
const writeScope = ["youtube.write"];

const requestSchema = s.looseObject("YouTube action input. Field names follow the YouTube Data API action contract.");
const rawResource = s.looseObject("The raw YouTube resource.");
const pageInfo = s.object("Pagination summary returned by YouTube.", {
  totalResults: s.integer("The total result count reported by YouTube."),
  resultsPerPage: s.integer("The number of results included in this page."),
});
const collectionPage = (key: string, description: string, itemDescription: string) =>
  s.object(description, {
    [key]: s.array(itemDescription, rawResource),
    nextPageToken: s.nullableString("The token for the next result page."),
    prevPageToken: s.nullableString("The token for the previous result page."),
    pageInfo,
  });
const singleResource = (key: string, description: string) => s.object(description, { [key]: rawResource });
const deletionOutput = s.object("A YouTube deletion acknowledgement wrapper.", {
  result: s.object("A YouTube deletion acknowledgement.", {
    id: s.string("The YouTube resource ID that was deleted."),
    deleted: s.boolean("Whether the delete request completed successfully."),
  }),
});

export type YoutubeActionName =
  | "search"
  | "list_videos"
  | "list_channels"
  | "list_playlists"
  | "list_playlist_items"
  | "create_playlist"
  | "update_playlist"
  | "delete_playlist"
  | "add_video_to_playlist"
  | "update_playlist_item"
  | "delete_playlist_item"
  | "list_comment_threads"
  | "list_comments"
  | "post_comment"
  | "create_comment_reply"
  | "upload_video_from_url"
  | "update_video"
  | "delete_video"
  | "get_video_rating"
  | "rate_video"
  | "set_thumbnail_from_url"
  | "download_caption"
  | "list_caption_tracks"
  | "upload_caption_from_url"
  | "update_caption"
  | "delete_caption"
  | "list_video_categories"
  | "list_i18n_languages"
  | "list_i18n_regions";

const actionSpecs: Array<{
  name: YoutubeActionName;
  description: string;
  requiredScopes: string[];
  outputSchema: ReturnType<typeof s.object>;
}> = [
  {
    name: "search",
    description: "Search YouTube for videos, channels, or playlists.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "results",
      "The response returned when searching YouTube.",
      "The search results returned by YouTube.",
    ),
  },
  {
    name: "list_videos",
    description: "List YouTube video resources by ID or chart.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "videos",
      "The response returned when listing YouTube videos.",
      "The videos returned by YouTube.",
    ),
  },
  {
    name: "list_channels",
    description: "List YouTube channel resources by ID, username, handle, or authenticated owner.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "channels",
      "The response returned when listing YouTube channels.",
      "The channels returned by YouTube.",
    ),
  },
  {
    name: "list_playlists",
    description: "List YouTube playlists by ID, channel, or authenticated owner.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "playlists",
      "The response returned when listing YouTube playlists.",
      "The playlists returned by YouTube.",
    ),
  },
  {
    name: "list_playlist_items",
    description: "List videos and resources contained in a YouTube playlist.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "playlistItems",
      "The response returned when listing YouTube playlist items.",
      "The playlist items returned by YouTube.",
    ),
  },
  {
    name: "create_playlist",
    description: "Create a YouTube playlist owned by the authenticated user.",
    requiredScopes: writeScope,
    outputSchema: singleResource("playlist", "The response returned after creating a YouTube playlist."),
  },
  {
    name: "update_playlist",
    description: "Update a YouTube playlist's snippet and status metadata.",
    requiredScopes: writeScope,
    outputSchema: singleResource("playlist", "The response returned after updating a YouTube playlist."),
  },
  {
    name: "delete_playlist",
    description: "Delete a YouTube playlist owned by the authenticated user.",
    requiredScopes: writeScope,
    outputSchema: deletionOutput,
  },
  {
    name: "add_video_to_playlist",
    description: "Add a YouTube video to a playlist.",
    requiredScopes: writeScope,
    outputSchema: singleResource("playlistItem", "The response returned after adding a video to a YouTube playlist."),
  },
  {
    name: "update_playlist_item",
    description: "Update a YouTube playlist item's position or note.",
    requiredScopes: writeScope,
    outputSchema: singleResource("playlistItem", "The response returned after updating a YouTube playlist item."),
  },
  {
    name: "delete_playlist_item",
    description: "Delete an item from a YouTube playlist.",
    requiredScopes: writeScope,
    outputSchema: deletionOutput,
  },
  {
    name: "list_comment_threads",
    description: "List top-level YouTube comment threads for a video, channel, or thread IDs.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "commentThreads",
      "The response returned when listing YouTube comment threads.",
      "The comment threads returned by YouTube.",
    ),
  },
  {
    name: "list_comments",
    description: "List YouTube comments by parent comment ID or comment IDs.",
    requiredScopes: readScope,
    outputSchema: collectionPage(
      "comments",
      "The response returned when listing YouTube comments.",
      "The comments returned by YouTube.",
    ),
  },
  {
    name: "post_comment",
    description: "Post a top-level public comment on a YouTube video.",
    requiredScopes: writeScope,
    outputSchema: singleResource("commentThread", "The response returned after posting a YouTube comment."),
  },
  {
    name: "create_comment_reply",
    description: "Reply to an existing YouTube comment thread.",
    requiredScopes: writeScope,
    outputSchema: singleResource("comment", "The response returned after replying to a YouTube comment."),
  },
  {
    name: "upload_video_from_url",
    description: "Upload a YouTube video from an HTTPS media URL using the resumable upload API.",
    requiredScopes: writeScope,
    outputSchema: singleResource("video", "The response returned after uploading a YouTube video."),
  },
  {
    name: "update_video",
    description: "Update a YouTube video's snippet and status metadata.",
    requiredScopes: writeScope,
    outputSchema: singleResource("video", "The response returned after updating a YouTube video."),
  },
  {
    name: "delete_video",
    description: "Delete a YouTube video owned by the authenticated user.",
    requiredScopes: writeScope,
    outputSchema: deletionOutput,
  },
  {
    name: "get_video_rating",
    description: "Get the authenticated user's rating for one or more YouTube videos.",
    requiredScopes: readScope,
    outputSchema: s.object("The response returned when retrieving YouTube video ratings.", {
      ratings: s.array("The video ratings returned by YouTube.", rawResource),
    }),
  },
  {
    name: "rate_video",
    description: "Set or clear the authenticated user's rating for a YouTube video.",
    requiredScopes: writeScope,
    outputSchema: s.object("The response returned after rating a YouTube video.", {
      videoId: s.string("The YouTube video ID that was rated."),
      rating: s.string("The rating that was applied."),
      success: s.boolean("Whether YouTube accepted the rating request."),
    }),
  },
  {
    name: "set_thumbnail_from_url",
    description: "Upload and set a custom YouTube video thumbnail from an HTTPS image URL.",
    requiredScopes: writeScope,
    outputSchema: singleResource("thumbnails", "The response returned after setting a YouTube thumbnail."),
  },
  {
    name: "download_caption",
    description: "Download a YouTube caption track and return a temporary transit URL.",
    requiredScopes: readScope,
    outputSchema: s.object("The response returned after downloading a YouTube caption track.", {
      file: s.looseObject("A file downloaded through the connector transit file service."),
    }),
  },
  {
    name: "list_caption_tracks",
    description: "List YouTube caption tracks for a video or caption track IDs.",
    requiredScopes: readScope,
    outputSchema: s.object("The response returned when listing YouTube caption tracks.", {
      captions: s.array("The caption tracks returned by YouTube.", rawResource),
    }),
  },
  {
    name: "upload_caption_from_url",
    description: "Upload a YouTube caption track from an HTTPS caption file URL.",
    requiredScopes: writeScope,
    outputSchema: singleResource("caption", "The response returned after uploading a YouTube caption track."),
  },
  {
    name: "update_caption",
    description: "Update a YouTube caption track's metadata.",
    requiredScopes: writeScope,
    outputSchema: singleResource("caption", "The response returned after updating a YouTube caption track."),
  },
  {
    name: "delete_caption",
    description: "Delete a YouTube caption track.",
    requiredScopes: writeScope,
    outputSchema: deletionOutput,
  },
  {
    name: "list_video_categories",
    description: "List YouTube video categories for a region or category IDs.",
    requiredScopes: readScope,
    outputSchema: s.object("The response returned when listing YouTube video categories.", {
      categories: s.array("The video categories returned by YouTube.", rawResource),
    }),
  },
  {
    name: "list_i18n_languages",
    description: "List YouTube interface languages.",
    requiredScopes: readScope,
    outputSchema: s.object("The response returned when listing YouTube interface languages.", {
      languages: s.array("The i18n languages returned by YouTube.", rawResource),
    }),
  },
  {
    name: "list_i18n_regions",
    description: "List YouTube content regions.",
    requiredScopes: readScope,
    outputSchema: s.object("The response returned when listing YouTube content regions.", {
      regions: s.array("The i18n regions returned by YouTube.", rawResource),
    }),
  },
];

export const youtubeActions: ProviderActionDefinition<YoutubeActionName>[] = actionSpecs.map((action) =>
  defineProviderAction(service, {
    ...action,
    inputSchema: requestSchema,
  }),
);
