import type { App } from 'vue';
import { formatUtcString } from '@/utils/format-date';

export default function (app: App) {
  app.config.globalProperties.$filters = {
    showStatus(value: number) {
      return value === 0 ? '停用' : '启用';
    },
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
