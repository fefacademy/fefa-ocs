import slugify from "slugify";
import { fetchItem, navigateToLesson, setItem } from ".";

interface IListenersProps {
  data: any;
  set: any;
  sources: any;
  name: string;
  autoplay: boolean;
  progress: any;
  played: number;
}

export const handleLessonCompleted = (props: IListenersProps) => {
  const { data, set, sources, name, autoplay } = props;
  const completed = data.current.completed || [];
  completed.push(slugify(name));

  set({
    current: {
      ...data.current,
      completed,
    },
  });

  // mark lesson completed
  let values = fetchItem("fefa-ocs-completed");
  let prev = values.completed ?? [];
  values.completed = [...prev, slugify(name)];
  setItem("fefa-ocs-completed", values);

  if (autoplay) {
    navigateToLesson("next", sources);
  }
};

export const handleLessonPlayback = (props: IListenersProps) => {
  const { played, data, set, name, progress } = props;
  const percent = played * 100;
  const newProgress: any = Object.assign({}, data.current);
  newProgress[name] = percent;

  // updated in react ctx session for live feedback
  set({
    current: {
      ...newProgress,
    },
  });

  // update in localStorage for persistence
  let oldValue = progress[slugify(name)];
  if (!oldValue || (oldValue && oldValue < percent)) {
    progress[slugify(name)] = percent;
    setItem("fefa-ocs-progress-course", progress);
  }
};
