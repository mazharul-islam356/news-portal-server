import { toast } from "sonner";

// Convert any date into the value format required by <input type="datetime-local">
// (local time, YYYY-MM-DDTHH:mm) so the exact date is shown back to the user.
export const toLocalDateTimeInput = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
};

// Current local date/time pre-filled in the publish date input.
export const currentDateTimeInput = () => toLocalDateTimeInput(new Date());

// Convert the datetime-local value into a real ISO timestamp the server parses
// the same way in every timezone.
export const toISOStringSafe = (value) => {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  return isNaN(d.getTime()) ? "" : d.toISOString();
};

// The date a news item should be displayed with.
export const newsDisplayDate = (item) =>
  item?.publishedAt || item?.updatedAt || item?.createdAt;

// URL-friendly route to a news details page.
// Prefers the stored SEO slug; falls back to the id until server backfills.
export const newsUrl = (item) => {
  if (!item) return "#";
  if (item.slug) return `/news/${item.slug}`;
  return item._id ? `/news/${item._id}` : "#";
};

export const formatDateTime = (date, lang) => {
  const d = new Date(date);

  if (lang === "bn") {
    return new Intl.DateTimeFormat("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
};

export const shareOnFacebook = (url) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank",
  );
};

export const shareOnTwitter = (url, text) => {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

export const copyLink = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  } catch (err) {
    console.error("Copy failed", err);
  }
};
