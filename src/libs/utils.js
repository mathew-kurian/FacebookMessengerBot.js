export function cut(str, max, trail = '...') {
  if (str.length > max) {
    str = str.substring(0, max - trail.length) + trail;
  }

  return str;
}
