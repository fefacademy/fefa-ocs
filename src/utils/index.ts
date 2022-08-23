import { navigate } from "gatsby";

export function refineName(val: string) {
  let value = val.replace(/^\d+-/i, "").replace(/^\d\.+/i, "");
  return value;
}

export function getCurrentLesson() {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return decodeURI(url.split("/")[4]);
}

export function getLessonIndex(sources: any) {
  let index = -1;
  let currentLesson = getCurrentLesson();

  sources.forEach((s: any, i: number) => {
    if (s.name === currentLesson) {
      index = i;
    }
  });
  return index;
}

export function navigateToLesson(direction: string, sources: any) {
  const index = getLessonIndex(sources);

  switch (direction) {
    case "next":
      {
        if (index >= 0) {
          const next = sources[index + 1];
          navigate(`/lesson/${next.name}`);
        }
      }
      break;
    case "prev": {
      if (index > 0) {
        const next = sources[index - 1];
        navigate(`/lesson/${next.name}`);
      }
    }
  }
}

export function fetchItem(key: string) {
  if (typeof window !== "undefined") {
    let item = JSON.parse(localStorage.getItem(key) ?? "{}");
    return item;
  }
  return {};
}

export function setItem(key: string, value: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
