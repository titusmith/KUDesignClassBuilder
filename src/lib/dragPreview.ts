import type { Course, Faculty } from "@/data/schedulerTypes";
import { getPrefixColor } from "@/data/prefixColors";

/** GripVertical icon as inline SVG */
const GRIP_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>';

export interface DragPreviewOptions {
  course: Course;
  instructor?: Faculty;
  instructorCourseCount?: number;
  instructorMaxWorkload?: number;
  prefixBorderClass?: string;
}

/**
 * Creates a DOM element that matches the CourseTile appearance for use as a custom drag image.
 * Caller must append to document, use with setDragImage, then remove.
 */
export function createCourseTileDragImage(options: DragPreviewOptions): HTMLDivElement {
  const {
    course,
    instructor,
    instructorCourseCount,
    instructorMaxWorkload,
    prefixBorderClass,
  } = options;

  const borderClass =
    prefixBorderClass ?? getPrefixColor(course.prefix).border ?? "border-border";

  const el = document.createElement("div");
  el.className = `flex w-full min-w-[100px] max-w-[140px] flex-col gap-0.5 rounded-md border-2 px-2 py-1.5 text-left ${borderClass} bg-card shadow-lg`;
  el.style.position = "absolute";
  el.style.top = "-9999px";
  el.style.left = "-9999px";
  el.style.opacity = "0.95";

  const row1 = document.createElement("div");
  row1.className = "flex items-center justify-between gap-1";

  const gripSpan = document.createElement("span");
  gripSpan.className = "flex shrink-0 text-muted-foreground";
  gripSpan.style.width = "12px";
  gripSpan.style.height = "12px";
  gripSpan.innerHTML = GRIP_SVG;

  const codeSpan = document.createElement("span");
  codeSpan.className = "truncate text-sm font-medium";
  codeSpan.textContent = course.code;

  row1.appendChild(gripSpan);
  row1.appendChild(codeSpan);
  el.appendChild(row1);

  if (instructor) {
    const workload =
      instructorCourseCount != null && instructorMaxWorkload != null
        ? ` (${instructorCourseCount}/${instructorMaxWorkload})`
        : "";
    const row2 = document.createElement("span");
    row2.className = "truncate text-xs text-muted-foreground";
    row2.textContent = instructor.name + workload;
    el.appendChild(row2);
  }

  return el;
}

/**
 * Sets a custom CourseTile-style drag image on the given drag event.
 */
export function setCourseTileDragImage(
  e: React.DragEvent,
  options: DragPreviewOptions
): void {
  const el = createCourseTileDragImage(options);
  document.body.appendChild(el);
  void el.offsetHeight; // Force layout

  const rect = el.getBoundingClientRect();
  const offsetX = Math.min(rect.width / 2, 60);
  const offsetY = Math.min(rect.height / 2, 24);

  e.dataTransfer.setDragImage(el, offsetX, offsetY);

  requestAnimationFrame(() => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
}
