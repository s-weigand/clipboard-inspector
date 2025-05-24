export type ClipboardData = {
  buffers: Record<string, string>;
  files: FileList | null;
};
