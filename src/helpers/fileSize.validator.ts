export function IsFileSizeOk(size: number): boolean {
  const file = Math.round(size / 1024);
  // The size of the file.
  if (file >= 1024) {
    return false;
  } else {
    return true;
  }
}
