import { useStore } from '@/store';

export default function usePermission(pageName: string, hanldeName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${hanldeName}`;

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission);
}
