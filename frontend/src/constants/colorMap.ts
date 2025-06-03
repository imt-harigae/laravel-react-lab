// src/constants/colorMap.ts
// Tailwindのベースカラー一覧
export const tailwindBaseColors = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
  'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
  'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone'
];

// 任意の初期色map（500階調で指定）
export const colorMap = tailwindBaseColors.reduce((acc, color) => {
  acc[color] = `bg-${color}-500`;
  return acc;
}, {} as Record<string, string>);
